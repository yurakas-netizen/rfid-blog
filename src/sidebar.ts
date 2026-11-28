import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  SITE_CONFIG,
  LANGUAGES,
  ORDERED_LANGUAGES,
  I18N,
  isValidLang,
  type LangCode,
} from './config.js';
import type { SiteContent } from './content.js';

const ROOT_DIR = process.cwd();
const DATA_SIDEBAR_REL = 'data/sidebar.json';
const DATA_SIDEBAR_PATH = path.join(ROOT_DIR, DATA_SIDEBAR_REL);

export type SidebarIconName =
  | 'home'
  | 'catalog'
  | 'archives'
  | 'search'
  | 'links'
  | 'admin'
  | 'tag'
  | 'categories'
  | 'book'
  | 'mail'
  | 'shield'
  | 'globe'
  | 'sparkles'
  | 'external'
  | 'alert'
  | 'phone'
  | 'file'
  | 'none';

export const ALLOWED_SIDEBAR_ICONS: ReadonlySet<SidebarIconName> = new Set([
  'home',
  'catalog',
  'archives',
  'search',
  'links',
  'admin',
  'tag',
  'categories',
  'book',
  'mail',
  'shield',
  'globe',
  'sparkles',
  'external',
  'alert',
  'phone',
  'file',
  'none',
]);

export type VisibilityMode = 'all' | 'only' | 'except';
export type NoticePosition = 'top' | 'mid' | 'bottom';
export type NoticeStyle = 'subtle' | 'info' | 'accent' | 'warn';

export interface SidebarBrandConfig {
  showLogo: boolean;
  defaultTitle: string;
  defaultSubtitle: string;
  titles: Record<string, string>;
  subtitles: Record<string, string>;
}

export interface SidebarMenuItem {
  id: string;
  enabled: boolean;
  icon: SidebarIconName;
  defaultLabel: string;
  defaultUrl: string;
  newTab: boolean;
  visibilityMode: VisibilityMode;
  visibilityLangs: string[];
  labels: Record<string, string>;
  urls: Record<string, string>;
}

export interface SidebarNoticeTranslation {
  badge?: string;
  title?: string;
  text?: string;
  linkLabel?: string;
  linkUrl?: string;
}

export interface SidebarNoticeBlock {
  id: string;
  enabled: boolean;
  position: NoticePosition;
  style: NoticeStyle;
  visibilityMode: VisibilityMode;
  visibilityLangs: string[];
  badge: string;
  title: string;
  text: string;
  linkLabel: string;
  linkUrl: string;
  newTab: boolean;
  i18n: Record<string, SidebarNoticeTranslation>;
}

export interface SidebarLanguageItem {
  code: string;
  label: string;
  enabled: boolean;
  customUrl: string;
  isCustom: boolean;
}

export interface SidebarControlsConfig {
  showLanguageSwitcher: boolean;
  showLanguageCounts: boolean;
  showThemeToggle: boolean;
  showMobileSearch: boolean;
  showMobileCategories: boolean;
  syncHiddenLangsToHomeHub: boolean;
}

export interface SidebarConfig {
  version: 1;
  brand: SidebarBrandConfig;
  controls: SidebarControlsConfig;
  menuItems: SidebarMenuItem[];
  languages: SidebarLanguageItem[];
  announcements: SidebarNoticeBlock[];
}

export interface ResolvedSidebarMenuItem {
  id: string;
  navKey: string;
  icon: SidebarIconName;
  label: string;
  url: string;
  newTab: boolean;
}

export interface ResolvedSidebarNotice {
  id: string;
  position: NoticePosition;
  style: NoticeStyle;
  badge: string;
  title: string;
  text: string;
  linkLabel: string;
  linkUrl: string;
  newTab: boolean;
}

export interface ResolvedSidebarLanguage {
  code: string;
  label: string;
  url: string;
  isCustom: boolean;
}

export interface ResolvedSidebarForLang {
  brand: {
    showLogo: boolean;
    title: string;
    subtitle: string;
  };
  controls: SidebarControlsConfig;
  menuItems: ResolvedSidebarMenuItem[];
  languages: ResolvedSidebarLanguage[];
  announcementsTop: ResolvedSidebarNotice[];
  announcementsMid: ResolvedSidebarNotice[];
  announcementsBottom: ResolvedSidebarNotice[];
  hiddenBuiltInLangs: Set<string>;
}

function sha256(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf-8').digest('hex');
}

function cleanStr(val: unknown, maxLen = 500): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

function cleanId(val: unknown, fallback: string): string {
  const s = cleanStr(val, 64)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || fallback;
}

function cleanLangMap(raw: unknown, maxLen = 300): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    const code = cleanStr(k, 16).toLowerCase();
    const text = cleanStr(v, maxLen);
    if (code && text) {
      out[code] = text;
    }
  }
  return out;
}

function cleanLangList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of raw) {
    const code = cleanStr(item, 16).toLowerCase();
    if (code && !seen.has(code)) {
      seen.add(code);
      out.push(code);
    }
  }
  return out;
}

function cleanVisibilityMode(val: unknown): VisibilityMode {
  if (val === 'only' || val === 'except' || val === 'all') return val;
  return 'all';
}

function cleanIcon(val: unknown, fallback: SidebarIconName = 'links'): SidebarIconName {
  const s = cleanStr(val, 32).toLowerCase() as SidebarIconName;
  return ALLOWED_SIDEBAR_ICONS.has(s) ? s : fallback;
}

export function isVisibleForLang(
  enabled: boolean,
  mode: VisibilityMode,
  langs: string[],
  lang: string
): boolean {
  if (!enabled) return false;
  if (mode === 'only') return langs.includes(lang);
  if (mode === 'except') return !langs.includes(lang);
  return true;
}

export function resolveSidebarUrl(rawUrl: string, lang: LangCode): string {
  const trimmed = cleanStr(rawUrl, 500) || '/';
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('#')
  ) {
    return trimmed;
  }
  // Root-only paths that must never receive /<lang>/ prefix
  if (
    trimmed === '/admin' ||
    trimmed.startsWith('/admin/') ||
    trimmed.startsWith('/static/') ||
    trimmed.startsWith('/assets/')
  ) {
    return trimmed;
  }
  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const prefix = LANGUAGES[lang].urlPrefix;
  if (!prefix) return normalized;
  if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
    return normalized;
  }
  return normalized === '/' ? `${prefix}/` : `${prefix}${normalized}`;
}

export function buildDefaultSidebarConfig(): SidebarConfig {
  const titles: Record<string, string> = {};
  const subtitles: Record<string, string> = {};
  const homeLabels: Record<string, string> = {};
  const catalogLabels: Record<string, string> = {};
  const archivesLabels: Record<string, string> = {};
  const searchLabels: Record<string, string> = {};
  const linksLabels: Record<string, string> = {};
  const adminLabels: Record<string, string> = {};

  for (const l of ORDERED_LANGUAGES) {
    const t = I18N[l.code];
    titles[l.code] = l.title;
    subtitles[l.code] = t.subtitle;
    homeLabels[l.code] = t.home;
    catalogLabels[l.code] = t.catalog;
    archivesLabels[l.code] = t.archives;
    searchLabels[l.code] = t.search;
    linksLabels[l.code] = t.links;
    adminLabels[l.code] = t.adminCms;
  }

  return {
    version: 1,
    brand: {
      showLogo: true,
      defaultTitle: SITE_CONFIG.title,
      defaultSubtitle: I18N.uk.subtitle,
      titles,
      subtitles,
    },
    controls: {
      showLanguageSwitcher: true,
      showLanguageCounts: true,
      showThemeToggle: SITE_CONFIG.colorSchemeToggle,
      showMobileSearch: true,
      showMobileCategories: true,
      syncHiddenLangsToHomeHub: true,
    },
    menuItems: [
      {
        id: 'home',
        enabled: true,
        icon: 'home',
        defaultLabel: 'Home',
        defaultUrl: '/',
        newTab: false,
        visibilityMode: 'all',
        visibilityLangs: [],
        labels: homeLabels,
        urls: {},
      },
      {
        id: 'catalog',
        enabled: true,
        icon: 'catalog',
        defaultLabel: 'Catalog & Hardware',
        defaultUrl: '/catalog/',
        newTab: false,
        visibilityMode: 'all',
        visibilityLangs: [],
        labels: catalogLabels,
        urls: {},
      },
      {
        id: 'archives',
        enabled: true,
        icon: 'archives',
        defaultLabel: 'Archives',
        defaultUrl: '/archives/',
        newTab: false,
        visibilityMode: 'all',
        visibilityLangs: [],
        labels: archivesLabels,
        urls: {},
      },
      {
        id: 'search',
        enabled: true,
        icon: 'search',
        defaultLabel: 'Search',
        defaultUrl: '/search/',
        newTab: false,
        visibilityMode: 'all',
        visibilityLangs: [],
        labels: searchLabels,
        urls: {},
      },
      {
        id: 'links',
        enabled: true,
        icon: 'links',
        defaultLabel: 'Links',
        defaultUrl: '/links/',
        newTab: false,
        visibilityMode: 'all',
        visibilityLangs: [],
        labels: linksLabels,
        urls: {},
      },
      {
        id: 'admin',
        enabled: true,
        icon: 'admin',
        defaultLabel: 'Admin (CMS)',
        defaultUrl: '/admin/',
        newTab: false,
        visibilityMode: 'all',
        visibilityLangs: [],
        labels: adminLabels,
        urls: {},
      },
    ],
    languages: ORDERED_LANGUAGES.map((l) => ({
      code: l.code,
      label: l.label,
      enabled: true,
      customUrl: '',
      isCustom: false,
    })),
    announcements: [],
  };
}

export function normalizeSidebarConfig(raw: unknown): SidebarConfig {
  const def = buildDefaultSidebarConfig();
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return def;
  }
  const obj = raw as Record<string, unknown>;

  // 1. Brand
  const rawBrand =
    obj.brand && typeof obj.brand === 'object' && !Array.isArray(obj.brand)
      ? (obj.brand as Record<string, unknown>)
      : {};
  const brand: SidebarBrandConfig = {
    showLogo: typeof rawBrand.showLogo === 'boolean' ? rawBrand.showLogo : def.brand.showLogo,
    defaultTitle: cleanStr(rawBrand.defaultTitle, 120) || def.brand.defaultTitle,
    defaultSubtitle: cleanStr(rawBrand.defaultSubtitle, 240) || def.brand.defaultSubtitle,
    titles: { ...def.brand.titles, ...cleanLangMap(rawBrand.titles, 120) },
    subtitles: { ...def.brand.subtitles, ...cleanLangMap(rawBrand.subtitles, 240) },
  };

  // 2. Controls
  const rawCtrl =
    obj.controls && typeof obj.controls === 'object' && !Array.isArray(obj.controls)
      ? (obj.controls as Record<string, unknown>)
      : {};
  const controls: SidebarControlsConfig = {
    showLanguageSwitcher:
      typeof rawCtrl.showLanguageSwitcher === 'boolean'
        ? rawCtrl.showLanguageSwitcher
        : def.controls.showLanguageSwitcher,
    showLanguageCounts:
      typeof rawCtrl.showLanguageCounts === 'boolean'
        ? rawCtrl.showLanguageCounts
        : def.controls.showLanguageCounts,
    showThemeToggle:
      typeof rawCtrl.showThemeToggle === 'boolean'
        ? rawCtrl.showThemeToggle
        : def.controls.showThemeToggle,
    showMobileSearch:
      typeof rawCtrl.showMobileSearch === 'boolean'
        ? rawCtrl.showMobileSearch
        : def.controls.showMobileSearch,
    showMobileCategories:
      typeof rawCtrl.showMobileCategories === 'boolean'
        ? rawCtrl.showMobileCategories
        : def.controls.showMobileCategories,
    syncHiddenLangsToHomeHub:
      typeof rawCtrl.syncHiddenLangsToHomeHub === 'boolean'
        ? rawCtrl.syncHiddenLangsToHomeHub
        : def.controls.syncHiddenLangsToHomeHub,
  };

  // 3. Menu items
  const menuItems: SidebarMenuItem[] = [];
  const usedMenuIds = new Set<string>();
  const rawMenu = Array.isArray(obj.menuItems) ? obj.menuItems : def.menuItems;

  rawMenu.slice(0, 40).forEach((entry, idx) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return;
    const m = entry as Record<string, unknown>;
    let id = cleanId(m.id, `item-${idx + 1}`);
    while (usedMenuIds.has(id)) {
      id = `${id}-${idx + 1}`;
    }
    usedMenuIds.add(id);

    const defaultLabel = cleanStr(m.defaultLabel, 120) || id;
    const defaultUrl = cleanStr(m.defaultUrl, 500) || '/';

    menuItems.push({
      id,
      enabled: typeof m.enabled === 'boolean' ? m.enabled : true,
      icon: cleanIcon(m.icon, 'links'),
      defaultLabel,
      defaultUrl,
      newTab: Boolean(m.newTab),
      visibilityMode: cleanVisibilityMode(m.visibilityMode),
      visibilityLangs: cleanLangList(m.visibilityLangs),
      labels: cleanLangMap(m.labels, 120),
      urls: cleanLangMap(m.urls, 500),
    });
  });

  // 4. Languages
  const languages: SidebarLanguageItem[] = [];
  const seenLangs = new Set<string>();
  const rawLangs = Array.isArray(obj.languages) ? obj.languages : def.languages;

  for (const entry of rawLangs) {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) continue;
    const l = entry as Record<string, unknown>;
    const code = cleanStr(l.code, 16).toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!code || seenLangs.has(code)) continue;
    seenLangs.add(code);

    const builtIn = isValidLang(code) ? LANGUAGES[code] : undefined;
    languages.push({
      code,
      label: cleanStr(l.label, 80) || builtIn?.label || code.toUpperCase(),
      enabled: typeof l.enabled === 'boolean' ? l.enabled : true,
      customUrl: cleanStr(l.customUrl, 500),
      isCustom: builtIn ? false : true,
    });
  }

  // 5. Announcements / Text blocks
  const announcements: SidebarNoticeBlock[] = [];
  const usedNoticeIds = new Set<string>();
  const rawNotices = Array.isArray(obj.announcements) ? obj.announcements : [];

  rawNotices.slice(0, 20).forEach((entry, idx) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return;
    const n = entry as Record<string, unknown>;
    let id = cleanId(n.id, `notice-${idx + 1}`);
    while (usedNoticeIds.has(id)) {
      id = `${id}-${idx + 1}`;
    }
    usedNoticeIds.add(id);

    const pos: NoticePosition =
      n.position === 'top' || n.position === 'mid' || n.position === 'bottom'
        ? n.position
        : 'mid';
    const style: NoticeStyle =
      n.style === 'subtle' || n.style === 'info' || n.style === 'accent' || n.style === 'warn'
        ? n.style
        : 'info';

    const i18n: Record<string, SidebarNoticeTranslation> = {};
    if (n.i18n && typeof n.i18n === 'object' && !Array.isArray(n.i18n)) {
      for (const [langCode, val] of Object.entries(n.i18n as Record<string, unknown>)) {
        const lc = cleanStr(langCode, 16).toLowerCase();
        if (!lc || !val || typeof val !== 'object' || Array.isArray(val)) continue;
        const tv = val as Record<string, unknown>;
        const tr: SidebarNoticeTranslation = {};
        if (cleanStr(tv.badge, 60)) tr.badge = cleanStr(tv.badge, 60);
        if (cleanStr(tv.title, 160)) tr.title = cleanStr(tv.title, 160);
        if (cleanStr(tv.text, 1000)) tr.text = cleanStr(tv.text, 1000);
        if (cleanStr(tv.linkLabel, 120)) tr.linkLabel = cleanStr(tv.linkLabel, 120);
        if (cleanStr(tv.linkUrl, 500)) tr.linkUrl = cleanStr(tv.linkUrl, 500);
        if (Object.keys(tr).length > 0) {
          i18n[lc] = tr;
        }
      }
    }

    announcements.push({
      id,
      enabled: typeof n.enabled === 'boolean' ? n.enabled : true,
      position: pos,
      style,
      visibilityMode: cleanVisibilityMode(n.visibilityMode),
      visibilityLangs: cleanLangList(n.visibilityLangs),
      badge: cleanStr(n.badge, 60),
      title: cleanStr(n.title, 160),
      text: cleanStr(n.text, 1000),
      linkLabel: cleanStr(n.linkLabel, 120),
      linkUrl: cleanStr(n.linkUrl, 500),
      newTab: Boolean(n.newTab),
      i18n,
    });
  });

  return {
    version: 1,
    brand,
    controls,
    menuItems,
    languages,
    announcements,
  };
}

export function loadSidebarState(): {
  exists: boolean;
  relPath: string;
  fileHash: string;
  config: SidebarConfig;
} {
  if (!fs.existsSync(DATA_SIDEBAR_PATH)) {
    return {
      exists: false,
      relPath: DATA_SIDEBAR_REL,
      fileHash: '',
      config: buildDefaultSidebarConfig(),
    };
  }
  try {
    const raw = fs.readFileSync(DATA_SIDEBAR_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      exists: true,
      relPath: DATA_SIDEBAR_REL,
      fileHash: sha256(raw),
      config: normalizeSidebarConfig(parsed),
    };
  } catch {
    return {
      exists: false,
      relPath: DATA_SIDEBAR_REL,
      fileHash: '',
      config: buildDefaultSidebarConfig(),
    };
  }
}

export function loadSidebarConfig(): SidebarConfig {
  return loadSidebarState().config;
}

export function resolveSidebarForLang(
  lang: LangCode,
  configOverride?: SidebarConfig
): ResolvedSidebarForLang {
  const cfg = configOverride || loadSidebarConfig();

  const brand = {
    showLogo: cfg.brand.showLogo,
    title: cfg.brand.titles[lang] || cfg.brand.defaultTitle || LANGUAGES[lang].title,
    subtitle: cfg.brand.subtitles[lang] || cfg.brand.defaultSubtitle || I18N[lang].subtitle,
  };

  const menuItems: ResolvedSidebarMenuItem[] = [];
  for (const item of cfg.menuItems) {
    if (!isVisibleForLang(item.enabled, item.visibilityMode, item.visibilityLangs, lang)) {
      continue;
    }
    const label = item.labels[lang] || item.defaultLabel;
    const rawUrl = item.urls[lang] || item.defaultUrl;
    const url = resolveSidebarUrl(rawUrl, lang);
    menuItems.push({
      id: item.id,
      navKey: item.id,
      icon: item.icon,
      label,
      url,
      newTab: item.newTab,
    });
  }

  const enabledBuiltInCodes = new Set<string>();
  const languages: ResolvedSidebarLanguage[] = [];
  for (const l of cfg.languages) {
    if (!l.enabled) continue;
    if (isValidLang(l.code)) {
      enabledBuiltInCodes.add(l.code);
      const url = l.customUrl
        ? l.customUrl
        : LANGUAGES[l.code].urlPrefix
          ? `${LANGUAGES[l.code].urlPrefix}/`
          : '/';
      languages.push({
        code: l.code,
        label: l.label,
        url,
        isCustom: false,
      });
    } else if (l.customUrl) {
      languages.push({
        code: l.code,
        label: l.label,
        url: l.customUrl,
        isCustom: true,
      });
    }
  }

  const hiddenBuiltInLangs = new Set<string>();
  if (cfg.controls.syncHiddenLangsToHomeHub) {
    for (const l of ORDERED_LANGUAGES) {
      if (!enabledBuiltInCodes.has(l.code)) {
        hiddenBuiltInLangs.add(l.code);
      }
    }
  }

  const announcementsTop: ResolvedSidebarNotice[] = [];
  const announcementsMid: ResolvedSidebarNotice[] = [];
  const announcementsBottom: ResolvedSidebarNotice[] = [];

  for (const block of cfg.announcements) {
    if (!isVisibleForLang(block.enabled, block.visibilityMode, block.visibilityLangs, lang)) {
      continue;
    }
    const tr = block.i18n[lang] || {};
    const badge = tr.badge || block.badge;
    const title = tr.title || block.title;
    const text = tr.text || block.text;
    const linkLabel = tr.linkLabel || block.linkLabel;
    const rawLinkUrl = tr.linkUrl || block.linkUrl;
    const linkUrl = rawLinkUrl ? resolveSidebarUrl(rawLinkUrl, lang) : '';

    if (!badge && !title && !text && !linkLabel) {
      continue;
    }

    const resolved: ResolvedSidebarNotice = {
      id: block.id,
      position: block.position,
      style: block.style,
      badge,
      title,
      text,
      linkLabel,
      linkUrl,
      newTab: block.newTab,
    };

    if (block.position === 'top') announcementsTop.push(resolved);
    else if (block.position === 'bottom') announcementsBottom.push(resolved);
    else announcementsMid.push(resolved);
  }

  return {
    brand,
    controls: cfg.controls,
    menuItems,
    languages,
    announcementsTop,
    announcementsMid,
    announcementsBottom,
    hiddenBuiltInLangs,
  };
}

export function getHiddenHubLangs(siteContent?: SiteContent): Set<string> {
  void siteContent;
  const cfg = loadSidebarConfig();
  if (!cfg.controls.syncHiddenLangsToHomeHub) return new Set();
  const enabled = new Set(cfg.languages.filter((l) => l.enabled).map((l) => l.code));
  const hidden = new Set<string>();
  for (const l of ORDERED_LANGUAGES) {
    if (!enabled.has(l.code)) hidden.add(l.code);
  }
  return hidden;
}

export function applySidebarUpdate(input: {
  config: unknown;
  expectedHash?: string;
}): {
  ok: boolean;
  status: number;
  error?: string;
  relPath?: string;
  fileHash?: string;
  config?: SidebarConfig;
} {
  fs.mkdirSync(path.dirname(DATA_SIDEBAR_PATH), { recursive: true });
  const exists = fs.existsSync(DATA_SIDEBAR_PATH);
  const currentRaw = exists ? fs.readFileSync(DATA_SIDEBAR_PATH, 'utf-8') : '';
  const currentHash = exists ? sha256(currentRaw) : '';

  if (
    input.expectedHash !== undefined &&
    input.expectedHash !== '' &&
    input.expectedHash !== currentHash
  ) {
    return {
      ok: false,
      status: 409,
      error: `Конфликт версии файла ${DATA_SIDEBAR_REL}. Перезагрузите конструктор.`,
    };
  }

  const normalized = normalizeSidebarConfig(input.config);
  const nextContent = JSON.stringify(normalized, null, 2) + '\n';
  const nextHash = sha256(nextContent);

  const tmpPath = `${DATA_SIDEBAR_PATH}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmpPath, nextContent, 'utf-8');
  fs.renameSync(tmpPath, DATA_SIDEBAR_PATH);

  return {
    ok: true,
    status: 200,
    relPath: DATA_SIDEBAR_REL,
    fileHash: nextHash,
    config: normalized,
  };
}
