import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  LANGUAGES,
  ORDERED_LANGUAGES,
  isValidLang,
  type LangCode,
} from './config.js';
import { loadSiteContent } from './content.js';
import { resolveSafePostPath } from './registry.js';

const ROOT_DIR = process.cwd();
const CONTENT_ROOT = path.resolve(ROOT_DIR, 'content');
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_IMAGE_EXTS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.svg',
  '.avif',
]);
const MAX_ASSET_BYTES = 10 * 1024 * 1024; // 10 MB per image file

export interface MultilangAssetInput {
  filename: string;
  base64?: string;
  sourceRelPath?: string;
}

export interface MultilangEntryInput {
  lang: LangCode;
  title: string;
  slug: string;
  description: string;
  body: string;
}

export interface MultilangConstantsInput {
  date: string;
  translationKey: string;
  image: string;
  categories: string[];
  tags: string[];
  assets: MultilangAssetInput[];
}

export interface MultilangPublishPayload {
  anchorLang: LangCode;
  followerLangs: LangCode[];
  overwrite?: boolean;
  constants: MultilangConstantsInput;
  entries: MultilangEntryInput[];
}

export function toLatinSlug(text: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', ґ: 'g', д: 'd', е: 'e', ё: 'yo', є: 'ye',
    ж: 'zh', з: 'z', и: 'i', і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l', м: 'm',
    н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh',
    ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
    æ: 'ae', ø: 'o', å: 'a', ß: 'ss', ł: 'l', đ: 'd', ð: 'd', þ: 'th',
  };
  const lower = String(text || '').toLowerCase();
  let out = '';
  for (let i = 0; i < lower.length; i++) {
    const ch = lower[i];
    out += Object.prototype.hasOwnProperty.call(map, ch) ? map[ch] : ch;
  }
  out = out
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’ʼ`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

  if (out.length > 80) {
    const cut = out.slice(0, 80);
    const lastDash = cut.lastIndexOf('-');
    out = (lastDash > 40 ? cut.slice(0, lastDash) : cut).replace(/-+$/g, '');
  }
  return out;
}

export function sanitizeImageFilename(raw: string): string {
  const base = path.basename(String(raw || '').trim()).replace(/[\r\n\0]/g, '');
  if (!base || base === '.' || base === '..') {
    throw new Error(`Некорректное имя файла изображения: ${raw}`);
  }
  const ext = path.extname(base).toLowerCase();
  if (!ALLOWED_IMAGE_EXTS.has(ext)) {
    throw new Error(`Недопустимое расширение файла изображения (${ext || 'нет'}): ${base}`);
  }
  const safeStem = base
    .slice(0, base.length - ext.length)
    .replace(/[^\p{L}\p{N}._-]+/gu, '_')
    .replace(/^_+|_+$/g, '') || 'image';
  return `${safeStem}${ext}`;
}

function normalizeStringArray(input: unknown): string[] {
  if (!Array.isArray(input)) {
    if (typeof input === 'string' && input.trim()) {
      return [input.trim()];
    }
    return [];
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of input) {
    const v = String(item ?? '').trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

function formatYamlScalar(value: string): string {
  const str = String(value ?? '');
  if (
    !str ||
    /^\s|\s$/.test(str) ||
    /^[-?:,&*!|>'"%@`\[{]/.test(str) ||
    /:\s|\s#|^#|:$|[\r\n]/.test(str) ||
    /^(true|false|yes|no|on|off|null|~|[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?)$/i.test(str)
  ) {
    return JSON.stringify(str);
  }
  return str;
}

function serializePostMarkdown(opts: {
  title: string;
  slug: string;
  description: string;
  dateIso: string;
  image: string;
  categories: string[];
  tags: string[];
  translationKey: string;
  body: string;
}): string {
  const lines: string[] = ['---'];
  lines.push(`title: ${formatYamlScalar(opts.title)}`);
  lines.push(`slug: ${formatYamlScalar(opts.slug)}`);
  if (opts.description) {
    lines.push(`description: ${formatYamlScalar(opts.description)}`);
  }
  lines.push(`date: ${opts.dateIso}`);
  if (opts.image) {
    lines.push(`image: ${formatYamlScalar(opts.image)}`);
  }
  if (opts.categories.length > 0) {
    lines.push('categories:');
    for (const c of opts.categories) {
      lines.push(`  - ${formatYamlScalar(c)}`);
    }
  }
  if (opts.tags.length > 0) {
    lines.push('tags:');
    for (const t of opts.tags) {
      lines.push(`  - ${formatYamlScalar(t)}`);
    }
  }
  lines.push(`translationKey: ${formatYamlScalar(opts.translationKey)}`);
  lines.push('---');

  const cleanBody = String(opts.body || '').replace(/\r\n/g, '\n').replace(/^\n+/, '');
  return cleanBody ? `${lines.join('\n')}\n${cleanBody.replace(/\n*$/, '\n')}` : `${lines.join('\n')}\n`;
}

function listBundleImages(bundleDir: string): string[] {
  if (!fs.existsSync(bundleDir)) return [];
  const files: string[] = [];
  for (const d of fs.readdirSync(bundleDir, { withFileTypes: true })) {
    if (!d.isFile()) continue;
    if (d.name.toLowerCase() === 'index.md') continue;
    const ext = path.extname(d.name).toLowerCase();
    if (ALLOWED_IMAGE_EXTS.has(ext)) {
      files.push(d.name);
    }
  }
  return files.sort();
}

export function loadMultilangState() {
  const siteContent = loadSiteContent();
  const catSet = new Set<string>();
  const tagSet = new Set<string>();
  const tkMap = new Map<string, string[]>();
  const existingSlugsByLang: Record<string, string[]> = {};
  const posts: Array<{
    relPath: string;
    lang: LangCode;
    folder: string;
    title: string;
    slug: string;
    description: string;
    date: string;
    image: string;
    imageUrl: string;
    categories: string[];
    tags: string[];
    translationKey: string;
    assets: string[];
  }> = [];

  for (const langCfg of ORDERED_LANGUAGES) {
    const langPosts = siteContent.postsByLang[langCfg.code] || [];
    const slugList: string[] = [];
    for (const p of langPosts) {
      const folder = path.basename(p.bundleDir);
      const relPath = `content/${langCfg.code}/post/${folder}/index.md`;
      slugList.push(p.slug);
      if (folder !== p.slug) slugList.push(folder);
      p.categories.forEach((c) => catSet.add(c));
      p.tags.forEach((t) => tagSet.add(t));
      if (p.translationKey) {
        const list = tkMap.get(p.translationKey) || [];
        if (!list.includes(langCfg.code)) list.push(langCfg.code);
        tkMap.set(p.translationKey, list);
      }
      posts.push({
        relPath,
        lang: langCfg.code,
        folder,
        title: p.title,
        slug: p.slug,
        description: p.description,
        date: p.date.toISOString(),
        image: p.image || '',
        imageUrl: p.imageUrl || '',
        categories: p.categories,
        tags: p.tags,
        translationKey: p.translationKey,
        assets: listBundleImages(p.bundleDir),
      });
    }
    existingSlugsByLang[langCfg.code] = Array.from(new Set(slugList));
  }

  const translationKeys = Array.from(tkMap.entries())
    .map(([key, langs]) => ({ key, langs, count: langs.length }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));

  return {
    mode: 'local' as const,
    repo: 'yurakas-netizen/rfid-blog',
    branch: 'master',
    languages: ORDERED_LANGUAGES.map((l) => ({
      code: l.code,
      shortLabel: l.shortLabel,
      label: l.label,
      urlPrefix: l.urlPrefix,
    })),
    categories: Array.from(catSet).sort((a, b) => a.localeCompare(b)),
    tags: Array.from(tagSet).sort((a, b) => a.localeCompare(b)),
    translationKeys,
    existingSlugsByLang,
    posts,
  };
}

export function loadMultilangPostDetail(relPath: string) {
  const { absPath, lang, folder } = resolveSafePostPath(relPath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Файл не найден: ${relPath}`);
  }
  const raw = fs.readFileSync(absPath, 'utf8');
  const clean = raw.startsWith('\uFEFF') ? raw.slice(1) : raw;
  const parsed = matter(clean);
  const data = parsed.data || {};
  const bundleDir = path.dirname(absPath);

  let dateIso = new Date().toISOString();
  if (data.date instanceof Date && !Number.isNaN(data.date.getTime())) {
    dateIso = data.date.toISOString();
  } else if (data.date) {
    const d = new Date(String(data.date));
    if (!Number.isNaN(d.getTime())) dateIso = d.toISOString();
  }

  return {
    relPath,
    lang,
    folder,
    title: String(data.title || '').trim(),
    slug: String(data.slug || '').trim() || toLatinSlug(String(data.title || folder)),
    description: String(data.description || '').trim(),
    date: dateIso,
    image: data.image ? String(data.image).trim() : '',
    categories: normalizeStringArray(data.categories),
    tags: normalizeStringArray(data.tags),
    translationKey: data.translationKey ? String(data.translationKey).trim() : '',
    body: String(parsed.content || '').replace(/^\r?\n/, ''),
    assets: listBundleImages(bundleDir),
  };
}

export function publishMultilangBundle(rawPayload: unknown): {
  ok: boolean;
  status: number;
  error?: string;
  created?: Array<{ lang: LangCode; relPath: string; folder: string; permalink: string }>;
} {
  if (!rawPayload || typeof rawPayload !== 'object') {
    return { ok: false, status: 400, error: 'Некорректное тело запроса' };
  }
  const payload = rawPayload as Partial<MultilangPublishPayload>;

  const anchorLangRaw = String(payload.anchorLang || '').trim();
  if (!isValidLang(anchorLangRaw)) {
    return { ok: false, status: 400, error: `Некорректный якорный язык: ${anchorLangRaw}` };
  }
  const anchorLang: LangCode = anchorLangRaw;

  if (!Array.isArray(payload.followerLangs) || payload.followerLangs.length === 0) {
    return { ok: false, status: 400, error: 'Выберите хотя бы один ведомый язык для перевода' };
  }

  const followerSet = new Set<LangCode>();
  const followerLangs: LangCode[] = [];
  for (const item of payload.followerLangs) {
    const code = String(item || '').trim();
    if (!isValidLang(code)) {
      return { ok: false, status: 400, error: `Некорректный ведомый язык: ${code}` };
    }
    if (code === anchorLang) {
      return { ok: false, status: 400, error: `Язык ${code} не может быть одновременно якорным и ведомым` };
    }
    if (!followerSet.has(code)) {
      followerSet.add(code);
      followerLangs.push(code);
    }
  }

  const constants = payload.constants;
  if (!constants || typeof constants !== 'object') {
    return { ok: false, status: 400, error: 'Отсутствуют общие константы якорной статьи' };
  }

  const parsedDate = new Date(String(constants.date || '').trim());
  if (Number.isNaN(parsedDate.getTime())) {
    return { ok: false, status: 400, error: 'Укажите корректную дату публикации в якорной статье' };
  }
  const dateIso = parsedDate.toISOString();
  const datePrefix = dateIso.slice(0, 10);

  const translationKey = String(constants.translationKey || '').trim();
  if (!translationKey || /[\r\n\0]/.test(translationKey)) {
    return { ok: false, status: 400, error: 'Укажите корректный ключ связи переводов (translationKey)' };
  }

  const categories = normalizeStringArray(constants.categories);
  const tags = normalizeStringArray(constants.tags);
  const overwrite = Boolean(payload.overwrite);

  let coverImage = String(constants.image || '').trim();
  const isExternalImage =
    coverImage.startsWith('http://') ||
    coverImage.startsWith('https://') ||
    coverImage.startsWith('/');
  if (coverImage && !isExternalImage) {
    try {
      coverImage = sanitizeImageFilename(coverImage);
    } catch (err) {
      return {
        ok: false,
        status: 400,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  // Decode & verify all binary image assets upfront
  const preparedAssets: Array<{ filename: string; buffer: Buffer }> = [];
  const seenAssetNames = new Set<string>();
  const rawAssets = Array.isArray(constants.assets) ? constants.assets : [];
  for (const a of rawAssets) {
    if (!a || typeof a !== 'object') continue;
    let filename = '';
    try {
      filename = sanitizeImageFilename(String(a.filename || ''));
    } catch (err) {
      return { ok: false, status: 400, error: err instanceof Error ? err.message : String(err) };
    }
    if (seenAssetNames.has(filename)) continue;

    let buffer: Buffer | null = null;
    if (typeof a.base64 === 'string' && a.base64.trim()) {
      const cleanB64 = a.base64.replace(/^data:[^;]+;base64,/, '').trim();
      buffer = Buffer.from(cleanB64, 'base64');
      if (buffer.length === 0) {
        return { ok: false, status: 400, error: `Пустой файл изображения: ${filename}` };
      }
      if (buffer.length > MAX_ASSET_BYTES) {
        return { ok: false, status: 400, error: `Файл ${filename} превышает лимит 10 МБ` };
      }
    } else if (typeof a.sourceRelPath === 'string' && a.sourceRelPath.trim()) {
      try {
        const { absPath } = resolveSafePostPath(a.sourceRelPath.trim());
        const srcBundleDir = path.dirname(absPath);
        const srcImgPath = path.resolve(srcBundleDir, filename);
        if (!srcImgPath.startsWith(srcBundleDir + path.sep) || !fs.existsSync(srcImgPath)) {
          return { ok: false, status: 400, error: `Не найден исходный файл изображения ${filename}` };
        }
        buffer = fs.readFileSync(srcImgPath);
      } catch (err) {
        return { ok: false, status: 400, error: err instanceof Error ? err.message : String(err) };
      }
    }

    if (buffer) {
      seenAssetNames.add(filename);
      preparedAssets.push({ filename, buffer });
    }
  }

  if (!Array.isArray(payload.entries)) {
    return { ok: false, status: 400, error: 'Отсутствует список языковых версий' };
  }

  const requiredLangs: LangCode[] = [anchorLang, ...followerLangs];
  const entriesByLang = new Map<LangCode, MultilangEntryInput>();
  for (const rawEntry of payload.entries) {
    if (!rawEntry || typeof rawEntry !== 'object') continue;
    const code = String(rawEntry.lang || '').trim();
    if (!isValidLang(code)) continue;
    entriesByLang.set(code, {
      lang: code,
      title: String(rawEntry.title || '').trim(),
      slug: String(rawEntry.slug || '').trim().toLowerCase(),
      description: String(rawEntry.description || '').trim(),
      body: String(rawEntry.body || '').trim(),
    });
  }

  // Strict enforcement: anchor + EVERY selected follower language must be complete
  const siteContent = loadSiteContent();
  const stagedWrites: Array<{
    lang: LangCode;
    folder: string;
    relPath: string;
    absDir: string;
    absIndexPath: string;
    markdown: string;
    permalink: string;
    existedBefore: boolean;
  }> = [];

  for (const lang of requiredLangs) {
    const roleLabel = lang === anchorLang ? 'якорного языка' : 'ведомого языка';
    const langLabel = LANGUAGES[lang].label;
    const entry = entriesByLang.get(lang);
    if (!entry) {
      return {
        ok: false,
        status: 400,
        error: `Не заполнены данные для ${roleLabel} ${langLabel}`,
      };
    }
    if (!entry.title) {
      return {
        ok: false,
        status: 400,
        error: `Не заполнен заголовок для ${roleLabel} ${langLabel}`,
      };
    }
    if (!entry.slug || !SLUG_RE.test(entry.slug) || entry.slug.length > 120) {
      return {
        ok: false,
        status: 400,
        error: `Некорректный URL-слаг латиницей для ${roleLabel} ${langLabel} (разрешены a-z, 0-9 и дефисы)`,
      };
    }
    if (!entry.body) {
      return {
        ok: false,
        status: 400,
        error: `Не заполнен текст статьи для ${roleLabel} ${langLabel}`,
      };
    }

    const folder = `${datePrefix}-${entry.slug}`;
    const langPostRoot = path.resolve(CONTENT_ROOT, lang, 'post');
    const absDir = path.resolve(langPostRoot, folder);
    if (!absDir.startsWith(langPostRoot + path.sep)) {
      return { ok: false, status: 400, error: `Некорректный путь папки для языка ${lang}` };
    }

    const absIndexPath = path.join(absDir, 'index.md');
    const existedDir = fs.existsSync(absIndexPath);
    const existingSlugPost = (siteContent.postsByLang[lang] || []).find(
      (p) => p.slug === entry.slug
    );

    if (!overwrite && (existedDir || existingSlugPost)) {
      return {
        ok: false,
        status: 409,
        error: `Статья со слагом «${entry.slug}» уже существует в разделе ${langLabel}. Измените слаг или включите перезапись.`,
      };
    }

    const markdown = serializePostMarkdown({
      title: entry.title,
      slug: entry.slug,
      description: entry.description,
      dateIso,
      image: coverImage,
      categories,
      tags,
      translationKey,
      body: entry.body,
    });

    const prefix = LANGUAGES[lang].urlPrefix;
    stagedWrites.push({
      lang,
      folder,
      relPath: `content/${lang}/post/${folder}/index.md`,
      absDir,
      absIndexPath,
      markdown,
      permalink: `${prefix}/p/${encodeURIComponent(entry.slug)}/`,
      existedBefore: fs.existsSync(absDir),
    });
  }

  // Write atomically (clean up newly created directories if anything fails mid-flight)
  const createdDirs: string[] = [];
  try {
    for (const item of stagedWrites) {
      if (!item.existedBefore) {
        fs.mkdirSync(item.absDir, { recursive: true });
        createdDirs.push(item.absDir);
      }
      fs.writeFileSync(item.absIndexPath, item.markdown, 'utf8');
      for (const asset of preparedAssets) {
        const targetAsset = path.resolve(item.absDir, asset.filename);
        if (!targetAsset.startsWith(item.absDir + path.sep)) {
          throw new Error(`Недопустимый путь ресурса: ${asset.filename}`);
        }
        fs.writeFileSync(targetAsset, asset.buffer);
      }
    }
  } catch (err) {
    for (const dir of createdDirs) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
      } catch {}
    }
    return {
      ok: false,
      status: 500,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  return {
    ok: true,
    status: 200,
    created: stagedWrites.map((s) => ({
      lang: s.lang,
      relPath: s.relPath,
      folder: s.folder,
      permalink: s.permalink,
    })),
  };
}
