import { I18N, LANGUAGES, SITE_CONFIG, type LangCode } from './config.js';
import { slugify, type PostItem } from './content.js';
import type { CatalogItem, ResolvedCatalogRenderData } from './catalog.js';

const CANONICAL_ORIGIN = SITE_CONFIG.baseUrl.replace(/\/+$/, '');
const ORG_ID = `${CANONICAL_ORIGIN}/#organization`;
const PERSON_ID = `${CANONICAL_ORIGIN}/#yurii-kasian`;

const FAQ_HEADING_RE =
  /(?:^|[^\p{L}\p{N}])(faq|частые\s+вопросы|часто\s+задаваемые\s+вопросы|питання\s+та\s+відповіді|поширені\s+питання|часті\s+питання|frequently\s+asked\s+questions|häufige\s+fragen|questions\s+fréquentes|preguntas\s+frecuentes|domande\s+frequenti|veelgestelde\s+vragen|perguntas\s+frequentes|najczęściej\s+zadawane\s+pytania|ofte\s+stillede\s+spørgsmål|vanliga\s+frågor|ofte\s+stilte\s+spørsmål|usein\s+kysytyt\s+kysymykset|často\s+kladené\s+otázky|časté\s+otázky|întrebări\s+frecvente|често\s+задавани\s+въпроси|korduma\s+kippuvad\s+küsimused|dažniausiai\s+užduodami\s+klausimai)(?:[^\p{L}\p{N}]|$)/iu;

const CATALOG_CATEGORY_NAMES: Record<string, string> = {
  reader: 'Industrial UHF RFID Reader',
  antenna: 'UHF RFID Directional Antenna',
  tag: 'RFID Transponder & Tag',
  software: 'RFID Middleware & SDK',
  accessory: 'RF Cable & Integration Accessory',
};

const AVAILABILITY_SCHEMA_URLS: Record<string, string> = {
  in_stock: 'https://schema.org/InStock',
  software_license: 'https://schema.org/InStock',
  discontinued: 'https://schema.org/Discontinued',
  order: 'https://schema.org/MadeToOrder',
};

export function toAbsoluteSiteUrl(relOrAbs: string): string {
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
  let str = html.replace(/<a\b[^>]*class="[^"]*\bheader-anchor\b[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
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

      const qName = htmlToPlainText(qChunk.slice(qOpenEnd + 1, qCloseIdx)).replace(/\s*#+\s*$/, '').trim();
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
  pageDescription?: string;
  post?: PostItem;
  translatedPosts?: PostItem[];
  catalogResolved?: ResolvedCatalogRenderData;
  catalogList?: {
    sectionTitle: string;
    sectionUrlPath: string;
    items: CatalogItem[];
  };
}

export function buildSchemaJsonLd(input: SchemaBuildInput): string {
  const langConfig = LANGUAGES[input.lang];
  const homeUrl = `${CANONICAL_ORIGIN}${langConfig.urlPrefix ? `${langConfig.urlPrefix}/` : '/'}`;
  const websiteId = `${homeUrl}#website`;
  const currentUrl = toAbsoluteSiteUrl(input.pageUrlPath);

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
    const postUrl = toAbsoluteSiteUrl(post.permalink);
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
      techArticle.image = toAbsoluteSiteUrl(post.imageUrl);
    }
    if (input.translatedPosts && input.translatedPosts.length > 0) {
      techArticle.workTranslation = input.translatedPosts.map((tp) => ({
        '@type': 'TechArticle',
        inLanguage: tp.lang,
        url: toAbsoluteSiteUrl(tp.permalink),
      }));
    }

    graph.push(techArticle);
  }

  // Product / SoftwareApplication Schema.org for Catalog Item pages
  if (input.catalogResolved) {
    const { item, effectiveShowPrice, settings, translations, resolvedArticles } = input.catalogResolved;
    const itemUrl = toAbsoluteSiteUrl(item.permalink);
    const isSoftware = item.catalogType === 'software';
    const schemaType = isSoftware ? 'SoftwareApplication' : 'Product';

    const entity: Record<string, unknown> = {
      '@type': schemaType,
      '@id': `${itemUrl}#product`,
      mainEntityOfPage: itemUrl,
      url: itemUrl,
      name: item.title,
      description: item.description || item.summary,
      inLanguage: item.lang,
      category: CATALOG_CATEGORY_NAMES[item.catalogType] || 'RFID Hardware',
      isPartOf: { '@id': websiteId },
    };

    if (isSoftware) {
      entity.applicationCategory = 'BusinessApplication';
      entity.operatingSystem = 'Linux, Docker, Cross-platform';
    }
    if (item.sku) {
      entity.sku = item.sku;
      entity.mpn = item.sku;
    }
    if (item.manufacturer) {
      entity.brand = { '@type': 'Brand', name: item.manufacturer };
      entity.manufacturer = { '@type': 'Organization', name: item.manufacturer };
    }

    const images = Array.from(
      new Set([item.imageUrl, ...item.galleryUrls].filter((u): u is string => Boolean(u)).map(toAbsoluteSiteUrl))
    );
    if (images.length > 0) {
      entity.image = images;
    }

    if (item.tags.length > 0) {
      entity.keywords = item.tags;
    }

    if (item.specs.length > 0) {
      entity.additionalProperty = item.specs.map((row) => {
        const prop: Record<string, unknown> = {
          '@type': 'PropertyValue',
          name: row.group ? `${row.group} — ${row.label}` : row.label,
          value: row.value,
        };
        if (row.unit) prop.unitText = row.unit;
        return prop;
      });
    }

    const subjectOf: Array<Record<string, unknown>> = [];
    for (const doc of item.documents) {
      const dObj: Record<string, unknown> = {
        '@type': 'DigitalDocument',
        name: doc.title,
        url: toAbsoluteSiteUrl(doc.file),
      };
      if (doc.file.toLowerCase().endsWith('.pdf')) dObj.encodingFormat = 'application/pdf';
      if (doc.version) dObj.version = doc.version;
      if (doc.lang) dObj.inLanguage = doc.lang.toLowerCase();
      subjectOf.push(dObj);
    }
    for (const art of resolvedArticles) {
      subjectOf.push({
        '@type': 'TechArticle',
        headline: art.title,
        url: toAbsoluteSiteUrl(art.permalink),
        inLanguage: art.lang,
      });
    }
    if (subjectOf.length > 0) {
      entity.subjectOf = subjectOf;
    }

    if (effectiveShowPrice && item.price !== null) {
      entity.offers = {
        '@type': 'Offer',
        url: itemUrl,
        priceCurrency: item.currency || settings.defaultCurrency || 'EUR',
        price: item.price,
        availability: AVAILABILITY_SCHEMA_URLS[item.availability] || 'https://schema.org/MadeToOrder',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@id': ORG_ID },
      };
    }

    if (translations.length > 0) {
      entity.workTranslation = translations.map((tr) => ({
        '@type': schemaType,
        inLanguage: tr.lang,
        url: toAbsoluteSiteUrl(tr.permalink),
      }));
    }

    graph.push(entity);
  }

  // CollectionPage + ItemList Schema.org for Catalog Index
  if (input.catalogList) {
    const colUrl = toAbsoluteSiteUrl(input.catalogList.sectionUrlPath);
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${colUrl}#collection`,
      url: colUrl,
      name: input.catalogList.sectionTitle,
      description: input.pageDescription || 'Industrial UHF RFID readers, antennas, transponders, and software SDKs.',
      inLanguage: input.lang,
      isPartOf: { '@id': websiteId },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: input.catalogList.items.length,
        itemListElement: input.catalogList.items.map((it, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: toAbsoluteSiteUrl(it.permalink),
          name: it.title,
        })),
      },
    });
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

    if (input.catalogResolved) {
      const catSectionUrl = toAbsoluteSiteUrl(`${langConfig.urlPrefix}/catalog/`);
      breadcrumbs.push({
        '@type': 'ListItem',
        position: pos++,
        name: I18N[input.lang].catalog,
        item: catSectionUrl,
      });
    } else if (input.isArticle && input.post && input.post.categories.length > 0) {
      const cat = input.post.categories[0];
      const catPath = `${langConfig.urlPrefix}/categories/${encodeURIComponent(slugify(cat))}/`;
      breadcrumbs.push({
        '@type': 'ListItem',
        position: pos++,
        name: cat,
        item: toAbsoluteSiteUrl(catPath),
      });
    }

    breadcrumbs.push({
      '@type': 'ListItem',
      position: pos,
      name: input.catalogResolved
        ? input.catalogResolved.item.title
        : input.isArticle && input.post
        ? input.post.title
        : input.pageTitle,
    });

    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${currentUrl}#breadcrumb`,
      itemListElement: breadcrumbs,
    });
  }

  const faqHtml = input.catalogResolved
    ? input.catalogResolved.item.html
    : input.isArticle && input.post
    ? input.post.html
    : '';
  if (faqHtml) {
    const faqTargetUrl = input.catalogResolved
      ? toAbsoluteSiteUrl(input.catalogResolved.item.permalink)
      : toAbsoluteSiteUrl(input.post!.permalink);
    const faqItems = extractFaqEntities(faqHtml);
    if (faqItems.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${faqTargetUrl}#faq`,
        mainEntity: faqItems,
      });
    }
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c');
}
