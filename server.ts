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
  slugify,
  type PostItem,
  type SiteContent,
} from './src/content.js';
import { buildStylesheet } from './src/styles.js';

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
  return {
    uk: siteContent.postsByLang.uk.length,
    en: siteContent.postsByLang.en.length,
    da: siteContent.postsByLang.da.length,
    de: siteContent.postsByLang.de.length,
    fr: siteContent.postsByLang.fr.length,
    ru: siteContent.postsByLang.ru.length,
  };
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
  const html = await ejs.renderFile(path.join(viewsDir, `${viewName}.ejs`), ctx);
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
    await renderView(res, siteContent, 'article', post.lang, {
      activeNav: 'home',
      isArticle: true,
      pageTitle: `${post.title} — ${LANGUAGES[post.lang].title}`,
      pageDescription: post.description || post.summary,
      post,
      toc: post.toc,
      relatedPosts,
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

  await renderView(res, siteContent, 'index', lang, {
    activeNav: 'home',
    pageTitle: `${LANGUAGES[lang].title} — ${I18N[lang].subtitle}`,
    pageDescription: I18N[lang].subtitle,
    posts,
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
