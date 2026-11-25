import { Clapperboard, Lightbulb, Network, ShieldCheck, type LucideIcon } from 'lucide-react';

/** Copy for /about. Company history is NOT in the project yet: journey entries are editable placeholders. */

export const aboutSeo = {
  title: 'About Us | Elite Vision Media, Creative Studio in Coimbatore',
  description: 'Meet Elite Vision Media, a Coimbatore creative team bringing ideas to life through digital marketing, web design and development, video production and visual content.',
  path: '/about',
};

export const whoWeAre = {
  title: 'More than a creative agency.',
  lead: 'Elite Vision Media is a creative company in Coimbatore working across digital marketing, web design and development, video production and visual content.',
  paragraphs: [
    'We bring strategists, designers, developers, photographers and filmmakers together as one team, so a brand’s website, campaigns and videos are planned side by side instead of in separate silos.',
    'Whether it is a first website, a product shoot or a full campaign, our aim is the same: work that looks considered, communicates clearly and helps the business behind it grow.',
  ],
};

/**
 * Journey milestones. `confirmed: false` entries show as placeholders on the page.
 * Replace `when` and `text` with real details, then set confirmed: true.
 */
export const journey = [
  { title: 'The beginning', when: 'Year to be added', text: 'Placeholder: how and why Elite Vision Media started.', confirmed: false },
  { title: 'Growing creative capabilities', when: 'Year to be added', text: 'Placeholder: building the team and creative skills.', confirmed: false },
  { title: 'Expanding services', when: 'Year to be added', text: 'Placeholder: adding marketing, web and video services.', confirmed: false },
  { title: 'Creative and digital projects', when: 'Year to be added', text: 'Placeholder: the kinds of projects that shaped the studio.', confirmed: false },
  { title: 'Our present journey', when: 'Today', text: 'Placeholder: where EVM is today and what comes next.', confirmed: false },
];

/** Same four values and wording as the approved homepage section. */
export const aboutValues: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Network, title: 'Collaboration', text: 'Great work doesn’t happen in isolation. Strategists, designers, developers and filmmakers work as one team with you, from first brief to launch, so every idea is tested, refined and aligned with your goals.' },
  { icon: Lightbulb, title: 'Innovation', text: 'We push beyond the expected, trying new formats, platforms and tools early, and keeping what actually works for your audience. Fresh ideas, backed by results.' },
  { icon: ShieldCheck, title: 'Integrity', text: 'Honest timelines, transparent reporting and clear pricing. No vanity metrics and no misleading claims, just work rooted in trust and a genuine commitment to your growth.' },
  { icon: Clapperboard, title: 'Craft', text: 'Every frame, page and post is finished properly, because details are what people remember. We sweat the small things so your brand looks and feels considered everywhere.' },
];

export const capabilities = [
  { title: 'Digital Marketing', to: '/services/digital-marketing', text: 'SEO, social media, paid ads and content planned as one strategy.', image: '/images/about/digital-marketing.webp', alt: 'Digital marketing campaign overview illustration', art: 'radial-gradient(60% 70% at 72% 28%, #1fb7b9 0%, transparent 62%), linear-gradient(150deg, #0c0d11, #12313a)' },
  { title: 'Web Design & Development', to: '/services/web-design-development', text: 'Responsive websites, online stores and UI/UX built around your business.', image: '/images/about/web-design.webp', alt: 'Responsive website design illustration', art: 'radial-gradient(55% 60% at 30% 25%, #6fd3d4 0%, transparent 62%), linear-gradient(150deg, #dff3f3, #9fd8d9)' },
  { title: 'Video Production', to: '/services/video-production', text: 'Corporate films, brand stories, reels and motion graphics.', image: '/videos/reels/showreel.webp', alt: 'Frame from the EVM showreel', art: 'radial-gradient(40% 30% at 50% 62%, rgba(255,190,120,.5), transparent 70%), linear-gradient(180deg,#0c0d11,#123b44 45%,#019A9D 62%,#0c0d11 63%,#07070a)' },
  { title: 'Photography & Creative Content', to: '/work', text: 'Model, product and jewellery shoots, posters and brand creatives.', image: '/images/work/model/model-08.webp', alt: 'Model photoshoot by Elite Vision Media', art: 'radial-gradient(50% 50% at 50% 40%, #f4e7d6, #b89b7d 60%, #3a2f27)' },
];

/** Team / behind-the-scenes tiles. No names or titles until real ones are supplied. */
/** Real EVM shoots shown until team / studio photos are supplied. Captions describe the actual image. */
export const team = [
  { label: 'Campaign shoot', src: '/images/work/product/product-07.webp', shape: 'wide' },
  { label: 'Fashion campaign', src: '/images/industries/clothing/fashion-red-car.webp', shape: 'tall' },
  { label: 'Product shoot', src: '/images/work/product/product-10.webp', shape: 'square' },
  { label: 'Poster design', src: '/images/work/posters/poster-02.webp', shape: 'square' },
  { label: 'Studio shoot', src: '/images/work/product/product-14.webp', shape: 'wide' },
  { label: 'Model photoshoot', src: '/images/work/model/model-08.webp', shape: 'square' },
] as const;
