export type LangCode = 'uk' | 'en' | 'da' | 'de' | 'fr' | 'ru';

export interface LanguageConfig {
  code: LangCode;
  label: string;
  shortLabel: string;
  direction: 'ltr' | 'rtl';
  title: string;
  contentDir: string;
  weight: number;
  urlPrefix: string;
}

export interface I18nStrings {
  subtitle: string;
  home: string;
  archives: string;
  search: string;
  links: string;
  categories: string;
  tags: string;
  tagCloud: string;
  toc: string;
  darkMode: string;
  lightMode: string;
  minRead: string;
  wordsLabel: string;
  searchPlaceholder: string;
  searchButton: string;
  searchHint: string;
  noResults: string;
  resultsFound: string;
  allPosts: string;
  relatedPosts: string;
  postsLabel: string;
  prevPage: string;
  nextPage: string;
  backToHome: string;
  pageNotFound: string;
  pageNotFoundDesc: string;
  languageLabel: string;
  noPostsInLang: string;
  emptyDocsHint: string;
  availableLangs: string;
  noLinks: string;
  updatedOn: string;
  tableOfContents: string;
  adminCms: string;
}

export const SITE_CONFIG = {
  baseUrl: process.env.SITE_URL || 'https://ua-rfid.netlify.app',
  defaultLanguage: 'uk' as LangCode,
  defaultContentLanguageInSubdir: false,
  title: 'RFID Ukraine',
  shortTitle: 'RFID Ukraine',
  emoji: '',
  avatar: '/assets/img/logo-outline.svg',
  favicon: '/static/admin/favicon.svg',
  faviconPng: '/assets/img/favicon.png',
  pagerSize: 5,
  footerSince: 2026,
  license: 'MIT License',
  colorSchemeDefault: 'dark' as 'dark' | 'light',
  colorSchemeToggle: true,
  widgets: {
    archivesLimit: 5,
    categoriesLimit: 10,
    tagCloudLimit: 10,
  },
};

export const LANGUAGES: Record<LangCode, LanguageConfig> = {
  uk: {
    code: 'uk',
    label: 'Українська (UA)',
    shortLabel: 'UA',
    direction: 'ltr',
    title: 'RFID Ukraine',
    contentDir: 'content/uk',
    weight: 1,
    urlPrefix: '',
  },
  en: {
    code: 'en',
    label: 'English (EN)',
    shortLabel: 'EN',
    direction: 'ltr',
    title: 'RFID Ukraine',
    contentDir: 'content/en',
    weight: 2,
    urlPrefix: '/en',
  },
  da: {
    code: 'da',
    label: 'Dansk (DA)',
    shortLabel: 'DA',
    direction: 'ltr',
    title: 'RFID Ukraine',
    contentDir: 'content/da',
    weight: 3,
    urlPrefix: '/da',
  },
  de: {
    code: 'de',
    label: 'Deutsch (DE)',
    shortLabel: 'DE',
    direction: 'ltr',
    title: 'RFID Ukraine',
    contentDir: 'content/de',
    weight: 4,
    urlPrefix: '/de',
  },
  fr: {
    code: 'fr',
    label: 'Français (FR)',
    shortLabel: 'FR',
    direction: 'ltr',
    title: 'RFID Ukraine',
    contentDir: 'content/fr',
    weight: 5,
    urlPrefix: '/fr',
  },
  ru: {
    code: 'ru',
    label: 'Русский (RU)',
    shortLabel: 'RU',
    direction: 'ltr',
    title: 'RFID Ukraine',
    contentDir: 'content/ru',
    weight: 6,
    urlPrefix: '/ru',
  },
};

export const ORDERED_LANGUAGES: LanguageConfig[] = Object.values(LANGUAGES).sort(
  (a, b) => a.weight - b.weight
);

export const I18N: Record<LangCode, I18nStrings> = {
  uk: {
    subtitle: 'Інженерна платформа UHF RFID, RTLS та IIoT',
    home: 'Головна',
    archives: 'Архіви',
    search: 'Пошук',
    links: 'Посилання',
    categories: 'Категорії',
    tags: 'Теги',
    tagCloud: 'Хмара тегів',
    toc: 'Зміст',
    darkMode: 'Темна тема',
    lightMode: 'Світла тема',
    minRead: 'хв читання',
    wordsLabel: 'слів',
    searchPlaceholder: 'Введіть запит...',
    searchButton: 'Шукати',
    searchHint: 'Пошук за заголовками, текстом, категоріями та тегами',
    noResults: 'Нічого не знайдено.',
    resultsFound: 'Знайдено результатів:',
    allPosts: 'Усі публікації',
    relatedPosts: 'Пов’язані документи',
    postsLabel: 'Документи',
    prevPage: 'Назад',
    nextPage: 'Далі',
    backToHome: 'На головну',
    pageNotFound: '404 — Сторінку не знайдено',
    pageNotFoundDesc: 'Запитана сторінка відсутня або була переміщена.',
    languageLabel: 'Мова',
    noPostsInLang: 'У цій мовній версії поки що немає документів.',
    emptyDocsHint: 'Додайте нові Markdown-документи у каталог content/uk/post/ або через CMS.',
    availableLangs: 'Доступні документи іншими мовами:',
    noLinks: 'Список зовнішніх посилань поки що порожній.',
    updatedOn: 'Оновлено',
    tableOfContents: 'Зміст статті',
    adminCms: 'Адмінка (CMS)',
  },
  ru: {
    subtitle: 'Инженерная платформа UHF RFID, RTLS и IIoT',
    home: 'Главная',
    archives: 'Архивы',
    search: 'Поиск',
    links: 'Ссылки',
    categories: 'Категории',
    tags: 'Теги',
    tagCloud: 'Облако тегов',
    toc: 'Содержание',
    darkMode: 'Тёмная тема',
    lightMode: 'Светлая тема',
    minRead: 'мин чтения',
    wordsLabel: 'слов',
    searchPlaceholder: 'Введите запрос...',
    searchButton: 'Найти',
    searchHint: 'Поиск по заголовкам, тексту, категориям и тегам',
    noResults: 'Ничего не найдено.',
    resultsFound: 'Найдено результатов:',
    allPosts: 'Все публикации',
    relatedPosts: 'Связанные документы',
    postsLabel: 'Документы',
    prevPage: 'Назад',
    nextPage: 'Далее',
    backToHome: 'На главную',
    pageNotFound: '404 — Страница не найдена',
    pageNotFoundDesc: 'Запрашиваемая страница не существует или была перемещена.',
    languageLabel: 'Язык',
    noPostsInLang: 'В этой языковой версии пока нет документов.',
    emptyDocsHint: 'Добавьте новые Markdown-документы в каталог content/ru/post/ или через CMS.',
    availableLangs: 'Доступные документы на других языках:',
    noLinks: 'Список внешних ссылок пока пуст.',
    updatedOn: 'Обновлено',
    tableOfContents: 'Содержание статьи',
    adminCms: 'Админка (CMS)',
  },
  en: {
    subtitle: 'UHF RFID, RTLS & IIoT Engineering Platform',
    home: 'Home',
    archives: 'Archives',
    search: 'Search',
    links: 'Links',
    categories: 'Categories',
    tags: 'Tags',
    tagCloud: 'Tag Cloud',
    toc: 'Table of Contents',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    minRead: 'min read',
    wordsLabel: 'words',
    searchPlaceholder: 'Type something...',
    searchButton: 'Search',
    searchHint: 'Search across titles, descriptions, categories, and tags',
    noResults: 'No results found.',
    resultsFound: 'Results found:',
    allPosts: 'All Documents',
    relatedPosts: 'Related Documents',
    postsLabel: 'Documents',
    prevPage: 'Previous',
    nextPage: 'Next',
    backToHome: 'Back to Home',
    pageNotFound: '404 — Page Not Found',
    pageNotFoundDesc: 'The requested page does not exist or has been moved.',
    languageLabel: 'Language',
    noPostsInLang: 'No documents have been published in this language yet.',
    emptyDocsHint: 'Add new Markdown documents in content/en/post/ or via the CMS.',
    availableLangs: 'Available documents in other languages:',
    noLinks: 'No external links configured yet.',
    updatedOn: 'Updated',
    tableOfContents: 'Table of Contents',
    adminCms: 'Admin (CMS)',
  },
  da: {
    subtitle: 'UHF RFID, RTLS & IIoT-ingeniørplatform',
    home: 'Hjem',
    archives: 'Arkiv',
    search: 'Søg',
    links: 'Links',
    categories: 'Kategorier',
    tags: 'Tags',
    tagCloud: 'Tag-sky',
    toc: 'Indholdsfortegnelse',
    darkMode: 'Mørkt tema',
    lightMode: 'Lyst tema',
    minRead: 'min læsning',
    wordsLabel: 'ord',
    searchPlaceholder: 'Skriv søgeord...',
    searchButton: 'Søg',
    searchHint: 'Søg i titler, tekst, kategorier og tags',
    noResults: 'Ingen resultater fundet.',
    resultsFound: 'Resultater fundet:',
    allPosts: 'Alle dokumenter',
    relatedPosts: 'Relaterede dokumenter',
    postsLabel: 'Dokumenter',
    prevPage: 'Forrige',
    nextPage: 'Næste',
    backToHome: 'Tilbage til forsiden',
    pageNotFound: '404 — Side ikke fundet',
    pageNotFoundDesc: 'Den ønskede side findes ikke eller er blevet flyttet.',
    languageLabel: 'Sprog',
    noPostsInLang: 'Der er endnu ingen dokumenter på dette sprog.',
    emptyDocsHint: 'Tilføj nye Markdown-dokumenter i content/da/post/ eller via CMS.',
    availableLangs: 'Tilgængelige dokumenter på andre sprog:',
    noLinks: 'Ingen eksterne links konfigureret endnu.',
    updatedOn: 'Opdateret',
    tableOfContents: 'Indholdsfortegnelse',
    adminCms: 'Admin (CMS)',
  },
  de: {
    subtitle: 'Ingenieurplattform für UHF RFID, RTLS & IIoT',
    home: 'Startseite',
    archives: 'Archiv',
    search: 'Suche',
    links: 'Links',
    categories: 'Kategorien',
    tags: 'Schlagwörter',
    tagCloud: 'Schlagwortwolke',
    toc: 'Inhaltsverzeichnis',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
    minRead: 'Min. Lesezeit',
    wordsLabel: 'Wörter',
    searchPlaceholder: 'Suchbegriff eingeben...',
    searchButton: 'Suchen',
    searchHint: 'Suche in Titeln, Texten, Kategorien und Schlagwörtern',
    noResults: 'Keine Ergebnisse gefunden.',
    resultsFound: 'Ergebnisse gefunden:',
    allPosts: 'Alle Dokumente',
    relatedPosts: 'Verwandte Dokumente',
    postsLabel: 'Dokumente',
    prevPage: 'Zurück',
    nextPage: 'Weiter',
    backToHome: 'Zur Startseite',
    pageNotFound: '404 — Seite nicht gefunden',
    pageNotFoundDesc: 'Die angeforderte Seite existiert nicht oder wurde verschoben.',
    languageLabel: 'Sprache',
    noPostsInLang: 'In dieser Sprache sind noch keine Dokumente vorhanden.',
    emptyDocsHint: 'Fügen Sie neue Markdown-Dokumente unter content/de/post/ oder über das CMS hinzu.',
    availableLangs: 'Verfügbare Dokumente in anderen Sprachen:',
    noLinks: 'Noch keine externen Links hinterlegt.',
    updatedOn: 'Aktualisiert',
    tableOfContents: 'Inhaltsverzeichnis',
    adminCms: 'Admin (CMS)',
  },
  fr: {
    subtitle: 'Plateforme d’ingénierie UHF RFID, RTLS & IIoT',
    home: 'Accueil',
    archives: 'Archives',
    search: 'Recherche',
    links: 'Liens',
    categories: 'Catégories',
    tags: 'Étiquettes',
    tagCloud: 'Nuage de tags',
    toc: 'Table des matières',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    minRead: 'min de lecture',
    wordsLabel: 'mots',
    searchPlaceholder: 'Rechercher...',
    searchButton: 'Rechercher',
    searchHint: 'Rechercher dans les titres, textes, catégories et tags',
    noResults: 'Aucun résultat trouvé.',
    resultsFound: 'Résultats trouvés :',
    allPosts: 'Tous les documents',
    relatedPosts: 'Documents associés',
    postsLabel: 'Documents',
    prevPage: 'Précédent',
    nextPage: 'Suivant',
    backToHome: 'Retour à l’accueil',
    pageNotFound: '404 — Page introuvable',
    pageNotFoundDesc: 'La page demandée n’existe pas ou a été déplacée.',
    languageLabel: 'Langue',
    noPostsInLang: 'Aucun document publié dans cette langue pour le moment.',
    emptyDocsHint: 'Ajoutez de nouveaux documents Markdown dans content/fr/post/ ou via le CMS.',
    availableLangs: 'Documents disponibles dans d’autres langues :',
    noLinks: 'Aucun lien externe configuré pour le moment.',
    updatedOn: 'Mis à jour',
    tableOfContents: 'Table des matières',
    adminCms: 'Admin (CMS)',
  },
};

export function isValidLang(val: string | undefined): val is LangCode {
  return Boolean(val && val in LANGUAGES);
}

export function formatDate(date: Date, lang: LangCode): string {
  const localeMap: Record<LangCode, string> = {
    uk: 'uk-UA',
    ru: 'ru-RU',
    en: 'en-US',
    da: 'da-DK',
    de: 'de-DE',
    fr: 'fr-FR',
  };
  try {
    return new Intl.DateTimeFormat(localeMap[lang] || 'uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}
