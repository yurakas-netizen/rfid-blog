import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { LANGUAGES, ORDERED_LANGUAGES, isValidLang, type LangCode } from './config.js';

const ROOT_DIR = process.cwd();
const CONTENT_ROOT = path.resolve(ROOT_DIR, 'content');
const REL_PATH_RE = /^content\/([a-z]{2})\/post\/([^/\\]+)\/index\.md$/;

export interface RegistryEntry {
  id: string;
  relPath: string;
  lang: LangCode;
  folder: string;
  title: string;
  slug: string;
  effectiveSlug: string;
  date: string;
  translationKey: string;
  categories: string[];
  tags: string[];
  draft: boolean;
  fileHash: string;
  permalink: string;
  rawFrontmatter: string;
}

export interface RegistryPatch {
  slug?: string;
  translationKey?: string;
  categories?: string[];
  tags?: string[];
}

export interface RegistryChangeInput {
  relPath: string;
  expectedHash: string;
  patch: RegistryPatch;
}

export interface DiffLine {
  type: 'ctx' | 'del' | 'add';
  text: string;
}

export interface RegistryPreviewItem {
  relPath: string;
  changed: boolean;
  conflict: boolean;
  error?: string;
  beforeFm: string;
  afterFm: string;
  diffLines: DiffLine[];
  newHash?: string;
}

function sha256(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

export function resolveSafePostPath(relPath: string): { absPath: string; lang: LangCode; folder: string } {
  if (typeof relPath !== 'string') {
    throw new Error('Invalid file path');
  }
  const normalizedRel = relPath.replace(/\\/g, '/').trim();
  const match = normalizedRel.match(REL_PATH_RE);
  if (!match) {
    throw new Error(`Path outside allowed post bundle pattern: ${relPath}`);
  }
  const lang = match[1];
  const folder = match[2];
  if (!isValidLang(lang) || folder === '.' || folder === '..' || folder.includes('\0')) {
    throw new Error(`Invalid language or folder in path: ${relPath}`);
  }
  const absPath = path.resolve(ROOT_DIR, normalizedRel);
  if (!absPath.startsWith(CONTENT_ROOT + path.sep)) {
    throw new Error(`Path escapes content root: ${relPath}`);
  }
  return { absPath, lang, folder };
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
    const val = String(item ?? '').trim();
    if (!val || seen.has(val)) continue;
    seen.add(val);
    out.push(val);
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

interface FmBlock {
  key: string | null;
  lines: string[];
}

function splitFrontmatterDocument(rawFile: string): {
  bom: string;
  eol: string;
  fmText: string;
  bodyWithClosing: string;
} {
  const bom = rawFile.startsWith('\uFEFF') ? '\uFEFF' : '';
  const withoutBom = bom ? rawFile.slice(1) : rawFile;
  const match = withoutBom.match(/^---(\r?\n)([\s\S]*?)\r?\n---([\s\S]*)$/);
  if (match) {
    return {
      bom,
      eol: match[1] || '\n',
      fmText: match[2],
      bodyWithClosing: match[3] ?? '',
    };
  }
  const emptyMatch = withoutBom.match(/^---(\r?\n)---([\s\S]*)$/);
  if (emptyMatch) {
    return {
      bom,
      eol: emptyMatch[1] || '\n',
      fmText: '',
      bodyWithClosing: emptyMatch[2] ?? '',
    };
  }
  throw new Error('File does not contain valid YAML frontmatter delimited by ---');
}

function parseTopLevelBlocks(fmText: string): FmBlock[] {
  if (!fmText.trim()) return [];
  const lines = fmText.split(/\r?\n/);
  const blocks: FmBlock[] = [];
  let current: FmBlock | null = null;

  for (const line of lines) {
    const keyMatch = line.match(/^([A-Za-z0-9_-]+)\s*:(.*)$/);
    if (keyMatch) {
      current = { key: keyMatch[1], lines: [line] };
      blocks.push(current);
    } else if (current) {
      current.lines.push(line);
    } else {
      blocks.push({ key: null, lines: [line] });
    }
  }
  return blocks;
}

function buildKeyLines(key: string, value: string | string[]): string[] | null {
  if (Array.isArray(value)) {
    const items = normalizeStringArray(value);
    if (items.length === 0) return null;
    return [`${key}:`, ...items.map((item) => `  - ${formatYamlScalar(item)}`)];
  }
  const clean = String(value ?? '').trim();
  if (!clean) return null;
  return [`${key}: ${formatYamlScalar(clean)}`];
}

export function patchFrontmatterContent(
  rawFile: string,
  patch: RegistryPatch
): { nextContent: string; beforeFm: string; afterFm: string; changed: boolean } {
  const { bom, eol, fmText, bodyWithClosing } = splitFrontmatterDocument(rawFile);
  const blocks = parseTopLevelBlocks(fmText);

  const updates: Array<{ key: keyof RegistryPatch; value: string | string[] }> = [];
  if (patch.slug !== undefined) {
    updates.push({ key: 'slug', value: String(patch.slug).trim() });
  }
  if (patch.categories !== undefined) {
    updates.push({ key: 'categories', value: normalizeStringArray(patch.categories) });
  }
  if (patch.tags !== undefined) {
    updates.push({ key: 'tags', value: normalizeStringArray(patch.tags) });
  }
  if (patch.translationKey !== undefined) {
    updates.push({ key: 'translationKey', value: String(patch.translationKey).trim() });
  }

  for (const upd of updates) {
    const nextLines = buildKeyLines(upd.key, upd.value);
    const existingIdx = blocks.findIndex((b) => b.key === upd.key);
    if (existingIdx !== -1) {
      if (nextLines) {
        blocks[existingIdx] = { key: upd.key, lines: nextLines };
      } else {
        blocks.splice(existingIdx, 1);
      }
    } else if (nextLines) {
      blocks.push({ key: upd.key, lines: nextLines });
    }
  }

  const afterFmLines: string[] = [];
  for (const b of blocks) {
    for (const line of b.lines) {
      afterFmLines.push(line);
    }
  }

  const beforeFm = fmText.replace(/\r\n/g, '\n');
  const afterFmNormalized = afterFmLines.join('\n');
  const afterFmWithEol = afterFmLines.join(eol);
  const nextContent =
    afterFmWithEol.length > 0
      ? `${bom}---${eol}${afterFmWithEol}${eol}---${bodyWithClosing}`
      : `${bom}---${eol}---${bodyWithClosing}`;

  return {
    nextContent,
    beforeFm,
    afterFm: afterFmNormalized,
    changed: nextContent !== rawFile,
  };
}

export function computeLineDiff(beforeText: string, afterText: string): DiffLine[] {
  const a = beforeText ? beforeText.split('\n') : [];
  const b = afterText ? afterText.split('\n') : [];
  const m = a.length;
  const n = b.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? 1 + dp[i + 1][j + 1] : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const full: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      full.push({ type: 'ctx', text: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      full.push({ type: 'del', text: a[i] });
      i++;
    } else {
      full.push({ type: 'add', text: b[j] });
      j++;
    }
  }
  while (i < m) {
    full.push({ type: 'del', text: a[i++] });
  }
  while (j < n) {
    full.push({ type: 'add', text: b[j++] });
  }

  // Keep only changed lines + 1 line of surrounding context
  const keep = new Set<number>();
  for (let idx = 0; idx < full.length; idx++) {
    if (full[idx].type !== 'ctx') {
      if (idx > 0) keep.add(idx - 1);
      keep.add(idx);
      if (idx + 1 < full.length) keep.add(idx + 1);
    }
  }
  return full.filter((_, idx) => keep.has(idx));
}

export function loadRegistryEntries(): RegistryEntry[] {
  const entries: RegistryEntry[] = [];

  for (const langCfg of ORDERED_LANGUAGES) {
    const postDir = path.join(CONTENT_ROOT, langCfg.code, 'post');
    if (!fs.existsSync(postDir)) continue;

    for (const dirent of fs.readdirSync(postDir, { withFileTypes: true })) {
      if (!dirent.isDirectory()) continue;
      const absPath = path.join(postDir, dirent.name, 'index.md');
      if (!fs.existsSync(absPath)) continue;

      try {
        const raw = fs.readFileSync(absPath, 'utf8');
        const cleanForMatter = raw.startsWith('\uFEFF') ? raw.slice(1) : raw;
        const parsed = matter(cleanForMatter);
        const data = parsed.data || {};
        const relPath = `content/${langCfg.code}/post/${dirent.name}/index.md`;
        const slug = data.slug ? String(data.slug).trim() : '';
        const effectiveSlug = slug || dirent.name;
        const langPrefix = LANGUAGES[langCfg.code].urlPrefix;
        const permalink = `${langPrefix}/p/${encodeURIComponent(effectiveSlug)}/`;
        let rawFrontmatter = '';
        try {
          rawFrontmatter = splitFrontmatterDocument(raw).fmText;
        } catch {
          rawFrontmatter = '';
        }

        let dateIso = '';
        if (data.date instanceof Date && !Number.isNaN(data.date.getTime())) {
          dateIso = data.date.toISOString();
        } else if (data.date) {
          const d = new Date(String(data.date));
          dateIso = Number.isNaN(d.getTime()) ? String(data.date) : d.toISOString();
        }

        entries.push({
          id: relPath,
          relPath,
          lang: langCfg.code,
          folder: dirent.name,
          title: String(data.title || dirent.name),
          slug,
          effectiveSlug,
          date: dateIso,
          translationKey: data.translationKey ? String(data.translationKey).trim() : '',
          categories: normalizeStringArray(data.categories),
          tags: normalizeStringArray(data.tags),
          draft: Boolean(data.draft),
          fileHash: sha256(raw),
          permalink,
          rawFrontmatter,
        });
      } catch (err) {
        console.warn(`[registry] Failed to read ${absPath}:`, err);
      }
    }
  }

  entries.sort((a, b) => {
    const timeDiff = (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0);
    if (timeDiff !== 0) return timeDiff;
    return a.relPath.localeCompare(b.relPath);
  });

  return entries;
}

export function previewRegistryChanges(changes: RegistryChangeInput[]): RegistryPreviewItem[] {
  const previews: RegistryPreviewItem[] = [];
  for (const ch of changes) {
    try {
      const { absPath } = resolveSafePostPath(ch.relPath);
      if (!fs.existsSync(absPath)) {
        previews.push({
          relPath: ch.relPath,
          changed: false,
          conflict: true,
          error: 'Файл не найден на диске',
          beforeFm: '',
          afterFm: '',
          diffLines: [],
        });
        continue;
      }
      const raw = fs.readFileSync(absPath, 'utf8');
      const currentHash = sha256(raw);
      const conflict = Boolean(ch.expectedHash && currentHash !== ch.expectedHash);
      const patched = patchFrontmatterContent(raw, ch.patch || {});
      previews.push({
        relPath: ch.relPath,
        changed: patched.changed,
        conflict,
        error: conflict ? 'Файл был изменён на диске после загрузки реестра' : undefined,
        beforeFm: patched.beforeFm,
        afterFm: patched.afterFm,
        diffLines: computeLineDiff(patched.beforeFm, patched.afterFm),
        newHash: sha256(patched.nextContent),
      });
    } catch (err) {
      previews.push({
        relPath: ch.relPath,
        changed: false,
        conflict: true,
        error: err instanceof Error ? err.message : String(err),
        beforeFm: '',
        afterFm: '',
        diffLines: [],
      });
    }
  }
  return previews;
}

export function applyRegistryChanges(changes: RegistryChangeInput[]): {
  ok: boolean;
  status: number;
  error?: string;
  conflicts?: string[];
  updated: Array<{ relPath: string; newHash: string }>;
} {
  if (!Array.isArray(changes) || changes.length === 0) {
    return { ok: false, status: 400, error: 'Список изменений пуст', updated: [] };
  }

  const prepared: Array<{ absPath: string; relPath: string; nextContent: string; newHash: string }> = [];
  const conflicts: string[] = [];

  for (const ch of changes) {
    const { absPath } = resolveSafePostPath(ch.relPath);
    if (!fs.existsSync(absPath)) {
      conflicts.push(`${ch.relPath} (файл отсутствует)`);
      continue;
    }
    const raw = fs.readFileSync(absPath, 'utf8');
    const currentHash = sha256(raw);
    if (!ch.expectedHash || currentHash !== ch.expectedHash) {
      conflicts.push(ch.relPath);
      continue;
    }
    const patched = patchFrontmatterContent(raw, ch.patch || {});
    if (patched.changed) {
      prepared.push({
        absPath,
        relPath: ch.relPath,
        nextContent: patched.nextContent,
        newHash: sha256(patched.nextContent),
      });
    }
  }

  if (conflicts.length > 0) {
    return {
      ok: false,
      status: 409,
      error: `Обнаружен конфликт версий для ${conflicts.length} файл(ов). Обновите реестр перед сохранением.`,
      conflicts,
      updated: [],
    };
  }

  const updated: Array<{ relPath: string; newHash: string }> = [];
  for (const item of prepared) {
    fs.writeFileSync(item.absPath, item.nextContent, 'utf8');
    updated.push({ relPath: item.relPath, newHash: item.newHash });
  }

  return { ok: true, status: 200, updated };
}
