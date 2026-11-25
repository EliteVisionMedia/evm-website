import { useEffect } from 'react';

export const SITE_URL = 'https://elitevisionmedia.com';

interface Seo {
  title: string;
  description: string;
  path: string;
  /** JSON-LD objects rendered into one script tag for this page. */
  schema?: object[];
  /** Absolute or root-relative Open Graph image. */
  image?: string;
  keywords?: string[];
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const prev = el.content;
  el.content = value;
  return () => (created ? el!.remove() : (el!.content = prev));
}

/** Per-page title, meta description, canonical, Open Graph and JSON-LD. Restores the defaults on unmount. */
export default function useSeo({ title, description, path, schema, image, keywords }: Seo) {
  useEffect(() => {
    const url = SITE_URL + path;
    const prevTitle = document.title;
    document.title = title;
    const undo = [
      setMeta('name', 'description', description),
      setMeta('property', 'og:title', title),
      setMeta('property', 'og:description', description),
      setMeta('property', 'og:url', url),
      setMeta('property', 'og:type', 'website'),
      setMeta('property', 'og:site_name', 'Elite Vision Media'),
      setMeta('name', 'twitter:card', 'summary_large_image'),
      ...(image ? [setMeta('property', 'og:image', image.startsWith('http') ? image : SITE_URL + image)] : []),
      ...(keywords?.length ? [setMeta('name', 'keywords', keywords.join(', '))] : []),
    ];
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url;
    document.head.appendChild(canonical);
    let ld: HTMLScriptElement | null = null;
    if (schema?.length) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.textContent = JSON.stringify(schema.length === 1 ? schema[0] : schema);
      document.head.appendChild(ld);
    }
    return () => {
      document.title = prevTitle;
      undo.forEach((f) => f());
      canonical.remove();
      ld?.remove();
    };
  }, [title, description, path, schema, image, keywords]);
}

/** Shared schema helpers. */
export const evmOrg = {
  '@type': 'Organization',
  name: 'Elite Vision Media',
  url: SITE_URL,
  address: { '@type': 'PostalAddress', addressLocality: 'Coimbatore', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
};

export function serviceSchema(name: string, description: string, path: string, offers: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: SITE_URL + path,
    provider: evmOrg,
    areaServed: [{ '@type': 'City', name: 'Coimbatore' }, { '@type': 'Country', name: 'India' }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name,
      itemListElement: offers.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o } })),
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE_URL + it.path })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
