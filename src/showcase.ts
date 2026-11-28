import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {
  LANGUAGES,
  ORDERED_LANGUAGES,
  isValidLang,
  type LangCode,
} from './config.js';
import { computeTaxonomies, slugify, type PostItem, type SiteContent } from './content.js';
import { getHiddenHubLangs, loadSidebarConfig } from './sidebar.js';

const ROOT_DIR = process.cwd();
const DATA_HOME_ROOT = path.resolve(ROOT_DIR, 'data', 'home');
const DATA_HOME_REL_RE = /^data\/home\/([a-z]{2})\.json$/;

export interface ShowcaseMetric {
  value: string;
  label: string;
}

export interface ShowcaseHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  metrics: ShowcaseMetric[];
}

export interface ShowcaseFeatured {
  enabled: boolean;
  heading: string;
  subtitle: string;
  mode: 'auto' | 'manual';
  postSlugs: string[];
  limit: number;
}

export type ShowcaseFilterType = 'category' | 'tag' | 'translationKey' | 'manual' | 'latest';
export type ShowcaseTrackLayout = 'grid' | 'compact';

export interface ShowcaseTrack {
  id: string;
  title: string;
  description: string;
  filterType: ShowcaseFilterType;
  filterValue: string;
  postSlugs: string[];
  limit: number;
  layout: ShowcaseTrackLayout;
  linkLabel: string;
  linkUrl: string;
}

export interface ShowcaseLatest {
  enabled: boolean;
  heading: string;
  subtitle: string;
  limit: number;
  archiveLabel: string;
  archiveUrl: string;
}

export interface ShowcaseCta {
  enabled: boolean;
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
  secondaryLabel: string;
  secondaryUrl: string;
}

export interface ShowcaseConfig {
  version: 1;
  lang: LangCode;
  hero: ShowcaseHero;
  featured: ShowcaseFeatured;
  tracks: ShowcaseTrack[];
  latest: ShowcaseLatest;
  cta: ShowcaseCta;
}

export interface ResolvedTrack extends ShowcaseTrack {
  posts: PostItem[];
  resolvedLinkUrl: string;
}

export interface ResolvedShowcase {
  config: ShowcaseConfig;
  leadPost: PostItem | null;
  secondaryPosts: PostItem[];
  tracks: ResolvedTrack[];
  latestPosts: PostItem[];
  totalLangPosts: number;
  populatedLangs: Array<{ code: LangCode; shortLabel: string; label: string; urlPrefix: string; count: number }>;
  existingImagesMap: Record<string, boolean>;
}

interface LocaleShowcaseDictionary {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreArchive: string;
  searchDocs: string;
  metricDocs: string;
  metricTopics: string;
  metricBandValue: string;
  metricBandLabel: string;
  featuredHeading: string;
  featuredSubtitle: string;
  latestHeading: string;
  latestSubtitle: string;
  archiveAllLabel: string;
  allInTrackLabel: string;
  trackTopicPrefix: string;
  trackTopicDesc: string;
  trackCatDesc: string;
  trackLatestTitle: string;
  trackLatestDesc: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  ctaSecBtn: string;
  emptyBranchTitle: string;
  emptyBranchDesc: string;
  availableEditions: string;
}

const SHOWCASE_I18N: Record<LangCode, LocaleShowcaseDictionary> = {
  uk: {
    eyebrow: 'Інженерна база знань · UHF RFID · RTLS · IIoT',
    heroTitle: 'Прикладна інженерія промислової ідентифікації та радіочастотних систем',
    heroSubtitle:
      'Технічні розбори стандартів EPC Gen2v2, розрахунки RF-бюджету, кейси впровадження на металі, у фармацевтиці, логістиці та ЦОД.',
    exploreArchive: 'Архів публікацій',
    searchDocs: 'Пошук за стандартами',
    metricDocs: 'Публікацій у гілці',
    metricTopics: 'Інженерних тегів',
    metricBandValue: '865–928 МГц',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Ключові інженерні матеріали',
    featuredSubtitle: 'Добірка базових архітектурних рішень та польових досліджень',
    latestHeading: 'Останні технічні нотатки',
    latestSubtitle: 'Нові матеріали, стандарти та результати випробувань',
    archiveAllLabel: 'Усі публікації архіву',
    allInTrackLabel: 'Усі матеріали напряму',
    trackTopicPrefix: 'Напрям:',
    trackTopicDesc: 'Прикладні технічні рішення та стандарти за темою',
    trackCatDesc: 'Добірка інженерних матеріалів рубрики',
    trackLatestTitle: 'Огляди галузевих рішень',
    trackLatestDesc: 'Системна інтеграція UHF RFID у виробничих та логістичних контурах',
    ctaEyebrow: 'Інженерна консультація',
    ctaTitle: 'Потрібен розрахунок RF-зони або аудит інфраструктури?',
    ctaDesc: 'Допоможемо підібрати транспондери, антени та архітектуру зчитування під реальні умови металу, вологи та температури.',
    ctaBtn: 'Написати інженеру',
    ctaSecBtn: 'Відкрити пошук',
    emptyBranchTitle: 'Українська гілка вітрини готується до наповнення',
    emptyBranchDesc: 'Макет вітрини вже синхронізований. Ви можете перейти до активних мовних версій або додати матеріали через CMS.',
    availableEditions: 'Активні мовні розділи:',
  },
  ru: {
    eyebrow: 'Инженерная база знаний · UHF RFID · RTLS · IIoT',
    heroTitle: 'Прикладная инженерия промышленной идентификации и радиочастотных систем',
    heroSubtitle:
      'Технические разборы стандартов EPC Gen2v2, расчёты RF-бюджета, кейсы внедрения на металле, в фармацевтике, логистике и ЦОД.',
    exploreArchive: 'Архив публикаций',
    searchDocs: 'Поиск по стандартам',
    metricDocs: 'Материалов в ветке',
    metricTopics: 'Инженерных тегов',
    metricBandValue: '865–928 МГц',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Ключевые инженерные материалы',
    featuredSubtitle: 'Подборка базовых архитектурных решений и полевых испытаний',
    latestHeading: 'Последние технические материалы',
    latestSubtitle: 'Свежие разборы, стандарты и прикладные кейсы',
    archiveAllLabel: 'Все публикации в архиве',
    allInTrackLabel: 'Все материалы раздела',
    trackTopicPrefix: 'Трек:',
    trackTopicDesc: 'Прикладные технические решения и стандарты по направлению',
    trackCatDesc: 'Подборка инженерных материалов рубрики',
    trackLatestTitle: 'Отраслевые решения RFID',
    trackLatestDesc: 'Системная интеграция UHF RFID в производственных и логистических контурах',
    ctaEyebrow: 'Инженерная консультация',
    ctaTitle: 'Нужен расчёт RF-зоны или аудит оборудования?',
    ctaDesc: 'Поможем подобрать транспондеры, антенны и архитектуру считывания под металл, влагу, вибрацию и высокие температуры.',
    ctaBtn: 'Связаться с инженером',
    ctaSecBtn: 'Открыть поиск',
    emptyBranchTitle: 'Русскоязычная ветка витрины готова к наполнению',
    emptyBranchDesc: 'Структура витрины синхронизирована со всеми локалями. Перейдите в заполненные языковые разделы или добавьте статьи через CMS.',
    availableEditions: 'Доступные языковые разделы:',
  },
  en: {
    eyebrow: 'Engineering Knowledge Base · UHF RFID · RTLS · IIoT',
    heroTitle: 'Applied Engineering for Industrial Identification and RF Systems',
    heroSubtitle:
      'Deep technical analyses of EPC Gen2v2, RF link budgets, near-field UHF architectures, high-temp transponders, and sterile cleanroom deployments.',
    exploreArchive: 'Browse Archive',
    searchDocs: 'Search Standards',
    metricDocs: 'Published Articles',
    metricTopics: 'Technical Tags',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / Ofcom / FCC',
    featuredHeading: 'Featured Engineering Briefs',
    featuredSubtitle: 'Core architectural benchmarks and production deployment studies',
    latestHeading: 'Latest Technical Publications',
    latestSubtitle: 'Recent specifications, standards compliance, and test benches',
    archiveAllLabel: 'View full archive',
    allInTrackLabel: 'Explore topic',
    trackTopicPrefix: 'Focus:',
    trackTopicDesc: 'Curated specifications and deployment blueprints for',
    trackCatDesc: 'Curated engineering articles in',
    trackLatestTitle: 'Industrial RFID Deployments',
    trackLatestDesc: 'Production-tested transponder and reader architectures across critical environments',
    ctaEyebrow: 'Engineering Advisory',
    ctaTitle: 'Planning an RF zone study or harsh-environment tag selection?',
    ctaDesc: 'Discuss link margins, on-metal isolation, autoclave durability, and EPCIS integration directly with our engineering team.',
    ctaBtn: 'Contact Engineering',
    ctaSecBtn: 'Search Library',
    emptyBranchTitle: 'This language edition is ready for curated publications',
    emptyBranchDesc: 'The showcase layout is active across all locales. Explore populated editions below or publish new articles via the CMS.',
    availableEditions: 'Populated editions:',
  },
  da: {
    eyebrow: 'Ingeniørvidensbase · UHF RFID · RTLS · Ambient IoT',
    heroTitle: 'Anvendt ingeniørkunst til industriel identifikation og RF-systemer',
    heroSubtitle:
      'Tekniske analyser af UHF RFID, Ambient IoT, CSRD Scope 3, kølekæde-TCO og sporbarhed i barske industrielle miljøer.',
    exploreArchive: 'Se arkiv',
    searchDocs: 'Søg i standarder',
    metricDocs: 'Artikler i sektion',
    metricTopics: 'Tekniske tags',
    metricBandValue: '865–868 MHz',
    metricBandLabel: 'ETSI EN 302 208',
    featuredHeading: 'Udvalgte ingeniøranalyser',
    featuredSubtitle: 'Centrale arkitekturer, TCO-beregninger og feltvalidering',
    latestHeading: 'Seneste tekniske publikationer',
    latestSubtitle: 'Nye artikler, standarder og industrielle referencecases',
    archiveAllLabel: 'Se hele arkivet',
    allInTrackLabel: 'Se alle i sporet',
    trackTopicPrefix: 'Spor:',
    trackTopicDesc: 'Udvalgte tekniske løsninger og standarder inden for',
    trackCatDesc: 'Udvalgte ingeniørartikler under',
    trackLatestTitle: 'Industrielle RFID- og IoT-løsninger',
    trackLatestDesc: 'Dokumenterede arkitekturer til logistik, produktion og energiinfrastruktur',
    ctaEyebrow: 'Teknisk rådgivning',
    ctaTitle: 'Brug for RF-dækningsanalyse eller valg af industritags?',
    ctaDesc: 'Vi rådgiver om antennegeometri, linkbudget, batterifri sensorer og GS1 EPCIS-integration.',
    ctaBtn: 'Kontakt ingeniørteam',
    ctaSecBtn: 'Søg i dokumenter',
    emptyBranchTitle: 'Denne sprogsektion er klar til publikationer',
    emptyBranchDesc: 'Forsidens layout er aktivt på tværs af alle sprog.',
    availableEditions: 'Aktive sprogudgaver:',
  },
  de: {
    eyebrow: 'Ingenieur-Wissensdatenbank · UHF RFID · RTLS · IIoT',
    heroTitle: 'Angewandte Systemtechnik für industrielle Identifikation & RF-Physik',
    heroSubtitle:
      'Technische Tiefenanalysen zu EPC Gen2v2, Hochtemperatur-Keramiktranspondern, IATF 16949, EU-GMP, DIN EN 17230 und Ambient IoT.',
    exploreArchive: 'Archiv öffnen',
    searchDocs: 'Nach Normen suchen',
    metricDocs: 'Fachbeiträge',
    metricTopics: 'Technische Tags',
    metricBandValue: '865–868 MHz',
    metricBandLabel: 'ETSI EN 302 208',
    featuredHeading: 'Ausgewählte Systemanalysen',
    featuredSubtitle: 'Referenzarchitekturen für Fertigung, Luftfahrt, Pharma und Rechenzentren',
    latestHeading: 'Aktuelle Fachpublikationen',
    latestSubtitle: 'Alle kürzlich veröffentlichten Analysen und Normenberichte',
    archiveAllLabel: 'Gesamtes Archiv ansehen',
    allInTrackLabel: 'Alle Beiträge im Fokus',
    trackTopicPrefix: 'Fokus:',
    trackTopicDesc: 'Spezialisierte Systemanalysen und Normen zu',
    trackCatDesc: 'Kuratierte Fachartikel aus der Rubrik',
    trackLatestTitle: 'Industrielle Einsatzszenarien',
    trackLatestDesc: 'Praxiserprobte Transponder- und Antennenkonzepte für raue Umgebungen',
    ctaEyebrow: 'Technische Beratung',
    ctaTitle: 'Planen Sie eine RF-Feldausleuchtung oder Transponder-Qualifizierung?',
    ctaDesc: 'Unterstützung bei Miller-M4-Konfiguration, Autoklav- und Metallumgebungen sowie GS1-EPCIS-2.0-Anbindung.',
    ctaBtn: 'Ingenieur kontaktieren',
    ctaSecBtn: 'Fachsuche öffnen',
    emptyBranchTitle: 'Dieser Sprachzweig ist für Fachbeiträge vorbereitet',
    emptyBranchDesc: 'Das Showcase-Layout ist für alle Sprachversionen aktiv.',
    availableEditions: 'Verfügbare Sprachausgaben:',
  },
  fr: {
    eyebrow: 'Base d’ingénierie · UHF RFID · RTLS · IIoT',
    heroTitle: 'Ingénierie appliquée de l’identification industrielle et des systèmes RF',
    heroSubtitle: 'Analyses techniques EPC Gen2v2, budgets de liaison RF, traçabilité sur métal, chaîne du froid et automatisation IIoT.',
    exploreArchive: 'Explorer les archives',
    searchDocs: 'Rechercher',
    metricDocs: 'Articles publiés',
    metricTopics: 'Tags techniques',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Dossiers d’ingénierie sélectionnés',
    featuredSubtitle: 'Architectures de référence et retours d’expérience terrain',
    latestHeading: 'Dernières publications techniques',
    latestSubtitle: 'Spécifications récentes, normes et cas industriels',
    archiveAllLabel: 'Voir toutes les archives',
    allInTrackLabel: 'Explorer la thématique',
    trackTopicPrefix: 'Axe :',
    trackTopicDesc: 'Solutions techniques et normes dédiées à',
    trackCatDesc: 'Articles d’ingénierie dans',
    trackLatestTitle: 'Déploiements RFID industriels',
    trackLatestDesc: 'Intégration UHF RFID en environnements exigeants',
    ctaEyebrow: 'Conseil en ingénierie',
    ctaTitle: 'Besoin d’une étude RF ou d’un choix de transpondeurs ?',
    ctaDesc: 'Accompagnement sur l’architecture d’antennes, les milieux métalliques et l’intégration EPCIS.',
    ctaBtn: 'Contacter un ingénieur',
    ctaSecBtn: 'Rechercher',
    emptyBranchTitle: 'Cette édition linguistique est prête à être alimentée',
    emptyBranchDesc: 'La vitrine est active sur toutes les langues du portail.',
    availableEditions: 'Éditions actives :',
  },
  pl: {
    eyebrow: 'Baza wiedzy inżynieryjnej · UHF RFID · RTLS · IIoT',
    heroTitle: 'Inżynieria stosowana przemysłowej identyfikacji i systemów RF',
    heroSubtitle: 'Analizy techniczne EPC Gen2v2, budżety łącza RF, wdrożenia na metalu, w farmacji, logistyce i centrach danych.',
    exploreArchive: 'Przeglądaj archiwum',
    searchDocs: 'Szukaj standardów',
    metricDocs: 'Publikacji',
    metricTopics: 'Tagów technicznych',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Kluczowe opracowania inżynieryjne',
    featuredSubtitle: 'Wybrane architektury referencyjne i badania terenowe',
    latestHeading: 'Najnowsze publikacje techniczne',
    latestSubtitle: 'Bieżące analizy, normy i wdrożenia przemysłowe',
    archiveAllLabel: 'Zobacz całe archiwum',
    allInTrackLabel: 'Zobacz kierunek',
    trackTopicPrefix: 'Ścieżka:',
    trackTopicDesc: 'Rozwiązania techniczne i normy w obszarze',
    trackCatDesc: 'Wybrane artykuły w kategorii',
    trackLatestTitle: 'Przemysłowe wdrożenia RFID',
    trackLatestDesc: 'Sprawdzone architektury transponderów i czytników UHF',
    ctaEyebrow: 'Konsultacje inżynieryjne',
    ctaTitle: 'Potrzebujesz analizy strefy RF lub doboru transponderów?',
    ctaDesc: 'Pomagamy w doborze anten, tagów wysokotemperaturowych oraz integracji EPCIS 2.0.',
    ctaBtn: 'Kontakt z inżynierem',
    ctaSecBtn: 'Otwórz wyszukiwanie',
    emptyBranchTitle: 'Ta wersja językowa jest gotowa na publikacje',
    emptyBranchDesc: 'Układ witryny jest aktywny dla wszystkich wersji językowych.',
    availableEditions: 'Aktywne wersje językowe:',
  },
  es: {
    eyebrow: 'Base de Ingeniería · UHF RFID · RTLS · IIoT',
    heroTitle: 'Ingeniería aplicada para identificación industrial y sistemas RF',
    heroSubtitle: 'Análisis técnicos de EPC Gen2v2, balance de enlace RF, trazabilidad sobre metal, cadena de frío y automatización IIoT.',
    exploreArchive: 'Explorar archivo',
    searchDocs: 'Buscar normas',
    metricDocs: 'Publicaciones',
    metricTopics: 'Etiquetas técnicas',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Informes de ingeniería destacados',
    featuredSubtitle: 'Arquitecturas de referencia y estudios de campo',
    latestHeading: 'Últimas publicaciones técnicas',
    latestSubtitle: 'Especificaciones recientes, estándares y casos reales',
    archiveAllLabel: 'Ver archivo completo',
    allInTrackLabel: 'Explorar área',
    trackTopicPrefix: 'Área:',
    trackTopicDesc: 'Soluciones técnicas y estándares en',
    trackCatDesc: 'Artículos seleccionados en',
    trackLatestTitle: 'Despliegues RFID industriales',
    trackLatestDesc: 'Integración de UHF RFID en entornos exigentes',
    ctaEyebrow: 'Asesoría técnica',
    ctaTitle: '¿Necesita un estudio de cobertura RF o selección de tags?',
    ctaDesc: 'Asesoramiento en antenas, etiquetas sobre metal, alta temperatura e integración GS1 EPCIS.',
    ctaBtn: 'Contactar ingeniería',
    ctaSecBtn: 'Buscar documentos',
    emptyBranchTitle: 'Esta edición lingüística está lista para publicar contenido',
    emptyBranchDesc: 'La estructura del escaparate está activa en todos los idiomas.',
    availableEditions: 'Ediciones con contenido:',
  },
  it: {
    eyebrow: 'Knowledge Base Ingegneristica · UHF RFID · RTLS · IIoT',
    heroTitle: 'Ingegneria applicata per identificazione industriale e sistemi RF',
    heroSubtitle: 'Analisi tecniche EPC Gen2v2, link budget RF, tag su metallo, catena del freddo e automazione IIoT.',
    exploreArchive: 'Esplora archivio',
    searchDocs: 'Cerca standard',
    metricDocs: 'Articoli',
    metricTopics: 'Tag tecnici',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Approfondimenti in evidenza',
    featuredSubtitle: 'Architetture di riferimento e test sul campo',
    latestHeading: 'Ultime pubblicazioni tecniche',
    latestSubtitle: 'Specifiche recenti, normative e casi applicativi',
    archiveAllLabel: 'Vedi tutto l’archivio',
    allInTrackLabel: 'Vedi percorso',
    trackTopicPrefix: 'Percorso:',
    trackTopicDesc: 'Soluzioni tecniche e standard per',
    trackCatDesc: 'Articoli selezionati in',
    trackLatestTitle: 'Soluzioni RFID industriali',
    trackLatestDesc: 'Architetture UHF RFID validate in ambienti critici',
    ctaEyebrow: 'Consulenza tecnica',
    ctaTitle: 'Serve un dimensionamento RF o la scelta dei transponder?',
    ctaDesc: 'Supporto su antenne, ambienti metallici, alte temperature e integrazione EPCIS.',
    ctaBtn: 'Contatta un ingegnere',
    ctaSecBtn: 'Apri ricerca',
    emptyBranchTitle: 'Questa edizione è pronta per nuovi articoli',
    emptyBranchDesc: 'La vetrina è attiva su tutte le lingue del portale.',
    availableEditions: 'Edizioni attive:',
  },
  nl: {
    eyebrow: 'Engineering Kennisbank · UHF RFID · RTLS · IIoT',
    heroTitle: 'Toegepaste engineering voor industriële identificatie en RF-systemen',
    heroSubtitle: 'Technische analyses van EPC Gen2v2, RF-linkbudgetten, on-metal tags, koelketens en IIoT-automatisering.',
    exploreArchive: 'Bekijk archief',
    searchDocs: 'Zoek normen',
    metricDocs: 'Artikelen',
    metricTopics: 'Technische tags',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Uitgelichte engineering-dossiers',
    featuredSubtitle: 'Referentiearchitecturen en praktijkmetingen',
    latestHeading: 'Nieuwste technische publicaties',
    latestSubtitle: 'Recente specificaties, normen en praktijkcases',
    archiveAllLabel: 'Volledig archief',
    allInTrackLabel: 'Bekijk thema',
    trackTopicPrefix: 'Thema:',
    trackTopicDesc: 'Technische oplossingen en normen voor',
    trackCatDesc: 'Geselecteerde artikelen in',
    trackLatestTitle: 'Industriële RFID-toepassingen',
    trackLatestDesc: 'Bewezen UHF RFID-architecturen voor veeleisende omgevingen',
    ctaEyebrow: 'Technisch advies',
    ctaTitle: 'RF-zonestudie of transponderselectie nodig?',
    ctaDesc: 'Advies over antenneplaatsing, metaalomgevingen, hoge temperaturen en EPCIS-koppeling.',
    ctaBtn: 'Neem contact op',
    ctaSecBtn: 'Zoeken',
    emptyBranchTitle: 'Deze taalversie is klaar voor publicaties',
    emptyBranchDesc: 'De etalage-indeling is actief voor alle talen.',
    availableEditions: 'Actieve taalversies:',
  },
  pt: {
    eyebrow: 'Base de Engenharia · UHF RFID · RTLS · IIoT',
    heroTitle: 'Engenharia aplicada para identificação industrial e sistemas RF',
    heroSubtitle: 'Análises técnicas de EPC Gen2v2, orçamentos de enlace RF, tags sobre metal, cadeia de frio e automação IIoT.',
    exploreArchive: 'Explorar arquivo',
    searchDocs: 'Pesquisar normas',
    metricDocs: 'Publicações',
    metricTopics: 'Tags técnicas',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Destaques de engenharia',
    featuredSubtitle: 'Arquiteturas de referência e estudos de campo',
    latestHeading: 'Últimas publicações técnicas',
    latestSubtitle: 'Especificações recentes, normas e casos industriais',
    archiveAllLabel: 'Ver arquivo completo',
    allInTrackLabel: 'Ver área',
    trackTopicPrefix: 'Área:',
    trackTopicDesc: 'Soluções técnicas e normas para',
    trackCatDesc: 'Artigos selecionados em',
    trackLatestTitle: 'Implementações RFID industriais',
    trackLatestDesc: 'Arquiteturas UHF RFID validadas em ambientes críticos',
    ctaEyebrow: 'Consultoria técnica',
    ctaTitle: 'Precisa de estudo de cobertura RF ou seleção de tags?',
    ctaDesc: 'Apoio em antenas, superfícies metálicas, alta temperatura e integração GS1 EPCIS.',
    ctaBtn: 'Falar com engenharia',
    ctaSecBtn: 'Pesquisar',
    emptyBranchTitle: 'Esta edição está pronta para receber publicações',
    emptyBranchDesc: 'O layout da vitrine está ativo em todos os idiomas.',
    availableEditions: 'Edições ativas:',
  },
  sv: {
    eyebrow: 'Ingenjörskunskapsbas · UHF RFID · RTLS · IIoT',
    heroTitle: 'Tillämpad ingenjörskonst för industriell identifiering och RF-system',
    heroSubtitle: 'Tekniska analyser av EPC Gen2v2, RF-länkbudgetar, metalltaggar, kylkedjor och industriell spårbarhet.',
    exploreArchive: 'Öppna arkiv',
    searchDocs: 'Sök standarder',
    metricDocs: 'Artiklar',
    metricTopics: 'Tekniska taggar',
    metricBandValue: '865–868 MHz',
    metricBandLabel: 'ETSI EN 302 208',
    featuredHeading: 'Utvalda ingenjörsanalyser',
    featuredSubtitle: 'Referensarkitekturer och fältvalidering',
    latestHeading: 'Senaste tekniska publikationer',
    latestSubtitle: 'Nya specifikationer, standarder och fallstudier',
    archiveAllLabel: 'Visa hela arkivet',
    allInTrackLabel: 'Visa spår',
    trackTopicPrefix: 'Spår:',
    trackTopicDesc: 'Tekniska lösningar och standarder för',
    trackCatDesc: 'Utvalda artiklar inom',
    trackLatestTitle: 'Industriella RFID-lösningar',
    trackLatestDesc: 'Beprövade UHF RFID-arkitekturer för krävande miljöer',
    ctaEyebrow: 'Teknisk rådgivning',
    ctaTitle: 'Behöver ni RF-täckningsanalys eller val av industritaggar?',
    ctaDesc: 'Stöd kring antenngeometri, metallmiljöer, höga temperaturer och EPCIS-integration.',
    ctaBtn: 'Kontakta ingenjör',
    ctaSecBtn: 'Sök dokument',
    emptyBranchTitle: 'Denna språkversion är redo för innehåll',
    emptyBranchDesc: 'Startsidesvyn är aktiv för alla språk.',
    availableEditions: 'Aktiva språkversioner:',
  },
  no: {
    eyebrow: 'Ingeniørkunnskapsbase · UHF RFID · RTLS · IIoT',
    heroTitle: 'Anvendt ingeniørkunst for industriell identifikasjon og RF-systemer',
    heroSubtitle: 'Tekniske analyser av EPC Gen2v2, RF-lenkebudsjett, on-metal-brikker, kjølekjede og industriell sporing.',
    exploreArchive: 'Se arkiv',
    searchDocs: 'Søk standarder',
    metricDocs: 'Artikler',
    metricTopics: 'Tekniske stikkord',
    metricBandValue: '865–868 MHz',
    metricBandLabel: 'ETSI EN 302 208',
    featuredHeading: 'Utvalgte ingeniøranalyser',
    featuredSubtitle: 'Referansearkitekturer og feltstudier',
    latestHeading: 'Siste tekniske publikasjoner',
    latestSubtitle: 'Nye spesifikasjoner, standarder og industrieksempler',
    archiveAllLabel: 'Se hele arkivet',
    allInTrackLabel: 'Se spor',
    trackTopicPrefix: 'Spor:',
    trackTopicDesc: 'Tekniske løsninger og standarder for',
    trackCatDesc: 'Utvalgte artikler i',
    trackLatestTitle: 'Industrielle RFID-løsninger',
    trackLatestDesc: 'Dokumenterte UHF RFID-arkitekturer for krevende miljøer',
    ctaEyebrow: 'Teknisk rådgivning',
    ctaTitle: 'Trenger du RF-studie eller valg av industribrikker?',
    ctaDesc: 'Rådgivning om antenner, metallmiljø, høy temperatur og GS1 EPCIS-integrasjon.',
    ctaBtn: 'Kontakt ingeniør',
    ctaSecBtn: 'Søk i bibliotek',
    emptyBranchTitle: 'Denne språkversjonen er klar for innhold',
    emptyBranchDesc: 'Forsideoppsettet er aktivt på tvers av alle språk.',
    availableEditions: 'Aktive språkversjoner:',
  },
  fi: {
    eyebrow: 'Suunnittelun tietopankki · UHF RFID · RTLS · IIoT',
    heroTitle: 'Sovellettua suunnittelua teolliseen tunnistukseen ja RF-järjestelmiin',
    heroSubtitle: 'Tekniset analyysit EPC Gen2v2 -standardeista, RF-linkkibudjeteista, metallitunnisteista ja kylmäketjun seurannasta.',
    exploreArchive: 'Selaa arkistoa',
    searchDocs: 'Hae standardeja',
    metricDocs: 'Artikkelia',
    metricTopics: 'Teknistä avainsanaa',
    metricBandValue: '865–868 MHz',
    metricBandLabel: 'ETSI EN 302 208',
    featuredHeading: 'Keskeiset suunnittelukatsaukset',
    featuredSubtitle: 'Referenssiarkkitehtuurit ja kenttäkokeet',
    latestHeading: 'Uusimmat tekniset julkaisut',
    latestSubtitle: 'Tuoreet määritykset, standardit ja teollisuusratkaisut',
    archiveAllLabel: 'Näytä koko arkisto',
    allInTrackLabel: 'Näytä aihealue',
    trackTopicPrefix: 'Aihe:',
    trackTopicDesc: 'Tekniset ratkaisut ja standardit aiheesta',
    trackCatDesc: 'Valitut artikkelit kategoriassa',
    trackLatestTitle: 'Teolliset RFID-ratkaisut',
    trackLatestDesc: 'Vaativiin ympäristöihin testatut UHF RFID -arkkitehtuurit',
    ctaEyebrow: 'Tekninen neuvonta',
    ctaTitle: 'Tarvitsetko RF-kenttäsuunnittelua tai tunnistevalintaa?',
    ctaDesc: 'Autamme antennisuunnittelussa, metalli- ja korkean lämpötilan kohteissa sekä EPCIS-integraatiossa.',
    ctaBtn: 'Ota yhteyttä',
    ctaSecBtn: 'Hae asiakirjoja',
    emptyBranchTitle: 'Tämä kieliversio on valmis julkaisuille',
    emptyBranchDesc: 'Etusivun esittelyrakenne on aktiivinen kaikilla kielillä.',
    availableEditions: 'Aktiiviset kieliversiot:',
  },
  cs: {
    eyebrow: 'Inženýrská znalostní báze · UHF RFID · RTLS · IIoT',
    heroTitle: 'Aplikované inženýrství průmyslové identifikace a RF systémů',
    heroSubtitle: 'Technické rozbory EPC Gen2v2, výpočty RF bilance, nasazení na kovu, ve farmacii, logistice a datových centrech.',
    exploreArchive: 'Prohlédnout archiv',
    searchDocs: 'Hledat normy',
    metricDocs: 'Publikací',
    metricTopics: 'Technických štítků',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Klíčové inženýrské studie',
    featuredSubtitle: 'Referenční architektury a terénní měření',
    latestHeading: 'Nejnovější technické publikace',
    latestSubtitle: 'Aktuální specifikace, standardy a provozní testy',
    archiveAllLabel: 'Zobrazit celý archiv',
    allInTrackLabel: 'Zobrazit sekci',
    trackTopicPrefix: 'Směr:',
    trackTopicDesc: 'Technická řešení a standardy pro oblast',
    trackCatDesc: 'Vybrané články v kategorii',
    trackLatestTitle: 'Průmyslové nasazení RFID',
    trackLatestDesc: 'Ověřené architektury UHF RFID pro náročné provozy',
    ctaEyebrow: 'Inženýrská konzultace',
    ctaTitle: 'Potřebujete výpočet RF zóny nebo výběr transpondérů?',
    ctaDesc: 'Pomůžeme s návrhem antén, vysokoteplotních tagů i integrací GS1 EPCIS 2.0.',
    ctaBtn: 'Kontaktovat inženýra',
    ctaSecBtn: 'Otevřít vyhledávání',
    emptyBranchTitle: 'Tato jazyková verze je připravena pro publikace',
    emptyBranchDesc: 'Rozvržení úvodní stránky je aktivní pro všechny jazyky.',
    availableEditions: 'Aktivní jazykové verze:',
  },
  sk: {
    eyebrow: 'Inžinierska znalostná báza · UHF RFID · RTLS · IIoT',
    heroTitle: 'Aplikované inžinierstvo priemyselnej identifikácie a RF systémov',
    heroSubtitle: 'Technické analýzy EPC Gen2v2, výpočty RF bilancie, aplikácie na kove, vo farmácii, logistike a dátových centrách.',
    exploreArchive: 'Prehliadať archív',
    searchDocs: 'Hľadať normy',
    metricDocs: 'Publikácií',
    metricTopics: 'Technických štítkov',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Kľúčové inžinierske štúdie',
    featuredSubtitle: 'Referenčné architektúry a prevádzkové merania',
    latestHeading: 'Najnovšie technické publikácie',
    latestSubtitle: 'Aktuálne špecifikácie, štandardy a prípadové štúdie',
    archiveAllLabel: 'Zobraziť celý archív',
    allInTrackLabel: 'Zobraziť sekciu',
    trackTopicPrefix: 'Smer:',
    trackTopicDesc: 'Technické riešenia a štandardy pre oblasť',
    trackCatDesc: 'Vybrané články v kategórii',
    trackLatestTitle: 'Priemyselné nasadenia RFID',
    trackLatestDesc: 'Overené architektúry UHF RFID pre náročné prostredia',
    ctaEyebrow: 'Inžinierska konzultácia',
    ctaTitle: 'Potrebujete výpočet RF zóny alebo výber transpondérov?',
    ctaDesc: 'Pomôžeme s návrhom antén, vysokoteplotných tagov aj integráciou GS1 EPCIS 2.0.',
    ctaBtn: 'Kontaktovať inžiniera',
    ctaSecBtn: 'Otvoriť vyhľadávanie',
    emptyBranchTitle: 'Táto jazyková verzia je pripravená na publikácie',
    emptyBranchDesc: 'Rozloženie úvodnej stránky je aktívne pre všetky jazyky.',
    availableEditions: 'Aktívne jazykové verzie:',
  },
  ro: {
    eyebrow: 'Bază de Inginerie · UHF RFID · RTLS · IIoT',
    heroTitle: 'Inginerie aplicată pentru identificare industrială și sisteme RF',
    heroSubtitle: 'Analize tehnice EPC Gen2v2, bugete de legătură RF, implementări pe metal, în industria farmaceutică și logistică.',
    exploreArchive: 'Deschide arhiva',
    searchDocs: 'Caută standarde',
    metricDocs: 'Articole',
    metricTopics: 'Etichete tehnice',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Studii de inginerie recomandate',
    featuredSubtitle: 'Arhitecturi de referință și teste în teren',
    latestHeading: 'Ultimele publicații tehnice',
    latestSubtitle: 'Specificații recente, standarde și studii de caz',
    archiveAllLabel: 'Vezi toată arhiva',
    allInTrackLabel: 'Vezi direcția',
    trackTopicPrefix: 'Direcție:',
    trackTopicDesc: 'Soluții tehnice și standarde pentru',
    trackCatDesc: 'Articole selectate în categoria',
    trackLatestTitle: 'Implementări RFID industriale',
    trackLatestDesc: 'Arhitecturi UHF RFID validate în medii critice',
    ctaEyebrow: 'Consultanță tehnică',
    ctaTitle: 'Aveți nevoie de calcul RF sau selecție de transpondere?',
    ctaDesc: 'Suport pentru antene, medii metalice, temperaturi ridicate și integrare EPCIS.',
    ctaBtn: 'Contactează un inginer',
    ctaSecBtn: 'Caută documente',
    emptyBranchTitle: 'Această ediție este pregătită pentru articole',
    emptyBranchDesc: 'Structura paginii principale este activă pentru toate limbile.',
    availableEditions: 'Ediții active:',
  },
  bg: {
    eyebrow: 'Инженерна база знания · UHF RFID · RTLS · IIoT',
    heroTitle: 'Приложно инженерство за индустриална идентификация и RF системи',
    heroSubtitle: 'Технически анализи на EPC Gen2v2, RF бюджети, приложения върху метал, във фармацията, логистиката и центровете за данни.',
    exploreArchive: 'Разгледай архива',
    searchDocs: 'Търсене на стандарти',
    metricDocs: 'Публикации',
    metricTopics: 'Технически етикети',
    metricBandValue: '865–928 MHz',
    metricBandLabel: 'ETSI / FCC UHF',
    featuredHeading: 'Ключови инженерни материали',
    featuredSubtitle: 'Референтни архитектури и полеви изпитвания',
    latestHeading: 'Последни технически публикации',
    latestSubtitle: 'Актуални спецификации, стандарти и индустриални решения',
    archiveAllLabel: 'Виж целия архив',
    allInTrackLabel: 'Всички материали',
    trackTopicPrefix: 'Направление:',
    trackTopicDesc: 'Приложни технически решения и стандарти за',
    trackCatDesc: 'Подбрани инженерни статии в',
    trackLatestTitle: 'Индустриални RFID внедрявания',
    trackLatestDesc: 'Доказани UHF RFID архитектури за тежки условия',
    ctaEyebrow: 'Инженерна консултация',
    ctaTitle: 'Нуждаете се от RF изчисление или избор на транспондери?',
    ctaDesc: 'Съдействие при избор на антени, високотемпературни тагове и EPCIS интеграция.',
    ctaBtn: 'Свържете се с инженер',
    ctaSecBtn: 'Отвори търсенето',
    emptyBranchTitle: 'Тази езикова версия е готова за публикации',
    emptyBranchDesc: 'Витрината на началната страница е активна за всички езици.',
    availableEditions: 'Активни езикови версии:',
  },
  et: {
    eyebrow: 'Inseneriteadmistebaas · UHF RFID · RTLS · IIoT',
    heroTitle: 'Tööstusliku identifitseerimise ja RF-süsteemide rakendusinseneeria',
    heroSubtitle: 'EPC Gen2v2 tehnilised analüüsid, RF-lingi eelarved, metallpindade ja külmaketi jälgimise lahendused.',
    exploreArchive: 'Vaata arhiivi',
    searchDocs: 'Otsi standardeid',
    metricDocs: 'Artiklit',
    metricTopics: 'Tehnilist silti',
    metricBandValue: '865–868 MHz',
    metricBandLabel: 'ETSI EN 302 208',
    featuredHeading: 'Esiletõstetud insenerianalüüsid',
    featuredSubtitle: 'Referentsarhitektuurid ja välimõõtmised',
    latestHeading: 'Viimased tehnilised publikatsioonid',
    latestSubtitle: 'Uued spetsifikatsioonid, standardid ja rakendusjuhud',
    archiveAllLabel: 'Vaata kogu arhiivi',
    allInTrackLabel: 'Vaata suunda',
    trackTopicPrefix: 'Suund:',
    trackTopicDesc: 'Tehnilised lahendused ja standardid teemal',
    trackCatDesc: 'Valitud artiklid kategoorias',
    trackLatestTitle: 'Tööstuslikud RFID-lahendused',
    trackLatestDesc: 'Karmides oludes tõestatud UHF RFID arhitektuurid',
    ctaEyebrow: 'Tehniline nõustamine',
    ctaTitle: 'Vajate RF-leviala arvutust või transponderite valikut?',
    ctaDesc: 'Aitame antennide, metallikeskkondade, kõrgete temperatuuride ja EPCIS-i integreerimisega.',
    ctaBtn: 'Võta ühendust',
    ctaSecBtn: 'Ava otsing',
    emptyBranchTitle: 'See keeleversioon on avaldamiseks valmis',
    emptyBranchDesc: 'Avalehe vitriinipaigutus on aktiivne kõigis keeltes.',
    availableEditions: 'Aktiivsed keeleversioonid:',
  },
  lt: {
    eyebrow: 'Inžinerinių žinių bazė · UHF RFID · RTLS · IIoT',
    heroTitle: 'Taikomoji pramoninio identifikavimo ir RF sistemų inžinerija',
    heroSubtitle: 'EPC Gen2v2 techninės analizės, RF ryšio biudžetai, ženklinimas ant metalo, šalčio grandinės ir IIoT automatizacija.',
    exploreArchive: 'Atverti archyvą',
    searchDocs: 'Ieškoti standartų',
    metricDocs: 'Straipsnių',
    metricTopics: 'Techninių žymų',
    metricBandValue: '865–868 MHz',
    metricBandLabel: 'ETSI EN 302 208',
    featuredHeading: 'Svarbiausios inžinerinės apžvalgos',
    featuredSubtitle: 'Etaloninės architektūros ir lauko bandymai',
    latestHeading: 'Naujausios techninės publikacijos',
    latestSubtitle: 'Naujausi standartai, specifikacijos ir diegimo atvejai',
    archiveAllLabel: 'Žiūrėti visą archyvą',
    allInTrackLabel: 'Visi krypties straipsniai',
    trackTopicPrefix: 'Kryptis:',
    trackTopicDesc: 'Techniniai sprendimai ir standartai temoje',
    trackCatDesc: 'Atrinkti straipsniai kategorijoje',
    trackLatestTitle: 'Pramoniniai RFID diegimai',
    trackLatestDesc: 'Sudėtingai aplinkai pritaikytos UHF RFID architektūros',
    ctaEyebrow: 'Inžinerinė konsultacija',
    ctaTitle: 'Reikia RF zonos skaičiavimo ar transponderių parinkimo?',
    ctaDesc: 'Padedame parinkti antenas, aukštos temperatūros žymas bei GS1 EPCIS integraciją.',
    ctaBtn: 'Susisiekti su inžinieriumi',
    ctaSecBtn: 'Atverti paiešką',
    emptyBranchTitle: 'Ši kalbos versija paruošta publikacijoms',
    emptyBranchDesc: 'Pagrindinio puslapio vitrinos išdėstymas veikia visomis kalbomis.',
    availableEditions: 'Aktyvios kalbų versijos:',
  },
};

export function sha256(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

export function sanitizeShowcaseUrl(raw: unknown, fallback = '/archives/'): string {
  const s = String(raw ?? '').trim();
  if (!s) return fallback;
  if (
    s.startsWith('/') ||
    s.startsWith('https://') ||
    s.startsWith('http://') ||
    s.startsWith('mailto:') ||
    s.startsWith('tel:')
  ) {
    return s;
  }
  return fallback;
}

export function resolveSafeShowcasePath(relPath: string): { absPath: string; lang: LangCode } {
  if (typeof relPath !== 'string') {
    throw new Error('Invalid showcase file path');
  }
  const normalizedRel = relPath.replace(/\\/g, '/').trim();
  const match = normalizedRel.match(DATA_HOME_REL_RE);
  if (!match) {
    throw new Error(`Path outside allowed data/home/<lang>.json pattern: ${relPath}`);
  }
  const lang = match[1];
  if (!isValidLang(lang)) {
    throw new Error(`Unsupported language code in path: ${lang}`);
  }
  const absPath = path.resolve(ROOT_DIR, normalizedRel);
  if (!absPath.startsWith(DATA_HOME_ROOT + path.sep)) {
    throw new Error(`Path escapes data/home root: ${relPath}`);
  }
  return { absPath, lang };
}

function normalizeStringList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of raw) {
    const val = String(item ?? '').trim();
    if (!val || seen.has(val)) continue;
    seen.add(val);
    out.push(val);
  }
  return out;
}

function clampInt(raw: unknown, min: number, max: number, fallback: number): number {
  const num = Number(raw);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, Math.round(num)));
}

export function normalizeShowcaseConfig(raw: unknown, expectedLang?: LangCode): ShowcaseConfig {
  const obj = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const rawLang = typeof obj.lang === 'string' && isValidLang(obj.lang) ? obj.lang : expectedLang || 'uk';
  const lang: LangCode = expectedLang || rawLang;
  const dict = SHOWCASE_I18N[lang];

  const rawHero = obj.hero && typeof obj.hero === 'object' ? (obj.hero as Record<string, unknown>) : {};
  const rawMetrics = Array.isArray(rawHero.metrics) ? rawHero.metrics : [];
  const metrics: ShowcaseMetric[] = rawMetrics
    .slice(0, 4)
    .map((m) => {
      const mo = m && typeof m === 'object' ? (m as Record<string, unknown>) : {};
      return {
        value: String(mo.value ?? '').trim(),
        label: String(mo.label ?? '').trim(),
      };
    })
    .filter((m) => m.value || m.label);

  const hero: ShowcaseHero = {
    eyebrow: String(rawHero.eyebrow ?? dict.eyebrow).trim() || dict.eyebrow,
    title: String(rawHero.title ?? dict.heroTitle).trim() || dict.heroTitle,
    subtitle: String(rawHero.subtitle ?? dict.heroSubtitle).trim(),
    primaryCtaLabel: String(rawHero.primaryCtaLabel ?? dict.exploreArchive).trim() || dict.exploreArchive,
    primaryCtaUrl: sanitizeShowcaseUrl(rawHero.primaryCtaUrl, '/archives/'),
    secondaryCtaLabel: String(rawHero.secondaryCtaLabel ?? dict.searchDocs).trim(),
    secondaryCtaUrl: sanitizeShowcaseUrl(rawHero.secondaryCtaUrl, '/search/'),
    metrics: metrics.length
      ? metrics
      : [
          { value: dict.metricBandValue, label: dict.metricBandLabel },
        ],
  };

  const rawFeatured =
    obj.featured && typeof obj.featured === 'object' ? (obj.featured as Record<string, unknown>) : {};
  const featuredMode: 'auto' | 'manual' = rawFeatured.mode === 'manual' ? 'manual' : 'auto';
  const featured: ShowcaseFeatured = {
    enabled: rawFeatured.enabled !== false,
    heading: String(rawFeatured.heading ?? dict.featuredHeading).trim() || dict.featuredHeading,
    subtitle: String(rawFeatured.subtitle ?? dict.featuredSubtitle).trim(),
    mode: featuredMode,
    postSlugs: normalizeStringList(rawFeatured.postSlugs),
    limit: clampInt(rawFeatured.limit, 1, 6, 3),
  };

  const allowedFilterTypes: ShowcaseFilterType[] = ['category', 'tag', 'translationKey', 'manual', 'latest'];
  const rawTracks = Array.isArray(obj.tracks) ? obj.tracks : [];
  const tracks: ShowcaseTrack[] = rawTracks.slice(0, 8).map((item, idx) => {
    const t = item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
    const ft = allowedFilterTypes.includes(t.filterType as ShowcaseFilterType)
      ? (t.filterType as ShowcaseFilterType)
      : 'latest';
    const layout: ShowcaseTrackLayout = t.layout === 'compact' ? 'compact' : 'grid';
    return {
      id: String(t.id ?? `track-${idx + 1}`).trim() || `track-${idx + 1}`,
      title: String(t.title ?? `${dict.trackTopicPrefix} ${idx + 1}`).trim(),
      description: String(t.description ?? '').trim(),
      filterType: ft,
      filterValue: String(t.filterValue ?? '').trim(),
      postSlugs: normalizeStringList(t.postSlugs),
      limit: clampInt(t.limit, 1, 8, layout === 'compact' ? 4 : 2),
      layout,
      linkLabel: String(t.linkLabel ?? dict.allInTrackLabel).trim(),
      linkUrl: sanitizeShowcaseUrl(t.linkUrl, ''),
    };
  });

  const rawLatest = obj.latest && typeof obj.latest === 'object' ? (obj.latest as Record<string, unknown>) : {};
  const latest: ShowcaseLatest = {
    enabled: rawLatest.enabled !== false,
    heading: String(rawLatest.heading ?? dict.latestHeading).trim() || dict.latestHeading,
    subtitle: String(rawLatest.subtitle ?? dict.latestSubtitle).trim(),
    limit: clampInt(rawLatest.limit, 1, 15, 6),
    archiveLabel: String(rawLatest.archiveLabel ?? dict.archiveAllLabel).trim() || dict.archiveAllLabel,
    archiveUrl: sanitizeShowcaseUrl(rawLatest.archiveUrl, '/archives/'),
  };

  const rawCta = obj.cta && typeof obj.cta === 'object' ? (obj.cta as Record<string, unknown>) : {};
  const cta: ShowcaseCta = {
    enabled: rawCta.enabled !== false,
    eyebrow: String(rawCta.eyebrow ?? dict.ctaEyebrow).trim(),
    title: String(rawCta.title ?? dict.ctaTitle).trim() || dict.ctaTitle,
    description: String(rawCta.description ?? dict.ctaDesc).trim(),
    buttonLabel: String(rawCta.buttonLabel ?? dict.ctaBtn).trim() || dict.ctaBtn,
    buttonUrl: sanitizeShowcaseUrl(rawCta.buttonUrl, 'mailto:info@rfid.org.ua'),
    secondaryLabel: String(rawCta.secondaryLabel ?? dict.ctaSecBtn).trim(),
    secondaryUrl: sanitizeShowcaseUrl(rawCta.secondaryUrl, '/search/'),
  };

  return {
    version: 1,
    lang,
    hero,
    featured,
    tracks,
    latest,
    cta,
  };
}

function buildCuratedTracksFromPosts(lang: LangCode, posts: PostItem[]): ShowcaseTrack[] {
  const dict = SHOWCASE_I18N[lang];
  if (!posts.length) {
    return [
      {
        id: 'solutions',
        title: dict.trackLatestTitle,
        description: dict.trackLatestDesc,
        filterType: 'latest',
        filterValue: '',
        postSlugs: [],
        limit: 4,
        layout: 'grid',
        linkLabel: dict.archiveAllLabel,
        linkUrl: '/archives/',
      },
    ];
  }

  const { categories, tags } = computeTaxonomies(posts, new Map());
  const tracks: ShowcaseTrack[] = [];
  const usedPostIds = new Set<string>();

  // Reserve lead + up to 2 featured posts so tracks highlight diverse topics when there are enough posts
  const featuredCount = posts.length >= 6 ? Math.min(3, posts.length) : 0;
  for (let i = 0; i < featuredCount; i++) {
    usedPostIds.add(posts[i].id);
  }

  // Group tags by frequency while preferring diverse posts across tracks
  const candidateTags = tags.filter((t) => t.count >= 1);
  for (const tagEntry of candidateTags) {
    if (tracks.length >= 3) break;
    const matching = posts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tagEntry.name.toLowerCase())
    );
    const freshCount = matching.filter((p) => !usedPostIds.has(p.id)).length;
    if (posts.length >= 4 && freshCount === 0) continue;

    matching.slice(0, 2).forEach((p) => usedPostIds.add(p.id));
    tracks.push({
      id: `tag-${slugify(tagEntry.name)}`,
      title: `${dict.trackTopicPrefix} ${tagEntry.name}`,
      description: `${dict.trackTopicDesc} ${tagEntry.name}`,
      filterType: 'tag',
      filterValue: tagEntry.name,
      postSlugs: [],
      limit: matching.length >= 3 ? 3 : 2,
      layout: tracks.length === 1 && matching.length >= 3 ? 'compact' : 'grid',
      linkLabel: dict.allInTrackLabel,
      linkUrl: `/tags/${encodeURIComponent(tagEntry.slug)}/`,
    });
  }

  // Ensure at least one category track or latest fallback if fewer than 2 tracks
  if (tracks.length < 2 && categories.length > 0) {
    const topCat = categories[0];
    tracks.push({
      id: `cat-${slugify(topCat.name)}`,
      title: topCat.name,
      description: `${dict.trackCatDesc} «${topCat.name}»`,
      filterType: 'category',
      filterValue: topCat.name,
      postSlugs: [],
      limit: Math.min(4, Math.max(2, posts.length)),
      layout: tracks.length === 0 ? 'grid' : 'compact',
      linkLabel: dict.allInTrackLabel,
      linkUrl: `/categories/${encodeURIComponent(topCat.slug)}/`,
    });
  }

  if (tracks.length === 0) {
    tracks.push({
      id: 'latest-solutions',
      title: dict.trackLatestTitle,
      description: dict.trackLatestDesc,
      filterType: 'latest',
      filterValue: '',
      postSlugs: [],
      limit: Math.min(4, posts.length),
      layout: 'grid',
      linkLabel: dict.archiveAllLabel,
      linkUrl: '/archives/',
    });
  }

  return tracks;
}

export function generateStarterShowcaseForLang(
  lang: LangCode,
  siteContent: SiteContent
): ShowcaseConfig {
  const dict = SHOWCASE_I18N[lang];
  const posts = siteContent.postsByLang[lang] || [];
  const { tags } = computeTaxonomies(posts, siteContent.categoryStyles);

  // Prefer posts with valid local or remote image first when auto-picking starter featured slugs
  const withImage = posts.filter((p) => Boolean(p.image));
  const orderedForFeatured = [...withImage, ...posts.filter((p) => !p.image)];
  const featuredLimit = Math.min(3, Math.max(1, posts.length || 3));
  const starterFeaturedSlugs = orderedForFeatured.slice(0, featuredLimit).map((p) => p.slug);

  const metrics: ShowcaseMetric[] =
    posts.length > 0
      ? [
          { value: String(posts.length), label: dict.metricDocs },
          { value: String(tags.length), label: dict.metricTopics },
          { value: dict.metricBandValue, label: dict.metricBandLabel },
        ]
      : [
          { value: '20', label: 'EN · UA · DE · DA · EU' },
          { value: dict.metricBandValue, label: dict.metricBandLabel },
          { value: 'EPC Gen2v2', label: 'ISO/IEC 18000-63' },
        ];

  return {
    version: 1,
    lang,
    hero: {
      eyebrow: dict.eyebrow,
      title: dict.heroTitle,
      subtitle: dict.heroSubtitle,
      primaryCtaLabel: dict.exploreArchive,
      primaryCtaUrl: '/archives/',
      secondaryCtaLabel: dict.searchDocs,
      secondaryCtaUrl: '/search/',
      metrics,
    },
    featured: {
      enabled: true,
      heading: dict.featuredHeading,
      subtitle: dict.featuredSubtitle,
      mode: 'auto',
      postSlugs: starterFeaturedSlugs,
      limit: 3,
    },
    tracks: buildCuratedTracksFromPosts(lang, posts),
    latest: {
      enabled: true,
      heading: dict.latestHeading,
      subtitle: dict.latestSubtitle,
      limit: 6,
      archiveLabel: dict.archiveAllLabel,
      archiveUrl: '/archives/',
    },
    cta: {
      enabled: true,
      eyebrow: dict.ctaEyebrow,
      title: dict.ctaTitle,
      description: dict.ctaDesc,
      buttonLabel: dict.ctaBtn,
      buttonUrl: 'mailto:info@rfid.org.ua',
      secondaryLabel: dict.ctaSecBtn,
      secondaryUrl: '/search/',
    },
  };
}

export function loadShowcaseFileForLang(lang: LangCode): {
  exists: boolean;
  relPath: string;
  fileHash: string;
  rawJson: string;
  config: ShowcaseConfig | null;
} {
  const relPath = `data/home/${lang}.json`;
  const { absPath } = resolveSafeShowcasePath(relPath);
  if (!fs.existsSync(absPath)) {
    return { exists: false, relPath, fileHash: '', rawJson: '', config: null };
  }
  const rawJson = fs.readFileSync(absPath, 'utf-8');
  const parsed = JSON.parse(rawJson);
  return {
    exists: true,
    relPath,
    fileHash: sha256(rawJson),
    rawJson,
    config: normalizeShowcaseConfig(parsed, lang),
  };
}

export function getLocalizedUrl(rawUrl: string, lang: LangCode): string {
  const clean = sanitizeShowcaseUrl(rawUrl, '/');
  if (
    clean.startsWith('http://') ||
    clean.startsWith('https://') ||
    clean.startsWith('mailto:') ||
    clean.startsWith('tel:')
  ) {
    return clean;
  }
  const prefix = LANGUAGES[lang].urlPrefix;
  if (!prefix) return clean;
  if (clean === prefix || clean.startsWith(`${prefix}/`)) return clean;
  return `${prefix}${clean.startsWith('/') ? clean : `/${clean}`}`;
}

function splitTokens(raw: string): string[] {
  return String(raw || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function matchPostsBySlugs(posts: PostItem[], slugs: string[]): PostItem[] {
  if (!slugs.length) return [];
  const byKey = new Map<string, PostItem>();
  for (const p of posts) {
    byKey.set(p.slug.toLowerCase(), p);
    byKey.set(path.basename(p.bundleDir).toLowerCase(), p);
    byKey.set(p.permalink.toLowerCase(), p);
  }
  const out: PostItem[] = [];
  const seen = new Set<string>();
  for (const raw of slugs) {
    const found = byKey.get(raw.trim().toLowerCase());
    if (found && !seen.has(found.id)) {
      seen.add(found.id);
      out.push(found);
    }
  }
  return out;
}

export function resolveShowcaseForLang(
  lang: LangCode,
  siteContent: SiteContent
): ResolvedShowcase {
  const loaded = loadShowcaseFileForLang(lang);
  const config = loaded.config || generateStarterShowcaseForLang(lang, siteContent);
  const langPosts = siteContent.postsByLang[lang] || [];

  const existingImagesMap: Record<string, boolean> = {};
  for (const p of langPosts) {
    if (!p.image) {
      existingImagesMap[p.id] = false;
    } else if (p.image.startsWith('http://') || p.image.startsWith('https://') || p.image.startsWith('/')) {
      existingImagesMap[p.id] = true;
    } else {
      existingImagesMap[p.id] = fs.existsSync(path.join(p.bundleDir, p.image));
    }
  }

  let featuredPosts: PostItem[] = [];
  if (config.featured.enabled && langPosts.length > 0) {
    if (config.featured.mode === 'manual' && config.featured.postSlugs.length > 0) {
      featuredPosts = matchPostsBySlugs(langPosts, config.featured.postSlugs).slice(0, config.featured.limit);
    }
    if (featuredPosts.length === 0) {
      const withImg = langPosts.filter((p) => existingImagesMap[p.id]);
      const withoutImg = langPosts.filter((p) => !existingImagesMap[p.id]);
      featuredPosts = [...withImg, ...withoutImg].slice(0, config.featured.limit);
    }
  }

  const leadPost = featuredPosts[0] || null;
  const secondaryPosts = featuredPosts.slice(1);
  const featuredIds = new Set<string>(featuredPosts.map((p) => p.id));

  const resolvedTracks: ResolvedTrack[] = config.tracks.map((track) => {
    let matched: PostItem[] = [];
    if (track.filterType === 'manual') {
      matched = matchPostsBySlugs(langPosts, track.postSlugs);
    } else if (track.filterType === 'category') {
      const tokens = splitTokens(track.filterValue);
      matched = langPosts.filter((p) =>
        p.categories.some((c) => tokens.includes(c.toLowerCase()))
      );
    } else if (track.filterType === 'tag') {
      const tokens = splitTokens(track.filterValue);
      matched = langPosts.filter((p) =>
        p.tags.some((t) => tokens.includes(t.toLowerCase()))
      );
    } else if (track.filterType === 'translationKey') {
      const tokens = splitTokens(track.filterValue);
      matched = langPosts.filter(
        (p) => p.translationKey && tokens.includes(p.translationKey.toLowerCase())
      );
    } else {
      const nonFeatured = langPosts.filter((p) => !featuredIds.has(p.id));
      matched = nonFeatured.length > 0 ? nonFeatured : langPosts;
    }

    if (track.filterType !== 'manual' && track.filterType !== 'latest' && track.layout !== 'compact') {
      const nonFeat = matched.filter((p) => !featuredIds.has(p.id));
      const inFeat = matched.filter((p) => featuredIds.has(p.id));
      if (nonFeat.length > 0) {
        matched = [...nonFeat, ...inFeat];
      }
    }

    if (track.layout !== 'compact' && matched.length > 1) {
      const withImg = matched.filter((p) => existingImagesMap[p.id]);
      const withoutImg = matched.filter((p) => !existingImagesMap[p.id]);
      matched = [...withImg, ...withoutImg];
    }

    const effectiveLimit = track.layout === 'compact' ? track.limit : Math.max(track.limit, 12);

    let resolvedLinkUrl = track.linkUrl;
    if (!resolvedLinkUrl) {
      if (track.filterType === 'category' && track.filterValue) {
        const firstCat = track.filterValue.split(',')[0].trim();
        resolvedLinkUrl = `/categories/${encodeURIComponent(slugify(firstCat))}/`;
      } else if (track.filterType === 'tag' && track.filterValue) {
        const firstTag = track.filterValue.split(',')[0].trim();
        resolvedLinkUrl = `/tags/${encodeURIComponent(slugify(firstTag))}/`;
      } else {
        resolvedLinkUrl = '/archives/';
      }
    }

    return {
      ...track,
      posts: matched.slice(0, effectiveLimit),
      resolvedLinkUrl: getLocalizedUrl(resolvedLinkUrl, lang),
    };
  });

  const latestPosts = config.latest.enabled
    ? langPosts.slice(0, config.latest.limit)
    : [];

  const hiddenHubLangs = getHiddenHubLangs(siteContent);
  const sidebarCfg = loadSidebarConfig();
  const sidebarLangMap = new Map(sidebarCfg.languages.map((l) => [l.code, l]));

  const populatedLangs = ORDERED_LANGUAGES.filter(
    (l) =>
      l.code !== lang &&
      !hiddenHubLangs.has(l.code) &&
      (siteContent.postsByLang[l.code]?.length || 0) > 0
  ).map((l) => {
    const sl = sidebarLangMap.get(l.code);
    return {
      code: l.code,
      shortLabel: l.shortLabel,
      label: sl?.label || l.label,
      urlPrefix: sl?.customUrl || (l.urlPrefix ? `${l.urlPrefix}/` : '/'),
      count: siteContent.postsByLang[l.code]?.length || 0,
    };
  });

  return {
    config: {
      ...config,
      hero: {
        ...config.hero,
        primaryCtaUrl: getLocalizedUrl(config.hero.primaryCtaUrl, lang),
        secondaryCtaUrl: config.hero.secondaryCtaUrl
          ? getLocalizedUrl(config.hero.secondaryCtaUrl, lang)
          : '',
      },
      latest: {
        ...config.latest,
        archiveUrl: getLocalizedUrl(config.latest.archiveUrl, lang),
      },
      cta: {
        ...config.cta,
        buttonUrl: getLocalizedUrl(config.cta.buttonUrl, lang),
        secondaryUrl: config.cta.secondaryUrl
          ? getLocalizedUrl(config.cta.secondaryUrl, lang)
          : '',
      },
    },
    leadPost,
    secondaryPosts,
    tracks: resolvedTracks,
    latestPosts,
    totalLangPosts: langPosts.length,
    populatedLangs,
    existingImagesMap,
  };
}

export interface ShowcaseSaveInput {
  lang: LangCode;
  expectedHash?: string;
  config: unknown;
}

export function applyShowcaseUpdates(items: ShowcaseSaveInput[]): {
  ok: boolean;
  status: number;
  error?: string;
  updated?: Array<{ lang: LangCode; relPath: string; fileHash: string }>;
} {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, status: 400, error: 'Список изменений пуст' };
  }

  fs.mkdirSync(DATA_HOME_ROOT, { recursive: true });
  const staged: Array<{ lang: LangCode; relPath: string; absPath: string; content: string; newHash: string }> = [];

  for (const item of items) {
    if (!item || !isValidLang(item.lang)) {
      return { ok: false, status: 400, error: `Некорректный код языка: ${String(item?.lang)}` };
    }
    const relPath = `data/home/${item.lang}.json`;
    const { absPath } = resolveSafeShowcasePath(relPath);
    const exists = fs.existsSync(absPath);
    const currentRaw = exists ? fs.readFileSync(absPath, 'utf-8') : '';
    const currentHash = exists ? sha256(currentRaw) : '';

    if (item.expectedHash !== undefined && item.expectedHash !== '' && item.expectedHash !== currentHash) {
      return {
        ok: false,
        status: 409,
        error: `Конфликт версии файла ${relPath}. Обновите конструктор.`,
      };
    }

    const normalized = normalizeShowcaseConfig(item.config, item.lang);
    const nextContent = JSON.stringify(normalized, null, 2) + '\n';
    staged.push({
      lang: item.lang,
      relPath,
      absPath,
      content: nextContent,
      newHash: sha256(nextContent),
    });
  }

  const updated: Array<{ lang: LangCode; relPath: string; fileHash: string }> = [];
  for (const s of staged) {
    const tmpPath = `${s.absPath}.tmp-${process.pid}-${Date.now()}`;
    fs.writeFileSync(tmpPath, s.content, 'utf-8');
    fs.renameSync(tmpPath, s.absPath);
    updated.push({ lang: s.lang, relPath: s.relPath, fileHash: s.newHash });
  }

  return { ok: true, status: 200, updated };
}

export function getShowcaseEmptyCopy(lang: LangCode) {
  const dict = SHOWCASE_I18N[lang];
  return {
    emptyBranchTitle: dict.emptyBranchTitle,
    emptyBranchDesc: dict.emptyBranchDesc,
    availableEditions: dict.availableEditions,
  };
}
