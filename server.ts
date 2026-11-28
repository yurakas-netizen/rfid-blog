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
import { buildSchemaJsonLd, toAbsoluteSiteUrl } from './src/schema.js';
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
import {
  loadSidebarState,
  resolveSidebarForLang,
  buildDefaultSidebarConfig,
  applySidebarUpdate,
} from './src/sidebar.js';
import {
  loadMultilangState,
  loadMultilangPostDetail,
  publishMultilangBundle,
} from './src/multilang.js';
import {
  loadTaxonomyDictionary,
  saveTaxonomyDictionary,
} from './src/taxonomy.js';
import {
  loadAllCatalogItems,
  loadCatalogSettings,
  saveCatalogSettings,
  resolveCatalogItemForRender,
  computeEffectiveShowPrice,
  formatCatalogPrice,
  getCatalogUiStrings,
  loadCatalogAdminState,
  loadCatalogDetail,
  saveMultilangCatalogBundle,
  deleteCatalogItem,
  saveCatalogUpload,
  getCommentsForPublic,
  addCatalogComment,
  deleteCatalogComment,
  verifyTeamCode,
  issueMemberToken,
  verifyMemberAuthHeader,
  setTeamAccessCode,
  isTeamAuthConfigured,
  type CatalogItem,
  type ResolvedCatalogRenderData,
} from './src/catalog.js';

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

  const sidebar = resolveSidebarForLang(lang);

  return {
    site: SITE_CONFIG,
    lang,
    langConfig,
    langPrefix: langConfig.urlPrefix,
    t,
    orderedLanguages: ORDERED_LANGUAGES,
    langPostCounts: getLangPostCounts(siteContent),
    sidebar,
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
  const catalogResolved = (ctx as { resolved?: ResolvedCatalogRenderData }).resolved;
  const catalogList = (data as {
    catalogList?: {
      sectionTitle: string;
      sectionUrlPath: string;
      items: CatalogItem[];
    };
  }).catalogList;
  const reqUrlPath =
    typeof res.req?.originalUrl === 'string'
      ? res.req.originalUrl.split('?')[0]
      : LANGUAGES[lang].urlPrefix
      ? `${LANGUAGES[lang].urlPrefix}/`
      : '/';
  const pageUrlPath =
    (ctx as { post?: PostItem }).post?.permalink ||
    catalogResolved?.item.permalink ||
    reqUrlPath;
  const ogImageRel =
    (ctx as { post?: PostItem }).post?.imageUrl ||
    catalogResolved?.item.imageUrl ||
    '/assets/img/avatar.png';
  const canonicalUrl = toAbsoluteSiteUrl(pageUrlPath);
  const ogImageUrl = toAbsoluteSiteUrl(ogImageRel);
  const jsonLd = buildSchemaJsonLd({
    lang,
    isHome: Boolean((data as Record<string, unknown>).isHome),
    isArticle: Boolean(ctx.isArticle),
    pageUrlPath,
    pageTitle: String(ctx.pageTitle || LANGUAGES[lang].title),
    pageDescription: String(ctx.pageDescription || ''),
    post: (ctx as { post?: PostItem }).post,
    translatedPosts: (ctx as { translatedPosts?: PostItem[] }).translatedPosts,
    catalogResolved,
    catalogList,
  });
  const html = await ejs.renderFile(path.join(viewsDir, `${viewName}.ejs`), {
    ...ctx,
    canonicalUrl,
    ogImageUrl,
    jsonLd,
  });
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

// AI-crawler / LLM discovery manifest (llms.txt)
app.get('/llms.txt', (_req: Request, res: Response) => {
  const siteContent = loadSiteContent();
  const { allItems } = loadAllCatalogItems();
  const settings = loadCatalogSettings().settings;
  const origin = SITE_CONFIG.baseUrl.replace(/\/+$/, '');
  const lines: string[] = [
    '# RFID Ukraine (rfid.org.ua)',
    '',
    '> Independent engineering platform and technical catalog for UHF RFID, RTLS, NFC, RAIN RFID readers, directional antennas, industrial transponders, and GS1 EPCIS 2.0 middleware.',
    '',
    `- Canonical Origin: ${origin}/`,
    `- Languages (${ORDERED_LANGUAGES.length}): ${ORDERED_LANGUAGES.map((l) => `${l.code} (${l.urlPrefix || '/'})`).join(', ')}`,
    '',
    '## Engineering Equipment & Software Catalog',
    '',
  ];
  for (const item of allItems) {
    const showPrice = computeEffectiveShowPrice(item, settings);
    const priceNote = showPrice && item.price !== null
      ? ` | Price: ${formatCatalogPrice(item.price, item.currency || settings.defaultCurrency, item.priceUnit)}`
      : '';
    lines.push(
      `- [${item.title}](${origin}${item.permalink}) — Lang: \`${item.lang.toUpperCase()}\` | Type: \`${item.catalogType}\`${item.sku ? ` | SKU: \`${item.sku}\`` : ''}${priceNote} | Specs: ${item.specs.length} | Docs: ${item.documents.length}`
    );
    if (item.description) {
      lines.push(`  ${item.description}`);
    }
    for (const doc of item.documents) {
      if (doc.file) {
        lines.push(`  - Datasheet/Doc (${doc.docType}): [${doc.title}](${toAbsoluteSiteUrl(doc.file)})`);
      }
    }
  }
  lines.push('', '## Latest Technical Articles (UK / EN / RU)', '');
  const featured = siteContent.allPosts
    .filter((p) => p.lang === 'uk' || p.lang === 'en' || p.lang === 'ru')
    .slice(0, 15);
  for (const post of featured) {
    lines.push(`- [${post.title}](${origin}${post.permalink}) (\`${post.lang.toUpperCase()}\`) — ${post.description || post.summary}`);
  }
  lines.push('');
  res.type('text/markdown; charset=utf-8').send(lines.join('\n'));
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

// Left Sidebar Builder API (local filesystem mode)
app.use('/api/sidebar-builder', express.json({ limit: '2mb' }));

app.get('/api/sidebar-builder/state', (_req: Request, res: Response) => {
  const sidebarState = loadSidebarState();
  res.json({
    mode: 'local',
    repo: 'yurakas-netizen/rfid-blog',
    branch: 'master',
    exists: sidebarState.exists,
    relPath: sidebarState.relPath,
    fileHash: sidebarState.fileHash,
    config: sidebarState.config,
    defaults: buildDefaultSidebarConfig(),
    siteLanguages: ORDERED_LANGUAGES.map((l) => ({
      code: l.code,
      shortLabel: l.shortLabel,
      label: l.label,
      urlPrefix: l.urlPrefix,
      defaultSubtitle: I18N[l.code].subtitle,
    })),
  });
});

app.post('/api/sidebar-builder/apply', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const result = applySidebarUpdate({
    config: req.body?.config,
    expectedHash: typeof req.body?.expectedHash === 'string' ? req.body.expectedHash : '',
  });
  res.status(result.status).json(result);
});

app.get(['/sidebar-builder', '/sidebar-builder/'], (_req: Request, res: Response) => {
  res.redirect('/admin/sidebar-builder.html');
});

// Multi-Language Anchor-Linked Publisher API (local filesystem mode)
app.use('/api/multilang', express.json({ limit: '25mb' }));

app.get('/api/multilang/state', (_req: Request, res: Response) => {
  res.json(loadMultilangState());
});

app.get('/api/multilang/post', (req: Request, res: Response) => {
  try {
    const relPath = String(req.query.relPath || '').trim();
    const detail = loadMultilangPostDetail(relPath);
    res.json({ ok: true, post: detail });
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
});

app.get('/api/multilang/taxonomy', (_req: Request, res: Response) => {
  res.json({ ok: true, taxonomy: loadTaxonomyDictionary() });
});

app.post('/api/multilang/taxonomy', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const result = saveTaxonomyDictionary(req.body);
  res.status(result.status).json(result);
});

app.post('/api/multilang/publish', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const result = publishMultilangBundle(req.body);
  res.status(result.status).json(result);
});

app.get(['/multilang', '/multilang/'], (_req: Request, res: Response) => {
  res.redirect('/admin/multilang-publisher.html');
});

// Engineering Catalog API (Admin + Uploads + Comments + Member Auth)
app.use('/api/catalog', express.json({ limit: '30mb' }));

app.get('/api/catalog/state', (_req: Request, res: Response) => {
  res.json(loadCatalogAdminState());
});

app.get('/api/catalog/item', (req: Request, res: Response) => {
  try {
    const relPath = String(req.query.relPath || '').trim();
    const detail = loadCatalogDetail(relPath);
    res.json({ ok: true, item: detail });
  } catch (err) {
    res.status(400).json({ ok: false, error: err instanceof Error ? err.message : String(err) });
  }
});

app.post('/api/catalog/save', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const result = saveMultilangCatalogBundle(req.body);
  res.status(result.status).json(result);
});

app.delete('/api/catalog/item', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const relPath = String(req.query.relPath || req.body?.relPath || '').trim();
  const result = deleteCatalogItem(relPath);
  res.status(result.status).json(result);
});

app.post('/api/catalog/settings', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const expectedHash = typeof req.body?.expectedHash === 'string' ? req.body.expectedHash : '';
  const result = saveCatalogSettings(req.body?.settings ?? req.body, expectedHash);
  res.status(result.status).json(result);
});

app.post('/api/catalog/upload', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  try {
    const result = saveCatalogUpload({
      folder: String(req.body?.folder || ''),
      filename: String(req.body?.filename || ''),
      base64: String(req.body?.base64 || ''),
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ ok: false, error: err instanceof Error ? err.message : String(err) });
  }
});

app.get('/api/catalog/team-code/status', (_req: Request, res: Response) => {
  res.json({ ok: true, configured: isTeamAuthConfigured(), envManaged: Boolean(process.env.CATALOG_TEAM_CODE?.trim()) });
});

app.post('/api/catalog/team-code/set', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const result = setTeamAccessCode(String(req.body?.code || ''));
  res.status(result.ok ? 200 : 400).json(result);
});

app.get('/api/catalog/comments', (req: Request, res: Response) => {
  try {
    const key = String(req.query.key || '').trim();
    const isMember = verifyMemberAuthHeader(req.get('authorization'));
    const data = getCommentsForPublic(key, isMember);
    res.json({ ok: true, ...data, isMember });
  } catch (err) {
    res.status(400).json({ ok: false, error: err instanceof Error ? err.message : String(err) });
  }
});

app.post('/api/catalog/comments/auth', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  const code = String(req.body?.code || '');
  if (!isTeamAuthConfigured()) {
    res.status(400).json({ ok: false, error: 'Код доступа команды ещё не настроен в админке' });
    return;
  }
  if (!verifyTeamCode(code)) {
    res.status(401).json({ ok: false, error: 'Неверный код доступа команды' });
    return;
  }
  const token = issueMemberToken();
  res.json({ ok: true, token });
});

app.post('/api/catalog/comments', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  try {
    const isMember = verifyMemberAuthHeader(req.get('authorization'));
    const result = addCatalogComment({
      translationKey: String(req.body?.key || ''),
      lang: String(req.body?.lang || 'uk'),
      author: String(req.body?.author || ''),
      role: String(req.body?.role || ''),
      body: String(req.body?.body || ''),
      isMember,
    });
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ ok: false, error: err instanceof Error ? err.message : String(err) });
  }
});

app.delete('/api/catalog/comments', (req: Request, res: Response) => {
  if (!verifySameOrigin(req)) {
    res.status(403).json({ ok: false, error: 'Запрос отклонён (несовпадение Origin)' });
    return;
  }
  try {
    const key = String(req.query.key || req.body?.key || '').trim();
    const id = String(req.query.id || req.body?.id || '').trim();
    const result = deleteCatalogComment(key, id);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ ok: false, error: err instanceof Error ? err.message : String(err) });
  }
});

app.get(['/catalog-admin', '/catalog-admin/'], (_req: Request, res: Response) => {
  res.redirect('/admin/catalog.html');
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

function handleCatalogBundleAsset(req: Request, res: Response, next: NextFunction) {
  const { itemsByLang } = loadAllCatalogItems();
  const rawSlug = decodeURIComponent(String(req.params.slug || ''));
  const rawFile = path.basename(decodeURIComponent(String(req.params.filename || '')));
  const reqLang = req.params.lang ? String(req.params.lang) : SITE_CONFIG.defaultLanguage;
  if (!isValidLang(reqLang)) {
    next();
    return;
  }
  const item = itemsByLang[reqLang]?.find((it) => it.slug === rawSlug);
  if (!item) {
    next();
    return;
  }
  const assetPath = path.resolve(item.bundleDir, rawFile);
  if (!assetPath.startsWith(item.bundleDir + path.sep) || !fs.existsSync(assetPath) || !fs.statSync(assetPath).isFile()) {
    res.status(404).send('Asset not found');
    return;
  }
  res.sendFile(assetPath);
}

app.get('/catalog/:slug/:filename', handleCatalogBundleAsset);
app.get('/:lang/catalog/:slug/:filename', handleCatalogBundleAsset);

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

// Engineering Catalog Index
app.get(['/catalog', '/catalog/', '/:lang/catalog', '/:lang/catalog/'], async (req: Request, res: Response, next: NextFunction) => {
  const reqLang = req.params.lang ? String(req.params.lang) : undefined;
  if (reqLang && !isValidLang(reqLang)) {
    next();
    return;
  }
  const siteContent = loadSiteContent();
  const lang: LangCode = reqLang && isValidLang(reqLang) ? reqLang : SITE_CONFIG.defaultLanguage;
  const catalogUi = getCatalogUiStrings(lang);
  const { allItems, itemsByLang } = loadAllCatalogItems();
  const settings = loadCatalogSettings().settings;
  const rawItems = itemsByLang[lang] || [];

  const catalogCards = rawItems.map((it) => {
    const showPrice = computeEffectiveShowPrice(it, settings);
    return {
      ...it,
      effectiveShowPrice: showPrice,
      formattedPrice: showPrice ? formatCatalogPrice(it.price, it.currency || settings.defaultCurrency, it.priceUnit) : '',
    };
  });

  // Available catalog languages summary if current branch has 0 items
  const availableCatalogLangs = ORDERED_LANGUAGES
    .filter((l) => (itemsByLang[l.code] || []).length > 0)
    .map((l) => ({
      code: l.code,
      shortLabel: l.shortLabel,
      label: l.label,
      url: `${l.urlPrefix}/catalog/`,
      count: itemsByLang[l.code].length,
    }));

  const fallbackAllCards = rawItems.length === 0
    ? allItems.filter((it) => it.lang === 'en' || it.lang === 'uk').slice(0, 6).map((it) => {
        const showPrice = computeEffectiveShowPrice(it, settings);
        return {
          ...it,
          effectiveShowPrice: showPrice,
          formattedPrice: showPrice ? formatCatalogPrice(it.price, it.currency || settings.defaultCurrency, it.priceUnit) : '',
        };
      })
    : [];

  const sectionUrlPath = req.path.endsWith('/') ? req.path : `${req.path}/`;
  await renderView(res, siteContent, 'catalog-list', lang, {
    activeNav: 'catalog',
    pageTitle: `${catalogUi.sectionTitle} — ${LANGUAGES[lang].title}`,
    pageDescription: catalogUi.sectionSubtitle,
    catalogUi,
    catalogCards,
    catalogList: {
      sectionTitle: catalogUi.sectionTitle,
      sectionUrlPath,
      items: catalogCards,
    },
    availableCatalogLangs,
    fallbackAllCards,
    settings,
  });
});

// Engineering Catalog Item Detail
app.get(['/catalog/:slug', '/catalog/:slug/', '/:lang/catalog/:slug', '/:lang/catalog/:slug/'], async (req: Request, res: Response, next: NextFunction) => {
  const reqLang = req.params.lang ? String(req.params.lang) : SITE_CONFIG.defaultLanguage;
  if (!isValidLang(reqLang)) {
    next();
    return;
  }
  const siteContent = loadSiteContent();
  const rawSlug = decodeURIComponent(String(req.params.slug || ''));
  const { allItems, itemsByLang } = loadAllCatalogItems();
  const settings = loadCatalogSettings().settings;
  const item = itemsByLang[reqLang]?.find((it) => it.slug === rawSlug);

  if (!item) {
    await renderView(res, siteContent, '404', reqLang, { pageTitle: I18N[reqLang].pageNotFound }, 404);
    return;
  }

  const resolved = resolveCatalogItemForRender(item, allItems, siteContent, settings);
  const catalogUi = getCatalogUiStrings(item.lang);

  await renderView(res, siteContent, 'catalog-item', item.lang, {
    activeNav: 'catalog',
    isArticle: true,
    pageTitle: `${item.title} — ${LANGUAGES[item.lang].title}`,
    pageDescription: item.description || item.summary,
    catalogUi,
    resolved,
    toc: item.toc,
    languagesMap: LANGUAGES,
  });
});

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
