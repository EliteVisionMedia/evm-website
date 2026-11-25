/**
 * Portfolio data for /work.
 * No real EVM media is in the project yet, so every item is a PLACEHOLDER.
 * To publish real work: set `src` (image), `poster` + `video` (video), or `url` (website).
 * Project names come from EVM's brief; nothing else (results, clients, URLs) is invented.
 */

export const categories = [
  'All Work', 'Photography', 'Model Photoshoot', 'Reels',
  'Website Portfolio', 'Photography & Posters', 'Product Shoot',
] as const;
export type Category = (typeof categories)[number];

/** Hero stats. Hidden until `verified` is true: the brief asks for these to be confirmed first. */
export const stats = [
  { value: '500+', label: 'Projects Delivered', verified: false },
  { value: '25+', label: 'Countries', verified: false },
  { value: '10+', label: 'Years of Experience', verified: false },
];

/** Placeholder art palette (CSS backgrounds). */
const art = [
  'radial-gradient(40% 30% at 50% 62%, rgba(255,190,120,.5), transparent 70%), linear-gradient(180deg,#0c0d11,#123b44 45%,#019A9D 62%,#0c0d11 63%,#07070a)',
  'radial-gradient(30% 45% at 30% 35%, rgba(255,255,255,.3), transparent 70%), radial-gradient(50% 60% at 75% 70%, rgba(1,154,157,.55), transparent 65%), linear-gradient(140deg,#07070a,#1a1c25)',
  'radial-gradient(6% 6% at 20% 30%, rgba(111,211,212,.9), transparent), radial-gradient(5% 5% at 70% 40%, rgba(255,200,140,.8), transparent), radial-gradient(7% 7% at 45% 65%, rgba(1,154,157,.9), transparent), linear-gradient(180deg,#07070a,#0f2a30)',
  'radial-gradient(35% 40% at 50% 50%, rgba(1,154,157,.8), transparent 70%), #0c0d11',
  'conic-gradient(from 210deg at 60% 50%, #019A9D, #0c0d11 25%, #017F82 50%, #0c0d11 75%, #019A9D)',
  'linear-gradient(160deg,#dff3f3,#9fd8d9 60%,#017F82)',
  'radial-gradient(50% 50% at 50% 40%, #f4e7d6, #b89b7d 60%, #3a2f27)',
  'radial-gradient(45% 55% at 50% 35%, #e9eef0, #8aa5ab 55%, #1a1c25)',
];
export const artAt = (i: number) => art[i % art.length];

export interface VideoItem {
  id: string;
  title: string;
  type: string;
  cats: Category[];
  poster?: string;
  /** Full video URL (loaded only when opened). */
  video?: string;
  /** Short muted preview clip for hover (optional). */
  preview?: string;
  /** Landscape (16:9) video, e.g. a showreel. Defaults to vertical 9:16. */
  wide?: boolean;
  placeholder: boolean;
}

/** Real EVM reels (vertical 9:16). Files live in public/videos/reels. */
const reel = (id: string, title: string, file: string): VideoItem => ({
  id, title, type: 'Reel', cats: ['Reels'],
  poster: `/videos/reels/${file}.webp`, video: `/videos/reels/${file}.mp4`, placeholder: false,
});
export const videos: VideoItem[] = [
  { ...reel('r0', 'EVM Showreel', 'showreel'), type: 'Showreel', wide: true },
  { ...reel('r5', 'Corporate Film', 'video-project-4'), type: 'Corporate Video', wide: true },
  reel('r1', 'Happy Ending', 'happy-ending'),
  reel('r2', 'Reel 29', 'reel-29'),
  reel('r3', 'Crumbor R04', 'crumbor-r04'),
  reel('r4', 'EDM Bar 06', 'edm-bar-06'),
];

export interface ImageItem {
  id: string;
  title: string;
  type: string;
  cats: Category[];
  src?: string;
  /** Tile shape in the editorial grid. */
  shape: 'tall' | 'wide' | 'square';
  placeholder: boolean;
}

const photoSpec: [string, Category, ImageItem['shape']][] = [
  ['Photography', 'Photography', 'wide'],
];
/** Real model photoshoot work (EVM shoots). */
const modelShoots: ImageItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: `m${i + 1}`,
  title: `Model Photoshoot ${String(i + 1).padStart(2, '0')}`,
  type: 'Model Photoshoot',
  cats: ['Model Photoshoot', 'Photography'],
  src: `/images/work/model/model-${String(i + 1).padStart(2, '0')}.webp`,
  shape: 'tall',
  placeholder: false,
}));

modelShoots.push({
  id: 'm8', title: 'Model Photoshoot 08', type: 'Model Photoshoot', cats: ['Model Photoshoot', 'Photography'],
  src: '/images/work/model/model-08.webp', shape: 'tall', placeholder: false,
});

/** Real product / e-commerce shoot work (EVM shoots). Item 7 is landscape. */
const productShoots: ImageItem[] = Array.from({ length: 14 }, (_, i) => ({
  id: `ps${i + 1}`,
  title: `Product Shoot ${String(i + 1).padStart(2, '0')}`,
  type: 'Product Shoot',
  cats: ['Product Shoot', 'Photography'],
  src: `/images/work/product/product-${String(i + 1).padStart(2, '0')}.webp`,
  shape: i === 6 || i === 13 ? 'wide' : i === 12 ? 'square' : 'tall',
  placeholder: false,
}));

/** Real EVM poster designs (photography + typography). */
const posters: ImageItem[] = [
  { id: 'pp1', title: 'Confidence in Focus', type: 'Photography & Posters', cats: ['Photography & Posters', 'Photography'], src: '/images/work/posters/poster-01.webp', shape: 'tall', placeholder: false },
  { id: 'pp2', title: 'Cherry Coded Girl', type: 'Photography & Posters', cats: ['Photography & Posters', 'Photography'], src: '/images/work/posters/poster-02.webp', shape: 'tall', placeholder: false },
];

export const photos: ImageItem[] = [...modelShoots, ...productShoots, ...posters, ...photoSpec.map(([type, cat, shape], i): ImageItem => ({
  id: `p${i + 1}`,
  title: `${type} placeholder`,
  type,
  cats: [cat],
  shape,
  placeholder: true,
}))];

export interface WebsiteItem {
  name: string;
  category: string;
  description: string;
  /** Live URL. Leave empty until confirmed; the button only shows when set. */
  url?: string;
  screenshot?: string;
}

export const websites: WebsiteItem[] = [
 { name: 'Dara Fashions', category: 'Jewellery & Accessories', description: 'An e-commerce website for a fashion jewellery and accessories brand.' },
  // { name: 'Urbane Deep Pockets', category: 'Content Service', description: 'A website for a content service business.' },
  // { name: 'Rubix World', category: 'Industrial Hardware', description: 'A website for an industrial hardware business.' },
  // { name: 'Raison Automation', category: 'Automation & Technology', description: 'A website for an automation and technology company.' },
  // { name: 'Sri Ganapathi', category: 'Restaurant / E-commerce', description: 'A restaurant and e-commerce website.' },
  // { name: 'Tharagai Scans', category: 'Healthcare', description: 'A website for a healthcare diagnostics centre.' },
];

/** Which section(s) each category shows. */
export const sectionFor = (c: Category) => ({
  videos: c === 'All Work' || videos.some((v) => v.cats.includes(c)),
  photos: c === 'All Work' || photos.some((p) => p.cats.includes(c)),
  websites: c === 'All Work' || c === 'Website Portfolio',
});
