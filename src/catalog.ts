import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import matter from 'gray-matter';
import {
  LANGUAGES,
  ORDERED_LANGUAGES,
  SITE_CONFIG,
  isValidLang,
  type LangCode,
} from './config.js';
import {
  loadSiteContent,
  renderMarkdownWithMath,
  stripMarkdown,
  type PostItem,
  type SiteContent,
  type TocItem,
} from './content.js';

const ROOT_DIR = process.cwd();
const CONTENT_ROOT = path.resolve(ROOT_DIR, 'content');
const DATA_DIR = path.resolve(ROOT_DIR, 'data');
const SETTINGS_REL = 'data/catalog-settings.json';
const SETTINGS_PATH = path.resolve(ROOT_DIR, SETTINGS_REL);
const COMMENTS_DIR = path.resolve(DATA_DIR, 'catalog-comments');
const AUTH_FILE_PATH = path.resolve(DATA_DIR, '.catalog-auth.json');
const UPLOADS_ROOT = path.resolve(ROOT_DIR, 'static', 'uploads', 'catalog');

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const ALLOWED_UPLOAD_EXTS = new Set([
  '.pdf',
  '.zip',
  '.step',
  '.stp',
  '.igs',
  '.iges',
  '.dwg',
  '.dxf',
  '.doc',
  '.docx',
  '.txt',
  '.md',
  '.json',
  '.csv',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
  '.avif',
]);

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

// Ephemeral HMAC key fallback if no persisted auth secret exists yet
const BOOT_HMAC_SECRET = crypto.randomBytes(32);

export type CatalogType = 'reader' | 'antenna' | 'tag' | 'software' | 'accessory';
export type AvailabilityStatus = 'in_stock' | 'order' | 'discontinued' | 'software_license';
export type CommentsMode = 'all' | 'members' | 'disabled';
export type PriceVisibilityMode = 'item' | 'force_show' | 'force_hide';
export type DocType = 'datasheet' | 'manual' | 'sdk' | 'cad' | 'certificate' | 'firmware';
export type LinkedArticleKind = 'review' | 'comparison' | 'guide' | 'case';

export interface CatalogSpecRow {
  group: string;
  label: string;
  value: string;
  unit?: string;
}

export interface CatalogDocument {
  title: string;
  docType: DocType;
  file: string;
  version?: string;
  size?: string;
  lang?: string;
}

export interface CatalogLinkedArticleRef {
  kind: LinkedArticleKind;
  translationKey: string;
  slug?: string;
  customTitle?: string;
}

export interface CatalogItem {
  id: string;
  relPath: string;
  lang: LangCode;
  folder: string;
  slug: string;
  translationKey: string;
  title: string;
  description: string;
  date: Date;
  weight: number;
  catalogType: CatalogType;
  sku: string;
  manufacturer: string;
  availability: AvailabilityStatus;
  image: string | null;
  imageUrl: string | null;
  gallery: string[];
  galleryUrls: string[];
  showPrice: boolean;
  price: number | null;
  currency: string;
  priceUnit: string;
  commentsMode: CommentsMode;
  highlights: string[];
  specs: CatalogSpecRow[];
  documents: CatalogDocument[];
  linkedArticles: CatalogLinkedArticleRef[];
  tags: string[];
  html: string;
  plainText: string;
  summary: string;
  toc: TocItem[];
  bundleDir: string;
  permalink: string;
  rawBody: string;
}

export interface CatalogGlobalSettings {
  version: 1;
  priceVisibilityMode: PriceVisibilityMode;
  defaultCurrency: string;
  defaultCommentsMode: CommentsMode;
  engineeringInquiryEmail: string;
  engineeringInquiryPhone: string;
  engineeringInquiryTelegram: string;
}

export interface ResolvedLinkedArticle {
  kind: LinkedArticleKind;
  translationKey: string;
  title: string;
  description: string;
  permalink: string;
  lang: LangCode;
  isFallbackLang: boolean;
  imageUrl: string | null;
  readingTime: number;
  date: Date;
}

export interface ResolvedCatalogRenderData {
  item: CatalogItem;
  settings: CatalogGlobalSettings;
  effectiveShowPrice: boolean;
  formattedPrice: string;
  effectiveCommentsMode: CommentsMode;
  translations: CatalogItem[];
  resolvedArticles: ResolvedLinkedArticle[];
  specGroups: Array<{ group: string; rows: CatalogSpecRow[] }>;
}

export interface CatalogComment {
  id: string;
  translationKey: string;
  lang: string;
  author: string;
  role: string;
  body: string;
  createdAt: string;
  memberVerified: boolean;
}

export interface CatalogUiStrings {
  sectionTitle: string;
  sectionSubtitle: string;
  searchPlaceholder: string;
  allTypes: string;
  typeReader: string;
  typeAntenna: string;
  typeTag: string;
  typeSoftware: string;
  typeAccessory: string;
  availInStock: string;
  availOrder: string;
  availDiscontinued: string;
  availLicense: string;
  priceOnRequest: string;
  referencePrice: string;
  specsHeading: string;
  docsHeading: string;
  articlesHeading: string;
  highlightsHeading: string;
  overviewHeading: string;
  inquiryHeading: string;
  inquiryAction: string;
  backToCatalog: string;
  downloadFile: string;
  skuLabel: string;
  manufacturerLabel: string;
  availabilityLabel: string;
  itemsCountLabel: string;
  noItemsFound: string;
  kindReview: string;
  kindComparison: string;
  kindGuide: string;
  kindCase: string;
  commentsHeading: string;
  commentsAllHint: string;
  commentsMembersHint: string;
  commentsMembersLocked: string;
  commentsDisabledHint: string;
  commentsEmpty: string;
  commentAuthorLabel: string;
  commentRoleLabel: string;
  commentBodyLabel: string;
  commentSubmitBtn: string;
  teamUnlockLabel: string;
  teamUnlockBtn: string;
  teamCodePlaceholder: string;
  teamUnlockedBadge: string;
  otherLanguagesLabel: string;
  openCardLabel: string;
}

function sha256(val: string): string {
  return crypto.createHash('sha256').update(val, 'utf-8').digest('hex');
}

function cleanStr(val: unknown, maxLen = 400): string {
  if (typeof val !== 'string') {
    if (typeof val === 'number' && Number.isFinite(val)) return String(val);
    return '';
  }
  return val.trim().slice(0, maxLen);
}

export function normalizeCatalogType(raw: unknown): CatalogType {
  const s = cleanStr(raw, 32).toLowerCase();
  if (s === 'reader' || s === 'antenna' || s === 'tag' || s === 'software' || s === 'accessory') {
    return s;
  }
  return 'reader';
}

export function normalizeAvailability(raw: unknown): AvailabilityStatus {
  const s = cleanStr(raw, 32).toLowerCase();
  if (s === 'in_stock' || s === 'order' || s === 'discontinued' || s === 'software_license') {
    return s;
  }
  return 'order';
}

export function normalizeCommentsMode(raw: unknown, fallback: CommentsMode = 'all'): CommentsMode {
  const s = cleanStr(raw, 24).toLowerCase();
  if (s === 'all' || s === 'members' || s === 'disabled') return s;
  return fallback;
}

function formatCatalogPermalink(lang: LangCode, slug: string): string {
  const prefix = LANGUAGES[lang].urlPrefix;
  return `${prefix}/catalog/${encodeURIComponent(slug)}/`;
}

function resolveCatalogMediaUrl(rawPath: string | null | undefined, permalinkBase: string): string | null {
  if (!rawPath) return null;
  const trimmed = rawPath.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return trimmed;
  }
  const cleanRel = trimmed.replace(/^\.\//, '');
  return `${permalinkBase}${encodeURIComponent(cleanRel)}`;
}

function formatBytesHuman(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function resolveDocSizeOnDisk(fileUrl: string, bundleDir: string): string {
  try {
    if (fileUrl.startsWith('/uploads/catalog/')) {
      const rel = fileUrl.slice('/uploads/catalog/'.length);
      const abs = path.resolve(UPLOADS_ROOT, rel);
      if (abs.startsWith(UPLOADS_ROOT + path.sep) && fs.existsSync(abs)) {
        return formatBytesHuman(fs.statSync(abs).size);
      }
    } else if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://') && !fileUrl.startsWith('/')) {
      const abs = path.resolve(bundleDir, fileUrl.replace(/^\.\//, ''));
      if (abs.startsWith(bundleDir + path.sep) && fs.existsSync(abs)) {
        return formatBytesHuman(fs.statSync(abs).size);
      }
    }
  } catch {
    // ignore stat errors
  }
  return '';
}

export function loadCatalogSettings(): {
  exists: boolean;
  fileHash: string;
  settings: CatalogGlobalSettings;
} {
  const defaults: CatalogGlobalSettings = {
    version: 1,
    priceVisibilityMode: 'item',
    defaultCurrency: 'EUR',
    defaultCommentsMode: 'all',
    engineeringInquiryEmail: SITE_CONFIG.contacts.email,
    engineeringInquiryPhone: SITE_CONFIG.contacts.phoneDisplay,
    engineeringInquiryTelegram: SITE_CONFIG.contacts.telegramUrl,
  };

  if (!fs.existsSync(SETTINGS_PATH)) {
    return { exists: false, fileHash: '', settings: defaults };
  }

  try {
    const raw = fs.readFileSync(SETTINGS_PATH, 'utf-8');
    const obj = JSON.parse(raw) as Record<string, unknown>;
    const pm = cleanStr(obj.priceVisibilityMode, 20);
    const priceVisibilityMode: PriceVisibilityMode =
      pm === 'force_show' || pm === 'force_hide' || pm === 'item' ? pm : 'item';

    return {
      exists: true,
      fileHash: sha256(raw),
      settings: {
        version: 1,
        priceVisibilityMode,
        defaultCurrency: cleanStr(obj.defaultCurrency, 12) || defaults.defaultCurrency,
        defaultCommentsMode: normalizeCommentsMode(obj.defaultCommentsMode, defaults.defaultCommentsMode),
        engineeringInquiryEmail: cleanStr(obj.engineeringInquiryEmail, 120) || defaults.engineeringInquiryEmail,
        engineeringInquiryPhone: cleanStr(obj.engineeringInquiryPhone, 60) || defaults.engineeringInquiryPhone,
        engineeringInquiryTelegram: cleanStr(obj.engineeringInquiryTelegram, 200) || defaults.engineeringInquiryTelegram,
      },
    };
  } catch {
    return { exists: false, fileHash: '', settings: defaults };
  }
}

export function saveCatalogSettings(rawInput: unknown, expectedHash?: string): {
  ok: boolean;
  status: number;
  error?: string;
  fileHash?: string;
  settings?: CatalogGlobalSettings;
} {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const current = loadCatalogSettings();
  if (expectedHash && current.fileHash && expectedHash !== current.fileHash) {
    return { ok: false, status: 409, error: 'Конфликт версии catalog-settings.json. Перезагрузите страницу.' };
  }

  const obj = rawInput && typeof rawInput === 'object' && !Array.isArray(rawInput)
    ? (rawInput as Record<string, unknown>)
    : {};
  const pm = cleanStr(obj.priceVisibilityMode, 20);
  const priceVisibilityMode: PriceVisibilityMode =
    pm === 'force_show' || pm === 'force_hide' || pm === 'item' ? pm : current.settings.priceVisibilityMode;

  const normalized: CatalogGlobalSettings = {
    version: 1,
    priceVisibilityMode,
    defaultCurrency: cleanStr(obj.defaultCurrency, 12).toUpperCase() || current.settings.defaultCurrency,
    defaultCommentsMode: normalizeCommentsMode(obj.defaultCommentsMode, current.settings.defaultCommentsMode),
    engineeringInquiryEmail: cleanStr(obj.engineeringInquiryEmail, 120) || current.settings.engineeringInquiryEmail,
    engineeringInquiryPhone: cleanStr(obj.engineeringInquiryPhone, 60) || current.settings.engineeringInquiryPhone,
    engineeringInquiryTelegram: cleanStr(obj.engineeringInquiryTelegram, 200) || current.settings.engineeringInquiryTelegram,
  };

  const json = JSON.stringify(normalized, null, 2) + '\n';
  const tmpPath = `${SETTINGS_PATH}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmpPath, json, 'utf-8');
  fs.renameSync(tmpPath, SETTINGS_PATH);
  return {
    ok: true,
    status: 200,
    fileHash: sha256(json),
    settings: normalized,
  };
}

function parseCatalogFile(filePath: string, lang: LangCode, folder: string): CatalogItem | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(raw);
    const data = parsed.data as Record<string, unknown>;
    if (data.draft === true) return null;

    const bundleDir = path.dirname(filePath);
    const slug = cleanStr(data.slug, 120) || folder;
    const translationKey = cleanStr(data.translationKey || data.translationkey, 120) || slug;
    const title = cleanStr(data.title, 240) || slug;
    const description = cleanStr(data.description, 600);
    const parsedDate = data.date ? new Date(String(data.date)) : fs.statSync(filePath).mtime;
    const date = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    const weight = typeof data.weight === 'number' && Number.isFinite(data.weight) ? data.weight : 100;

    const permalink = formatCatalogPermalink(lang, slug);
    const image = data.image ? cleanStr(data.image, 400) : null;
    const imageUrl = resolveCatalogMediaUrl(image, permalink);

    const gallery = Array.isArray(data.gallery)
      ? data.gallery.map((g) => cleanStr(g, 400)).filter(Boolean)
      : [];
    const galleryUrls = gallery
      .map((g) => resolveCatalogMediaUrl(g, permalink))
      .filter((u): u is string => Boolean(u));

    const showPrice = Boolean(data.showPrice);
    let price: number | null = null;
    if (typeof data.price === 'number' && Number.isFinite(data.price) && data.price >= 0) {
      price = data.price;
    } else if (typeof data.price === 'string' && data.price.trim() !== '') {
      const n = Number(data.price.replace(/,/g, '.').trim());
      if (Number.isFinite(n) && n >= 0) price = n;
    }

    const highlights = Array.isArray(data.highlights)
      ? data.highlights.map((h) => cleanStr(h, 240)).filter(Boolean)
      : [];

    const specs: CatalogSpecRow[] = [];
    if (Array.isArray(data.specs)) {
      for (const row of data.specs) {
        if (!row || typeof row !== 'object') continue;
        const r = row as Record<string, unknown>;
        const label = cleanStr(r.label, 120);
        const value = cleanStr(r.value, 240);
        if (!label || !value) continue;
        specs.push({
          group: cleanStr(r.group, 80) || 'General',
          label,
          value,
          unit: cleanStr(r.unit, 40) || undefined,
        });
      }
    }

    const documents: CatalogDocument[] = [];
    if (Array.isArray(data.documents)) {
      for (const doc of data.documents) {
        if (!doc || typeof doc !== 'object') continue;
        const d = doc as Record<string, unknown>;
        const docTitle = cleanStr(d.title, 180);
        const file = cleanStr(d.file, 400);
        if (!docTitle || !file) continue;
        const rawDt = cleanStr(d.docType, 24).toLowerCase();
        const docType: DocType =
          rawDt === 'datasheet' || rawDt === 'manual' || rawDt === 'sdk' || rawDt === 'cad' || rawDt === 'certificate' || rawDt === 'firmware'
            ? rawDt
            : 'datasheet';
        const resolvedUrl = resolveCatalogMediaUrl(file, permalink) || file;
        documents.push({
          title: docTitle,
          docType,
          file: resolvedUrl,
          version: cleanStr(d.version, 40) || undefined,
          size: cleanStr(d.size, 40) || resolveDocSizeOnDisk(resolvedUrl, bundleDir) || undefined,
          lang: cleanStr(d.lang, 16) || undefined,
        });
      }
    }

    const linkedArticles: CatalogLinkedArticleRef[] = [];
    if (Array.isArray(data.linkedArticles)) {
      for (const ref of data.linkedArticles) {
        if (!ref || typeof ref !== 'object') continue;
        const a = ref as Record<string, unknown>;
        const tk = cleanStr(a.translationKey, 160);
        const rSlug = cleanStr(a.slug, 160);
        if (!tk && !rSlug) continue;
        const rawKind = cleanStr(a.kind, 24).toLowerCase();
        const kind: LinkedArticleKind =
          rawKind === 'review' || rawKind === 'comparison' || rawKind === 'guide' || rawKind === 'case'
            ? rawKind
            : 'review';
        linkedArticles.push({
          kind,
          translationKey: tk,
          slug: rSlug || undefined,
          customTitle: cleanStr(a.customTitle, 200) || undefined,
        });
      }
    }

    const tags = Array.isArray(data.tags)
      ? data.tags.map((t) => cleanStr(t, 80)).filter(Boolean)
      : [];

    const { html, toc } = renderMarkdownWithMath(parsed.content, permalink);
    const plainText = stripMarkdown(parsed.content);
    const summary = description || (plainText.length > 210 ? `${plainText.slice(0, 207)}...` : plainText);

    return {
      id: `${lang}:catalog:${folder}`,
      relPath: `content/${lang}/catalog/${folder}/index.md`,
      lang,
      folder,
      slug,
      translationKey,
      title,
      description,
      date,
      weight,
      catalogType: normalizeCatalogType(data.catalogType),
      sku: cleanStr(data.sku, 80),
      manufacturer: cleanStr(data.manufacturer, 100),
      availability: normalizeAvailability(data.availability),
      image,
      imageUrl,
      gallery,
      galleryUrls,
      showPrice,
      price,
      currency: cleanStr(data.currency, 12).toUpperCase() || 'EUR',
      priceUnit: cleanStr(data.priceUnit, 40),
      commentsMode: normalizeCommentsMode(data.commentsMode, 'all'),
      highlights,
      specs,
      documents,
      linkedArticles,
      tags,
      html,
      plainText,
      summary,
      toc,
      bundleDir,
      permalink,
      rawBody: parsed.content,
    };
  } catch {
    return null;
  }
}

export function loadAllCatalogItems(): {
  allItems: CatalogItem[];
  itemsByLang: Record<LangCode, CatalogItem[]>;
} {
  const allItems: CatalogItem[] = [];
  const itemsByLang = {} as Record<LangCode, CatalogItem[]>;
  for (const l of ORDERED_LANGUAGES) {
    itemsByLang[l.code] = [];
  }

  for (const langCfg of ORDERED_LANGUAGES) {
    const dir = path.join(CONTENT_ROOT, langCfg.code, 'catalog');
    if (!fs.existsSync(dir)) continue;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const idxPath = path.join(dir, entry.name, 'index.md');
      if (!fs.existsSync(idxPath)) continue;
      const item = parseCatalogFile(idxPath, langCfg.code, entry.name);
      if (item) {
        allItems.push(item);
        itemsByLang[langCfg.code].push(item);
      }
    }

    itemsByLang[langCfg.code].sort((a, b) => {
      if (a.weight !== b.weight) return a.weight - b.weight;
      return b.date.getTime() - a.date.getTime();
    });
  }

  return { allItems, itemsByLang };
}

export function formatCatalogPrice(price: number | null, currency: string, priceUnit?: string): string {
  if (price === null || !Number.isFinite(price)) return '';
  const symMap: Record<string, string> = {
    EUR: '€',
    USD: '$',
    UAH: '₴',
    GBP: '£',
    PLN: 'zł',
    DKK: 'kr',
  };
  const numStr = Number.isInteger(price)
    ? price.toLocaleString('en-US')
    : price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const cur = (currency || 'EUR').toUpperCase();
  const base = symMap[cur] ? `${symMap[cur]} ${numStr}` : `${numStr} ${cur}`;
  return priceUnit ? `${base} ${priceUnit}` : base;
}

export function computeEffectiveShowPrice(item: CatalogItem, settings: CatalogGlobalSettings): boolean {
  if (item.price === null) return false;
  if (settings.priceVisibilityMode === 'force_hide') return false;
  if (settings.priceVisibilityMode === 'force_show') return true;
  return item.showPrice;
}

export function resolveLinkedArticlesForLang(
  item: CatalogItem,
  siteContent: SiteContent,
  lang: LangCode
): ResolvedLinkedArticle[] {
  const out: ResolvedLinkedArticle[] = [];
  for (const ref of item.linkedArticles) {
    let matched: PostItem | undefined;

    if (ref.translationKey) {
      const candidates = siteContent.allPosts.filter((p) => p.translationKey === ref.translationKey);
      if (candidates.length > 0) {
        matched =
          candidates.find((p) => p.lang === lang) ||
          candidates.find((p) => p.lang === 'en') ||
          candidates.find((p) => p.lang === 'uk') ||
          candidates[0];
      }
    }
    if (!matched && ref.slug) {
      matched =
        siteContent.postsByLang[lang]?.find((p) => p.slug === ref.slug) ||
        siteContent.allPosts.find((p) => p.slug === ref.slug);
    }
    if (!matched) continue;

    out.push({
      kind: ref.kind,
      translationKey: matched.translationKey || ref.translationKey,
      title: ref.customTitle || matched.title,
      description: matched.description || matched.summary,
      permalink: matched.permalink,
      lang: matched.lang,
      isFallbackLang: matched.lang !== lang,
      imageUrl: matched.imageUrl,
      readingTime: matched.readingTime,
      date: matched.date,
    });
  }
  return out;
}

export function getCatalogTranslations(
  item: CatalogItem,
  allItems: CatalogItem[]
): CatalogItem[] {
  if (!item.translationKey) return [];
  const seen = new Set<LangCode>([item.lang]);
  const list: CatalogItem[] = [];
  for (const other of allItems) {
    if (other.translationKey === item.translationKey && !seen.has(other.lang)) {
      seen.add(other.lang);
      list.push(other);
    }
  }
  return list.sort((a, b) => LANGUAGES[a.lang].weight - LANGUAGES[b.lang].weight);
}

export function resolveCatalogItemForRender(
  item: CatalogItem,
  allItems: CatalogItem[],
  siteContent: SiteContent,
  settings: CatalogGlobalSettings
): ResolvedCatalogRenderData {
  const effectiveShowPrice = computeEffectiveShowPrice(item, settings);
  const formattedPrice = effectiveShowPrice
    ? formatCatalogPrice(item.price, item.currency || settings.defaultCurrency, item.priceUnit)
    : '';
  const effectiveCommentsMode = item.commentsMode || settings.defaultCommentsMode;
  const translations = getCatalogTranslations(item, allItems);
  const resolvedArticles = resolveLinkedArticlesForLang(item, siteContent, item.lang);

  const groupMap = new Map<string, CatalogSpecRow[]>();
  for (const row of item.specs) {
    const g = row.group || 'General';
    const arr = groupMap.get(g) || [];
    arr.push(row);
    groupMap.set(g, arr);
  }
  const specGroups = Array.from(groupMap.entries()).map(([group, rows]) => ({ group, rows }));

  return {
    item,
    settings,
    effectiveShowPrice,
    formattedPrice,
    effectiveCommentsMode,
    translations,
    resolvedArticles,
    specGroups,
  };
}

// =========================================================================
// Safe Asset Upload & Multilang Catalog Publishing
// =========================================================================

export function resolveSafeCatalogContentPath(relPath: string): string {
  const normalized = String(relPath || '').replace(/\\/g, '/').replace(/^\/+/, '');
  const parts = normalized.split('/');
  if (parts.length !== 5 || parts[0] !== 'content' || parts[2] !== 'catalog' || parts[4] !== 'index.md') {
    throw new Error(`Недопустимый путь карточки каталога: ${relPath}`);
  }
  if (!isValidLang(parts[1])) {
    throw new Error(`Неизвестный язык в пути: ${parts[1]}`);
  }
  if (!SLUG_RE.test(parts[3])) {
    throw new Error(`Недопустимая папка карточки: ${parts[3]}`);
  }
  const abs = path.resolve(ROOT_DIR, normalized);
  if (!abs.startsWith(CONTENT_ROOT + path.sep)) {
    throw new Error('Path traversal rejected');
  }
  return abs;
}

export function saveCatalogUpload(input: {
  folder: string;
  filename: string;
  base64: string;
}): { ok: true; url: string; filename: string; size: string; bytes: number } {
  const folder = cleanStr(input.folder, 80).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
  if (!folder || !SLUG_RE.test(folder)) {
    throw new Error('Укажите корректный Latin slug/папку для загрузки (например, rfid-gate-xr400)');
  }
  const rawName = path.basename(cleanStr(input.filename, 160)).replace(/[\r\n\0]/g, '');
  const ext = path.extname(rawName).toLowerCase();
  if (!ext || !ALLOWED_UPLOAD_EXTS.has(ext)) {
    throw new Error(`Недопустимое расширение файла: ${ext || 'отсутствует'}`);
  }
  const stem = rawName
    .slice(0, rawName.length - ext.length)
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'document';
  const safeName = `${stem}${ext}`;

  let b64 = String(input.base64 || '').trim();
  const commaIdx = b64.indexOf('base64,');
  if (commaIdx !== -1) b64 = b64.slice(commaIdx + 7);
  const buf = Buffer.from(b64, 'base64');
  if (buf.length === 0) {
    throw new Error('Пустой файл загрузки');
  }
  if (buf.length > MAX_UPLOAD_BYTES) {
    throw new Error(`Файл слишком велик (максимум ${formatBytesHuman(MAX_UPLOAD_BYTES)})`);
  }

  // Basic active-script check on SVG uploads
  if (ext === '.svg') {
    const svgText = buf.toString('utf-8');
    if (/<script\b|on[a-z]+\s*=/i.test(svgText)) {
      throw new Error('SVG содержит потенциально опасные скрипты или обработчики событий');
    }
  }

  const destDir = path.resolve(UPLOADS_ROOT, folder);
  if (!destDir.startsWith(UPLOADS_ROOT + path.sep)) {
    throw new Error('Invalid upload directory');
  }
  fs.mkdirSync(destDir, { recursive: true });
  const destFile = path.resolve(destDir, safeName);
  if (!destFile.startsWith(destDir + path.sep)) {
    throw new Error('Invalid upload file target');
  }

  fs.writeFileSync(destFile, buf);
  return {
    ok: true,
    url: `/uploads/catalog/${folder}/${safeName}`,
    filename: safeName,
    size: formatBytesHuman(buf.length),
    bytes: buf.length,
  };
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

export interface CatalogSaveEntryInput {
  lang: LangCode;
  title: string;
  slug: string;
  description: string;
  highlights: string[];
  tags: string[];
  body: string;
}

export interface CatalogSaveConstantsInput {
  translationKey: string;
  catalogType: CatalogType;
  sku: string;
  manufacturer: string;
  availability: AvailabilityStatus;
  date: string;
  weight: number;
  image: string;
  gallery: string[];
  showPrice: boolean;
  price: number | null;
  currency: string;
  priceUnit: string;
  commentsMode: CommentsMode;
  specs: CatalogSpecRow[];
  documents: CatalogDocument[];
  linkedArticles: CatalogLinkedArticleRef[];
}

export interface CatalogSavePayload {
  anchorLang: LangCode;
  followerLangs: LangCode[];
  overwrite?: boolean;
  constants: CatalogSaveConstantsInput;
  entries: CatalogSaveEntryInput[];
}

function serializeCatalogMarkdown(c: CatalogSaveConstantsInput, e: CatalogSaveEntryInput, dateIso: string): string {
  const lines: string[] = ['---'];
  lines.push(`title: ${formatYamlScalar(e.title)}`);
  lines.push(`slug: ${formatYamlScalar(e.slug)}`);
  if (e.description) {
    lines.push(`description: ${formatYamlScalar(e.description)}`);
  }
  lines.push(`translationKey: ${formatYamlScalar(c.translationKey)}`);
  lines.push(`date: ${dateIso}`);
  lines.push(`weight: ${Number.isFinite(c.weight) ? c.weight : 100}`);
  lines.push(`catalogType: ${formatYamlScalar(c.catalogType)}`);
  if (c.sku) lines.push(`sku: ${formatYamlScalar(c.sku)}`);
  if (c.manufacturer) lines.push(`manufacturer: ${formatYamlScalar(c.manufacturer)}`);
  lines.push(`availability: ${formatYamlScalar(c.availability)}`);
  if (c.image) lines.push(`image: ${formatYamlScalar(c.image)}`);
  if (c.gallery.length > 0) {
    lines.push('gallery:');
    c.gallery.forEach((g) => lines.push(`  - ${formatYamlScalar(g)}`));
  }
  lines.push(`showPrice: ${c.showPrice ? 'true' : 'false'}`);
  if (c.price !== null && Number.isFinite(c.price)) {
    lines.push(`price: ${c.price}`);
  }
  lines.push(`currency: ${formatYamlScalar(c.currency || 'EUR')}`);
  if (c.priceUnit) lines.push(`priceUnit: ${formatYamlScalar(c.priceUnit)}`);
  lines.push(`commentsMode: ${formatYamlScalar(c.commentsMode)}`);
  lines.push('math: true');

  if (e.highlights.length > 0) {
    lines.push('highlights:');
    e.highlights.forEach((h) => lines.push(`  - ${formatYamlScalar(h)}`));
  }
  if (e.tags.length > 0) {
    lines.push('tags:');
    e.tags.forEach((t) => lines.push(`  - ${formatYamlScalar(t)}`));
  }
  if (c.specs.length > 0) {
    lines.push('specs:');
    c.specs.forEach((s) => {
      lines.push(`  - group: ${formatYamlScalar(s.group || 'General')}`);
      lines.push(`    label: ${formatYamlScalar(s.label)}`);
      lines.push(`    value: ${formatYamlScalar(s.value)}`);
      if (s.unit) lines.push(`    unit: ${formatYamlScalar(s.unit)}`);
    });
  }
  if (c.documents.length > 0) {
    lines.push('documents:');
    c.documents.forEach((d) => {
      lines.push(`  - title: ${formatYamlScalar(d.title)}`);
      lines.push(`    docType: ${formatYamlScalar(d.docType)}`);
      lines.push(`    file: ${formatYamlScalar(d.file)}`);
      if (d.version) lines.push(`    version: ${formatYamlScalar(d.version)}`);
      if (d.size) lines.push(`    size: ${formatYamlScalar(d.size)}`);
      if (d.lang) lines.push(`    lang: ${formatYamlScalar(d.lang)}`);
    });
  }
  if (c.linkedArticles.length > 0) {
    lines.push('linkedArticles:');
    c.linkedArticles.forEach((a) => {
      lines.push(`  - kind: ${formatYamlScalar(a.kind)}`);
      lines.push(`    translationKey: ${formatYamlScalar(a.translationKey)}`);
      if (a.slug) lines.push(`    slug: ${formatYamlScalar(a.slug)}`);
      if (a.customTitle) lines.push(`    customTitle: ${formatYamlScalar(a.customTitle)}`);
    });
  }

  lines.push('---');
  const cleanBody = String(e.body || '').replace(/\r\n/g, '\n').replace(/^\n+/, '');
  return cleanBody ? `${lines.join('\n')}\n${cleanBody.replace(/\n*$/, '\n')}` : `${lines.join('\n')}\n`;
}

export function saveMultilangCatalogBundle(payload: CatalogSavePayload): {
  ok: boolean;
  status: number;
  error?: string;
  created?: Array<{ lang: LangCode; relPath: string; permalink: string }>;
} {
  if (!isValidLang(payload.anchorLang)) {
    return { ok: false, status: 400, error: 'Некорректный якорный язык' };
  }
  const targetLangs: LangCode[] = [payload.anchorLang];
  for (const fl of payload.followerLangs || []) {
    if (!isValidLang(fl)) {
      return { ok: false, status: 400, error: `Некорректный ведомый язык: ${fl}` };
    }
    if (!targetLangs.includes(fl)) targetLangs.push(fl);
  }

  const c = payload.constants;
  const translationKey = cleanStr(c.translationKey, 120);
  if (!translationKey || !SLUG_RE.test(translationKey)) {
    return { ok: false, status: 400, error: 'Поле translationKey должно быть в формате Latin slug (a-z, 0-9, -)' };
  }

  const parsedDate = c.date ? new Date(c.date) : new Date();
  if (Number.isNaN(parsedDate.getTime())) {
    return { ok: false, status: 400, error: 'Некорректный формат даты' };
  }
  const dateIso = parsedDate.toISOString();

  const entryMap = new Map<LangCode, CatalogSaveEntryInput>();
  for (const rawEntry of payload.entries || []) {
    if (!isValidLang(rawEntry.lang)) continue;
    entryMap.set(rawEntry.lang, rawEntry);
  }

  const prepared: Array<{ lang: LangCode; relPath: string; absPath: string; md: string; permalink: string }> = [];
  for (const lang of targetLangs) {
    const entry = entryMap.get(lang);
    if (!entry) {
      return { ok: false, status: 400, error: `Отсутствуют данные для языка ${lang.toUpperCase()}` };
    }
    const title = cleanStr(entry.title, 240);
    const slug = cleanStr(entry.slug, 120).toLowerCase();
    const body = String(entry.body || '').trim();
    if (!title) {
      return { ok: false, status: 400, error: `[${lang.toUpperCase()}] Укажите название оборудования/ПО` };
    }
    if (!slug || !SLUG_RE.test(slug)) {
      return { ok: false, status: 400, error: `[${lang.toUpperCase()}] URL-слаг должен состоять из латиницы, цифр и дефиса` };
    }
    if (!body) {
      return { ok: false, status: 400, error: `[${lang.toUpperCase()}] Заполните инженерное описание карточки` };
    }

    const relPath = `content/${lang}/catalog/${slug}/index.md`;
    const absPath = resolveSafeCatalogContentPath(relPath);
    if (!payload.overwrite && fs.existsSync(absPath)) {
      return { ok: false, status: 409, error: `Карточка ${relPath} уже существует (включите перезапись или измените слаг)` };
    }

    const md = serializeCatalogMarkdown(
      {
        ...c,
        translationKey,
        catalogType: normalizeCatalogType(c.catalogType),
        availability: normalizeAvailability(c.availability),
        commentsMode: normalizeCommentsMode(c.commentsMode, 'all'),
        currency: cleanStr(c.currency, 12).toUpperCase() || 'EUR',
      },
      {
        lang,
        title,
        slug,
        description: cleanStr(entry.description, 600),
        highlights: (entry.highlights || []).map((h) => cleanStr(h, 240)).filter(Boolean),
        tags: (entry.tags || []).map((t) => cleanStr(t, 80)).filter(Boolean),
        body,
      },
      dateIso
    );

    prepared.push({
      lang,
      relPath,
      absPath,
      md,
      permalink: formatCatalogPermalink(lang, slug),
    });
  }

  const created: Array<{ lang: LangCode; relPath: string; permalink: string }> = [];
  for (const item of prepared) {
    fs.mkdirSync(path.dirname(item.absPath), { recursive: true });
    const tmpPath = `${item.absPath}.tmp-${process.pid}-${Date.now()}`;
    fs.writeFileSync(tmpPath, item.md, 'utf-8');
    fs.renameSync(tmpPath, item.absPath);
    created.push({ lang: item.lang, relPath: item.relPath, permalink: item.permalink });
  }

  return { ok: true, status: 200, created };
}

export function deleteCatalogItem(relPath: string): { ok: boolean; status: number; error?: string } {
  try {
    const abs = resolveSafeCatalogContentPath(relPath);
    if (!fs.existsSync(abs)) {
      return { ok: false, status: 404, error: 'Карточка не найдена' };
    }
    fs.unlinkSync(abs);
    const dir = path.dirname(abs);
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
    return { ok: true, status: 200 };
  } catch (err) {
    return { ok: false, status: 400, error: err instanceof Error ? err.message : String(err) };
  }
}

export function loadCatalogAdminState() {
  const { allItems } = loadAllCatalogItems();
  const settingsState = loadCatalogSettings();
  const siteContent = loadSiteContent();

  // Group all blog posts by translationKey so admin can pick articles as reviews / comparisons
  const articleGroupsMap = new Map<
    string,
    {
      translationKey: string;
      langs: LangCode[];
      titlesByLang: Record<string, string>;
      slugsByLang: Record<string, string>;
      primaryTitle: string;
      primaryLang: LangCode;
      date: string;
    }
  >();

  for (const p of siteContent.allPosts) {
    const tk = p.translationKey || p.slug;
    const existing = articleGroupsMap.get(tk);
    if (!existing) {
      articleGroupsMap.set(tk, {
        translationKey: tk,
        langs: [p.lang],
        titlesByLang: { [p.lang]: p.title },
        slugsByLang: { [p.lang]: p.slug },
        primaryTitle: p.title,
        primaryLang: p.lang,
        date: p.date.toISOString(),
      });
    } else {
      if (!existing.langs.includes(p.lang)) existing.langs.push(p.lang);
      existing.titlesByLang[p.lang] = p.title;
      existing.slugsByLang[p.lang] = p.slug;
      if (p.lang === 'uk' || (p.lang === 'en' && existing.primaryLang !== 'uk')) {
        existing.primaryTitle = p.title;
        existing.primaryLang = p.lang;
      }
    }
  }

  const tkLangsMap = new Map<string, string[]>();
  for (const it of allItems) {
    const list = tkLangsMap.get(it.translationKey) || [];
    if (!list.includes(it.lang)) list.push(it.lang);
    tkLangsMap.set(it.translationKey, list);
  }

  return {
    mode: 'local',
    repo: 'yurakas-netizen/rfid-blog',
    branch: 'master',
    settings: settingsState.settings,
    settingsHash: settingsState.fileHash,
    teamAuthConfigured: isTeamAuthConfigured(),
    languages: ORDERED_LANGUAGES.map((l) => ({
      code: l.code,
      shortLabel: l.shortLabel,
      label: l.label,
      urlPrefix: l.urlPrefix,
    })),
    items: allItems.map((it) => ({
      relPath: it.relPath,
      lang: it.lang,
      folder: it.folder,
      slug: it.slug,
      translationKey: it.translationKey,
      linkedLangs: tkLangsMap.get(it.translationKey) || [it.lang],
      title: it.title,
      description: it.description,
      date: it.date.toISOString(),
      weight: it.weight,
      catalogType: it.catalogType,
      sku: it.sku,
      manufacturer: it.manufacturer,
      availability: it.availability,
      image: it.image || '',
      imageUrl: it.imageUrl || '',
      showPrice: it.showPrice,
      price: it.price,
      currency: it.currency,
      priceUnit: it.priceUnit,
      commentsMode: it.commentsMode,
      specsCount: it.specs.length,
      docsCount: it.documents.length,
      articlesCount: it.linkedArticles.length,
      tags: it.tags,
      permalink: it.permalink,
    })),
    availableArticles: Array.from(articleGroupsMap.values()).sort((a, b) =>
      b.date.localeCompare(a.date)
    ),
  };
}

export function loadCatalogDetail(relPath: string) {
  const abs = resolveSafeCatalogContentPath(relPath);
  if (!fs.existsSync(abs)) {
    throw new Error('Карточка не найдена');
  }
  const parts = relPath.replace(/\\/g, '/').split('/');
  const lang = parts[1] as LangCode;
  const folder = parts[3];
  const item = parseCatalogFile(abs, lang, folder);
  if (!item) {
    throw new Error('Не удалось прочитать карточку');
  }
  return {
    relPath: item.relPath,
    lang: item.lang,
    title: item.title,
    slug: item.slug,
    description: item.description,
    translationKey: item.translationKey,
    date: item.date.toISOString(),
    weight: item.weight,
    catalogType: item.catalogType,
    sku: item.sku,
    manufacturer: item.manufacturer,
    availability: item.availability,
    image: item.image || '',
    gallery: item.gallery,
    showPrice: item.showPrice,
    price: item.price,
    currency: item.currency,
    priceUnit: item.priceUnit,
    commentsMode: item.commentsMode,
    highlights: item.highlights,
    specs: item.specs,
    documents: item.documents,
    linkedArticles: item.linkedArticles,
    tags: item.tags,
    body: item.rawBody,
  };
}

// =========================================================================
// Comments & Team Member Verification ("all" | "members" | "disabled")
// =========================================================================

interface StoredAuthConfig {
  salt: string;
  hash: string;
  hmacKeyHex: string;
  updatedAt: string;
}

function readStoredAuthConfig(): StoredAuthConfig | null {
  try {
    if (!fs.existsSync(AUTH_FILE_PATH)) return null;
    const raw = fs.readFileSync(AUTH_FILE_PATH, 'utf-8');
    const obj = JSON.parse(raw) as Partial<StoredAuthConfig>;
    if (obj.salt && obj.hash && obj.hmacKeyHex) {
      return obj as StoredAuthConfig;
    }
  } catch {
    // ignore malformed auth file
  }
  return null;
}

function getHmacKey(): Buffer {
  if (process.env.CATALOG_TEAM_CODE && process.env.CATALOG_TEAM_CODE.trim()) {
    return crypto.createHash('sha256').update(`hmac:${process.env.CATALOG_TEAM_CODE}`).digest();
  }
  const stored = readStoredAuthConfig();
  if (stored?.hmacKeyHex) {
    return Buffer.from(stored.hmacKeyHex, 'hex');
  }
  return BOOT_HMAC_SECRET;
}

export function isTeamAuthConfigured(): boolean {
  if (process.env.CATALOG_TEAM_CODE && process.env.CATALOG_TEAM_CODE.trim().length >= 4) {
    return true;
  }
  return Boolean(readStoredAuthConfig());
}

export function setTeamAccessCode(newCode: string): { ok: boolean; error?: string } {
  const clean = String(newCode || '').trim();
  if (clean.length < 6) {
    return { ok: false, error: 'Код команды должен содержать не менее 6 символов' };
  }
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(clean, salt, 64).toString('hex');
  const existing = readStoredAuthConfig();
  const hmacKeyHex = existing?.hmacKeyHex || crypto.randomBytes(32).toString('hex');
  const payload: StoredAuthConfig = {
    salt,
    hash,
    hmacKeyHex,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(payload, null, 2) + '\n', { mode: 0o600 });
  return { ok: true };
}

export function verifyTeamCode(candidate: string): boolean {
  const code = String(candidate || '').trim();
  if (!code) return false;

  const envCode = (process.env.CATALOG_TEAM_CODE || '').trim();
  if (envCode) {
    const a = crypto.createHash('sha256').update(code).digest();
    const b = crypto.createHash('sha256').update(envCode).digest();
    return crypto.timingSafeEqual(a, b);
  }

  const stored = readStoredAuthConfig();
  if (!stored) return false;
  const derived = crypto.scryptSync(code, stored.salt, 64);
  const expected = Buffer.from(stored.hash, 'hex');
  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

export function issueMemberToken(): string {
  const exp = Date.now() + 12 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ role: 'member', exp }), 'utf-8').toString('base64url');
  const sig = crypto.createHmac('sha256', getHmacKey()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifyMemberAuthHeader(authHeader: string | undefined): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7).trim();
  const dot = token.indexOf('.');
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!payload || !sig) return false;

  const expectedSig = crypto.createHmac('sha256', getHmacKey()).update(payload).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as {
      role?: string;
      exp?: number;
    };
    return decoded.role === 'member' && typeof decoded.exp === 'number' && decoded.exp > Date.now();
  } catch {
    return false;
  }
}

function resolveSafeCommentsPath(translationKey: string): string {
  const key = cleanStr(translationKey, 120).toLowerCase();
  if (!key || !SLUG_RE.test(key)) {
    throw new Error('Некорректный ключ карточки для комментариев');
  }
  const abs = path.resolve(COMMENTS_DIR, `${key}.json`);
  if (!abs.startsWith(COMMENTS_DIR + path.sep)) {
    throw new Error('Invalid comments file path');
  }
  return abs;
}

export function readCommentsRaw(translationKey: string): CatalogComment[] {
  try {
    const abs = resolveSafeCommentsPath(translationKey);
    if (!fs.existsSync(abs)) return [];
    const parsed = JSON.parse(fs.readFileSync(abs, 'utf-8'));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((c) => c && typeof c === 'object' && typeof c.body === 'string');
  } catch {
    return [];
  }
}

export function getEffectiveCommentsModeForKey(translationKey: string): CommentsMode {
  const settings = loadCatalogSettings().settings;
  const { allItems } = loadAllCatalogItems();
  const match = allItems.find((it) => it.translationKey === translationKey);
  return match ? match.commentsMode : settings.defaultCommentsMode;
}

export function getCommentsForPublic(
  translationKey: string,
  isMember: boolean
): {
  mode: CommentsMode;
  locked: boolean;
  teamAuthConfigured: boolean;
  comments: CatalogComment[];
} {
  const mode = getEffectiveCommentsModeForKey(translationKey);
  const teamAuthConfigured = isTeamAuthConfigured();
  if (mode === 'disabled') {
    return { mode, locked: false, teamAuthConfigured, comments: [] };
  }
  if (mode === 'members' && !isMember) {
    return { mode, locked: true, teamAuthConfigured, comments: [] };
  }
  const comments = readCommentsRaw(translationKey);
  return { mode, locked: false, teamAuthConfigured, comments };
}

export function addCatalogComment(input: {
  translationKey: string;
  lang: string;
  author: string;
  role?: string;
  body: string;
  isMember: boolean;
}): { ok: boolean; status: number; error?: string; comment?: CatalogComment } {
  const mode = getEffectiveCommentsModeForKey(input.translationKey);
  if (mode === 'disabled') {
    return { ok: false, status: 403, error: 'Комментарии для этой позиции отключены' };
  }
  if (mode === 'members' && !input.isMember) {
    return { ok: false, status: 401, error: 'Комментирование доступно только авторизованным участникам команды' };
  }

  const author = cleanStr(input.author, 80);
  const role = cleanStr(input.role || '', 60);
  const body = cleanStr(input.body, 2000);
  const lang = isValidLang(input.lang) ? input.lang : 'uk';

  if (author.length < 2) {
    return { ok: false, status: 400, error: 'Укажите имя (минимум 2 символа)' };
  }
  if (body.length < 3) {
    return { ok: false, status: 400, error: 'Текст комментария слишком короткий' };
  }

  const abs = resolveSafeCommentsPath(input.translationKey);
  fs.mkdirSync(COMMENTS_DIR, { recursive: true });
  const existing = readCommentsRaw(input.translationKey);

  const comment: CatalogComment = {
    id: crypto.randomUUID(),
    translationKey: input.translationKey,
    lang,
    author,
    role,
    body,
    createdAt: new Date().toISOString(),
    memberVerified: input.isMember,
  };

  const updated = [comment, ...existing];
  const tmp = `${abs}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmp, JSON.stringify(updated, null, 2) + '\n', 'utf-8');
  fs.renameSync(tmp, abs);

  return { ok: true, status: 201, comment };
}

export function deleteCatalogComment(translationKey: string, commentId: string): { ok: boolean; status: number; error?: string } {
  const abs = resolveSafeCommentsPath(translationKey);
  const existing = readCommentsRaw(translationKey);
  const next = existing.filter((c) => c.id !== commentId);
  if (next.length === existing.length) {
    return { ok: false, status: 404, error: 'Комментарий не найден' };
  }
  fs.mkdirSync(COMMENTS_DIR, { recursive: true });
  const tmp = `${abs}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmp, JSON.stringify(next, null, 2) + '\n', 'utf-8');
  fs.renameSync(tmp, abs);
  return { ok: true, status: 200 };
}

// =========================================================================
// Localized UI Dictionary (All 20 Portal Languages)
// =========================================================================

const EN_UI: CatalogUiStrings = {
  sectionTitle: 'Engineering Catalog: Hardware, Tags & Software',
  sectionSubtitle: 'Industrial UHF RFID readers, directional antennas, specialized on-metal/textile transponders, and middleware SDKs with datasheets and field evaluations.',
  searchPlaceholder: 'Filter by model, SKU, protocol, or frequency...',
  allTypes: 'All Equipment',
  typeReader: 'Fixed & Mobile Readers',
  typeAntenna: 'RF Antennas',
  typeTag: 'RFID Tags & Inlays',
  typeSoftware: 'Software & Middleware',
  typeAccessory: 'Cables & Accessories',
  availInStock: 'Available for testing',
  availOrder: 'Build-to-order',
  availDiscontinued: 'Legacy / Archive',
  availLicense: 'Commercial License / SDK',
  priceOnRequest: 'Project / BOM specification',
  referencePrice: 'Reference price',
  specsHeading: 'Technical Specifications',
  docsHeading: 'Datasheets, CAD & Documentation',
  articlesHeading: 'Engineering Reviews & Comparisons',
  highlightsHeading: 'Engineering Highlights',
  overviewHeading: 'Architecture & Integration Notes',
  inquiryHeading: 'System Integration & Sample Testing',
  inquiryAction: 'Request Engineering Spec',
  backToCatalog: 'All Catalog Equipment',
  downloadFile: 'Download',
  skuLabel: 'SKU / Part No.',
  manufacturerLabel: 'Platform',
  availabilityLabel: 'Status',
  itemsCountLabel: 'items',
  noItemsFound: 'No catalog items match the selected filter.',
  kindReview: 'Engineering Review',
  kindComparison: 'Benchmark Comparison',
  kindGuide: 'Integration Guide',
  kindCase: 'Field Case Study',
  commentsHeading: 'Engineering Notes & Discussion',
  commentsAllHint: 'Open engineering feedback from integrators and site visitors.',
  commentsMembersHint: 'Internal engineering team discussion mode enabled.',
  commentsMembersLocked: 'Engineering notes for this unit are restricted to authorized team members.',
  commentsDisabledHint: 'Comments are disabled for this equipment specification.',
  commentsEmpty: 'No engineering comments yet. Share field measurements or integration questions.',
  commentAuthorLabel: 'Name / Callsign',
  commentRoleLabel: 'Role / Organization (optional)',
  commentBodyLabel: 'Technical note or question',
  commentSubmitBtn: 'Post Note',
  teamUnlockLabel: 'Team access passcode',
  teamUnlockBtn: 'Unlock',
  teamCodePlaceholder: 'Enter team passcode...',
  teamUnlockedBadge: 'Team member verified',
  otherLanguagesLabel: 'Specification languages',
  openCardLabel: 'Specification',
};

const CATALOG_UI: Partial<Record<LangCode, CatalogUiStrings>> = {
  uk: {
    sectionTitle: 'Інженерний каталог: обладнання, мітки та ПЗ',
    sectionSubtitle: 'Промислові UHF RFID зчитувачі, секторні та лінійні антени, спеціалізовані мітки та проміжне програмне забезпечення з технічною документацією та польовими оглядами.',
    searchPlaceholder: 'Пошук за моделлю, артикулом, протоколом або частотою...',
    allTypes: 'Усі позиції',
    typeReader: 'Зчитувачі та термінали',
    typeAntenna: 'RFID-антени',
    typeTag: 'Мітки та транспондери',
    typeSoftware: 'ПЗ та Middleware',
    typeAccessory: 'Кабелі та оснащення',
    availInStock: 'Доступно для тестування',
    availOrder: 'Під замовлення / проєкт',
    availDiscontinued: 'Архівна модель',
    availLicense: 'Ліцензія ПЗ / SDK',
    priceOnRequest: 'Специфікація під проєкт',
    referencePrice: 'Орієнтовна вартість',
    specsHeading: 'Технічні характеристики',
    docsHeading: 'Даташити, схеми та документація',
    articlesHeading: 'Огляди та інженерні порівняння',
    highlightsHeading: 'Ключові інженерні параметри',
    overviewHeading: 'Архітектура та особливості впровадження',
    inquiryHeading: 'Системна інтеграція та пілотне тестування',
    inquiryAction: 'Запросити інженерний розрахунок',
    backToCatalog: 'Весь каталог обладнання',
    downloadFile: 'Завантажити',
    skuLabel: 'Артикул / SKU',
    manufacturerLabel: 'Платформа',
    availabilityLabel: 'Статус',
    itemsCountLabel: 'позицій',
    noItemsFound: 'За обраним фільтром позицій у каталозі не знайдено.',
    kindReview: 'Інженерний огляд',
    kindComparison: 'Порівняльний аналіз',
    kindGuide: 'Настанова з інтеграції',
    kindCase: 'Польовий кейс',
    commentsHeading: 'Інженерні нотатки та обговорення',
    commentsAllHint: 'Відкрите технічне обговорення для інтеграторів та відвідувачів.',
    commentsMembersHint: 'Увімкнено режим внутрішньої інженерної дискусії команди.',
    commentsMembersLocked: 'Нотатки до цієї позиції доступні лише учасникам інженерної команди.',
    commentsDisabledHint: 'Коментування для цієї специфікації вимкнено адміністратором.',
    commentsEmpty: 'Поки що немає інженерних коментарів. Поділіться результатами польових тестів або запитанням.',
    commentAuthorLabel: "Ім'я / ПІБ",
    commentRoleLabel: 'Роль / Компанія (необов’язково)',
    commentBodyLabel: 'Технічна нотатка або запитання',
    commentSubmitBtn: 'Надіслати нотатку',
    teamUnlockLabel: 'Код доступу команди',
    teamUnlockBtn: 'Увійти',
    teamCodePlaceholder: 'Введіть код команди...',
    teamUnlockedBadge: 'Учасник команди підтверджений',
    otherLanguagesLabel: 'Мови специфікації',
    openCardLabel: 'Специфікація',
  },
  ru: {
    sectionTitle: 'Инженерный каталог: оборудование, метки и ПО',
    sectionSubtitle: 'Промышленные UHF RFID считыватели, антенны, специализированные транспондеры и middleware с даташитами, протоколами испытаний и техническими обзорами.',
    searchPlaceholder: 'Фильтр по модели, артикулу, протоколу или частоте...',
    allTypes: 'Все позиции',
    typeReader: 'Считыватели и терминалы',
    typeAntenna: 'RFID-антенны',
    typeTag: 'Метки и транспондеры',
    typeSoftware: 'ПО и Middleware',
    typeAccessory: 'Кабели и оснастка',
    availInStock: 'Доступно для пилота',
    availOrder: 'Под проект / заказ',
    availDiscontinued: 'Архивная модель',
    availLicense: 'Лицензия ПО / SDK',
    priceOnRequest: 'Спецификация под проект',
    referencePrice: 'Ориентировочная цена',
    specsHeading: 'Технические характеристики',
    docsHeading: 'Даташиты, схемы и документация',
    articlesHeading: 'Инженерные обзоры и сравнения',
    highlightsHeading: 'Ключевые инженерные особенности',
    overviewHeading: 'Архитектура и заметки по интеграции',
    inquiryHeading: 'Системная интеграция и стендовый тест',
    inquiryAction: 'Запросить инженерный расчёт',
    backToCatalog: 'Весь каталог оборудования',
    downloadFile: 'Скачать',
    skuLabel: 'Артикул / SKU',
    manufacturerLabel: 'Платформа',
    availabilityLabel: 'Статус',
    itemsCountLabel: 'позиций',
    noItemsFound: 'По заданному фильтру позиции в каталоге не найдены.',
    kindReview: 'Инженерный обзор',
    kindComparison: 'Сравнительный анализ',
    kindGuide: 'Руководство по интеграции',
    kindCase: 'Полевой кейс',
    commentsHeading: 'Инженерные заметки и обсуждение',
    commentsAllHint: 'Открытое техническое обсуждение для интеграторов и посетителей портала.',
    commentsMembersHint: 'Включён режим закрытого обсуждения для команды инженеров.',
    commentsMembersLocked: 'Обсуждение этой позиции доступно только авторизованным участникам команды.',
    commentsDisabledHint: 'Комментирование этой карточки отключено в настройках.',
    commentsEmpty: 'Пока нет комментариев. Поделитесь замерами RSSI или вопросами по интеграции.',
    commentAuthorLabel: 'Имя',
    commentRoleLabel: 'Должность / Организация (необязательно)',
    commentBodyLabel: 'Технический комментарий или вопрос',
    commentSubmitBtn: 'Отправить комментарий',
    teamUnlockLabel: 'Код доступа команды',
    teamUnlockBtn: 'Открыть доступ',
    teamCodePlaceholder: 'Введите код команды...',
    teamUnlockedBadge: 'Доступ команды подтверждён',
    otherLanguagesLabel: 'Языки спецификации',
    openCardLabel: 'Спецификация',
  },
  en: EN_UI,
  pl: {
    ...EN_UI,
    sectionTitle: 'Katalog inżynieryjny: sprzęt, tagi i oprogramowanie',
    sectionSubtitle: 'Przemysłowe czytniki UHF RFID, anteny, transpondery specjalne oraz oprogramowanie pośredniczące z kartami katalogowymi i testami terenowymi.',
    searchPlaceholder: 'Szukaj według modelu, SKU, protokołu lub częstotliwości...',
    allTypes: 'Wszystkie pozycje',
    typeReader: 'Czytniki i terminale',
    typeAntenna: 'Anteny RF',
    typeTag: 'Tagi i transpondery',
    typeSoftware: 'Oprogramowanie i SDK',
    typeAccessory: 'Kable i akcesoria',
    specsHeading: 'Specyfikacja techniczna',
    docsHeading: 'Karty katalogowe (Datasheet) i dokumentacja',
    articlesHeading: 'Recenzje inżynieryjne i porównania',
    backToCatalog: 'Wróć do katalogu',
    downloadFile: 'Pobierz',
    commentsHeading: 'Notatki inżynieryjne i dyskusja',
  },
  de: {
    ...EN_UI,
    sectionTitle: 'Engineering-Katalog: Hardware, Tags & Software',
    sectionSubtitle: 'Industrielle UHF-RFID-Reader, Antennen, spezialisierte Transponder und Middleware mit Datenblättern und Praxisberichten.',
    searchPlaceholder: 'Nach Modell, SKU, Protokoll oder Frequenz filtern...',
    allTypes: 'Alle Systeme',
    typeReader: 'Stationäre & Mobile Reader',
    typeAntenna: 'RF-Antennen',
    typeTag: 'RFID-Tags & Inlays',
    typeSoftware: 'Software & Middleware',
    typeAccessory: 'Kabel & Zubehör',
    specsHeading: 'Technische Spezifikationen',
    docsHeading: 'Datenblätter, CAD & Dokumentation',
    articlesHeading: 'Technische Tests & Vergleiche',
    backToCatalog: 'Zurück zum Katalog',
    downloadFile: 'Herunterladen',
    commentsHeading: 'Technische Hinweise & Diskussion',
  },
  fr: {
    ...EN_UI,
    sectionTitle: 'Catalogue technique : matériel, tags et logiciels',
    sectionSubtitle: 'Lecteurs UHF RFID industriels, antennes, transpondeurs spécialisés et middleware avec fiches techniques et bancs d’essai.',
    allTypes: 'Tous les équipements',
    specsHeading: 'Spécifications techniques',
    docsHeading: 'Fiches techniques (Datasheets) & CAD',
    articlesHeading: 'Analyses techniques & comparatifs',
    backToCatalog: 'Tout le catalogue',
    downloadFile: 'Télécharger',
  },
  da: {
    ...EN_UI,
    sectionTitle: 'Teknisk katalog: Hardware, Tags & Software',
    allTypes: 'Alle enheder',
    specsHeading: 'Tekniske specifikationer',
    docsHeading: 'Datablade og dokumentation',
    articlesHeading: 'Tekniske anmeldelser og sammenligninger',
    backToCatalog: 'Tilbage til kataloget',
    downloadFile: 'Hent',
  },
};

export function getCatalogUiStrings(lang: LangCode): CatalogUiStrings {
  return CATALOG_UI[lang] || EN_UI;
}
