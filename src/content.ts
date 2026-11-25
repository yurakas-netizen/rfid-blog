import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked, Renderer, Tokens } from 'marked';
import katex from 'katex';
import hljs from 'highlight.js';
import { LANGUAGES, ORDERED_LANGUAGES, LangCode } from './config.js';

export interface TocItem {
  level: number;
  id: string;
  text: string;
}

export interface LinkItem {
  title: string;
  description: string;
  website: string;
  image?: string;
}

export interface PostItem {
  id: string;
  slug: string;
  lang: LangCode;
  title: string;
  description: string;
  date: Date;
  weight: number;
  image: string | null;
  imageUrl: string | null;
  categories: string[];
  tags: string[];
  math: boolean;
  comments: boolean;
  readingTime: number;
  wordCount: number;
  summary: string;
  html: string;
  plainText: string;
  toc: TocItem[];
  bundleDir: string;
  permalink: string;
  translationKey: string;
}

export interface PageItem {
  slug: string;
  lang: LangCode;
  title: string;
  layout: string;
  html: string;
  links: LinkItem[];
  comments: boolean;
}

export interface TaxonomyEntry {
  name: string;
  slug: string;
  count: number;
  style?: {
    background?: string;
    color?: string;
  };
  description?: string;
}

const CONTENT_ROOT = path.resolve(process.cwd(), 'content');

function slugify(input: string): string {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'item';
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\{\{<[\s\S]*?>\}\}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|$-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function processShortcodes(md: string): string {
  // Quote shortcode: {{< quote author="..." source="..." url="..." >}}...{{< /quote >}}
  md = md.replace(
    /\{\{<\s*quote([^>]*)>\}\}([\s\S]*?)\{\{<\s*\/quote\s*>\}\}/g,
    (_, attrsRaw: string, body: string) => {
      const getAttr = (name: string) => {
        const m = attrsRaw.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`));
        return m ? m[1] : '';
      };
      const author = getAttr('author');
      const source = getAttr('source');
      const url = getAttr('url');
      const citeParts: string[] = [];
      if (author) citeParts.push(`<span>${escapeHtml(author)}</span>`);
      if (source) {
        if (url) {
          citeParts.push(
            `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source)}</a>`
          );
        } else {
          citeParts.push(`<cite>${escapeHtml(source)}</cite>`);
        }
      }
      const footer =
        citeParts.length > 0
          ? `<footer>${citeParts.join(' — ')}</footer>`
          : '';
      return `\n<blockquote class="shortcode-quote"><p>${escapeHtml(body.trim())}</p>${footer}</blockquote>\n`;
    }
  );

  // YouTube: {{< youtube "ID" >}}
  md = md.replace(/\{\{<\s*youtube\s+"?([^"\s>]+)"?\s*>\}\}/g, (_, id: string) => {
    const safeId = escapeHtml(id);
    return `\n<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/${safeId}" title="YouTube video" loading="lazy" allowfullscreen></iframe></div>\n`;
  });

  // Bilibili: {{< bilibili "ID" >}}
  md = md.replace(/\{\{<\s*bilibili\s+"?([^"\s>]+)"?\s*>\}\}/g, (_, id: string) => {
    const safeId = escapeHtml(id);
    return `\n<div class="video-wrapper"><iframe src="https://player.bilibili.com/player.html?bvid=${safeId}&high_quality=1&autoplay=0" title="Bilibili video" loading="lazy" allowfullscreen></iframe></div>\n`;
  });

  // Tencent: {{< tencent "ID" >}}
  md = md.replace(/\{\{<\s*tencent\s+"?([^"\s>]+)"?\s*>\}\}/g, (_, id: string) => {
    const safeId = escapeHtml(id);
    return `\n<div class="video-wrapper"><iframe src="https://v.qq.com/txp/iframe/player.html?vid=${safeId}" title="Tencent video" loading="lazy" allowfullscreen></iframe></div>\n`;
  });

  // Video: {{< video "URL" >}}
  md = md.replace(/\{\{<\s*video\s+"?([^"\s>]+)"?\s*>\}\}/g, (_, url: string) => {
    const safeUrl = escapeHtml(url);
    return `\n<div class="video-wrapper video-native"><video controls preload="metadata" src="${safeUrl}"></video></div>\n`;
  });

  // GitLab: {{< gitlab 2589724 >}}
  md = md.replace(/\{\{<\s*gitlab\s+"?([^"\s>]+)"?\s*>\}\}/g, (_, id: string) => {
    const safeId = escapeHtml(id);
    return `\n<div class="embed-card"><span class="embed-badge">GitLab</span> <a href="https://gitlab.com/projects/${safeId}" target="_blank" rel="noopener noreferrer">GitLab Repository #${safeId}</a></div>\n`;
  });

  return md;
}

function renderMarkdownWithMath(
  rawMd: string,
  permalinkBase: string
): { html: string; toc: TocItem[] } {
  const codePlaceholders: string[] = [];
  const mathPlaceholders: string[] = [];

  // 1. Protect fenced code blocks
  let processed = rawMd.replace(/```[\s\S]*?```/g, (match) => {
    const idx = codePlaceholders.length;
    codePlaceholders.push(match);
    return `@@CODE_BLOCK_${idx}@@`;
  });

  // Protect 4-space indented code blocks if preceded by blank line
  // Protect inline code spans
  processed = processed.replace(/`[^`\n]+`/g, (match) => {
    const idx = codePlaceholders.length;
    codePlaceholders.push(match);
    return `@@CODE_BLOCK_${idx}@@`;
  });

  // 2. Process Hugo shortcodes
  processed = processShortcodes(processed);

  // 3. Render block math $$...$$ and \[...\]
  const mathPlainLabels: string[] = [];

  processed = processed.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr: string) => {
    const idx = mathPlaceholders.length;
    mathPlainLabels[idx] = expr.trim();
    try {
      mathPlaceholders.push(
        `<div class="katex-block">${katex.renderToString(expr.trim(), {
          displayMode: true,
          throwOnError: false,
          strict: false,
        })}</div>`
      );
    } catch {
      mathPlaceholders.push(`<pre>${escapeHtml(expr)}</pre>`);
    }
    return `@@MATH_BLOCK_${idx}@@`;
  });

  processed = processed.replace(/\\\[([\s\S]+?)\\\]/g, (_, expr: string) => {
    const idx = mathPlaceholders.length;
    mathPlainLabels[idx] = expr.trim();
    try {
      mathPlaceholders.push(
        `<div class="katex-block">${katex.renderToString(expr.trim(), {
          displayMode: true,
          throwOnError: false,
          strict: false,
        })}</div>`
      );
    } catch {
      mathPlaceholders.push(`<pre>${escapeHtml(expr)}</pre>`);
    }
    return `@@MATH_BLOCK_${idx}@@`;
  });

  // 4. Render inline math $...$ and \(...\)
  processed = processed.replace(
    /(?<!\\)\$(?!\s)([^$\n]+?)(?<!\s)\$/g,
    (full, expr: string) => {
      // Avoid accidental currency matches if purely digits/spaces
      if (/^\d[\d.,\s]*$/.test(expr.trim())) {
        return full;
      }
      const idx = mathPlaceholders.length;
      mathPlainLabels[idx] = expr.trim();
      try {
        mathPlaceholders.push(
          katex.renderToString(expr.trim(), {
            displayMode: false,
            throwOnError: false,
            strict: false,
          })
        );
      } catch {
        mathPlaceholders.push(escapeHtml(full));
      }
      return `@@MATH_INLINE_${idx}@@`;
    }
  );

  processed = processed.replace(/\\\(([\s\S]+?)\\\)/g, (_, expr: string) => {
    const idx = mathPlaceholders.length;
    mathPlainLabels[idx] = expr.trim();
    try {
      mathPlaceholders.push(
        katex.renderToString(expr.trim(), {
          displayMode: false,
          throwOnError: false,
          strict: false,
        })
      );
    } catch {
      mathPlaceholders.push(escapeHtml(expr));
    }
    return `@@MATH_INLINE_${idx}@@`;
  });

  // 5. Restore code blocks before marked parses them
  processed = processed.replace(/@@CODE_BLOCK_(\d+)@@/g, (_, idxStr: string) => {
    return codePlaceholders[Number(idxStr)] ?? '';
  });

  // 6. Configure marked renderer with TOC extraction, highlight.js, relative image resolution, and table wrapper
  const toc: TocItem[] = [];
  const usedIds = new Map<string, number>();

  const renderer = new Renderer();

  renderer.heading = function ({ tokens, depth }: Tokens.Heading): string {
    const text = this.parser.parseInline(tokens);
    const plain = text
      .replace(/<[^>]+>/g, '')
      .replace(/@@MATH_(?:INLINE|BLOCK)_(\d+)@@/g, (_, idxStr: string) => mathPlainLabels[Number(idxStr)] ?? '')
      .trim();
    let id = slugify(plain);
    const count = usedIds.get(id) ?? 0;
    usedIds.set(id, count + 1);
    if (count > 0) {
      id = `${id}-${count}`;
    }
    if (depth >= 2 && depth <= 4) {
      toc.push({ level: depth, id, text: plain });
    }
    return `<h${depth} id="${escapeHtml(id)}">${text}<a class="header-anchor" href="#${escapeHtml(id)}" aria-hidden="true">#</a></h${depth}>\n`;
  };

  renderer.code = function ({ text, lang }: Tokens.Code): string {
    let highlighted: string;
    const validLang = lang && hljs.getLanguage(lang) ? lang : undefined;
    if (validLang) {
      highlighted = hljs.highlight(text, { language: validLang }).value;
    } else {
      highlighted = hljs.highlightAuto(text).value;
    }
    const langLabel = validLang ? `<span class="code-lang">${escapeHtml(validLang)}</span>` : '';
    return `<div class="highlight">${langLabel}<pre><code class="hljs${validLang ? ` language-${escapeHtml(validLang)}` : ''}">${highlighted}</code></pre></div>\n`;
  };

  renderer.image = function ({ href, title, text }: Tokens.Image): string {
    let resolvedHref = href || '';
    if (
      resolvedHref &&
      !resolvedHref.startsWith('http://') &&
      !resolvedHref.startsWith('https://') &&
      !resolvedHref.startsWith('/') &&
      !resolvedHref.startsWith('data:')
    ) {
      const cleanRel = resolvedHref.replace(/^\.\//, '');
      resolvedHref = `${permalinkBase}${encodeURIComponent(cleanRel)}`;
    }
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
    const altText = escapeHtml(text || '');
    return `<figure class="article-figure"><img src="${escapeHtml(resolvedHref)}" alt="${altText}"${titleAttr} loading="lazy" class="gallery-image" />${altText ? `<figcaption>${altText}</figcaption>` : ''}</figure>`;
  };

  renderer.table = function (token: Tokens.Table): string {
    let header = '';
    let cell = '';
    for (let j = 0; j < token.header.length; j++) {
      cell += this.tablecell(token.header[j]);
    }
    header += this.tablerow({ text: cell });

    let body = '';
    for (let j = 0; j < token.rows.length; j++) {
      const row = token.rows[j];
      cell = '';
      for (let k = 0; k < row.length; k++) {
        cell += this.tablecell(row[k]);
      }
      body += this.tablerow({ text: cell });
    }
    return `<div class="table-wrapper"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>\n`;
  };

  let html = marked.parse(processed, {
    renderer,
    gfm: true,
    breaks: false,
  }) as string;

  // 7. Restore math placeholders
  html = html.replace(/@@MATH_BLOCK_(\d+)@@/g, (_, idxStr: string) => {
    return mathPlaceholders[Number(idxStr)] ?? '';
  });
  html = html.replace(/@@MATH_INLINE_(\d+)@@/g, (_, idxStr: string) => {
    return mathPlaceholders[Number(idxStr)] ?? '';
  });

  // Group consecutive images on same paragraph into gallery grid
  html = html.replace(
    /<p>(\s*<figure class="article-figure">[\s\S]*?<\/figure>\s*){2,}<\/p>/g,
    (match) => {
      const inner = match.replace(/^<p>|<\/p>$/g, '');
      return `<div class="image-gallery">${inner}</div>`;
    }
  );

  return { html, toc };
}

function loadCategoryMetadata(): Map<string, TaxonomyEntry> {
  const map = new Map<string, TaxonomyEntry>();
  const catDir = path.join(CONTENT_ROOT, 'categories');
  if (!fs.existsSync(catDir)) return map;

  for (const entry of fs.readdirSync(catDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const indexPath = path.join(catDir, entry.name, '_index.md');
    if (!fs.existsSync(indexPath)) continue;
    try {
      const raw = fs.readFileSync(indexPath, 'utf-8');
      const parsed = matter(raw);
      const name = String(parsed.data.title || entry.name);
      map.set(name.toLowerCase(), {
        name,
        slug: slugify(entry.name),
        count: 0,
        description: parsed.data.description ? String(parsed.data.description) : undefined,
        style: parsed.data.style
          ? {
              background: parsed.data.style.background,
              color: parsed.data.style.color,
            }
          : undefined,
      });
    } catch {
      // ignore malformed category file
    }
  }
  return map;
}

function scanPostsInDir(dir: string, lang: LangCode): PostItem[] {
  if (!fs.existsSync(dir)) return [];
  const posts: PostItem[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const bundleDir = path.join(dir, entry.name);
    const mdPath = path.join(bundleDir, 'index.md');
    if (!fs.existsSync(mdPath)) continue;

    try {
      const raw = fs.readFileSync(mdPath, 'utf-8');
      const parsed = matter(raw);
      const data = parsed.data || {};
      const slug = data.slug ? String(data.slug) : entry.name;
      const langPrefix = LANGUAGES[lang].urlPrefix;
      const permalink = `${langPrefix}/p/${encodeURIComponent(slug)}/`;

      const rawBody = parsed.content || '';
      const cleanBody = rawBody.replace(/<!--more-->/gi, '');
      const { html, toc } = renderMarkdownWithMath(cleanBody, permalink);

      const plainText = stripMarkdown(cleanBody);
      const words = plainText ? plainText.split(/\s+/).length : 0;
      const readingTime = Math.max(1, Math.ceil(words / 200));

      let summary = '';
      if (data.description) {
        summary = String(data.description);
      } else if (rawBody.includes('<!--more-->')) {
        summary = stripMarkdown(rawBody.split(/<!--more-->/i)[0]);
      } else {
        summary = plainText.slice(0, 220) + (plainText.length > 220 ? '...' : '');
      }

      const image = data.image ? String(data.image) : null;
      let imageUrl: string | null = null;
      if (image) {
        if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/')) {
          imageUrl = image;
        } else {
          imageUrl = `${permalink}${encodeURIComponent(image)}`;
        }
      }

      const dateVal = data.date ? new Date(data.date) : new Date(0);
      const categories = Array.isArray(data.categories)
        ? data.categories.map((c: unknown) => String(c).trim()).filter(Boolean)
        : [];
      const tags = Array.isArray(data.tags)
        ? data.tags.map((t: unknown) => String(t).trim()).filter(Boolean)
        : [];
      const translationKey = data.translationKey ? String(data.translationKey).trim() : '';

      posts.push({
        id: `${lang}:${slug}`,
        slug,
        lang,
        title: String(data.title || slug),
        description: String(data.description || ''),
        date: Number.isNaN(dateVal.getTime()) ? new Date(0) : dateVal,
        weight: typeof data.weight === 'number' ? data.weight : 0,
        image,
        imageUrl,
        categories,
        tags,
        math: Boolean(data.math),
        comments: data.comments !== false,
        readingTime,
        wordCount: words,
        summary,
        html,
        plainText,
        toc,
        bundleDir,
        permalink,
        translationKey,
      });
    } catch (err) {
      console.warn(`[content] Failed to parse post ${mdPath}:`, err);
    }
  }

  return posts;
}

function scanPagesInDir(dir: string, lang: LangCode): PageItem[] {
  if (!fs.existsSync(dir)) return [];
  const pages: PageItem[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const mdPath = path.join(dir, entry.name, 'index.md');
    if (!fs.existsSync(mdPath)) continue;

    try {
      const raw = fs.readFileSync(mdPath, 'utf-8');
      const parsed = matter(raw);
      const data = parsed.data || {};
      const slug = data.slug ? String(data.slug) : entry.name;
      const { html } = renderMarkdownWithMath(parsed.content || '', '/');

      const links: LinkItem[] = Array.isArray(data.links)
        ? data.links.map((item: Record<string, unknown>) => ({
            title: String(item.title || ''),
            description: String(item.description || ''),
            website: String(item.website || '#'),
            image: item.image ? String(item.image) : undefined,
          }))
        : [];

      pages.push({
        slug,
        lang,
        title: String(data.title || slug),
        layout: String(data.layout || 'page'),
        html,
        links,
        comments: data.comments !== false,
      });
    } catch {
      // ignore malformed page
    }
  }

  return pages;
}

export interface SiteContent {
  allPosts: PostItem[];
  postsByLang: Record<LangCode, PostItem[]>;
  pagesByLang: Record<LangCode, Record<string, PageItem>>;
  categoryStyles: Map<string, TaxonomyEntry>;
}

export function loadSiteContent(): SiteContent {
  const categoryStyles = loadCategoryMetadata();

  const sortPosts = (arr: PostItem[]) =>
    arr.sort((a, b) => {
      if (a.weight !== b.weight) {
        if (a.weight > 0 && b.weight > 0) return a.weight - b.weight;
        if (a.weight > 0) return -1;
        if (b.weight > 0) return 1;
      }
      return b.date.getTime() - a.date.getTime();
    });

  const buildPageMap = (pages: PageItem[]) => {
    const rec: Record<string, PageItem> = {};
    for (const p of pages) rec[p.slug] = p;
    return rec;
  };

  const postsByLang = {} as Record<LangCode, PostItem[]>;
  const pagesByLang = {} as Record<LangCode, Record<string, PageItem>>;
  const allCollected: PostItem[] = [];

  for (const langCfg of ORDERED_LANGUAGES) {
    const code = langCfg.code;
    const scanned = sortPosts(scanPostsInDir(path.join(CONTENT_ROOT, code, 'post'), code));
    postsByLang[code] = scanned;
    allCollected.push(...scanned);
    pagesByLang[code] = buildPageMap(scanPagesInDir(path.join(CONTENT_ROOT, code, 'page'), code));
  }

  const allPosts = sortPosts(allCollected);

  return {
    allPosts,
    postsByLang,
    pagesByLang,
    categoryStyles,
  };
}

export function getPostsForLanguageView(
  content: SiteContent,
  lang: LangCode
): { posts: PostItem[]; isFallback: boolean } {
  const native = content.postsByLang[lang] || [];
  return { posts: native, isFallback: false };
}

export function computeTaxonomies(
  posts: PostItem[],
  categoryStyles: Map<string, TaxonomyEntry>
): {
  categories: TaxonomyEntry[];
  tags: TaxonomyEntry[];
  archivesByYear: { year: number; posts: PostItem[] }[];
} {
  const catMap = new Map<string, TaxonomyEntry>();
  const tagMap = new Map<string, TaxonomyEntry>();
  const yearMap = new Map<number, PostItem[]>();

  for (const post of posts) {
    const yr = post.date.getUTCFullYear() || 2026;
    if (!yearMap.has(yr)) yearMap.set(yr, []);
    yearMap.get(yr)!.push(post);

    for (const cat of post.categories) {
      const key = cat.toLowerCase();
      const existing = catMap.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        const styleMeta = categoryStyles.get(key) || categoryStyles.get(slugify(cat));
        catMap.set(key, {
          name: cat,
          slug: slugify(cat),
          count: 1,
          style: styleMeta?.style,
          description: styleMeta?.description,
        });
      }
    }

    for (const tag of post.tags) {
      const key = tag.toLowerCase();
      const existing = tagMap.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        tagMap.set(key, {
          name: tag,
          slug: slugify(tag),
          count: 1,
        });
      }
    }
  }

  const categories = Array.from(catMap.values()).sort((a, b) => b.count - a.count);
  const tags = Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
  const archivesByYear = Array.from(yearMap.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, yrPosts]) => ({ year, posts: yrPosts }));

  return { categories, tags, archivesByYear };
}

export function getTranslatedPosts(post: PostItem, allPosts: PostItem[]): PostItem[] {
  if (!post.translationKey) return [];
  return allPosts
    .filter((p) => p.translationKey === post.translationKey && p.id !== post.id)
    .sort((a, b) => LANGUAGES[a.lang].weight - LANGUAGES[b.lang].weight);
}

export function getRelatedPosts(post: PostItem, pool: PostItem[], limit = 3): PostItem[] {
  const postTags = new Set(post.tags.map((t) => t.toLowerCase()));
  const postCats = new Set(post.categories.map((c) => c.toLowerCase()));

  return pool
    .filter((p) => p.id !== post.id)
    .map((p) => {
      let score = 0;
      for (const c of p.categories) {
        if (postCats.has(c.toLowerCase())) score += 200;
      }
      for (const t of p.tags) {
        if (postTags.has(t.toLowerCase())) score += 100;
      }
      if (p.lang === post.lang) score += 20;
      return { post: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.getTime() - a.post.date.getTime())
    .slice(0, limit)
    .map((item) => item.post);
}

export { slugify };
