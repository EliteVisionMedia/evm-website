/**
 * SAMPLE / DEMO BLOG CONTENT.
 * Every article here is placeholder content written to demonstrate the layout. Dates are demo dates.
 * Replace with real EVM articles (or a CMS feed) before launch. No author credentials or business
 * claims are made; the author is shown simply as "EVM Team".
 */

export const blogCategories = [
  'Digital Marketing',
  'SEO & Google',
  'Web Design & Development',
  'Video Production',
  'Photography',
  'Branding & Creative Design',
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'img'; alt: string; caption?: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** SEO meta description (max ~155 chars). */
  description: string;
  category: BlogCategory;
  /** ISO date. DEMO date until real articles are published. */
  date: string;
  author: string;
  /** Optional real cover image URL. When absent a branded placeholder cover is generated. */
  cover?: string;
  featured?: boolean;
  sample: true;
  body: Block[];
}

const AUTHOR = 'EVM Team';

/** Category accent pairs for generated placeholder covers. */
const palette: Record<BlogCategory, [string, string, string]> = {
  'Digital Marketing': ['#0C0D11', '#019A9D', '#14303a'],
  'SEO & Google': ['#0a2a2b', '#4fd0d2', '#017F82'],
  'Web Design & Development': ['#dff3f3', '#019A9D', '#9fd8d9'],
  'Video Production': ['#07070a', '#2f2f3a', '#019A9D'],
  Photography: ['#1A1C25', '#c9a27a', '#017F82'],
  'Branding & Creative Design': ['#F4F4F1', '#017F82', '#0C0D11'],
};

/** Branded SVG placeholder cover (served as a data URI so it lazy-loads like a real image). */
export function placeholderCover(category: BlogCategory, seed = 0): string {
  const [bg, a, b] = palette[category];
  const cx = 30 + ((seed * 37) % 50);
  const cy = 25 + ((seed * 23) % 40);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="g" cx="${cx}%" cy="${cy}%" r="65%"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient><linearGradient id="l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1600" height="1000" fill="url(#l)"/><rect width="1600" height="1000" fill="url(#g)"/><text x="64" y="936" font-family="Manrope,Arial,sans-serif" font-size="30" font-weight="600" letter-spacing="4" fill="${bg === '#F4F4F1' || bg === '#dff3f3' ? '#0C0D11' : '#ffffff'}" opacity=".7">SAMPLE COVER</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const coverOf = (p: BlogPost) => p.cover ?? placeholderCover(p.category, blogPosts.indexOf(p) + 1);

export function readingTime(p: BlogPost): number {
  const words = p.body
    .map((b) => ('text' in b ? b.text : 'items' in b ? b.items.join(' ') : ''))
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const blogPosts: BlogPost[] = [
  {
    slug: 'planning-a-digital-marketing-calendar',
    cover: '/images/about/digital-marketing.webp',
    title: 'Planning a digital marketing calendar that your team can actually follow',
    excerpt: 'A simple monthly structure for campaigns, content and reporting, so marketing stops being last-minute.',
    description: 'Sample article: how to plan a practical monthly digital marketing calendar covering campaigns, content and reporting.',
    category: 'Digital Marketing',
    date: '2026-10-28',
    author: AUTHOR,
    featured: true,
    sample: true,
    body: [
      { type: 'p', text: 'This is a sample article used to demonstrate the EVM blog layout. Many small teams treat marketing as a series of urgent tasks. A shared calendar turns those tasks into a plan that everyone can see and prepare for.' },
      { type: 'h2', text: 'Start with the moments that matter' },
      { type: 'p', text: 'List the dates that are fixed for your business: launches, seasonal peaks, events and holidays. These become the anchors for the rest of the calendar.' },
      { type: 'ul', items: ['Product or service launches', 'Seasonal demand peaks', 'Local events and festivals', 'Planned offers or promotions'] },
      { type: 'h2', text: 'Give each week a clear focus' },
      { type: 'p', text: 'Rather than posting at random, decide what each week is for. One week might focus on awareness, the next on a specific offer, and another on customer stories.' },
      { type: 'img', alt: 'Sample image placeholder: a monthly marketing calendar on a desk', caption: 'Sample image placeholder' },
      { type: 'h3', text: 'Keep a review slot' },
      { type: 'p', text: 'Reserve time at the end of each month to look at what worked, what did not, and what to change next month.' },
      { type: 'quote', text: 'A calendar is not about posting more. It is about posting with purpose.' },
      { type: 'h2', text: 'A simple monthly checklist' },
      { type: 'ol', items: ['Confirm key dates for the month', 'Assign a focus to each week', 'Prepare creative in advance', 'Schedule posts and campaigns', 'Review results and adjust'] },
    ],
  },
  {
    slug: 'google-business-profile-basics',
    cover: '/images/services/digital-marketing.webp',
    title: 'Google Business Profile basics for local businesses',
    excerpt: 'The essential fields, photos and updates that help a local business appear clearly in Google Search and Maps.',
    description: 'Sample article: the essential Google Business Profile fields, photos and updates for local businesses.',
    category: 'SEO & Google',
    date: '2026-10-21',
    author: AUTHOR,
    sample: true,
    body: [
      { type: 'p', text: 'This is a sample article. A complete and accurate Google Business Profile helps people find your opening hours, location and contact details quickly.' },
      { type: 'h2', text: 'Fill in every field you can' },
      { type: 'ul', items: ['Business name, exactly as customers know it', 'Accurate category and services', 'Opening hours, including holidays', 'Phone number and website link'] },
      { type: 'h2', text: 'Add real photos' },
      { type: 'p', text: 'Photos of your premises, team and work help people recognise you. Update them when anything changes.' },
      { type: 'img', alt: 'Sample image placeholder: a business listing on a phone screen', caption: 'Sample image placeholder' },
      { type: 'h2', text: 'Reply to reviews' },
      { type: 'p', text: 'Responding politely to reviews, positive or negative, shows that the business is active and cares about its customers.' },
    ],
  },
  {
    slug: 'what-makes-a-website-feel-fast',
    cover: '/images/about/web-design.webp',
    title: 'What makes a website feel fast',
    excerpt: 'Images, fonts and layout choices that affect how quickly a site feels ready to use.',
    description: 'Sample article: the image, font and layout choices that make a website feel fast to visitors.',
    category: 'Web Design & Development',
    date: '2026-10-14',
    author: AUTHOR,
    sample: true,
    body: [
      { type: 'p', text: 'This is a sample article. Speed is not only a number in a report. It is how quickly a visitor can see content and start using a page.' },
      { type: 'h2', text: 'Size images correctly' },
      { type: 'p', text: 'Serve images at the size they are displayed, in modern formats, and load images further down the page only when they are needed.' },
      { type: 'h2', text: 'Be careful with fonts' },
      { type: 'p', text: 'Limit the number of font weights and make sure text is visible while fonts load.' },
      { type: 'h2', text: 'Avoid layout shifts' },
      { type: 'ul', items: ['Reserve space for images and embeds', 'Avoid inserting banners above existing content', 'Test on a real mid-range phone'] },
    ],
  },
  {
    slug: 'planning-a-brand-film',
    cover: '/videos/reels/showreel.webp',
    title: 'Planning a brand film: what to decide before the shoot',
    excerpt: 'Script, locations, people and cut-downs: the decisions that make a shoot day run smoothly.',
    description: 'Sample article: the key decisions to make before shooting a brand film, from script to cut-downs.',
    category: 'Video Production',
    date: '2026-10-07',
    author: AUTHOR,
    sample: true,
    body: [
      { type: 'p', text: 'This is a sample article. Most of the work that makes a brand film good happens before the camera is switched on.' },
      { type: 'h2', text: 'Agree on one message' },
      { type: 'p', text: 'A short film works best when it says one thing clearly. Write that message down before writing the script.' },
      { type: 'h2', text: 'Plan the cut-downs early' },
      { type: 'p', text: 'If the film will also be used as reels or ads, plan vertical framing and short moments during the shoot.' },
      { type: 'img', alt: 'Sample image placeholder: a camera set up on location', caption: 'Sample image placeholder' },
      { type: 'h2', text: 'Pre-production checklist' },
      { type: 'ol', items: ['Final script and shot list', 'Locations and permissions', 'People on camera and release forms', 'Shoot-day schedule'] },
    ],
  },
  {
    slug: 'product-photography-at-home',
    cover: '/images/work/product/product-12.webp',
    title: 'Simple ways to improve product photos',
    excerpt: 'Light, backgrounds and consistency: small changes that make product images look more professional.',
    description: 'Sample article: simple light, background and consistency tips for better product photography.',
    category: 'Photography',
    date: '2026-09-30',
    author: AUTHOR,
    sample: true,
    body: [
      { type: 'p', text: 'This is a sample article. Good product photos help customers understand what they are buying.' },
      { type: 'h2', text: 'Use soft, even light' },
      { type: 'p', text: 'Diffused daylight from a window is often enough for small products. Avoid harsh direct sunlight.' },
      { type: 'h2', text: 'Keep a consistent style' },
      { type: 'ul', items: ['Same background across a range', 'Same angle for similar products', 'Same crop and spacing'] },
    ],
  },
  {
    slug: 'building-a-consistent-brand',
    cover: '/images/work/posters/poster-01.webp',
    title: 'Building a consistent brand across every touchpoint',
    excerpt: 'Why a small set of colours, fonts and rules makes a brand easier to recognise.',
    description: 'Sample article: how a simple set of brand rules keeps colours, fonts and tone consistent everywhere.',
    category: 'Branding & Creative Design',
    date: '2026-09-16',
    author: AUTHOR,
    sample: true,
    body: [
      { type: 'p', text: 'This is a sample article. People recognise brands through repetition. Consistency makes that repetition work.' },
      { type: 'h2', text: 'Write down the basics' },
      { type: 'ul', items: ['Logo versions and spacing', 'Primary and secondary colours', 'Typefaces and sizes', 'Tone of voice'] },
      { type: 'h2', text: 'Share the rules' },
      { type: 'p', text: 'A short guide that everyone can find is more useful than a long document nobody opens.' },
    ],
  },
  {
    slug: 'measuring-social-media-results',
    cover: '/videos/reels/reel-29.webp',
    title: 'Measuring social media results without getting lost in numbers',
    excerpt: 'Choosing a few useful measures and reviewing them regularly.',
    description: 'Sample article: how to choose a few useful social media measures and review them regularly.',
    category: 'Digital Marketing',
    date: '2026-09-09',
    author: AUTHOR,
    sample: true,
    body: [
      { type: 'p', text: 'This is a sample article. Platforms show many numbers. Only a few of them usually connect to business goals.' },
      { type: 'h2', text: 'Match measures to goals' },
      { type: 'ul', items: ['Awareness: reach and video views', 'Interest: saves, shares and profile visits', 'Action: enquiries and website clicks'] },
      { type: 'h2', text: 'Review on a schedule' },
      { type: 'p', text: 'A monthly review is usually enough to spot trends without reacting to every daily change.' },
    ],
  },
  {
    slug: 'writing-page-titles-for-search',
    cover: '/images/home/hero/laptop.webp',
    title: 'Writing page titles and descriptions for search',
    excerpt: 'Clear, specific titles and descriptions that help people choose your page in search results.',
    description: 'Sample article: how to write clear page titles and meta descriptions for search results.',
    category: 'SEO & Google',
    date: '2026-09-02',
    author: AUTHOR,
    sample: true,
    body: [
      { type: 'p', text: 'This is a sample article. The title and description are often the first thing a person reads about your page.' },
      { type: 'h2', text: 'Be specific' },
      { type: 'p', text: 'Say what the page is about in plain words, and include the location when it matters.' },
      { type: 'h2', text: 'Keep each page unique' },
      { type: 'p', text: 'Every page should have its own title and description, so search engines and people can tell them apart.' },
    ],
  },
  
];

export const blogSeo = {
  title: 'Blog: Insights, Ideas & Inspiration | Elite Vision Media',
  description: 'Creative insights, digital trends and practical guides on marketing, SEO, web design, video, photography and branding from Elite Vision Media.',
};
