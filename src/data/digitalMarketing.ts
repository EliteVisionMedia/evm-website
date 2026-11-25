import { BarChart3, ClipboardList, Compass, MapPin, MousePointerClick, Newspaper, PenLine, RefreshCcw, Rocket, Search, Share2, type LucideIcon } from 'lucide-react';

/** Original copy for /services/digital-marketing. No client names, rankings or performance promises. */

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
  listTitle: string;
  items: string[];
}

export interface Step {
  title: string;
  text: string;
  icon: LucideIcon;
}

export const dmSeo = {
  title: 'Digital Marketing Company in Coimbatore | Elite Vision Media',
  description:
    'Elite Vision Media is a digital marketing company in Coimbatore offering SEO, social media marketing, Google Ads, content marketing, local SEO and digital PR, planned around your business goals.',
  path: '/services/digital-marketing',
};

export const dmHero = {
  kicker: 'Digital Marketing Company in Coimbatore',
  title: 'Digital marketing that moves your business forward.',
  subtitle:
    'Search, social, ads and content planned as one connected strategy, so more of the right people find you, trust you and get in touch.',
};

export const dmOverview = {
  kicker: 'Overview',
  title: 'Marketing built around how your customers actually decide.',
  paragraphs: [
    'Your customers search on Google, scroll through Instagram, check reviews on Maps and compare options before they ever call you. Digital marketing is about being present, credible and easy to choose at each of those moments.',
    'At Elite Vision Media, we work with businesses in Coimbatore and across India to plan and run marketing that ties back to real outcomes: enquiries, bookings, store visits and sales. Every channel we recommend has a clear job in your plan.',
  ],
};

export const dmStrategy = {
  title: 'A customized strategy, not a fixed package.',
  paragraphs: [
    'No two businesses start from the same place. A clinic, a manufacturer and a new D2C brand need very different things from their marketing. So we begin by looking at where you stand today: your website, search visibility, social presence, competitors and the customers you want more of.',
    'From there we build one plan where SEO, social media, paid ads and content support each other, instead of running as separate, disconnected activities.',
  ],
  points: ['Audit of your current digital presence', 'Audience and competitor review', 'Channel plan with clear goals for each', 'Budget guidance before any ad spend'],
};

export const dmFeatures: Feature[] = [
  {
    id: 'seo',
    icon: Search,
    title: 'Search Engine Optimization (SEO)',
    text: 'Get found when people search for what you offer. We improve the technical health, content and authority of your website so it earns steady, long-term visibility on Google.',
    listTitle: 'Our SEO work covers',
    items: ['Technical SEO audits and fixes', 'Keyword and search-intent research', 'On-page optimization', 'Content planning for search', 'Internal linking structure', 'Ranking and traffic tracking'],
  },
  {
    id: 'social',
    icon: Share2,
    title: 'Social Media Marketing',
    text: 'Build a social presence people want to follow. We plan, create and manage content for Instagram, Facebook, LinkedIn and YouTube that reflects your brand and starts real conversations.',
    listTitle: 'Social media services include',
    items: ['Content strategy and calendars', 'Post, carousel and reel creation', 'Page management and community replies', 'Paid social campaigns', 'Audience research', 'Monthly performance reviews'],
  },
 {
    id: 'ads',
    icon: MousePointerClick,
    title: 'Meta Ads & Paid Advertising',
    text: 'Reach your ideal audience right where they scroll and engage. We set up and manage targeted Facebook, Instagram, and paid social campaigns designed to drive conversions while keeping you in full control of your budget.',
    listTitle: 'We can help you with',
    items: [
      'Facebook and Instagram ad campaigns',
      'Audience targeting and lookalike audiences',
      'Retargeting and dynamic product ads',
      'Ad creative, copywriting, and A/B testing',
      'Landing page optimization recommendations',
      'Meta Pixel and Conversion API tracking setup',
    ],
  },
  {
    id: 'content',
    icon: PenLine,
    title: 'Content Marketing',
    text: 'Useful content answers your customers’ questions before they ask them. We write and produce content that shows your expertise, supports your SEO and helps buyers decide.',
    listTitle: 'Content we create',
    items: ['Blog articles and guides', 'Service and landing page copy', 'Case-study style project write-ups', 'Email newsletters', 'Video scripts and captions', 'Content repurposed across channels'],
  },
  {
    id: 'local',
    icon: MapPin,
    title: 'Local SEO',
    text: 'For businesses that serve customers nearby, local search matters most. We help you show up on Google Maps and “near me” searches in Coimbatore and the areas you serve.',
    listTitle: 'Local search efforts include',
    items: ['Google Business Profile optimization', 'Location and area landing pages', 'Local keyword targeting', 'Review generation and responses', 'Consistent business listings (NAP)', 'Local citations'],
  },
  
];

export const dmProcess = {
  kicker: 'Our process',
  title: 'How we approach digital marketing.',
  sub: 'We start with the business problem, not with a list of platforms or tools.',
  steps: [
    { icon: Compass, title: 'Understand', text: 'We learn about your business, customers, competitors and current online presence, and agree on what success looks like.' },
    { icon: ClipboardList, title: 'Plan', text: 'We choose the channels that fit your goals and budget, and map out content, campaigns and timelines.' },
    { icon: Rocket, title: 'Execute', text: 'Our team creates the content, builds the campaigns and puts the SEO work in place, with your approval at each stage.' },
    { icon: BarChart3, title: 'Measure', text: 'We track the numbers tied to your goals, such as enquiries, conversions and cost per lead, and report them in plain language.' },
    { icon: RefreshCcw, title: 'Optimize', text: 'We review what is working, cut what isn’t and shift effort and budget towards the activities that bring results.' },
  ] as Step[],
};

export const dmMetrics = {
  title: 'Marketing you can measure.',
  sub: 'Impressions and follower counts alone don’t pay the bills. We focus reporting on the numbers connected to your growth.',
  items: [
    { name: 'Leads', note: 'Qualified enquiries and calls' },
    { name: 'Conversions', note: 'Bookings, purchases and sign-ups' },
    { name: 'Search Visibility', note: 'Rankings for the terms that matter' },
    { name: 'Website Traffic', note: 'Visitors with real buying intent' },
    { name: 'Cost per Lead', note: 'What each enquiry costs you' },
    { name: 'Conversion Rate', note: 'How well visits turn into action' },
    { name: 'Return on Ad Spend', note: 'Revenue from paid campaigns' },
    { name: 'Engagement', note: 'Saves, shares and conversations' },
  ],
};

export const dmWhy = {
  title: 'Why businesses choose EVM.',
  text:
    'Choosing a marketing partner means trusting someone with your brand and your budget. We keep that trust by being clear about what we will do, what it costs and how we will measure it.',
  points: [
    'Strategy shaped around your market, not a one-size package',
    'Content, design and video created by one in-house team',
    'Plain-language reports focused on enquiries and sales',
    'Web and video specialists in the same studio',
    'Clear proposals and honest advice on budgets',
    'A Coimbatore team you can meet in person',
  ],
};

export const dmFaqs = [
  { q: 'What does a digital marketing company in Coimbatore do?', a: 'A digital marketing company helps your business get found and chosen online. At EVM that includes SEO, social media marketing, Google and Meta ads, content marketing, local SEO and digital PR, planned together around your business goals.' },
  { q: 'Which digital marketing service should my business start with?', a: 'It depends on your goals and where you are today. Local service businesses often start with local SEO and Google Ads, while brands building awareness may focus on social media and content first. We recommend a starting point after reviewing your current presence.' },
  { q: 'How long does SEO take to show results?', a: 'SEO is a long-term channel. Early improvements can appear within a few months, but steady growth usually builds over a longer period depending on your competition, website and content. We share progress regularly so you can see the direction.' },
  { q: 'Do you manage the ad budget, or do I pay the platforms directly?', a: 'Ad spend is paid directly to platforms like Google and Meta from your own account, so you keep full visibility and control. Our management fee is separate and agreed upfront.' },
  { q: 'Will I receive reports on my campaigns?', a: 'Yes. We share regular reports that focus on the numbers tied to your goals, such as enquiries, conversions and cost per lead, along with what we plan to improve next.' },
  { q: 'Do you work with businesses outside Coimbatore?', a: 'Yes. We are based in Coimbatore, Tamil Nadu, and also work with businesses in other cities across India, since most of our marketing work and communication can happen online.' },
];
