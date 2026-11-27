import fs from 'node:fs';
import path from 'node:path';
import express, { type NextFunction, type Request, type Response } from 'express';
import ejs from 'ejs';
import {
  SITE_CONFIG,
  LANGUAGES,
  ORDERED_LANGUAGES,
  I18N,
  isValidLang,
  formatDate,
  type LangCode,
} from './src/config.js';
import {
  loadSiteContent,
  getPostsForLanguageView,
  computeTaxonomies,
  getRelatedPosts,
  getTranslatedPosts,
  slugify,
  type PostItem,
  type SiteContent,
} from './src/content.js';
import { buildStylesheet } from './src/styles.js';
import { buildSchemaJsonLd } from './src/schema.js';
import {
  loadRegistryEntries,
  previewRegistryChanges,
  applyRegistryChanges,
  type RegistryChangeInput,
} from './src/registry.js';
import {
  resolveShowcaseForLang,
  getShowcaseEmptyCopy,
  loadShowcaseFileForLang,
  generateStarterShowcaseForLang,
  applyShowcaseUpdates,
  type ShowcaseSaveInput,
} from './src/showcase.js';
import { selectArticleSources, getSourcesUiStrings } from './src/sources.js';

const ROOT_DIR = process.cwd();
const PORT = 3000;
const HOST = '0.0.0.0';

const compiledCss = buildStylesheet(ROOT_DIR);

const app = express();
const viewsDir = path.join(ROOT_DIR, 'views');

const CLIENT_JS = `
(function () {
  var html = document.documentElement;
  var saved = localStorage.getItem('StackColorScheme');
  var scheme = saved || html.dataset.scheme || 'dark';
  html.dataset.scheme = scheme;

  function updateToggleUI(current) {
    var btn = document.getElementById('dark-mode-toggle');
    if (!btn) return;
    var sun = btn.querySelector('.icon-sun');
    var moon = btn.querySelector('.icon-moon');
    var label = btn.querySelector('.toggle-label');
    if (current === 'dark') {
      if (sun) sun.style.display = 'block';
      if (moon) moon.style.display = 'none';
      if (label) label.textContent = btn.dataset.lightLabel || 'Light Mode';
    } else {
      if (sun) sun.style.display = 'none';
      if (moon) moon.style.display = 'block';
      if (label) label.textContent = btn.dataset.darkLabel || 'Dark Mode';
    }
  }

  updateToggleUI(scheme);

  var toggleBtn = document.getElementById('dark-mode-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var next = html.dataset.scheme === 'dark' ? 'light' : 'dark';
      html.dataset.scheme = next;
      localStorage.setItem('StackColorScheme', next);
      updateToggleUI(next);
    });
  }

  var langSelect = document.getElementById('language-select');
  if (langSelect) {
    langSelect.addEventListener('change', function () {
      if (this.value) {
        window.location.href = this.value;
      }
    });
  }

  var hamburger = document.getElementById('toggle-menu');
  var menu = document.getElementById('main-menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var lightbox = document.getElementById('image-lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.article-content img.gallery-image').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.getAttribute('src') || '';
        lightboxImg.alt = img.getAttribute('alt') || '';
        lightbox.classList.add('open');
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('open');
    }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }
})();
`;

function getLangPostCounts(siteContent: SiteContent): Record<LangCode, number> {
  const counts = {} as Record<LangCode, number>;
  for (const l of ORDERED_LANGUAGES) {
    counts[l.code] = siteContent.postsByLang[l.code]?.length || 0;
  }
  return counts;
}

function buildViewContext(
  siteContent: SiteContent,
  lang: LangCode,
  overrides: Record<string, unknown> = {}
) {
  const langConfig = LANGUAGES[lang];
  const t = I18N[lang];
  const { posts: langPosts } = getPostsForLanguageView(siteContent, lang);
  const taxonomies = computeTaxonomies(langPosts, siteContent.categoryStyles);

  return {
    site: SITE_CONFIG,
    lang,
    langConfig,
    langPrefix: langConfig.urlPrefix,
    t,
    orderedLanguages: ORDERED_LANGUAGES,
    langPostCounts: getLangPostCounts(siteContent),
    formatDate,
    slugify,
    archivesByYear: taxonomies.archivesByYear,
    categories: taxonomies.categories,
    tags: taxonomies.tags,
    activeNav: '',
    pageTitle: langConfig.title,
    pageDescription: t.subtitle,
    isArticle: false,
    toc: undefined,
    ...overrides,
  };
}

async function renderView(
  res: Response,
  siteContent: SiteContent,
  viewName: string,
  lang: LangCode,
  data: Record<string, unknown> = {},
  status = 200
): Promise<void> {
  const ctx = buildViewContext(siteContent, lang, data);
  const reqUrlPath =
    typeof res.req?.originalUrl === 'string'
      ? res.req.originalUrl.split('?')[0]
      : LANGUAGES[lang].urlPrefix
      ? `${LANGUAGES[lang].urlPrefix}/`
      : '/';
  const jsonLd = buildSchemaJsonLd({
    lang,
    isHome: Boolean((data as Record<string, unknown>).isHome),
    isArticle: Boolean(ctx.isArticle),
    pageUrlPath: (ctx as { post?: PostItem }).post?.permalink || reqUrlPath,
    pageTitle: String(ctx.pageTitle || LANGUAGES[lang].title),
    post: (ctx as { post?: PostItem }).post,
    translatedPosts: (ctx as { translatedPosts?: PostItem[] }).translatedPosts,
  });
  const html = await ejs.renderFile(path.join(viewsDir, `${viewName}.ejs`), { ...ctx, jsonLd });
  res.status(status).type('html').send(html);
}

// Static & vendor routes
app.get('/css/stack.css', (_req: Request, res: Response) => {
  res.type('text/css').send(compiledCss);
});

app.get('/js/main.js', (_req: Request, res: Response) => {
  res.type('application/javascript').send(CLIENT_JS);
});

app.use('/vendor/katex', express.static(path.join(ROOT_DIR, 'node_modules', 'katex', 'dist')));
app.use('/vendor/hljs', express.static(path.join(ROOT_DIR, 'node_modules', 'highlight.js', 'styles')));
app.use('/assets/img', express.static(path.join(ROOT_DIR, 'assets', 'img')));
app.use('/static', express.static(path.join(ROOT_DIR, 'static')));
app.use(express.static(path.join(ROOT_DIR, 'static')));

// Health endpoint
app.get('/health', (_req: Request, res: Response) => {
  const siteContent = loadSiteContent();
  res.json({ status: 'ok', posts: siteContent.allPosts.length });
});

// Taxonomy & Translation Registry API (local filesystem mode)
app.use('/api/registry', express.json({ limit: '2mb' }));

function verifySameOrigin(req: Request): boolean {
  const origin = req.get('origin');
  if (!origin) return true;
  const host = req.get('x-forwarded-host') || req.get('host');
  if (!host) return false;
  try {
    const parsed = new URL(origin);
    return parsed.host === host;
  } catch {
    return false;
  }
}

function sanitizeRegistryChanges(rawChanges: unknown): RegistryChangeInput[] {
  if (!Array.isArray(rawChanges)) {
    throw new Error('Поле changes должно быть массивом');
  }
  return rawChanges.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new Error('Некорректный элемент в списке изменений');
    }
    const obj = item as Record<string, unknown>;
    const relPath = typeof obj.relPath === 'string' ? obj.relPath : '';
    const expectedHash = typeof obj.expectedHash === 'string' ? obj.expectedHash : '';
    const rawPatch = (obj.patch && typeof obj.patch === 'object' ? obj.patch : {}) as Record<string, unknown>;
    const patch: RegistryChangeInput['patch'] = {};
    if ('slug' in rawPatch && rawPatch.slug !== undefined) {
      patch.slug = String(rawPatch.slug).trim();
    }
    if ('translationKey' in rawPatch && rawPatch.translationKey !== undefined) {
      patch.translationKey = String(rawPatch.translationKey).trim();
    }
    if ('categories' in rawPatch && Array.isArray(rawPatch.categories)) {
      patch.categories = rawPatch.categories.map((c) => String(c ?? '').trim()).filter(Boolean);
    }
    if ('tags' in rawPatch && Array.isArray(rawPatch.tags)) {
      patch.tags = rawPatch.tags.map((t) => String(t ?? '').trim()).filter(Boolean);
    }
    return { relPath, expectedHash, patch };
  });
}

app.get('/api/registry/posts', (_req: Request, res: Response) => {
  const posts = loadRegistryEntries();
  res.json({
    mode: 'local',
    repo: 'yurakas-netizen/rfid-blog',
    branch: 'master',
    languages: ORDERED_LANGUAGES.map((l) => ({
      code: l.code,
      shortLabel: l.shortLabel,
      label: l.label,
      urlPrefix: l.urlPrefix,
    })),
    posts,
  });
});

app.post('/api/registry/preview', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  try {
    const changes = sanitizeRegistryChanges(req.body?.changes);
    const previews = previewRegistryChanges(changes);
    res.json({ ok: true, previews });
  } catch (err) {
    res.status(400).json({ ok: false, error: err instanceof Error ? err.message : String(err) });
  }
});

app.post('/api/registry/apply', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  try {
    const changes = sanitizeRegistryChanges(req.body?.changes);
    const result = applyRegistryChanges(changes);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ ok: false, error: err instanceof Error ? err.message : String(err) });
  }
});

app.get(['/registry', '/registry/'], (_req: Request, res: Response) => {
  res.redirect('/admin/registry.html');
});

// Homepage Showcase Builder API (local filesystem mode)
app.use('/api/home-builder', express.json({ limit: '4mb' }));

app.get('/api/home-builder/state', (_req: Request, res: Response) => {
  const siteContent = loadSiteContent();
  const configs: Record<string, unknown> = {};
  const meta: Record<string, unknown> = {};

  for (const l of ORDERED_LANGUAGES) {
    const langPosts = siteContent.postsByLang[l.code] || [];
    const tax = computeTaxonomies(langPosts, siteContent.categoryStyles);
    const loaded = loadShowcaseFileForLang(l.code);
    const effectiveConfig = loaded.config || generateStarterShowcaseForLang(l.code, siteContent);

    const tkCounts = new Map<string, number>();
    for (const p of langPosts) {
      if (p.translationKey) {
        tkCounts.set(p.translationKey, (tkCounts.get(p.translationKey) || 0) + 1);
      }
    }

    configs[l.code] = effectiveConfig;
    meta[l.code] = {
      exists: loaded.exists,
      relPath: loaded.relPath,
      fileHash: loaded.fileHash,
      postCount: langPosts.length,
      categories: tax.categories.map((c) => ({ name: c.name, slug: c.slug, count: c.count })),
      tags: tax.tags.map((t) => ({ name: t.name, slug: t.slug, count: t.count })),
      translationKeys: Array.from(tkCounts.entries())
        .map(([key, count]) => ({ key, count }))
        .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key)),
      posts: langPosts.map((p) => ({
        slug: p.slug,
        folder: path.basename(p.bundleDir),
        title: p.title,
        description: p.description || p.summary,
        date: p.date.toISOString(),
        image: p.image,
        imageUrl: p.imageUrl,
        categories: p.categories,
        tags: p.tags,
        translationKey: p.translationKey,
        permalink: p.permalink,
        readingTime: p.readingTime,
      })),
    };
  }

  res.json({
    mode: 'local',
    repo: 'yurakas-netizen/rfid-blog',
    branch: 'master',
    languages: ORDERED_LANGUAGES.map((l) => ({
      code: l.code,
      shortLabel: l.shortLabel,
      label: l.label,
      urlPrefix: l.urlPrefix,
    })),
    configs,
    meta,
  });
});

app.post('/api/home-builder/generate', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const siteContent = loadSiteContent();
  const target = String(req.body?.lang || 'all').trim();
  const configs: Record<string, unknown> = {};

  if (target === 'all') {
    for (const l of ORDERED_LANGUAGES) {
      configs[l.code] = generateStarterShowcaseForLang(l.code, siteContent);
    }
  } else if (isValidLang(target)) {
    configs[target] = generateStarterShowcaseForLang(target, siteContent);
  } else {
    res.status(400).json({ ok: false, error: `Неизвестный язык: ${target}` });
    return;
  }

  res.json({ ok: true, configs });
});

app.post('/api/home-builder/apply', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const rawItems = req.body?.items;
  if (!Array.isArray(rawItems)) {
    res.status(400).json({ ok: false, error: 'Поле items должно быть массивом' });
    return;
  }
  const items: ShowcaseSaveInput[] = rawItems.map((it: unknown) => {
    const obj = it && typeof it === 'object' ? (it as Record<string, unknown>) : {};
    return {
      lang: String(obj.lang || '') as LangCode,
      expectedHash: typeof obj.expectedHash === 'string' ? obj.expectedHash : '',
      config: obj.config,
    };
  });
  const result = applyShowcaseUpdates(items);
  res.status(result.status).json(result);
});

app.get(['/home-builder', '/home-builder/'], (_req: Request, res: Response) => {
  res.redirect('/admin/home-builder.html');
});

// Serve page bundle assets at permalink/:filename
function handleBundleAsset(req: Request, res: Response, next: NextFunction) {
  const siteContent = loadSiteContent();
  const rawSlug = decodeURIComponent(String(req.params.slug || ''));
  const rawFile = path.basename(decodeURIComponent(String(req.params.filename || '')));
  const reqLang = req.params.lang ? String(req.params.lang) : SITE_CONFIG.defaultLanguage;
  if (!isValidLang(reqLang)) {
    next();
    return;
  }

  const post = siteContent.postsByLang[reqLang]?.find((p) => p.slug === rawSlug);
  if (!post) {
    next();
    return;
  }

  const assetPath = path.join(post.bundleDir, rawFile);
  if (!fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
    res.status(404).send('Asset not found');
    return;
  }
  res.sendFile(assetPath);
}

app.get('/p/:slug/:filename', handleBundleAsset);
app.get('/:lang/p/:slug/:filename', handleBundleAsset);

// JSON search index (strictly per-language)
app.get(['/search/index.json', '/:lang/search/index.json'], (req: Request, res: Response, next: NextFunction) => {
  const reqLang = req.params.lang ? String(req.params.lang) : undefined;
  if (reqLang && !isValidLang(reqLang)) {
    next();
    return;
  }
  const siteContent = loadSiteContent();
  const lang: LangCode = reqLang && isValidLang(reqLang) ? reqLang : SITE_CONFIG.defaultLanguage;
  const { posts } = getPostsForLanguageView(siteContent, lang);
  const keyword = String(req.query.keyword ?? '').trim().toLowerCase();

  const filtered = keyword
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword) ||
          p.description.toLowerCase().includes(keyword) ||
          p.plainText.toLowerCase().includes(keyword) ||
          p.tags.some((t) => t.toLowerCase().includes(keyword)) ||
          p.categories.some((c) => c.toLowerCase().includes(keyword))
      )
    : posts;

  res.json(
    filtered.map((p) => ({
      title: p.title,
      date: p.date.toISOString(),
      permalink: p.permalink,
      content: p.summary,
      image: p.imageUrl,
    }))
  );
});

// Archives
app.get(['/archives', '/archives/', '/:lang/archives', '/:lang/archives/'], async (req: Request, res: Response, next: NextFunction) => {
  const reqLang = req.params.lang ? String(req.params.lang) : undefined;
  if (reqLang && !isValidLang(reqLang)) {
    next();
    return;
  }
  const siteContent = loadSiteContent();
  const lang: LangCode = reqLang && isValidLang(reqLang) ? reqLang : SITE_CONFIG.defaultLanguage;
  const pageMeta = siteContent.pagesByLang[lang]?.archives;

  await renderView(res, siteContent, 'archives', lang, {
    activeNav: 'archives',
    sectionTitle: pageMeta?.title || I18N[lang].archives,
    pageTitle: `${pageMeta?.title || I18N[lang].archives} — ${LANGUAGES[lang].title}`,
  });
});

// Search
app.get(['/search', '/search/', '/:lang/search', '/:lang/search/'], async (req: Request, res: Response, next: NextFunction) => {
  const reqLang = req.params.lang ? String(req.params.lang) : undefined;
  if (reqLang && !isValidLang(reqLang)) {
    next();
    return;
  }
  const siteContent = loadSiteContent();
  const lang: LangCode = reqLang && isValidLang(reqLang) ? reqLang : SITE_CONFIG.defaultLanguage;
  const keyword = String(req.query.keyword ?? '').trim();
  const q = keyword.toLowerCase();
  const { posts } = getPostsForLanguageView(siteContent, lang);

  const results = q
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.plainText.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.categories.some((c) => c.toLowerCase().includes(q))
      )
    : posts;

  const pageMeta = siteContent.pagesByLang[lang]?.search;

  await renderView(res, siteContent, 'search', lang, {
    activeNav: 'search',
    sectionTitle: pageMeta?.title || I18N[lang].search,
    pageTitle: `${pageMeta?.title || I18N[lang].search} — ${LANGUAGES[lang].title}`,
    keyword,
    searchQuery: keyword,
    results,
  });
});

// Links
app.get(['/links', '/links/', '/:lang/links', '/:lang/links/'], async (req: Request, res: Response, next: NextFunction) => {
  const reqLang = req.params.lang ? String(req.params.lang) : undefined;
  if (reqLang && !isValidLang(reqLang)) {
    next();
    return;
  }
  const siteContent = loadSiteContent();
  const lang: LangCode = reqLang && isValidLang(reqLang) ? reqLang : SITE_CONFIG.defaultLanguage;
  const page = siteContent.pagesByLang[lang]?.links ?? null;

  await renderView(res, siteContent, 'links', lang, {
    activeNav: 'links',
    pageTitle: `${page?.title || I18N[lang].links} — ${LANGUAGES[lang].title}`,
    page,
  });
});

// Categories filter
app.get(['/categories/:slug', '/categories/:slug/', '/:lang/categories/:slug', '/:lang/categories/:slug/'], async (req: Request, res: Response, next: NextFunction) => {
  const reqLang = req.params.lang ? String(req.params.lang) : undefined;
  if (reqLang && !isValidLang(reqLang)) {
    next();
    return;
  }
  const siteContent = loadSiteContent();
  const lang: LangCode = reqLang && isValidLang(reqLang) ? reqLang : SITE_CONFIG.defaultLanguage;
  const targetSlug = decodeURIComponent(String(req.params.slug || '')).toLowerCase();
  const { posts } = getPostsForLanguageView(siteContent, lang);

  const matching = posts.filter((p) =>
    p.categories.some((c) => slugify(c) === targetSlug || c.toLowerCase() === targetSlug)
  );
  const label =
    matching[0]?.categories.find((c) => slugify(c) === targetSlug || c.toLowerCase() === targetSlug) ||
    targetSlug;

  await renderView(res, siteContent, 'index', lang, {
    activeNav: 'home',
    pageTitle: `${I18N[lang].categories}: ${label} — ${LANGUAGES[lang].title}`,
    filterHeading: `${I18N[lang].categories}: ${label}`,
    posts: matching,
    isFallback: false,
    currentPage: 1,
    totalPages: 1,
    basePath: `${LANGUAGES[lang].urlPrefix}/categories/${encodeURIComponent(targetSlug)}/`,
  });
});

// Tags filter
app.get(['/tags/:slug', '/tags/:slug/', '/:lang/tags/:slug', '/:lang/tags/:slug/'], async (req: Request, res: Response, next: NextFunction) => {
  const reqLang = req.params.lang ? String(req.params.lang) : undefined;
  if (reqLang && !isValidLang(reqLang)) {
    next();
    return;
  }
  const siteContent = loadSiteContent();
  const lang: LangCode = reqLang && isValidLang(reqLang) ? reqLang : SITE_CONFIG.defaultLanguage;
  const targetSlug = decodeURIComponent(String(req.params.slug || '')).toLowerCase();
  const { posts } = getPostsForLanguageView(siteContent, lang);

  const matching = posts.filter((p) =>
    p.tags.some((t) => slugify(t) === targetSlug || t.toLowerCase() === targetSlug)
  );
  const label =
    matching[0]?.tags.find((t) => slugify(t) === targetSlug || t.toLowerCase() === targetSlug) ||
    targetSlug;

  await renderView(res, siteContent, 'index', lang, {
    activeNav: 'home',
    pageTitle: `#${label} — ${LANGUAGES[lang].title}`,
    filterHeading: `#${label}`,
    posts: matching,
    isFallback: false,
    currentPage: 1,
    totalPages: 1,
    basePath: `${LANGUAGES[lang].urlPrefix}/tags/${encodeURIComponent(targetSlug)}/`,
  });
});

// Article page (strictly matched by language)
app.get(
  ['/p/:slug', '/p/:slug/', '/:lang/p/:slug', '/:lang/p/:slug/', '/:lang/posts/:slug', '/:lang/posts/:slug/'],
  async (req: Request, res: Response, next: NextFunction) => {
    const reqLang = req.params.lang ? String(req.params.lang) : SITE_CONFIG.defaultLanguage;
    if (!isValidLang(reqLang)) {
      next();
      return;
    }
    const siteContent = loadSiteContent();
    const rawSlug = decodeURIComponent(String(req.params.slug || ''));
    const post: PostItem | undefined = siteContent.postsByLang[reqLang]?.find(
      (p) => p.slug === rawSlug
    );

    if (!post) {
      await renderView(res, siteContent, '404', reqLang, { pageTitle: I18N[reqLang].pageNotFound }, 404);
      return;
    }

    const relatedPosts = getRelatedPosts(post, siteContent.postsByLang[post.lang], 3);
    const translatedPosts = getTranslatedPosts(post, siteContent.allPosts);
    const articleSources = selectArticleSources(post);
    const sourcesUi = getSourcesUiStrings(post.lang);
    await renderView(res, siteContent, 'article', post.lang, {
      activeNav: 'home',
      isArticle: true,
      pageTitle: `${post.title} — ${LANGUAGES[post.lang].title}`,
      pageDescription: post.description || post.summary,
      post,
      toc: post.toc,
      relatedPosts,
      translatedPosts,
      articleSources,
      sourcesUi,
      languagesMap: LANGUAGES,
    });
  }
);

// Homepage and language homepages + pagination
async function handleHome(res: Response, lang: LangCode, pageNum: number) {
  const siteContent = loadSiteContent();
  const { posts: allPosts, isFallback } = getPostsForLanguageView(siteContent, lang);
  const pageSize = Math.max(1, SITE_CONFIG.pagerSize);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / pageSize));
  const currentPage = Math.min(Math.max(1, pageNum), totalPages);
  const start = (currentPage - 1) * pageSize;
  const posts = allPosts.slice(start, start + pageSize);
  const prefix = LANGUAGES[lang].urlPrefix;
  const showcase = currentPage === 1 ? resolveShowcaseForLang(lang, siteContent) : null;
  const showcaseEmptyCopy = currentPage === 1 ? getShowcaseEmptyCopy(lang) : null;

  await renderView(res, siteContent, 'index', lang, {
    activeNav: 'home',
    isHome: true,
    pageTitle: `${LANGUAGES[lang].title} — ${I18N[lang].subtitle}`,
    pageDescription: I18N[lang].subtitle,
    posts,
    showcase,
    showcaseEmptyCopy,
    isFallback,
    currentPage,
    totalPages,
    basePath: prefix ? `${prefix}/` : '/',
  });
}

app.get('/', async (_req: Request, res: Response) => {
  await handleHome(res, SITE_CONFIG.defaultLanguage, 1);
});

app.get('/page/:num/', async (req: Request, res: Response) => {
  await handleHome(res, SITE_CONFIG.defaultLanguage, Number(req.params.num) || 1);
});

app.get(['/:lang', '/:lang/'], async (req: Request, res: Response, next: NextFunction) => {
  const rawLang = String(req.params.lang || '');
  if (!isValidLang(rawLang)) {
    next();
    return;
  }
  await handleHome(res, rawLang, 1);
});

app.get(['/:lang/page/:num', '/:lang/page/:num/'], async (req: Request, res: Response, next: NextFunction) => {
  const rawLang = String(req.params.lang || '');
  if (!isValidLang(rawLang)) {
    next();
    return;
  }
  await handleHome(res, rawLang, Number(req.params.num) || 1);
});

// 404 fallback
app.use(async (_req: Request, res: Response) => {
  const siteContent = loadSiteContent();
  const lang = SITE_CONFIG.defaultLanguage;
  await renderView(res, siteContent, '404', lang, { pageTitle: I18N[lang].pageNotFound }, 404);
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
