/**
 * Industry pages and case studies, built ONLY from EVM's portfolio decks
 * (Healthcare, FMCG, Clothing). Nothing here is invented.
 *
 * APPROVAL GATES: client names, logos, client photos and statistics stay hidden from
 * public pages, metadata and structured data until the matching flag is set to true.
 */
export const approvals = {
  /** Dr. Prathibha: name, photo and figures (Healthcare deck p9–10). */
  drPrathibha: false,
  /** EcoFresh: name, product photos and figures (FMCG deck p10). */
  ecofresh: false,
  /** Healthcare deck p5–7 figures (65+ reels/month, +40% MoM, 6,000+ followers in 2 months). */
  healthcareStats: false,
  /** Clothing deck p10 figures (50K+, 3.5X, 8–12%, 100+). */
  clothingStats: false,
  /** FMCG client logos and names (deck p9, p11). */
  fmcgClients: false,
};

/** Unpublished drafts can be previewed at e.g. /case-studies/ecofresh?preview=1 (noindex). */
export const PREVIEW_PARAM = 'preview';

export type IndustrySlug = 'healthcare' | 'fmcg' | 'clothing';

export interface Stat { value: string; label: string; source: string }

export interface Industry {
  slug: IndustrySlug;
  name: string;
  tagline: string;
  card: string;
  /** Public image (EVM shoot). Absent = designed typographic visual. */
  image?: { src: string; alt: string };
  seo: { title: string; description: string; keywords: string[] };
  hero: { kicker: string; title: string; subtitle: string };
  intro: { title: string; paragraphs: string[] };
  /** Who we work with / what we do, grouped. */
  groups: { title: string; items: string[] }[];
  groupsTitle: string;
  approach: { title: string; sub: string; steps: { title: string; text: string }[] };
  highlights: { kicker: string; title: string; text: string; image?: { src: string; alt: string }; list?: string[] }[];
  gallery?: { src: string; alt: string; caption?: string }[];
  stats?: { gate: keyof typeof approvals; title: string; items: Stat[] };
  why: { title: string; points: { title: string; text?: string }[] };
  closing: string;
  services: string[]; // paths to related service pages
  caseStudy?: string; // case study slug
}

const ci = '/images/industries';

export const industries: Industry[] = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    tagline: 'Building healthcare brands that people trust.',
    card: 'Positioning, doctor-led content and digital growth for hospitals, fertility centres, dental clinics and doctors.',
    seo: {
      title: 'Healthcare Marketing & Content Agency in Coimbatore | EVM',
      description: 'Brand positioning, doctor-led content and digital growth for hospitals, fertility centres, dental and speciality clinics and doctors, from Elite Vision Media.',
      keywords: ['healthcare marketing Coimbatore', 'hospital social media marketing', 'doctor personal branding', 'clinic marketing agency', 'healthcare content creation'],
    },
    hero: {
      kicker: 'Elite Vision Media × Healthcare',
      title: 'Building healthcare brands that people trust.',
      subtitle: 'From medical expertise to meaningful digital presence, for hospitals, fertility centres, dental and speciality clinics, and doctors.',
    },
    intro: {
      title: 'Healthcare needs more than content.',
      paragraphs: [
        'We are a creative production and digital growth agency that helps brands build visibility, communicate better and grow digitally.',
        'Healthcare needs clarity, trust, consistency and visibility. Our approach focuses on building a digital identity that makes your hospital, clinic or doctor recognisable, credible and relevant.',
      ],
    },
    groupsTitle: 'Who we work with',
    groups: [
      { title: 'Hospitals', items: [] },
      { title: 'Fertility centres', items: [] },
      { title: 'Dental clinics', items: [] },
      { title: 'Speciality clinics', items: [] },
      { title: 'Doctors & personal brands', items: [] },
    ],
    approach: {
      title: 'Three stages. One growth system.',
      sub: 'Position, Create, Grow.',
      steps: [
        { title: 'Position', text: 'Understand your brand, audience and market, then build a clear positioning.' },
        { title: 'Create', text: 'We turn that positioning into content that educates, connects and gets noticed.' },
        { title: 'Grow', text: 'We amplify the content through digital marketing and continuously optimise for growth.' },
      ],
    },
    highlights: [
      {
        kicker: 'Brand positioning',
        title: 'We build brands, not just social media pages.',
        text: 'The goal: make your expertise visible to the people who need it.',
        list: ['Brand communication', 'Audience understanding', 'Content positioning', 'Doctor personal branding', 'Healthcare storytelling', 'Competitor & market understanding'],
      },
      {
        kicker: 'Content creation',
        title: 'Content that makes expertise connect.',
        text: "Healthcare content doesn't have to feel clinical or complicated. We transform medical expertise into simple, relatable and engaging content designed for today's audience.",
        list: ['Doctor-led', 'Educational', 'Relatable', 'Creative', 'Brand-led', 'Expertise & authority', 'Simplifying complex topics', 'Everyday healthcare conversations', 'Concepts that stop the scroll', 'Building recall & trust'],
      },
      {
        kicker: 'Digital growth',
        title: 'Visibility is the first step to influence.',
        text: 'We use content and digital marketing to put healthcare brands in front of the right audience consistently. The objective: not just to run ads, but to make the brand seen, remembered and followed.',
        list: ['Content strategy', 'Organic growth', 'Meta advertising', 'Audience building', 'Performance optimisation'],
      },
    ],
    stats: {
      gate: 'healthcareStats',
      title: 'From invisible to discoverable.',
      items: [
        { value: '65+', label: 'Reels / month across healthcare-focused content ecosystems', source: 'Healthcare deck, slide 5' },
        { value: '+40%', label: 'Month-on-month follower growth', source: 'Healthcare deck, slide 6' },
        { value: '6,000+', label: 'Followers in just 2 months (one healthcare growth journey)', source: 'Healthcare deck, slide 7' },
      ],
    },
    why: {
      title: 'Why EVM for healthcare',
      points: [
        { title: 'Clarity', text: 'Expertise explained simply.' },
        { title: 'Trust', text: 'Doctor-led, credible communication.' },
        { title: 'Consistency', text: 'A steady, recognisable presence.' },
        { title: 'Visibility', text: 'In front of the people who need you.' },
      ],
    },
    closing: "We didn't chase followers. We built visibility around expertise.",
    services: ['/services/digital-marketing/social-media-marketing', '/services/video-production/reels-short-form-videos', '/services/digital-marketing/meta-ads', '/services/digital-marketing/content-marketing'],
    caseStudy: 'dr-prathibha',
  },
  {
    slug: 'fmcg',
    name: 'FMCG',
    tagline: 'Brands on shelf, brands people remember.',
    card: 'Strategy, premium product production and performance marketing for FMCG brands competing for attention on the shelf.',
    image: { src: '/images/work/product/product-10.webp', alt: 'Chocolate bar pack photographed by Elite Vision Media' },
    seo: {
      title: 'FMCG Brand Marketing & Product Video Production | EVM Coimbatore',
      description: 'Brand strategy, product commercials, recipe videos, founder stories and performance marketing that help FMCG brands build awareness, trust and sales. Elite Vision Media.',
      keywords: ['FMCG marketing agency Coimbatore', 'product commercial production', 'food brand content', 'FMCG brand strategy', 'recipe video production'],
    },
    hero: {
      kicker: 'Brands on shelf',
      title: "We don't just create content. We create brands people remember.",
      subtitle: 'Creative storytelling, premium visual production, branding and performance marketing for FMCG brands.',
    },
    intro: {
      title: 'The FMCG market is crowded.',
      paragraphs: [
        "Every shelf is filled with similar products competing for the customer's attention. The brands that win are not always the ones with the best products. They are the ones people remember.",
        'At Elite Vision Media, we combine creative storytelling, premium visual production, branding and performance marketing to help FMCG brands build awareness, create trust and drive consistent sales. From launching new products to expanding into new markets, we help brands communicate the right message to the right audience.',
      ],
    },
    groupsTitle: 'Our services',
    groups: [
      { title: 'Brand strategy', items: [] },
      { title: 'Content production', items: [] },
      { title: 'Social media management', items: [] },
      { title: 'Digital marketing', items: [] },
      { title: 'Branding', items: [] },
    ],
    approach: {
      title: 'Why content matters for FMCG.',
      sub: 'Content moves customers from first glance to the basket.',
      steps: [
        { title: 'Awareness', text: 'Get noticed in a crowded category.' },
        { title: 'Interest', text: 'Give people a reason to look closer.' },
        { title: 'Trust', text: 'Build confidence in the brand and product.' },
        { title: 'Purchase', text: 'Turn that confidence into sales.' },
      ],
    },
    highlights: [
      {
        kicker: 'Why FMCG brands choose us',
        title: 'A complete brand partner.',
        text: 'Content, production, social media, advertising and brand growth, under one roof.',
        list: ['Strategic brand positioning', 'Consumer psychology', 'Premium visual production', 'Performance marketing'],
        image: { src: '/images/work/product/product-12.webp', alt: 'Milk chocolate pack styled and photographed by Elite Vision Media' },
      },
      {
        kicker: 'What we can create',
        title: 'Formats that sell the product and the story.',
        text: 'From the shelf to the feed, we produce the content FMCG brands need at every stage.',
        list: ['Customer testimonials', 'Influencer collaborations', 'Distributor campaigns', 'Festival campaigns', 'Product commercials', 'Recipe videos', 'Founder stories', 'Manufacturing stories'],
        image: { src: '/videos/reels/crumbor-r04.webp', alt: 'Frame from a bakery product reel produced by Elite Vision Media' },
      },
    ],
    why: {
      title: 'Why FMCG brands choose EVM',
      points: [
        { title: 'Strategic brand positioning' },
        { title: 'Consumer psychology' },
        { title: 'Premium visual production' },
        { title: 'Performance marketing' },
      ],
    },
    closing: 'From launching new products to expanding into new markets, we help brands communicate the right message to the right audience.',
    services: ['/services/video-production/promotional-videos', '/services/digital-marketing/meta-ads', '/services/digital-marketing/social-media-marketing', '/services/video-production/brand-films'],
    caseStudy: 'ecofresh',
  },
  {
    slug: 'clothing',
    name: 'Clothing',
    tagline: 'Fashion, reimagined.',
    card: 'Fashion campaigns, catalogue shoots, reels and brand films for clothing brands, from concept to distribution.',
    image: { src: `${ci}/clothing/fashion-red-car.webp`, alt: 'Fashion campaign shoot with a model beside a red sports car by Elite Vision Media' },
    seo: {
      title: 'Fashion & Clothing Brand Photography and Marketing | EVM Coimbatore',
      description: 'Fashion campaigns, model and catalogue shoots, reels, brand films and digital marketing for clothing brands. Creative production and digital growth by Elite Vision Media.',
      keywords: ['fashion photography Coimbatore', 'clothing brand marketing', 'catalogue shoot', 'fashion campaign shoot', 'fashion reels production'],
    },
    hero: {
      kicker: 'Creative production & digital growth for clothing brands',
      title: 'Fashion, reimagined.',
      subtitle: "We don't just create content. We create desire.",
    },
    intro: {
      title: 'Clothing brands need more than good-looking visuals.',
      paragraphs: [
        'They need content that makes people stop, feel, remember and buy.',
        'At Elite Vision Media, we combine creative strategy, fashion production and digital marketing to build brands that stand out.',
      ],
    },
    groupsTitle: 'What we do',
    groups: [
      { title: 'Fashion campaigns', items: ['Campaign shoots', 'Model shoots', 'Seasonal collections'] },
      { title: 'Product content', items: ['Product photography', 'Catalogue shoots', 'E-commerce visuals'] },
      { title: 'Social media content', items: ['Reels', 'Creative videos', 'Trend-led content'] },
      { title: 'Brand films', items: ['Storytelling', 'Launch films', 'Campaign films'] },
      { title: 'Digital marketing', items: ['Social media', 'Performance marketing', 'Brand growth'] },
    ],
    approach: {
      title: 'From cloth to content.',
      sub: "We don't start with a camera. We start with understanding the brand, collection, audience and objective, then build content around it.",
      steps: [
        { title: 'Concept', text: 'Understand the brand, collection, audience and objective.' },
        { title: 'Creative', text: 'Creative direction that sets the look and story.' },
        { title: 'Production', text: 'Bring the vision to life on shoot day.' },
        { title: 'Content', text: 'Turn one shoot into months of content.' },
        { title: 'Distribution', text: 'Make sure the content reaches the right audience.' },
      ],
    },
    highlights: [
      {
        kicker: 'Fashion campaigns',
        title: 'Make the collection the moment.',
        text: 'Concept, creative direction and production.',
        image: { src: `${ci}/clothing/fashion-red-car.webp`, alt: 'Model in black outfit beside a red sports car, fashion campaign by EVM' },
      },
      {
        kicker: 'Product & catalogue',
        title: 'Every detail matters.',
        text: 'From fabric texture to fit, colour and finish, we create visuals that make customers want to look closer.',
        image: { src: `${ci}/clothing/fashion-black-gown.webp`, alt: 'Model in a flowing black gown, catalogue shoot by EVM' },
      },
      {
        kicker: 'Brand storytelling',
        title: "People don't just buy clothes. They buy the feeling.",
        text: 'We turn collections, founders and brand stories into content people can connect with.',
        image: { src: `${ci}/clothing/fashion-brown-dress.webp`, alt: 'Model in a brown mesh dress, brand storytelling shoot by EVM' },
      },
      {
        kicker: 'Reels & social content',
        title: "Don't just post. Make them stop scrolling.",
        text: 'Fashion moves fast. We create trend-aware, platform-native content designed to grab attention and keep your brand relevant.',
        image: { src: '/videos/reels/reel-29.webp', alt: 'Frame from a fashion reel produced by EVM' },
      },
    ],
    gallery: [
      { src: `${ci}/clothing/fashion-leather-concept.webp`, alt: 'Creative concept shoot: model in leather jacket, low angle', caption: 'Concept' },
      { src: `${ci}/clothing/fashion-leather-story.webp`, alt: 'Creative concept shoot: model reaching toward the camera', caption: 'Story' },
      { src: `${ci}/clothing/fashion-leather-execution.webp`, alt: 'Creative concept shoot: model seated on a concrete ledge', caption: 'Execution' },
    ],
    stats: {
      gate: 'clothingStats',
      title: "Beautiful content. Now let's put it to work.",
      items: [
        { value: '50K+', label: 'Average monthly reach', source: 'Clothing deck, slide 10' },
        { value: '3.5X', label: 'Average content reach growth', source: 'Clothing deck, slide 10' },
        { value: '8–12%', label: 'Average engagement rate', source: 'Clothing deck, slide 10' },
        { value: '100+', label: 'Content assets created', source: 'Clothing deck, slide 10' },
      ],
    },
    why: {
      title: 'One creative partner, from idea to impact.',
      points: [
        { title: 'Production', text: 'We bring the vision to life.' },
        { title: 'Strategy', text: 'We understand what your brand needs.' },
        { title: 'Content', text: 'We turn one shoot into months of content.' },
        { title: 'Marketing', text: 'We make sure the content reaches the right audience.' },
      ],
    },
    closing: "Your next collection deserves more than a shoot. Let's build a campaign people remember.",
    services: ['/services/video-production/reels-short-form-videos', '/services/video-production/brand-films', '/services/digital-marketing/social-media-marketing', '/services/web-design-development/ecommerce-development'],
  },
];

export interface CaseStudy {
  slug: string;
  gate: keyof typeof approvals;
  industry: IndustrySlug;
  client: string;
  title: string;
  summary: string;
  seo: { title: string; description: string };
  images: { src: string; alt: string }[];
  /** Only sections the deck supports. */
  sections: { title: string; paragraphs?: string[]; list?: string[] }[];
  stats: Stat[];
  quote?: string;
  services: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'dr-prathibha',
    gate: 'drPrathibha',
    industry: 'healthcare',
    client: 'Dr. Prathibha',
    title: 'Turning medical expertise into digital influence.',
    summary: 'Building a digital presence where expertise becomes understandable, relatable and memorable.',
    seo: {
      title: 'Case Study: Dr. Prathibha | Doctor Personal Branding | EVM',
      description: 'How Elite Vision Media used doctor-led positioning, consistent content and continuous optimisation to grow Dr. Prathibha’s digital presence.',
    },
    images: [{ src: `${ci}/healthcare/dr-prathibha.webp`, alt: 'Dr. Prathibha reviewing a document with a colleague' }],
    sections: [
      { title: 'The challenge', paragraphs: ["The challenge wasn't simply to create content. It was to build a digital presence where expertise becomes understandable, relatable and memorable."] },
      { title: 'EVM’s approach', paragraphs: ['EVM worked across three key areas: Position → Create → Grow.'], list: ['Consistent, high-volume content', 'Strong doctor-led positioning', 'Continuous optimisation'] },
    ],
    stats: [
      { value: '9,890+', label: 'Followers in 2 months', source: 'Healthcare deck, slide 10' },
      { value: '+40%', label: 'Month-on-month follower growth', source: 'Healthcare deck, slide 10' },
      { value: '15+', label: 'Content creatives / month', source: 'Healthcare deck, slide 10' },
    ],
    quote: "We didn't just grow the page. We grew the doctor's presence in the minds of her audience.",
    services: ['/services/digital-marketing/social-media-marketing', '/services/video-production/reels-short-form-videos', '/services/digital-marketing/content-marketing'],
  },
  {
    slug: 'ecofresh',
    gate: 'ecofresh',
    industry: 'fmcg',
    client: 'EcoFresh',
    title: 'Strengthening a jaggery brand’s digital presence.',
    summary: 'Impactful content and performance-driven marketing campaigns for a premium jaggery manufacturer.',
    seo: {
      title: 'Case Study: EcoFresh | FMCG Content & Performance Marketing | EVM',
      description: 'How Elite Vision Media strengthened EcoFresh’s digital presence through impactful content and performance-driven marketing campaigns over six months.',
    },
    images: [
      { src: `${ci}/fmcg/ecofresh-jaggery-pack.webp`, alt: 'EcoFresh organic jaggery powder pack' },
      { src: `${ci}/fmcg/ecofresh-jaggery-jar.webp`, alt: 'EcoFresh natural jaggery powder jar' },
    ],
    sections: [
      { title: 'The brand', paragraphs: ['EcoFresh is a trusted manufacturer of premium jaggery products, blending traditional purity with modern quality standards.'] },
      { title: 'What EVM did', paragraphs: ['Elite Vision Media strengthened its digital presence through impactful content and performance-driven marketing campaigns.'] },
    ],
    stats: [
      { value: '250K+', label: 'People reached', source: 'FMCG deck, slide 10' },
      { value: '700+', label: 'Customer enquiries', source: 'FMCG deck, slide 10' },
      { value: '100+', label: 'Distributor & business leads', source: 'FMCG deck, slide 10' },
      { value: '6 months', label: 'Duration', source: 'FMCG deck, slide 10' },
    ],
    services: ['/services/digital-marketing/meta-ads', '/services/video-production/promotional-videos', '/services/digital-marketing/content-marketing'],
  },
];

export const industryPath = (s: IndustrySlug) => `/industries/${s}`;
export const caseStudyPath = (s: string) => `/case-studies/${s}`;
export const isApproved = (g: keyof typeof approvals) => approvals[g];
export const publicCaseStudies = () => caseStudies.filter((c) => approvals[c.gate]);
