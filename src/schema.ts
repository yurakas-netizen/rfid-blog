import { LANGUAGES, SITE_CONFIG, type LangCode } from './config.js';
import { slugify, type PostItem } from './content.js';

const CANONICAL_ORIGIN = SITE_CONFIG.baseUrl.replace(/\/+$/, '');
const ORG_ID = `${CANONICAL_ORIGIN}/#organization`;
const PERSON_ID = `${CANONICAL_ORIGIN}/#yurii-kasian`;

const FAQ_HEADING_RE =
  /(?:^|\b)(faq|частые\s+вопросы|часто\s+задаваемые\s+вопросы|питання\s+та\s+відповіді|поширені\s+питання|часті\s+питання|frequently\s+asked\s+questions|häufige\s+fragen|questions\s+fréquentes|preguntas\s+frecuentes|domande\s+frequenti|veelgestelde\s+vragen|perguntas\s+frequentes|najczęściej\s+zadawane\s+pytania|ofte\s+stillede\s+spørgsmål|vanliga\s+frågor|ofte\s+stilte\s+spørsmål|usein\s+kysytyt\s+kysymykset|často\s+kladené\s+otázky|časté\s+otázky|întrebări\s+frecvente|често\s+задавани\s+въпроси|korduma\s+kippuvad\s+küsimused|dažniausiai\s+užduodami\s+klausimai)(?:\b|$)/i;

function toAbsoluteUrl(relOrAbs: string): string {
  if (!relOrAbs) return `${CANONICAL_ORIGIN}/`;
  if (/^https?:\/\//i.test(relOrAbs)) return relOrAbs;
  const normalized = relOrAbs.startsWith('/') ? relOrAbs : `/${relOrAbs}`;
  return `${CANONICAL_ORIGIN}${normalized}`;
}

function decodeBasicEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

function htmlToPlainText(html: string, preserveBlocks = false): string {
  let str = html;
  if (preserveBlocks) {
    str = str
      .replace(/<\/(p|li|tr|div|blockquote|h[4-6])>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/t[dh]>/gi, ' ');
  }
  str = str.replace(/<[^>]+>/g, '');
  str = decodeBasicEntities(str);
  if (preserveBlocks) {
    return str
      .replace(/[ \t\r]+/g, ' ')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{2,}/g, '\n')
      .trim();
  }
  return str.replace(/\s+/g, ' ').trim();
}

function extractFaqEntities(articleHtml: string): Array<Record<string, unknown>> {
  const items: Array<Record<string, unknown>> = [];
  const h2Chunks = articleHtml.split(/<h2\b/i);

  for (let i = 1; i < h2Chunks.length; i++) {
    const chunk = h2Chunks[i];
    const closeIdx = chunk.search(/<\/h2>/i);
    if (closeIdx === -1) continue;

    const h2OpenEnd = chunk.indexOf('>');
    if (h2OpenEnd === -1 || h2OpenEnd > closeIdx) continue;

    const h2Text = htmlToPlainText(chunk.slice(h2OpenEnd + 1, closeIdx));
    if (!FAQ_HEADING_RE.test(h2Text)) continue;

    const faqBody = chunk.slice(closeIdx + 5);
    const h3Chunks = faqBody.split(/<h3\b/i);
    for (let j = 1; j < h3Chunks.length; j++) {
      const qChunk = h3Chunks[j];
      const qCloseIdx = qChunk.search(/<\/h3>/i);
      if (qCloseIdx === -1) continue;

      const qOpenEnd = qChunk.indexOf('>');
      if (qOpenEnd === -1 || qOpenEnd > qCloseIdx) continue;

      const qName = htmlToPlainText(qChunk.slice(qOpenEnd + 1, qCloseIdx));
      const aText = htmlToPlainText(qChunk.slice(qCloseIdx + 5), true);

      if (qName && aText) {
        items.push({
          '@type': 'Question',
          name: qName,
          acceptedAnswer: {
            '@type': 'Answer',
            text: aText,
          },
        });
      }
    }
  }

  return items;
}

export interface SchemaBuildInput {
  lang: LangCode;
  isHome: boolean;
  isArticle: boolean;
  pageUrlPath: string;
  pageTitle: string;
  post?: PostItem;
  translatedPosts?: PostItem[];
}

export function buildSchemaJsonLd(input: SchemaBuildInput): string {
  const langConfig = LANGUAGES[input.lang];
  const homeUrl = `${CANONICAL_ORIGIN}${langConfig.urlPrefix ? `${langConfig.urlPrefix}/` : '/'}`;
  const websiteId = `${homeUrl}#website`;
  const currentUrl = toAbsoluteUrl(input.pageUrlPath);

  const organization = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'RFID Ukraine',
    alternateName: ['RFID.ORG.UA', 'РФІД Україна', 'РФИД Украина'],
    url: `${CANONICAL_ORIGIN}/`,
    foundingDate: '2015',
    description:
      'Independent engineering and analytical platform for UHF RFID, RTLS, NFC, and industrial IIoT: ETSI/FCC/ISO/GS1 standards, RF physics, RFID-U cloud PWA terminal, and 5-year TCO/ROI models.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kyiv',
      addressCountry: 'UA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+380-66-153-60-30',
      contactType: 'technical support',
      availableLanguage: ['English', 'Ukrainian', 'Russian'],
    },
    founder: { '@id': PERSON_ID },
  };

  const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Yurii Kasian',
    alternateName: 'Юрий Касьян',
    jobTitle: 'Principal RFID Engineer',
    worksFor: { '@id': ORG_ID },
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: homeUrl,
    name: 'RFID Ukraine — UHF RFID, RTLS & IIoT Engineering Platform',
    publisher: { '@id': ORG_ID },
    inLanguage: input.lang,
  };

  const graph: Array<Record<string, unknown>> = [organization, person, website];

  if (input.isArticle && input.post) {
    const post = input.post;
    const postUrl = toAbsoluteUrl(post.permalink);
    const keywords = Array.from(new Set([...post.categories, ...post.tags].map((k) => k.trim()).filter(Boolean)));
    const techArticle: Record<string, unknown> = {
      '@type': 'TechArticle',
      '@id': `${postUrl}#article`,
      mainEntityOfPage: postUrl,
      url: postUrl,
      headline: post.title,
      description: post.description || post.summary,
      datePublished: post.date.toISOString(),
      dateModified: post.date.toISOString(),
      inLanguage: post.lang,
      author: { '@id': PERSON_ID },
      publisher: { '@id': ORG_ID },
      isPartOf: { '@id': websiteId },
    };

    if (keywords.length > 0) {
      techArticle.keywords = keywords;
    }
    if (post.imageUrl) {
      techArticle.image = toAbsoluteUrl(post.imageUrl);
    }
    if (input.translatedPosts && input.translatedPosts.length > 0) {
      techArticle.workTranslation = input.translatedPosts.map((tp) => ({
        '@type': 'TechArticle',
        inLanguage: tp.lang,
        url: toAbsoluteUrl(tp.permalink),
      }));
    }

    graph.push(techArticle);
  }

  if (!input.isHome) {
    const breadcrumbs: Array<Record<string, unknown>> = [];
    let pos = 1;
    breadcrumbs.push({
      '@type': 'ListItem',
      position: pos++,
      name: 'RFID Ukraine',
      item: homeUrl,
    });

    if (input.isArticle && input.post && input.post.categories.length > 0) {
      const cat = input.post.categories[0];
      const catPath = `${langConfig.urlPrefix}/categories/${encodeURIComponent(slugify(cat))}/`;
      breadcrumbs.push({
        '@type': 'ListItem',
        position: pos++,
        name: cat,
        item: toAbsoluteUrl(catPath),
      });
    }

    breadcrumbs.push({
      '@type': 'ListItem',
      position: pos,
      name: input.isArticle && input.post ? input.post.title : input.pageTitle,
    });

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${currentUrl}#breadcrumb`,
      itemListElement: breadcrumbs,
    });
  }

  if (input.isArticle && input.post) {
    const faqItems = extractFaqEntities(input.post.html);
    if (faqItems.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${toAbsoluteUrl(input.post.permalink)}#faq`,
        mainEntity: faqItems,
      });
    }
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c');
}
