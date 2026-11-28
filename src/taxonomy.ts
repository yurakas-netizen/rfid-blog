import fs from 'node:fs';
import path from 'node:path';
import { isValidLang, ORDERED_LANGUAGES, type LangCode } from './config.js';

const ROOT_DIR = process.cwd();
export const TAXONOMY_FILE_PATH = path.resolve(ROOT_DIR, 'data', 'taxonomy.json');
const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface TaxonomyTermEntry {
  id: string;
  translations: Partial<Record<LangCode, string>>;
}

export interface TaxonomyDictionary {
  version: number;
  categories: TaxonomyTermEntry[];
  tags: TaxonomyTermEntry[];
}

function sanitizeTermId(raw: unknown): string {
  const clean = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
  if (!clean || !ID_RE.test(clean) || clean.length > 80) {
    throw new Error(`Некорректный идентификатор таксономии: ${String(raw || '')}`);
  }
  return clean;
}

function sanitizeTranslationText(raw: unknown): string {
  return String(raw ?? '')
    .replace(/[\r\n\0]/g, ' ')
    .trim()
    .slice(0, 120);
}

function normalizeEntryList(rawList: unknown): TaxonomyTermEntry[] {
  if (!Array.isArray(rawList)) return [];
  const seenIds = new Set<string>();
  const out: TaxonomyTermEntry[] = [];

  for (const rawItem of rawList) {
    if (!rawItem || typeof rawItem !== 'object') continue;
    const itemObj = rawItem as { id?: unknown; translations?: unknown };
    const id = sanitizeTermId(itemObj.id);
    if (seenIds.has(id)) continue;

    const rawTrans =
      itemObj.translations && typeof itemObj.translations === 'object'
        ? (itemObj.translations as Record<string, unknown>)
        : {};

    const translations: Partial<Record<LangCode, string>> = {};
    for (const langCfg of ORDERED_LANGUAGES) {
      const val = sanitizeTranslationText(rawTrans[langCfg.code]);
      if (val) {
        translations[langCfg.code] = val;
      }
    }

    if (Object.keys(translations).length === 0) {
      throw new Error(`У термина «${id}» должен быть хотя бы один перевод`);
    }

    seenIds.add(id);
    out.push({ id, translations });
  }

  return out;
}

export function loadTaxonomyDictionary(): TaxonomyDictionary {
  if (!fs.existsSync(TAXONOMY_FILE_PATH)) {
    return { version: 1, categories: [], tags: [] };
  }
  try {
    const raw = fs.readFileSync(TAXONOMY_FILE_PATH, 'utf8');
    const clean = raw.startsWith('\uFEFF') ? raw.slice(1) : raw;
    const parsed = JSON.parse(clean) as {
      version?: unknown;
      categories?: unknown;
      tags?: unknown;
    };
    return {
      version: Number(parsed.version) || 1,
      categories: normalizeEntryList(parsed.categories),
      tags: normalizeEntryList(parsed.tags),
    };
  } catch (err) {
    console.warn('[taxonomy] Failed to read data/taxonomy.json:', err);
    return { version: 1, categories: [], tags: [] };
  }
}

export function saveTaxonomyDictionary(rawPayload: unknown): {
  ok: boolean;
  status: number;
  error?: string;
  taxonomy?: TaxonomyDictionary;
} {
  if (!rawPayload || typeof rawPayload !== 'object') {
    return { ok: false, status: 400, error: 'Некорректное тело словаря таксономии' };
  }
  const input = rawPayload as { categories?: unknown; tags?: unknown };
  try {
    const next: TaxonomyDictionary = {
      version: 1,
      categories: normalizeEntryList(input.categories),
      tags: normalizeEntryList(input.tags),
    };

    const dir = path.dirname(TAXONOMY_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(TAXONOMY_FILE_PATH, JSON.stringify(next, null, 2) + '\n', 'utf8');
    return { ok: true, status: 200, taxonomy: next };
  } catch (err) {
    return {
      ok: false,
      status: 400,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function findTaxonomyMatch(
  rawTerm: string,
  items: TaxonomyTermEntry[]
): TaxonomyTermEntry | null {
  const needle = String(rawTerm || '').trim().toLowerCase();
  if (!needle) return null;

  for (const item of items) {
    if (item.id.toLowerCase() === needle) {
      return item;
    }
    for (const val of Object.values(item.translations)) {
      if (typeof val === 'string' && val.trim().toLowerCase() === needle) {
        return item;
      }
    }
  }
  return null;
}

export function resolveTermForLang(
  rawTerm: string,
  targetLang: LangCode,
  items: TaxonomyTermEntry[]
): { value: string; matchedId: string | null; usedFallback: boolean } {
  const clean = String(rawTerm || '').trim();
  if (!clean) return { value: '', matchedId: null, usedFallback: false };

  const match = findTaxonomyMatch(clean, items);
  if (!match) {
    return { value: clean, matchedId: null, usedFallback: false };
  }

  const direct = isValidLang(targetLang) ? match.translations[targetLang]?.trim() : '';
  if (direct) {
    return { value: direct, matchedId: match.id, usedFallback: false };
  }

  const enFallback = match.translations.en?.trim();
  if (enFallback) {
    return { value: enFallback, matchedId: match.id, usedFallback: true };
  }

  const firstAny = Object.values(match.translations).find((v) => typeof v === 'string' && v.trim());
  return {
    value: (firstAny || clean).trim(),
    matchedId: match.id,
    usedFallback: true,
  };
}

export function resolveTaxonomyListForLang(
  rawTerms: string[],
  targetLang: LangCode,
  items: TaxonomyTermEntry[]
): string[] {
  const seenLower = new Set<string>();
  const out: string[] = [];

  for (const raw of rawTerms) {
    const resolved = resolveTermForLang(raw, targetLang, items).value;
    if (!resolved) continue;
    const key = resolved.toLowerCase();
    if (seenLower.has(key)) continue;
    seenLower.add(key);
    out.push(resolved);
  }
  return out;
}
