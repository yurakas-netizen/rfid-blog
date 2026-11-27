import fs from 'node:fs';
import path from 'node:path';
import type { LangCode } from './config.js';
import type { PostItem } from './content.js';

export interface SourceEntry {
  code: string;
  url: string;
  desc: string;
  langs: string[];
  keywords: string[];
}

export interface SelectedSource {
  code: string;
  url: string;
  desc: string;
  host: string;
  isLocal: boolean;
  regionCode: string;
  score: number;
  contextScore: number;
}

export interface SourcesUiStrings {
  heading: string;
  subtitle: string;
  regionalLabel: string;
  globalLabel: string;
  sourcesCountWord: string;
}

const CORE_AUTHORITY_PRIORS: Record<string, number> = {
  ETSI: 6,
  GS1: 6,
  'RAIN RFID Alliance': 5,
  ISO: 5,
  IEC: 5,
  EC: 4,
  'CEPT/ECO': 4,
  'CEN-CENELEC': 3,
  'AIM Global': 2,
  'AIM Europe': 2,
};

const SOURCES_UI: Record<LangCode, SourcesUiStrings> = {
  uk: {
    heading: 'Стандарти та авторитетні джерела',
    subtitle: 'Регулятори, стандартизаційні комітети та галузеві асоціації за темою матеріалу',
    regionalLabel: 'Регіональний',
    globalLabel: 'Міжнародний',
    sourcesCountWord: 'джерел',
  },
  ru: {
    heading: 'Стандарты и авторитетные источники',
    subtitle: 'Регуляторы, комитеты по стандартизации и отраслевые ассоциации по теме статьи',
    regionalLabel: 'Региональный',
    globalLabel: 'Международный',
    sourcesCountWord: 'источников',
  },
  en: {
    heading: 'Standards & Authoritative Sources',
    subtitle: 'Standards bodies, spectrum regulators, and industry associations relevant to this topic',
    regionalLabel: 'Regional',
    globalLabel: 'International',
    sourcesCountWord: 'sources',
  },
  da: {
    heading: 'Standarder og autoritative kilder',
    subtitle: 'Standardiseringsorganer, frekvensmyndigheder og brancheorganisationer for emnet',
    regionalLabel: 'Regional',
    globalLabel: 'International',
    sourcesCountWord: 'kilder',
  },
  de: {
    heading: 'Normen & maßgebliche Quellen',
    subtitle: 'Normungsgremien, Regulierungsbehörden und Fachverbände zum Thema dieses Beitrags',
    regionalLabel: 'Regional',
    globalLabel: 'International',
    sourcesCountWord: 'Quellen',
  },
  fr: {
    heading: 'Normes et sources de référence',
    subtitle: 'Organismes de normalisation, régulateurs radio et associations professionnelles liés au sujet',
    regionalLabel: 'Régional',
    globalLabel: 'International',
    sourcesCountWord: 'sources',
  },
  pl: {
    heading: 'Normy i wiarygodne źródła',
    subtitle: 'Organizacje normalizacyjne, regulatorzy widma i stowarzyszenia branżowe dla tego tematu',
    regionalLabel: 'Regionalny',
    globalLabel: 'Międzynarodowy',
    sourcesCountWord: 'źródeł',
  },
  es: {
    heading: 'Normas y fuentes de referencia',
    subtitle: 'Organismos de normalización, reguladores del espectro y asociaciones sectoriales del tema',
    regionalLabel: 'Regional',
    globalLabel: 'Internacional',
    sourcesCountWord: 'fuentes',
  },
  it: {
    heading: 'Standard e fonti autorevoli',
    subtitle: 'Enti di normazione, autorità per lo spettro e associazioni industriali pertinenti',
    regionalLabel: 'Regionale',
    globalLabel: 'Internazionale',
    sourcesCountWord: 'fonti',
  },
  nl: {
    heading: 'Normen en gezaghebbende bronnen',
    subtitle: 'Standaardisatie-organisaties, spectrumtoezichthouders en brancheverenigingen bij dit onderwerp',
    regionalLabel: 'Regionaal',
    globalLabel: 'Internationaal',
    sourcesCountWord: 'bronnen',
  },
  pt: {
    heading: 'Normas e fontes de referência',
    subtitle: 'Organismos de normalização, reguladores de espectro e associações setoriais relevantes',
    regionalLabel: 'Regional',
    globalLabel: 'Internacional',
    sourcesCountWord: 'fontes',
  },
  sv: {
    heading: 'Standarder och auktoritativa källor',
    subtitle: 'Standardiseringsorgan, spektrummyndigheter och branschorganisationer för ämnet',
    regionalLabel: 'Regional',
    globalLabel: 'Internationell',
    sourcesCountWord: 'källor',
  },
  no: {
    heading: 'Standarder og autoritative kilder',
    subtitle: 'Standardiseringsorganer, spektrummyndigheter og bransjeorganisasjoner for temaet',
    regionalLabel: 'Regional',
    globalLabel: 'Internasjonal',
    sourcesCountWord: 'kilder',
  },
  fi: {
    heading: 'Standardit ja viralliset lähteet',
    subtitle: 'Standardointijärjestöt, taajuusviranomaiset ja toimialajärjestöt aiheen mukaan',
    regionalLabel: 'Alueellinen',
    globalLabel: 'Kansainvälinen',
    sourcesCountWord: 'lähdettä',
  },
  cs: {
    heading: 'Normy a autoritativní zdroje',
    subtitle: 'Normalizační orgány, regulátoři spektra a oborové asociace související s tématem',
    regionalLabel: 'Regionální',
    globalLabel: 'Mezinárodní',
    sourcesCountWord: 'zdrojů',
  },
  sk: {
    heading: 'Normy a autoritatívne zdroje',
    subtitle: 'Normalizačné orgány, regulátori spektra a odborové združenia k téme článku',
    regionalLabel: 'Regionálny',
    globalLabel: 'Medzinárodný',
    sourcesCountWord: 'zdrojov',
  },
  ro: {
    heading: 'Standarde și surse de referință',
    subtitle: 'Organisme de standardizare, autorități de reglementare și asociații din domeniu',
    regionalLabel: 'Regional',
    globalLabel: 'Internațional',
    sourcesCountWord: 'surse',
  },
  bg: {
    heading: 'Стандарти и авторитетни източници',
    subtitle: 'Стандартизационни органи, регулатори на спектъра и браншови асоциации по темата',
    regionalLabel: 'Регионален',
    globalLabel: 'Международен',
    sourcesCountWord: 'източника',
  },
  et: {
    heading: 'Standardid ja autoriteetsed allikad',
    subtitle: 'Standardiorganisatsioonid, sagedusregulaatorid ja erialaliidud selle teema kohta',
    regionalLabel: 'Piirkondlik',
    globalLabel: 'Rahvusvaheline',
    sourcesCountWord: 'allikat',
  },
  lt: {
    heading: 'Standartai ir autoritetingi šaltiniai',
    subtitle: 'Standartizacijos institucijos, spektro reguliuotojai ir pramonės asociacijos pagal temą',
    regionalLabel: 'Regioninis',
    globalLabel: 'Tarptautinis',
    sourcesCountWord: 'šaltiniai',
  },
};

export function getSourcesUiStrings(lang: LangCode): SourcesUiStrings {
  return SOURCES_UI[lang] || SOURCES_UI.en;
}

let cachedSources: SourceEntry[] | null = null;
let cachedMtime = 0;

export function loadSourcesRegistry(): SourceEntry[] {
  const filePath = path.join(process.cwd(), 'data', 'sources.json');
  if (!fs.existsSync(filePath)) return [];
  try {
    const stat = fs.statSync(filePath);
    if (cachedSources && stat.mtimeMs === cachedMtime) {
      return cachedSources;
    }
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!Array.isArray(raw)) return [];
    cachedSources = raw.filter(
      (item): item is SourceEntry =>
        Boolean(item && typeof item.code === 'string' && typeof item.url === 'string' && typeof item.desc === 'string')
    );
    cachedMtime = stat.mtimeMs;
    return cachedSources;
  } catch (err) {
    console.warn('[sources] Failed to load data/sources.json:', err);
    return [];
  }
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsWholeTerm(haystack: string, term: string, caseSensitive = false): boolean {
  const clean = term.trim();
  if (!clean || !haystack) return false;
  const normalizedHaystack = caseSensitive ? haystack : haystack.toLowerCase();
  const normalizedTerm = caseSensitive ? clean : clean.toLowerCase();
  if (!normalizedHaystack.includes(normalizedTerm)) return false;

  try {
    const re = new RegExp(
      `(?:^|[^\\p{L}\\p{N}])${escapeRegExp(clean)}(?:$|[^\\p{L}\\p{N}])`,
      caseSensitive ? 'u' : 'iu'
    );
    return re.test(haystack);
  } catch {
    return normalizedHaystack.includes(normalizedTerm);
  }
}

function extractHost(urlStr: string): string {
  try {
    return new URL(urlStr).hostname.replace(/^www\./i, '');
  } catch {
    return urlStr.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0] || urlStr;
  }
}

function getLocalAffinityTieBreaker(entry: SourceEntry, lang: LangCode): number {
  const host = extractHost(entry.url).toLowerCase();
  // Prefer national telecom regulators & national GS1 organizations slightly on tie-breaks
  if (host.startsWith('gs1') || entry.code.startsWith('GS1 ')) return 2;
  if (
    /regulator|communications|spectrum|telecom|telekom|frekvens/i.test(entry.desc) ||
    entry.langs.includes(lang)
  ) {
    return /regulator|communications|spectrum|telecom|frequency|authority/i.test(entry.desc) ? 2 : 1;
  }
  return 0;
}

export function selectArticleSources(
  post: Pick<PostItem, 'lang' | 'title' | 'description' | 'categories' | 'tags' | 'translationKey' | 'plainText'>
): SelectedSource[] {
  const entries = loadSourcesRegistry();
  if (!entries.length) return [];

  const tkReadable = (post.translationKey || '').replace(/[-_]+/g, ' ');
  const metaRaw = [
    post.title || '',
    post.description || '',
    ...(post.categories || []),
    ...(post.tags || []),
    post.translationKey || '',
    tkReadable,
  ].join(' \n ');

  const bodyRaw = post.plainText || '';

  type ScoredCandidate = SelectedSource & {
    idx: number;
    isGlobal: boolean;
    localTie: number;
  };

  const localCandidates: ScoredCandidate[] = [];
  const generalCandidates: ScoredCandidate[] = [];

  entries.forEach((entry, idx) => {
    const langs = Array.isArray(entry.langs) ? entry.langs : [];
    const isLocal = langs.includes(post.lang);
    const isGlobal = langs.includes('all');

    let contextScore = 0;

    // Score source code explicitly (avoid false matches on 2-letter codes like EC / RU)
    const code = entry.code.trim();
    if (code.length >= 3) {
      // Also test primary token before parenthesis e.g. "NCEC (NKEK)" -> "NCEC"
      const codeVariants = [code];
      const parenMatch = code.match(/^([^\s(]+)\s*\(([^)]+)\)$/);
      if (parenMatch) {
        codeVariants.push(parenMatch[1], parenMatch[2]);
      }
      for (const variant of codeVariants) {
        if (variant.length >= 3) {
          if (containsWholeTerm(metaRaw, variant, false)) {
            contextScore += 20;
            break;
          } else if (containsWholeTerm(bodyRaw, variant, false)) {
            contextScore += 8;
            break;
          }
        }
      }
    } else if (code === 'EC') {
      if (containsWholeTerm(metaRaw, 'EC', true)) contextScore += 14;
      else if (containsWholeTerm(bodyRaw, 'EC', true)) contextScore += 6;
    } else if (code === 'RU' && post.lang === 'sk') {
      if (containsWholeTerm(metaRaw, 'RU', true)) contextScore += 14;
      else if (containsWholeTerm(bodyRaw, 'RU', true)) contextScore += 6;
    }

    // Score keywords
    let metaKwHits = 0;
    let bodyKwHits = 0;
    const keywords = Array.isArray(entry.keywords) ? entry.keywords : [];
    for (const kw of keywords) {
      const term = String(kw || '').trim();
      if (!term) continue;
      if (containsWholeTerm(metaRaw, term, false)) {
        metaKwHits += 1;
      } else if (containsWholeTerm(bodyRaw, term, false)) {
        bodyKwHits += 1;
      }
    }

    // Cap keyword contribution per bucket slightly so long keyword lists don't drown out exact regulators
    contextScore += Math.min(metaKwHits, 4) * 14 + Math.min(bodyKwHits, 5) * 6;

    const prior = isGlobal ? CORE_AUTHORITY_PRIORS[entry.code] || 0 : 0;
    const localTie = isLocal ? getLocalAffinityTieBreaker(entry, post.lang) : 0;
    const totalScore = contextScore + prior + (isLocal ? 3 + localTie : 0);

    // Only keep sources that belong to this language, global ("all"), or were explicitly cited in metadata/code
    if (!isLocal && !isGlobal && contextScore < 14) {
      return;
    }

    const candidate: ScoredCandidate = {
      code: entry.code,
      url: entry.url,
      desc: entry.desc,
      host: extractHost(entry.url),
      isLocal,
      regionCode: isLocal ? post.lang.toUpperCase() : '',
      score: totalScore,
      contextScore,
      idx,
      isGlobal,
      localTie,
    };

    if (isLocal) {
      localCandidates.push(candidate);
    } else {
      generalCandidates.push(candidate);
    }
  });

  localCandidates.sort((a, b) => b.score - a.score || b.localTie - a.localTie || a.idx - b.idx);
  generalCandidates.sort((a, b) => b.score - a.score || a.idx - b.idx);

  // Pick 1-2 local sources when available
  const pickedLocal = localCandidates.slice(0, 2);
  const pickedUrls = new Set(pickedLocal.map((item) => item.url));

  const remainingGeneral = generalCandidates.filter((item) => !pickedUrls.has(item.url));
  const contextualGeneral = remainingGeneral.filter((item) => item.contextScore > 0);
  const fallbackGeneral = remainingGeneral.filter((item) => item.contextScore === 0);

  const maxTotal = 10;
  const targetMin = 6;

  const chosenGeneral: ScoredCandidate[] = [];
  for (const item of contextualGeneral) {
    if (pickedLocal.length + chosenGeneral.length >= maxTotal) break;
    chosenGeneral.push(item);
  }

  for (const item of fallbackGeneral) {
    if (pickedLocal.length + chosenGeneral.length >= targetMin) break;
    chosenGeneral.push(item);
  }

  // Order cleanly: contextually matched sources (by score) first, then any local/global fallback padding
  const combined = [...pickedLocal, ...chosenGeneral];
  combined.sort((a, b) => {
    const aMatched = a.contextScore > 0 ? 1 : 0;
    const bMatched = b.contextScore > 0 ? 1 : 0;
    if (aMatched !== bMatched) return bMatched - aMatched;
    if (a.isLocal !== b.isLocal && aMatched === 0) return a.isLocal ? -1 : 1;
    return b.score - a.score || a.idx - b.idx;
  });

  return combined.slice(0, maxTotal).map(({ code, url, desc, host, isLocal, regionCode, score, contextScore }) => ({
    code,
    url,
    desc,
    host,
    isLocal,
    regionCode,
    score,
    contextScore,
  }));
}
