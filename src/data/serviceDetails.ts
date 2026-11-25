import type { LucideIcon } from 'lucide-react';
import {
  BarChart3, Building2, Calendar, Camera, Clapperboard, Code2, Compass, CreditCard, Eye, FileSearch, FileText, Film, Gauge, Globe,
  Image, Layers, Layout, Lightbulb, Link2, ListChecks, Mail, MapPin, Megaphone, MessageCircle, Mic, MonitorSmartphone, MousePointerClick,
  Music, Package, Palette, PenTool, Plug, Repeat, Rocket, Scissors, Search, Shield, ShoppingCart, Sliders, Smartphone, Sparkles, Star,
  Target, TrendingUp, Type, Users, Video, Wrench, Zap,
} from 'lucide-react';
import type { Step } from './digitalMarketing';

/** Illustrative mockups drawn in code (see DetailVisual). They are not EVM client projects. */
export type VisualKind =
  | 'search' | 'social' | 'ads' | 'content' | 'map'
  | 'browser' | 'business' | 'wordpress' | 'shop' | 'wireframe' | 'maintenance'
  | 'storyboard' | 'motion' | 'timeline';

/** A hero/showcase visual: either a code-drawn illustration or genuine EVM work. */
export type DetailMedia =
  | { kind: VisualKind }
  | { photo: string; alt: string; vertical?: boolean };

export interface ServiceDetail {
  parent: 'digital-marketing' | 'web-design-development' | 'video-production';
  slug: string;
  /** Matches the card id on the parent service page. */
  featureId: string;
  name: string;
  seo: { title: string; description: string; keywords: string[] };
  hero: { kicker: string; title: string; subtitle: string; media: DetailMedia };
  overview: { title: string; what: string; why: string; how: string };
  offers: { icon: LucideIcon; title: string; text: string }[];
  process: Step[];
  why: { text: string; points: string[] };
  showcase: { title: string; sub: string; items: DetailMedia[] };
  faqs: { q: string; a: string }[];
  related: string[]; // full paths
}

export const parentInfo = {
  'digital-marketing': { title: 'Digital Marketing', path: '/services/digital-marketing' },
  'web-design-development': { title: 'Web Design & Development', path: '/services/web-design-development' },
  'video-production': { title: 'Video Production', path: '/services/video-production' },
} as const;

const dm = '/services/digital-marketing';
const wd = '/services/web-design-development';
const vp = '/services/video-production';

export const serviceDetails: ServiceDetail[] = [
  /* ───────────── Digital Marketing ───────────── */
  {
    parent: 'digital-marketing', slug: 'seo', featureId: 'seo', name: 'Search Engine Optimization (SEO)',
    seo: {
      title: 'SEO Services in Coimbatore | Search Engine Optimization | EVM',
      description: 'Technical SEO, keyword research, on-page optimization and content planning from Elite Vision Media in Coimbatore, built for steady, long-term Google visibility.',
      keywords: ['SEO services Coimbatore', 'search engine optimization', 'technical SEO', 'keyword research', 'on-page SEO'],
    },
    hero: {
      kicker: 'Search Engine Optimization',
      title: 'SEO that earns lasting visibility on Google.',
      subtitle: 'We fix what holds your site back, target the searches your customers actually make and build authority that keeps working month after month.',
      media: { kind: 'search' },
    },
    overview: {
      title: 'Be found at the moment people are looking.',
      what: 'Search engine optimization improves how search engines crawl, understand and rank your website. It covers the technical health of the site, the content on each page and the signals that tell Google your business is trustworthy.',
      why: 'Most buying journeys start with a search. If your website does not appear for the questions and services your customers search for, that demand goes to a competitor, no matter how good your work is.',
      how: 'EVM starts with an audit, agrees on the searches that matter to your business, then works through technical fixes, page improvements and content in a clear order, reporting on rankings and traffic as we go.',
    },
    offers: [
      { icon: FileSearch, title: 'Technical SEO audit', text: 'Crawl errors, indexing, page speed, mobile usability and site structure reviewed and prioritised.' },
      { icon: Search, title: 'Keyword & intent research', text: 'The search terms your customers use, grouped by intent so each page has a clear job.' },
      { icon: FileText, title: 'On-page optimization', text: 'Titles, headings, meta descriptions, internal links and copy tuned for both people and search engines.' },
      { icon: Gauge, title: 'Speed & Core Web Vitals', text: 'Practical fixes for slow loading, layout shifts and heavy images that hurt rankings and conversions.' },
      { icon: Link2, title: 'Internal linking & structure', text: 'A logical page hierarchy so authority flows to the pages that matter most.' },
      { icon: BarChart3, title: 'Rank & traffic tracking', text: 'Regular reporting on positions, organic traffic and enquiries from search.' },
    ],
    process: [
      { icon: FileSearch, title: 'Audit', text: 'We review your site, current rankings and competitors to find the biggest opportunities and blockers.' },
      { icon: Target, title: 'Keyword map', text: 'We match priority search terms to existing or new pages so nothing competes with itself.' },
      { icon: Wrench, title: 'Fix & optimize', text: 'Technical issues are resolved first, then pages are improved one by one in order of impact.' },
      { icon: TrendingUp, title: 'Measure & refine', text: 'We track progress and adjust the plan based on what search data shows.' },
    ],
    why: {
      text: 'SEO is a long-term channel, so we focus on work that compounds instead of shortcuts.',
      points: ['White-hat methods only, no link schemes or keyword stuffing', 'Clear priorities explained in plain language', 'SEO planned together with your website and content', 'Honest reporting on what has changed and why'],
    },
    showcase: {
      title: 'What SEO work looks like.',
      sub: 'Illustrative views of the audits and reports we work from.',
      items: [{ kind: 'search' }, { kind: 'content' }],
    },
    faqs: [
      { q: 'How long does SEO take to show results?', a: 'Early improvements such as fixed indexing issues can show within weeks, but meaningful ranking growth usually builds over several months depending on competition and the current state of the site.' },
      { q: 'Do you guarantee first-page rankings?', a: 'No. Nobody controls Google’s rankings, so we do not promise positions. We commit to sound work, clear priorities and transparent reporting.' },
      { q: 'Do I need a new website for SEO?', a: 'Not always. Many sites can be improved in place. If the platform or structure is holding you back, we explain the trade-offs before recommending a rebuild.' },
      { q: 'What do your SEO reports include?', a: 'Keyword positions, organic traffic, the pages gaining or losing visibility, enquiries from search where tracking allows, and what we plan to work on next.' },
      { q: 'Can SEO work alongside paid ads?', a: 'Yes. Ads bring traffic immediately while SEO builds; the keyword data from ads also helps decide which pages to optimise first.' },
    ],
    related: [`${dm}/local-seo`, `${dm}/content-marketing`, `${wd}/website-redesign-maintenance`],
  },
  {
    parent: 'digital-marketing', slug: 'social-media-marketing', featureId: 'social', name: 'Social Media Marketing',
    seo: {
      title: 'Social Media Marketing Agency in Coimbatore | EVM',
      description: 'Content strategy, posts, carousels, reels and page management for Instagram, Facebook, LinkedIn and YouTube from Elite Vision Media, Coimbatore.',
      keywords: ['social media marketing Coimbatore', 'social media management', 'Instagram marketing', 'content calendar', 'reels creation'],
    },
    hero: {
      kicker: 'Social Media Marketing',
      title: 'Social media your audience actually follows.',
      subtitle: 'Planned content, consistent design and real conversations across Instagram, Facebook, LinkedIn and YouTube.',
      media: { kind: 'social' },
    },
    overview: {
      title: 'A consistent presence, not random posting.',
      what: 'Social media marketing is the planning, creation and management of content on the platforms where your customers spend time, so your brand stays visible, recognisable and approachable.',
      why: 'Customers check your social pages before they enquire. An active, well-designed presence builds trust; an empty or inconsistent one quietly raises doubts.',
      how: 'EVM builds a content plan around your goals, designs and shoots the posts in-house, schedules them, handles community replies and reviews performance every month.',
    },
    offers: [
      { icon: Calendar, title: 'Content strategy & calendar', text: 'Monthly themes, formats and posting rhythm agreed in advance.' },
      { icon: Image, title: 'Posts & carousels', text: 'On-brand static designs and carousels that explain, educate and sell.' },
      { icon: Video, title: 'Reels & short video', text: 'Short-form video shot and edited by our own production team.' },
      { icon: MessageCircle, title: 'Community management', text: 'Timely replies to comments and messages in your brand voice.' },
      { icon: Users, title: 'Audience research', text: 'Who follows you, what they respond to and which platforms deserve focus.' },
      { icon: BarChart3, title: 'Monthly performance review', text: 'Reach, engagement and follower growth with clear next steps.' },
    ],
    process: [
      { icon: Compass, title: 'Brand & audience', text: 'We learn your voice, offers and audience, and review your current profiles.' },
      { icon: Calendar, title: 'Plan the month', text: 'A content calendar is shared for approval before anything is published.' },
      { icon: Camera, title: 'Create', text: 'Our designers and video team produce the posts, reels and captions.' },
      { icon: BarChart3, title: 'Publish & learn', text: 'We post, engage and use the results to shape the next month’s plan.' },
    ],
    why: {
      text: 'Design, photography and video are produced under one roof, so your feed looks consistent.',
      points: ['In-house designers and video team', 'Calendar approved by you before posting', 'Platform-specific formats, not one post copied everywhere', 'Monthly reviews focused on what to improve'],
    },
    showcase: {
      title: 'Content made for the feed.',
      sub: 'Examples of vertical content produced by EVM.',
      items: [
        { photo: '/videos/reels/reel-29.webp', alt: 'Frame from a fashion reel produced by EVM', vertical: true },
        { photo: '/videos/reels/crumbor-r04.webp', alt: 'Frame from a bakery social media reel produced by EVM', vertical: true },
        { photo: '/videos/reels/happy-ending.webp', alt: 'Frame from a lifestyle brand reel produced by EVM', vertical: true },
      ],
    },
    faqs: [
      { q: 'Which platforms should my business be on?', a: 'It depends on where your customers are. Consumer brands often focus on Instagram and Facebook, while B2B services usually benefit more from LinkedIn. We recommend a focus after reviewing your audience.' },
      { q: 'How many posts do you create each month?', a: 'The number is agreed in your plan based on goals and budget. We would rather publish fewer, better posts consistently than fill a quota.' },
      { q: 'Do I approve content before it goes live?', a: 'Yes. The monthly calendar and creatives are shared for approval before publishing.' },
      { q: 'Do you also run paid social campaigns?', a: 'Yes. Organic content and paid campaigns work best together; see our Meta Ads service for details.' },
    ],
    related: [`${dm}/meta-ads`, `${vp}/reels-short-form-videos`, `${dm}/content-marketing`],
  },
  {
    parent: 'digital-marketing', slug: 'meta-ads', featureId: 'ads', name: 'Meta Ads & Paid Advertising',
    seo: {
      title: 'Meta Ads & Paid Advertising Agency in Coimbatore | EVM',
      description: 'Facebook and Instagram ad campaigns with audience targeting, retargeting, creative testing and conversion tracking, managed by Elite Vision Media.',
      keywords: ['Meta ads agency Coimbatore', 'Facebook ads', 'Instagram ads', 'paid advertising', 'retargeting campaigns'],
    },
    hero: {
      kicker: 'Meta Ads & Paid Advertising',
      title: 'Paid campaigns that reach the right people.',
      subtitle: 'Targeted Facebook and Instagram campaigns with proper tracking, tested creatives and full transparency on where your budget goes.',
      media: { kind: 'ads' },
    },
    overview: {
      title: 'Put your offer in front of buyers, today.',
      what: 'Paid social advertising places your message in front of specific audiences on Facebook and Instagram, chosen by location, interests, behaviour or past interaction with your brand.',
      why: 'Organic reach is limited. Ads let you reach new customers quickly, test offers and re-engage people who visited your website but did not enquire.',
      how: 'EVM sets up tracking first, builds audiences and campaign structure, produces the ad creatives in-house and optimises spend based on results, with the ad account owned by you.',
    },
    offers: [
      { icon: Target, title: 'Campaign strategy & setup', text: 'Objectives, budgets and campaign structure aligned to your goal: leads, sales or awareness.' },
      { icon: Users, title: 'Audience targeting', text: 'Interest, location and lookalike audiences built from your customer data.' },
      { icon: Repeat, title: 'Retargeting', text: 'Reach people who visited your site or engaged with your content.' },
      { icon: Image, title: 'Ad creative & copy', text: 'Static, carousel and video ads designed and written by our team.' },
      { icon: Sliders, title: 'A/B testing', text: 'Creatives, headlines and audiences tested so budget moves to what works.' },
      { icon: MousePointerClick, title: 'Pixel & conversion tracking', text: 'Meta Pixel and Conversions API setup so results are measured properly.' },
    ],
    process: [
      { icon: Plug, title: 'Track first', text: 'We confirm tracking on your site and ad account before spending anything.' },
      { icon: Target, title: 'Plan & build', text: 'Audiences, campaign structure and budgets are planned around your goal.' },
      { icon: PenTool, title: 'Create & launch', text: 'Ad variations are produced, approved by you and launched.' },
      { icon: TrendingUp, title: 'Optimise', text: 'We review results regularly, pause weak ads and scale what performs.' },
    ],
    why: {
      text: 'You keep ownership and visibility of your ad account and spend at all times.',
      points: ['Ad spend paid directly to Meta from your account', 'Creatives produced in-house, so testing is fast', 'Tracking set up before campaigns launch', 'Reporting on cost per lead or sale, not vanity metrics'],
    },
    showcase: {
      title: 'Built around measurable results.',
      sub: 'Illustrative campaign dashboard and audience views.',
      items: [{ kind: 'ads' }, { kind: 'social' }],
    },
    faqs: [
      { q: 'How much should I spend on Meta ads?', a: 'It depends on your goals, audience size and how competitive your market is. We suggest a starting test budget, then scale based on results.' },
      { q: 'Is ad spend included in your fee?', a: 'No. Ad spend is paid directly to Meta from your own account. Our management fee is separate and agreed upfront.' },
      { q: 'When will I see results?', a: 'Campaigns start delivering as soon as they are approved, but the first weeks are a learning phase. Performance usually stabilises after testing and optimisation.' },
      { q: 'Do you run Google Ads as well?', a: 'Yes, Google Ads can be planned alongside Meta campaigns when search intent is important for your business.' },
      { q: 'Who owns the ad account?', a: 'You do. We work inside your business account with access you can revoke at any time.' },
    ],
    related: [`${dm}/social-media-marketing`, `${vp}/promotional-videos`, `${wd}/business-website-development`],
  },
  {
    parent: 'digital-marketing', slug: 'content-marketing', featureId: 'content', name: 'Content Marketing',
    seo: {
      title: 'Content Marketing Services in Coimbatore | EVM',
      description: 'Blog articles, landing page copy, newsletters and video scripts that answer customer questions, support SEO and build trust. Content marketing by Elite Vision Media.',
      keywords: ['content marketing Coimbatore', 'blog writing services', 'website copywriting', 'content strategy', 'email newsletters'],
    },
    hero: {
      kicker: 'Content Marketing',
      title: 'Content that answers questions and wins trust.',
      subtitle: 'Articles, page copy, newsletters and scripts planned around what your customers want to know before they buy.',
      media: { kind: 'content' },
    },
    overview: {
      title: 'Show your expertise before the first call.',
      what: 'Content marketing is creating useful material, such as articles, guides, page copy and videos, that helps potential customers understand their problem and your solution.',
      why: 'Buyers research before they contact anyone. Helpful content builds credibility, supports your SEO and gives your sales conversations a head start.',
      how: 'EVM plans topics from real customer questions and keyword data, writes and edits in your brand voice, and repurposes each piece across your website, social media and email.',
    },
    offers: [
      { icon: FileText, title: 'Blog articles & guides', text: 'In-depth, well-structured articles that answer real customer questions.' },
      { icon: Layout, title: 'Website & landing page copy', text: 'Clear, persuasive copy for service pages and campaign landing pages.' },
      { icon: Calendar, title: 'Editorial planning', text: 'A content calendar built from search data and your sales priorities.' },
      { icon: Mail, title: 'Email newsletters', text: 'Regular updates that keep your brand in front of past and potential customers.' },
      { icon: Clapperboard, title: 'Video scripts & captions', text: 'Scripts for explainers, reels and corporate films, plus captions and subtitles.' },
      { icon: Repeat, title: 'Content repurposing', text: 'One strong piece turned into posts, carousels, emails and short videos.' },
    ],
    process: [
      { icon: Lightbulb, title: 'Topic research', text: 'We gather customer questions, search data and competitor gaps.' },
      { icon: Calendar, title: 'Editorial plan', text: 'Topics are prioritised into a calendar you approve.' },
      { icon: PenTool, title: 'Write & edit', text: 'Drafts are written, edited and shared for your review and fact-check.' },
      { icon: Repeat, title: 'Publish & repurpose', text: 'Content goes live and is adapted for social and email.' },
    ],
    why: {
      text: 'Our writers work alongside our SEO, design and video teams, so content is never created in isolation.',
      points: ['Topics chosen from real questions and search data', 'Written for people first, optimised for search second', 'Your review and approval on every piece', 'Content reused across channels for more value'],
    },
    showcase: {
      title: 'From plan to published.',
      sub: 'Illustrative editorial calendar and article layouts.',
      items: [{ kind: 'content' }, { kind: 'search' }],
    },
    faqs: [
      { q: 'Who writes the content?', a: 'Our in-house team writes and edits the content. You review drafts for accuracy before anything is published.' },
      { q: 'Do you use AI to write articles?', a: 'We may use tools for research support, but content is planned, written and edited by people, and checked for accuracy and originality.' },
      { q: 'How often should we publish?', a: 'Consistency matters more than volume. We recommend a realistic rhythm based on your goals and the depth each topic needs.' },
      { q: 'Can you write in Tamil as well as English?', a: 'Tell us your audience and languages during planning and we will confirm what we can produce for your project.' },
    ],
    related: [`${dm}/seo`, `${dm}/social-media-marketing`, `${vp}/explainer-videos`],
  },
  {
    parent: 'digital-marketing', slug: 'local-seo', featureId: 'local', name: 'Local SEO',
    seo: {
      title: 'Local SEO Services in Coimbatore | Google Business Profile | EVM',
      description: 'Google Business Profile optimization, location pages, local citations and review strategy to help Coimbatore businesses appear in Maps and "near me" searches.',
      keywords: ['local SEO Coimbatore', 'Google Business Profile optimization', 'Google Maps ranking', 'near me searches', 'local citations'],
    },
    hero: {
      kicker: 'Local SEO',
      title: 'Show up when nearby customers search.',
      subtitle: 'Google Business Profile optimization, local pages and consistent listings so your business appears in Maps and “near me” results.',
      media: { kind: 'map' },
    },
    overview: {
      title: 'Win the searches that happen close to you.',
      what: 'Local SEO helps a business appear in location-based searches, including the Google Maps pack and results for queries like “near me” or “in Coimbatore”.',
      why: 'For clinics, shops, restaurants and service businesses, many customers decide from the map results. Missing or inaccurate listings send those calls to competitors.',
      how: 'EVM optimises your Google Business Profile, builds location pages on your website, cleans up listings across directories and sets up a simple process for earning and replying to reviews.',
    },
    offers: [
      { icon: MapPin, title: 'Google Business Profile', text: 'Categories, services, photos, hours and posts set up and kept current.' },
      { icon: Globe, title: 'Location landing pages', text: 'Pages for each area or branch you serve, with genuinely useful local content.' },
      { icon: Search, title: 'Local keyword targeting', text: 'The location-based searches your customers use, mapped to your pages.' },
      { icon: Star, title: 'Review strategy', text: 'A simple, guideline-friendly way to ask for reviews and respond to them.' },
      { icon: ListChecks, title: 'NAP consistency', text: 'Name, address and phone details matched across directories and maps.' },
      { icon: Link2, title: 'Local citations', text: 'Listings on relevant local and industry directories.' },
    ],
    process: [
      { icon: FileSearch, title: 'Local audit', text: 'We check your profile, listings, reviews and how you appear for local searches.' },
      { icon: MapPin, title: 'Profile optimisation', text: 'Your Google Business Profile is completed and improved.' },
      { icon: ListChecks, title: 'Listings & pages', text: 'Directory listings are cleaned up and local pages are created.' },
      { icon: Star, title: 'Reviews & upkeep', text: 'We support review collection and keep the profile active with posts and updates.' },
    ],
    why: {
      text: 'We are based in Coimbatore and understand how local customers search for services.',
      points: ['Local market knowledge from our Coimbatore studio', 'Profile photos and visuals produced in-house', 'Review practices that follow Google’s guidelines', 'Works together with your wider SEO plan'],
    },
    showcase: {
      title: 'Visible on the map.',
      sub: 'Illustrative local search and profile views.',
      items: [{ kind: 'map' }, { kind: 'search' }],
    },
    faqs: [
      { q: 'What is the difference between SEO and local SEO?', a: 'SEO improves visibility in general search results. Local SEO focuses on location-based results, especially Google Maps and your Business Profile.' },
      { q: 'Can you help if I don’t have a Google Business Profile yet?', a: 'Yes. We can create and verify the profile with you, then complete and optimise it.' },
      { q: 'Do you buy or write fake reviews?', a: 'Never. Fake reviews break Google’s policies and can get a profile suspended. We help you ask genuine customers for reviews.' },
      { q: 'I have more than one branch. Can you manage all of them?', a: 'Yes. Each location can have its own profile and landing page with consistent details.' },
    ],
    related: [`${dm}/seo`, `${wd}/business-website-development`, `${dm}/content-marketing`],
  },

  /* ───────────── Web Design & Development ───────────── */
  {
    parent: 'web-design-development', slug: 'custom-website-design', featureId: 'custom-design', name: 'Custom Website Design',
    seo: {
      title: 'Custom Website Design in Coimbatore | EVM',
      description: 'Bespoke website design built around your brand, audience and goals. Custom layouts, design systems and responsive interfaces from Elite Vision Media, Coimbatore.',
      keywords: ['custom website design Coimbatore', 'bespoke web design', 'website design agency', 'responsive web design', 'brand website'],
    },
    hero: {
      kicker: 'Custom Website Design',
      title: 'A website designed around your brand.',
      subtitle: 'No recycled templates. Layouts, typography and interactions designed for your audience and the way your business actually works.',
      media: { kind: 'browser' },
    },
    overview: {
      title: 'Stand out from template websites.',
      what: 'Custom website design means creating the look, layout and user flow of your site specifically for your brand, rather than adapting a ready-made theme.',
      why: 'Your website is often the first impression. A distinctive, well-structured design builds credibility and guides visitors to enquire instead of leaving.',
      how: 'EVM researches your audience and competitors, designs key pages for your feedback, builds a reusable design system and hands it to development with every state defined.',
    },
    offers: [
      { icon: Palette, title: 'Visual design', text: 'Colour, typography and imagery that express your brand clearly.' },
      { icon: Layers, title: 'Design system', text: 'Reusable components and styles that keep every page consistent.' },
      { icon: MonitorSmartphone, title: 'Responsive layouts', text: 'Designs for desktop, tablet and mobile, not just a squeezed desktop page.' },
      { icon: Sparkles, title: 'Interactions & motion', text: 'Subtle animations and hover states that add polish without slowing the site.' },
      { icon: Compass, title: 'Navigation & structure', text: 'Clear menus and page flows so visitors find what they need quickly.' },
      { icon: Eye, title: 'Accessibility basics', text: 'Readable contrast, sensible headings and keyboard-friendly components.' },
    ],
    process: [
      { icon: Compass, title: 'Discover', text: 'Goals, audience, competitors and content are reviewed together.' },
      { icon: Layout, title: 'Structure', text: 'Sitemap and wireframes define what goes on each page.' },
      { icon: Palette, title: 'Design', text: 'Key pages are designed and refined with your feedback.' },
      { icon: Rocket, title: 'Hand-off', text: 'The approved design system goes to development, ready to build.' },
    ],
    why: {
      text: 'Our designers sit next to our developers, photographers and video team.',
      points: ['Original designs, not modified templates', 'Your own photography and video can be produced in-house', 'Designs reviewed for build feasibility early', 'Mobile layouts designed, not left to chance'],
    },
    showcase: {
      title: 'Design, from layout to detail.',
      sub: 'Illustrative design mockups, not client work.',
      items: [{ kind: 'browser' }, { kind: 'wireframe' }],
    },
    faqs: [
      { q: 'How is custom design different from using a theme?', a: 'A theme gives you a pre-made layout to fill in. Custom design starts from your content and goals, so the structure and look are made for your business.' },
      { q: 'How many design revisions are included?', a: 'Revision rounds are agreed in the proposal. We share designs at key stages so feedback is easy to give early.' },
      { q: 'Will my website work on mobile?', a: 'Yes. We design mobile layouts deliberately and test the built site on different screen sizes.' },
      { q: 'Can you design and also build the site?', a: 'Yes. Our development team builds the approved design, either custom-coded or on WordPress depending on your needs.' },
    ],
    related: [`${wd}/ui-ux-design`, `${wd}/business-website-development`, `${wd}/wordpress-development`],
  },
  {
    parent: 'web-design-development', slug: 'business-website-development', featureId: 'business-websites', name: 'Business Website Development',
    seo: {
      title: 'Business Website Development in Coimbatore | EVM',
      description: 'Professional company and service websites with clear messaging, enquiry forms and mobile-friendly development, built by Elite Vision Media in Coimbatore.',
      keywords: ['business website development Coimbatore', 'company website', 'corporate website design', 'service business website', 'website developer Coimbatore'],
    },
    hero: {
      kicker: 'Business Website Development',
      title: 'A professional website that brings in enquiries.',
      subtitle: 'Company and service websites that explain what you do clearly and make it easy for customers to get in touch.',
      media: { kind: 'business' },
    },
    overview: {
      title: 'Your business, clearly explained online.',
      what: 'A business website presents your company, services, team and contact details in one trustworthy place, and turns visitors into enquiries through forms, calls and WhatsApp.',
      why: 'Customers, partners and job seekers all check your website. A slow, outdated or unclear site costs you credibility and leads, even if your business is excellent.',
      how: 'EVM plans the pages and messaging with you, designs and develops the site, sets up enquiry forms and tracking, and launches it with basic SEO in place.',
    },
    offers: [
      { icon: Building2, title: 'Company & corporate sites', text: 'About, services, team and careers pages that present your business professionally.' },
      { icon: Layout, title: 'Service pages', text: 'A focused page for each service, written to answer customer questions.' },
      { icon: Rocket, title: 'Landing pages', text: 'Campaign pages built to convert traffic from ads and promotions.' },
      { icon: MessageCircle, title: 'Enquiry forms & WhatsApp', text: 'Contact forms, click-to-call and WhatsApp links that reach the right person.' },
      { icon: Smartphone, title: 'Mobile-friendly build', text: 'Fast, responsive pages tested on real screen sizes.' },
      { icon: Search, title: 'SEO-ready launch', text: 'Page titles, descriptions, sitemap and analytics set up from day one.' },
    ],
    process: [
      { icon: Compass, title: 'Plan', text: 'We agree on pages, content and the actions you want visitors to take.' },
      { icon: Palette, title: 'Design', text: 'The look and layout are designed and approved.' },
      { icon: Code2, title: 'Develop', text: 'The site is built, content added and forms connected.' },
      { icon: Rocket, title: 'Test & launch', text: 'We test across devices, set up analytics and go live.' },
    ],
    why: {
      text: 'We build websites that your marketing can grow on, not just a digital brochure.',
      points: ['Clear page structure built around your services', 'Enquiry paths on every page', 'SEO basics and analytics included at launch', 'Photography and video available in-house'],
    },
    showcase: {
      title: 'Built to convert visitors.',
      sub: 'Illustrative website layouts.',
      items: [{ kind: 'business' }, { kind: 'browser' }],
    },
    faqs: [
      { q: 'How long does a business website take?', a: 'Timelines depend on the number of pages and how ready your content is. We share a schedule with milestones in the proposal.' },
      { q: 'Do you write the website content?', a: 'We can. Our team can write the copy, or edit and structure content you provide.' },
      { q: 'Will I be able to update the website myself?', a: 'If you want to edit content regularly, we can build on a CMS such as WordPress and show you how to make updates.' },
      { q: 'Do you provide hosting and a domain?', a: 'We can advise on and help set up hosting and domains in your name, so you always own them.' },
    ],
    related: [`${wd}/custom-website-design`, `${dm}/local-seo`, `${wd}/website-redesign-maintenance`],
  },
  {
    parent: 'web-design-development', slug: 'wordpress-development', featureId: 'wordpress', name: 'WordPress Website Development',
    seo: {
      title: 'WordPress Website Development in Coimbatore | EVM',
      description: 'Custom WordPress websites, theme customization, plugin integration and easy content management, built and optimized by Elite Vision Media, Coimbatore.',
      keywords: ['WordPress development Coimbatore', 'WordPress website design', 'WordPress theme customization', 'WordPress plugins', 'CMS website'],
    },
    hero: {
      kicker: 'WordPress Development',
      title: 'WordPress websites you can manage yourself.',
      subtitle: 'Custom-built WordPress sites with a clean editor, the right plugins and nothing slowing them down.',
      media: { kind: 'wordpress' },
    },
    overview: {
      title: 'Flexible, familiar and easy to update.',
      what: 'WordPress is a content management system that lets your team edit pages, publish posts and manage media without touching code.',
      why: 'If your content changes often, such as news, offers, blogs or listings, a CMS saves time and cost. WordPress is widely supported, so you are never locked in.',
      how: 'EVM builds WordPress sites from a custom or carefully customized theme, keeps plugins lean, sets up editing blocks for your content and trains your team to use them.',
    },
    offers: [
      { icon: Code2, title: 'Custom WordPress builds', text: 'Sites built to your design, not a crowded multipurpose theme.' },
      { icon: Palette, title: 'Theme customization', text: 'Existing themes adapted to your brand and cleaned of unused features.' },
      { icon: Plug, title: 'Plugin integration', text: 'Forms, SEO, booking and other features added with well-supported plugins.' },
      { icon: FileText, title: 'Content management setup', text: 'Editor blocks and post types that match how you publish.' },
      { icon: Gauge, title: 'Speed optimization', text: 'Caching, image optimization and lean code for faster loading.' },
      { icon: Shield, title: 'Security basics', text: 'Updates, backups and sensible hardening from the start.' },
    ],
    process: [
      { icon: Compass, title: 'Requirements', text: 'We list the content types, features and integrations you need.' },
      { icon: Palette, title: 'Design', text: 'The site design is created or your existing theme is reviewed.' },
      { icon: Code2, title: 'Build', text: 'Theme, blocks and plugins are set up and content is migrated.' },
      { icon: Users, title: 'Train & launch', text: 'We launch the site and walk your team through editing.' },
    ],
    why: {
      text: 'We keep WordPress sites lean so they stay fast and easy to maintain.',
      points: ['Only the plugins you actually need', 'An editor set up for your real content', 'Training so your team is confident', 'Maintenance support available after launch'],
    },
    showcase: {
      title: 'Easy to edit, built properly.',
      sub: 'Illustrative WordPress dashboard and page views.',
      items: [{ kind: 'wordpress' }, { kind: 'business' }],
    },
    faqs: [
      { q: 'Is WordPress right for my business?', a: 'WordPress suits sites that need regular content updates. For very custom applications or highly interactive sites, a custom build may be a better fit; we will advise honestly.' },
      { q: 'Can you fix or improve my existing WordPress site?', a: 'Yes. We can audit your current site, remove unnecessary plugins, improve speed and refresh the design.' },
      { q: 'Will I need to pay for plugins?', a: 'Some features use paid plugins. We explain any licence costs before including them.' },
      { q: 'Do you offer WordPress maintenance?', a: 'Yes. Updates, backups and fixes can be covered under our maintenance service.' },
    ],
    related: [`${wd}/website-redesign-maintenance`, `${wd}/ecommerce-development`, `${dm}/content-marketing`],
  },
  {
    parent: 'web-design-development', slug: 'ecommerce-development', featureId: 'ecommerce', name: 'E-commerce Website Development',
    seo: {
      title: 'E-commerce Website Development in Coimbatore | EVM',
      description: 'Online stores with product catalogues, cart, checkout, payment gateway integration and order management, designed and developed by Elite Vision Media.',
      keywords: ['e-commerce website development Coimbatore', 'online store development', 'payment gateway integration', 'WooCommerce', 'Shopify store setup'],
    },
    hero: {
      kicker: 'E-commerce Development',
      title: 'An online store that makes buying simple.',
      subtitle: 'Product catalogues, smooth checkout and secure payments, designed to turn browsers into customers.',
      media: { kind: 'shop' },
    },
    overview: {
      title: 'Sell online without the friction.',
      what: 'E-commerce development is building an online store where customers can browse products, add them to a cart and pay securely, with orders flowing to your team.',
      why: 'Customers expect to buy online. A confusing store or a slow checkout loses sales at the last step, while a clear one works for you around the clock.',
      how: 'EVM designs the catalogue and checkout around your products, integrates payment and shipping options, and sets up order management that fits how your team works.',
    },
    offers: [
      { icon: Package, title: 'Product catalogue', text: 'Categories, filters and product pages that show your range clearly.' },
      { icon: ShoppingCart, title: 'Cart & checkout', text: 'A short, clear checkout that works smoothly on mobile.' },
      { icon: CreditCard, title: 'Payment gateway integration', text: 'Secure online payments with popular Indian gateways.' },
      { icon: ListChecks, title: 'Order management', text: 'Order notifications, status updates and stock management.' },
      { icon: Camera, title: 'Product photography', text: 'Clean product shoots from our in-house photography team.' },
      { icon: Search, title: 'Store SEO', text: 'Product and category pages optimised for search.' },
    ],
    process: [
      { icon: Compass, title: 'Plan the store', text: 'Products, categories, payments, shipping and platform are agreed.' },
      { icon: Palette, title: 'Design', text: 'Home, category, product and checkout pages are designed.' },
      { icon: Code2, title: 'Build & integrate', text: 'The store is built and payments, shipping and email are connected.' },
      { icon: Rocket, title: 'Test & launch', text: 'Test orders are placed end to end before going live.' },
    ],
    why: {
      text: 'We can handle the store, the product photos and the marketing that brings shoppers in.',
      points: ['Product photography produced in-house', 'Checkout tested on real devices', 'Platform chosen for your needs, not ours', 'Marketing and ads support after launch'],
    },
    showcase: {
      title: 'Products presented properly.',
      sub: 'Product photography by EVM, alongside an illustrative store layout.',
      items: [
        { kind: 'shop' },
        { photo: '/images/work/product/product-10.webp', alt: 'Product photography of a chocolate bar box shot by EVM', vertical: true },
        { photo: '/images/work/product/product-12.webp', alt: 'Styled product shot of a milk chocolate pack by EVM', vertical: true },
      ],
    },
    faqs: [
      { q: 'Which platform will my store be built on?', a: 'We recommend a platform such as WooCommerce, Shopify or a custom build based on your product range, budget and how you want to manage orders.' },
      { q: 'Can you integrate Razorpay or other payment gateways?', a: 'Yes. We integrate commonly used payment gateways; the account is set up in your business name.' },
      { q: 'Do you add the products to the store?', a: 'We can upload your initial catalogue and show your team how to add and update products.' },
      { q: 'Can you photograph our products?', a: 'Yes. Our team shoots product photography in-house; see our Product Shoot work in the portfolio.' },
    ],
    related: [`${wd}/wordpress-development`, `${dm}/meta-ads`, `${vp}/promotional-videos`],
  },
  {
    parent: 'web-design-development', slug: 'ui-ux-design', featureId: 'ui-ux', name: 'UI/UX Design',
    seo: {
      title: 'UI/UX Design Services in Coimbatore | EVM',
      description: 'User research, wireframes, prototypes and interface design for websites and digital products. UI/UX design by Elite Vision Media, Coimbatore.',
      keywords: ['UI UX design Coimbatore', 'user experience design', 'wireframes and prototypes', 'interface design', 'usability improvements'],
    },
    hero: {
      kicker: 'UI/UX Design',
      title: 'Interfaces that feel easy to use.',
      subtitle: 'Research, wireframes and prototypes that remove confusion before anything is built.',
      media: { kind: 'wireframe' },
    },
    overview: {
      title: 'Design decisions based on how people behave.',
      what: 'UX design shapes how a product works: the structure, flows and steps a user takes. UI design shapes how it looks and feels: layout, typography, colour and components.',
      why: 'When users get confused they leave. Good UI/UX reduces drop-offs, support questions and expensive rework after development.',
      how: 'EVM maps user goals, sketches flows and wireframes, tests clickable prototypes and then designs a polished interface with a reusable component set.',
    },
    offers: [
      { icon: Users, title: 'User research & planning', text: 'Who your users are, what they need and where they struggle today.' },
      { icon: Layers, title: 'Information architecture', text: 'Page structure and navigation that match how users think.' },
      { icon: Layout, title: 'Wireframes', text: 'Low-detail layouts to agree on structure before visual design.' },
      { icon: MousePointerClick, title: 'Clickable prototypes', text: 'Interactive mockups to test flows before development.' },
      { icon: Palette, title: 'Interface design', text: 'Polished screens and a component library ready for developers.' },
      { icon: Eye, title: 'Usability review', text: 'An expert review of an existing site or app with prioritised fixes.' },
    ],
    process: [
      { icon: Users, title: 'Understand users', text: 'Goals, tasks and pain points are gathered and prioritised.' },
      { icon: Layers, title: 'Map flows', text: 'User journeys and screens are mapped and wireframed.' },
      { icon: MousePointerClick, title: 'Prototype & test', text: 'Clickable prototypes are reviewed and refined.' },
      { icon: Palette, title: 'Design UI', text: 'Final interface and components are designed and handed off.' },
    ],
    why: {
      text: 'We test ideas early, when changes are cheap.',
      points: ['Wireframes before visuals, so structure is agreed first', 'Prototypes you can click and share', 'Component libraries that speed up development', 'Designers and developers working together'],
    },
    showcase: {
      title: 'From wireframe to interface.',
      sub: 'Illustrative wireframe and UI views.',
      items: [{ kind: 'wireframe' }, { kind: 'browser' }],
    },
    faqs: [
      { q: 'What is the difference between UI and UX?', a: 'UX is how the product works and flows; UI is how it looks. Both are needed for a product that is easy and pleasant to use.' },
      { q: 'Can you improve the UX of our existing website?', a: 'Yes. We can review your current site, identify friction points and design improvements in order of impact.' },
      { q: 'Which tools do you use?', a: 'We typically design and prototype in Figma, which lets you comment directly on screens.' },
      { q: 'Do you design mobile apps?', a: 'We can design app interfaces and flows. Development needs are discussed separately depending on the project.' },
    ],
    related: [`${wd}/custom-website-design`, `${wd}/ecommerce-development`, `${wd}/website-redesign-maintenance`],
  },
  {
    parent: 'web-design-development', slug: 'website-redesign-maintenance', featureId: 'redesign-maintenance', name: 'Website Redesign & Maintenance',
    seo: {
      title: 'Website Redesign & Maintenance Services in Coimbatore | EVM',
      description: 'Refresh an outdated website and keep it secure, fast and up to date with redesign, content updates, bug fixes and ongoing maintenance from Elite Vision Media.',
      keywords: ['website redesign Coimbatore', 'website maintenance services', 'website update', 'website speed optimization', 'website security updates'],
    },
    hero: {
      kicker: 'Redesign & Maintenance',
      title: 'Refresh your website and keep it running well.',
      subtitle: 'A modern redesign when your site feels dated, and reliable care afterwards so it stays secure, fast and current.',
      media: { kind: 'maintenance' },
    },
    overview: {
      title: 'An outdated site costs you trust.',
      what: 'A redesign updates your website’s look, structure and technology. Maintenance keeps it healthy afterwards through updates, backups, fixes and content changes.',
      why: 'Slow pages, broken forms and old designs quietly push customers away. Unmaintained sites are also more vulnerable to security problems.',
      how: 'EVM audits what works and what doesn’t, redesigns while protecting your existing search rankings, and offers ongoing maintenance with a clear scope.',
    },
    offers: [
      { icon: Palette, title: 'Website redesign', text: 'A modern look and clearer structure that keeps your brand recognisable.' },
      { icon: Search, title: 'SEO-safe migration', text: 'Redirects and page mapping so you don’t lose existing rankings.' },
      { icon: FileText, title: 'Content updates', text: 'New pages, offers, images and text changes when you need them.' },
      { icon: Wrench, title: 'Bug fixes', text: 'Broken layouts, forms and links found and fixed.' },
      { icon: Zap, title: 'Performance tuning', text: 'Faster loading through image, code and hosting improvements.' },
      { icon: Shield, title: 'Security & backups', text: 'Regular updates, backups and monitoring.' },
    ],
    process: [
      { icon: FileSearch, title: 'Audit', text: 'We review design, speed, SEO, content and technical issues.' },
      { icon: Palette, title: 'Redesign', text: 'Priority pages are redesigned and approved.' },
      { icon: Rocket, title: 'Migrate & launch', text: 'Content is moved, redirects set and the new site launched.' },
      { icon: Shield, title: 'Maintain', text: 'Ongoing updates, backups and fixes keep the site healthy.' },
    ],
    why: {
      text: 'We protect what is already working while fixing what isn’t.',
      points: ['Redirect planning to protect search traffic', 'Clear maintenance scope and response times', 'Speed and security treated as ongoing work', 'One team for design, content and fixes'],
    },
    showcase: {
      title: 'Before, after and ongoing.',
      sub: 'Illustrative redesign and health-check views.',
      items: [{ kind: 'maintenance' }, { kind: 'browser' }],
    },
    faqs: [
      { q: 'How do I know if my website needs a redesign?', a: 'Common signs are slow loading, poor mobile experience, outdated design, difficulty updating content and fewer enquiries than expected.' },
      { q: 'Will a redesign affect my Google rankings?', a: 'A redesign done carelessly can. We map old URLs to new ones and set redirects to protect your existing visibility.' },
      { q: 'What does website maintenance include?', a: 'Typically software updates, backups, security checks, small content updates and bug fixes. The exact scope is agreed upfront.' },
      { q: 'Can you maintain a website you didn’t build?', a: 'Usually yes. We start with a review to understand how it was built before agreeing on maintenance.' },
    ],
    related: [`${wd}/wordpress-development`, `${dm}/seo`, `${wd}/ui-ux-design`],
  },

  /* ───────────── Video Production ───────────── */
  {
    parent: 'video-production', slug: 'corporate-videos', featureId: 'corporate', name: 'Corporate Videos',
    seo: {
      title: 'Corporate Video Production in Coimbatore | EVM',
      description: 'Company profile films, corporate brand videos, team and workplace videos and event coverage, scripted, filmed and edited by Elite Vision Media in Coimbatore.',
      keywords: ['corporate video production Coimbatore', 'company profile video', 'corporate film', 'business video', 'event coverage'],
    },
    hero: {
      kicker: 'Corporate Videos',
      title: 'Corporate films that present your business with confidence.',
      subtitle: 'Company profiles, team stories and event coverage, planned, filmed and edited by our own crew.',
      media: { photo: '/videos/reels/showreel.webp', alt: 'Frame from the EVM showreel' },
    },
    overview: {
      title: 'Show who you are, not just what you sell.',
      what: 'Corporate videos present your company, people, facilities and values, for use on your website, in presentations, at events and in recruitment.',
      why: 'Video explains your business faster than pages of text, and lets clients, partners and candidates see the people and standards behind the name.',
      how: 'EVM handles the full production: concept and script, shoot planning, filming with professional equipment, interviews, editing, colour and sound.',
    },
    offers: [
      { icon: Building2, title: 'Company profile videos', text: 'An overview of your business, capabilities and values.' },
      { icon: Film, title: 'Corporate brand films', text: 'Story-led videos that express your brand positioning.' },
      { icon: Users, title: 'Team & workplace videos', text: 'Your people and culture, for recruitment and trust.' },
      { icon: Mic, title: 'Interviews & testimonials', text: 'Well-lit, clearly recorded interviews with leaders or clients.' },
      { icon: Camera, title: 'Event coverage', text: 'Conferences, launches and corporate events filmed and edited.' },
      { icon: Scissors, title: 'Multiple cut-downs', text: 'Short versions for social media from the same shoot.' },
    ],
    process: [
      { icon: Lightbulb, title: 'Concept & script', text: 'We define the message, audience and story, then write the script.' },
      { icon: Calendar, title: 'Pre-production', text: 'Locations, schedule, interviewees and shot list are planned.' },
      { icon: Camera, title: 'Filming', text: 'Our crew films on location with professional camera, lighting and audio.' },
      { icon: Scissors, title: 'Edit & deliver', text: 'Editing, colour, sound and revisions, delivered in the formats you need.' },
    ],
    why: {
      text: 'From the script to the final grade, the whole production stays with one team.',
      points: ['In-house crew, equipment and editors', 'Planning that respects your team’s time on shoot day', 'Versions for website, presentations and social', 'Clear revision rounds agreed upfront'],
    },
    showcase: {
      title: 'Filmed and edited by EVM.',
      sub: 'Frames from EVM video work.',
      items: [
        { photo: '/videos/reels/showreel.webp', alt: 'Frame from the EVM showreel' },
        { photo: '/videos/reels/edm-bar-06.webp', alt: 'Frame from a cinematic bar video shot by EVM', vertical: true },
      ],
    },
    faqs: [
      { q: 'How long should a corporate video be?', a: 'Most company profiles work best at one to three minutes. We also cut shorter versions for social media.' },
      { q: 'Do you write the script?', a: 'Yes. We develop the concept and script with you, and you approve it before filming.' },
      { q: 'Can you film at our office or factory?', a: 'Yes. We regularly film on location and plan the shoot to minimise disruption to your work.' },
      { q: 'How long does production take?', a: 'It depends on the scope and number of shoot days. We share a timeline after the planning stage.' },
    ],
    related: [`${vp}/brand-films`, `${vp}/video-editing-post-production`, `${wd}/business-website-development`],
  },
  {
    parent: 'video-production', slug: 'promotional-videos', featureId: 'promotional', name: 'Promotional Videos',
    seo: {
      title: 'Promotional Video Production in Coimbatore | EVM',
      description: 'Product and service promos, advertisement videos and campaign content designed to drive action, produced by Elite Vision Media in Coimbatore.',
      keywords: ['promotional video production Coimbatore', 'product video', 'advertisement video', 'ad film', 'campaign video'],
    },
    hero: {
      kicker: 'Promotional Videos',
      title: 'Promotional videos that make people act.',
      subtitle: 'Product, service and campaign videos with a clear message and a clear next step, made for ads, social media and your website.',
      media: { photo: '/images/work/product/product-12.webp', alt: 'Styled product shot of a milk chocolate pack by EVM', vertical: true },
    },
    overview: {
      title: 'Short, sharp and built for a goal.',
      what: 'Promotional videos highlight a specific product, service, offer or campaign, usually in a short format designed for ads and social feeds.',
      why: 'Video stops the scroll and shows benefits in seconds. A well-made promo lifts ad performance and makes launches feel professional.',
      how: 'EVM plans the hook and message, styles and shoots the product or service, and edits multiple versions sized for each platform you advertise on.',
    },
    offers: [
      { icon: Package, title: 'Product promos', text: 'Your product shown in its best light, with styling and lighting.' },
      { icon: Megaphone, title: 'Service promos', text: 'Clear videos that explain what you offer and why it matters.' },
      { icon: Target, title: 'Ad videos', text: 'Hooks in the first seconds and a strong call to action.' },
      { icon: Rocket, title: 'Launch & campaign content', text: 'Teasers and launch videos for new products and offers.' },
      { icon: Smartphone, title: 'Platform versions', text: 'Vertical, square and widescreen cuts from one shoot.' },
      { icon: Type, title: 'Text & captions', text: 'On-screen text designed for sound-off viewing.' },
    ],
    process: [
      { icon: Target, title: 'Goal & hook', text: 'We agree the audience, message and the first three seconds.' },
      { icon: PenTool, title: 'Storyboard', text: 'Shots and on-screen text are planned and approved.' },
      { icon: Camera, title: 'Shoot', text: 'Products or services are styled and filmed in studio or on location.' },
      { icon: Scissors, title: 'Edit versions', text: 'Cuts are delivered for each platform and ad placement.' },
    ],
    why: {
      text: 'Our video team works with our ads team, so promos are made to perform.',
      points: ['Hooks planned for social and ad placements', 'Product styling and photography in-house', 'Multiple aspect ratios from one shoot', 'Creative that can be tested and iterated'],
    },
    showcase: {
      title: 'Products, styled and shot by EVM.',
      sub: 'Real product shoot work from our portfolio.',
      items: [
        { photo: '/images/work/product/product-10.webp', alt: 'Dark chocolate hazelnut pack photographed by EVM', vertical: true },
        { photo: '/images/work/product/product-12.webp', alt: 'Milk chocolate fruit and nut pack photographed by EVM', vertical: true },
        { photo: '/videos/reels/crumbor-r04.webp', alt: 'Frame from a bakery promotional reel by EVM', vertical: true },
      ],
    },
    faqs: [
      { q: 'How long should a promotional video be?', a: 'For ads and social media, 15 to 30 seconds is common. Longer versions can work on your website or YouTube.' },
      { q: 'Can you make different versions for Instagram and YouTube?', a: 'Yes. We plan the shoot so we can deliver vertical, square and widescreen versions.' },
      { q: 'Do you shoot in a studio?', a: 'We can shoot products in a studio setup or film on location, depending on what suits the product and story.' },
      { q: 'Can you run ads with the video too?', a: 'Yes. Our Meta Ads team can run and optimise campaigns using the videos we produce.' },
    ],
    related: [`${dm}/meta-ads`, `${vp}/reels-short-form-videos`, `${wd}/ecommerce-development`],
  },
  {
    parent: 'video-production', slug: 'brand-films', featureId: 'brand-films', name: 'Brand Films',
    seo: {
      title: 'Brand Film Production in Coimbatore | Cinematic Storytelling | EVM',
      description: 'Cinematic brand films, company journey videos and brand identity films that tell your story with creative direction, produced by Elite Vision Media.',
      keywords: ['brand film production', 'brand storytelling video', 'cinematic brand video', 'brand identity film', 'Coimbatore video production'],
    },
    hero: {
      kicker: 'Brand Films',
      title: 'Cinematic stories that people remember.',
      subtitle: 'Brand films with creative direction, considered visuals and a story worth telling.',
      media: { photo: '/images/work/model/model-02.webp', alt: 'Cinematic fashion portrait photographed by EVM', vertical: true },
    },
    overview: {
      title: 'Emotion builds brands.',
      what: 'A brand film tells the story behind your business: why it exists, what it believes and the experience it creates, rather than listing features.',
      why: 'People remember stories far longer than specifications. A brand film gives your audience a reason to feel something about your name.',
      how: 'EVM develops the creative concept, directs the shoot with attention to light, styling and performance, and finishes the film with careful colour, music and sound.',
    },
    offers: [
      { icon: Film, title: 'Brand storytelling films', text: 'Narrative films that capture your purpose and personality.' },
      { icon: Compass, title: 'Company journey videos', text: 'Where you started, where you are and where you are going.' },
      { icon: Sparkles, title: 'Brand identity films', text: 'Mood-led visuals that express your look and feel.' },
      { icon: Lightbulb, title: 'Creative direction', text: 'Concept, art direction, styling and casting guidance.' },
      { icon: Palette, title: 'Cinematic colour grading', text: 'A considered colour look that fits your brand.' },
      { icon: Music, title: 'Music & sound design', text: 'Licensed music and sound that carry the emotion.' },
    ],
    process: [
      { icon: Lightbulb, title: 'Creative concept', text: 'We explore your story and propose concepts and mood boards.' },
      { icon: PenTool, title: 'Script & plan', text: 'Script, shot list, locations, styling and cast are finalised.' },
      { icon: Clapperboard, title: 'Direct & film', text: 'The shoot is directed for performance, light and detail.' },
      { icon: Palette, title: 'Finish', text: 'Edit, grade, music and sound bring the film together.' },
    ],
    why: {
      text: 'Our photography and film teams bring a strong visual eye to every frame.',
      points: ['Concepts developed with you, not off the shelf', 'Styling and lighting from experienced photographers', 'Careful colour and sound finishing', 'Stills can be captured alongside the film'],
    },
    showcase: {
      title: 'Our visual style.',
      sub: 'Photography and film frames by EVM.',
      items: [
        { photo: '/images/work/model/model-02.webp', alt: 'Fashion portrait with dramatic lighting by EVM', vertical: true },
        { photo: '/images/work/product/product-11.webp', alt: 'Editorial fashion shot for a leggings brand by EVM', vertical: true },
        { photo: '/videos/reels/happy-ending.webp', alt: 'Frame from a lifestyle brand film by EVM', vertical: true },
      ],
    },
    faqs: [
      { q: 'How is a brand film different from a corporate video?', a: 'A corporate video explains your company and services. A brand film focuses on story and emotion to shape how people feel about your brand.' },
      { q: 'Do you provide actors and models?', a: 'We can help with casting and coordinate talent based on the concept and budget.' },
      { q: 'Can you capture photos during the shoot?', a: 'Yes. Stills can be planned alongside filming so you get matching visuals for campaigns.' },
      { q: 'How long does a brand film take?', a: 'Brand films usually need more pre-production than other videos. We share a timeline after the concept stage.' },
    ],
    related: [`${vp}/corporate-videos`, `${vp}/video-editing-post-production`, `${dm}/social-media-marketing`],
  },
  {
    parent: 'video-production', slug: 'explainer-videos', featureId: 'explainer', name: 'Explainer Videos',
    seo: {
      title: 'Explainer Video Production in Coimbatore | EVM',
      description: 'Product, service and process explainer videos, live action or animated, that make complex ideas simple. Produced by Elite Vision Media, Coimbatore.',
      keywords: ['explainer video production', 'animated explainer video', 'product explainer', 'educational video', 'Coimbatore explainer videos'],
    },
    hero: {
      kicker: 'Explainer Videos',
      title: 'Make complex ideas easy to understand.',
      subtitle: 'Clear scripts and simple visuals that explain your product, service or process in a couple of minutes.',
      media: { kind: 'storyboard' },
    },
    overview: {
      title: 'Clarity sells.',
      what: 'Explainer videos break down how a product works, what a service includes or how a process runs, using narration with live action, screen recordings or animation.',
      why: 'If people don’t understand your offer quickly, they move on. A short explainer answers the same questions your sales team hears every day.',
      how: 'EVM starts with the script, because clarity comes from words first, then plans visuals scene by scene and produces the video in the style that suits your message.',
    },
    offers: [
      { icon: Package, title: 'Product explainers', text: 'How your product works and the problem it solves.' },
      { icon: Megaphone, title: 'Service explainers', text: 'What clients get, step by step.' },
      { icon: Sparkles, title: 'Animated explainers', text: 'Illustrated and motion-graphic explainers for abstract ideas.' },
      { icon: Lightbulb, title: 'Educational videos', text: 'Training and knowledge videos for customers or teams.' },
      { icon: Repeat, title: 'Process explanations', text: 'Workflows and procedures shown clearly.' },
      { icon: Mic, title: 'Voice-over & subtitles', text: 'Professional narration and captions.' },
    ],
    process: [
      { icon: PenTool, title: 'Script', text: 'We turn your key message into a short, plain-language script.' },
      { icon: Layout, title: 'Storyboard', text: 'Each scene is sketched so you see the video before production.' },
      { icon: Clapperboard, title: 'Produce', text: 'Filming, screen capture or animation plus voice-over.' },
      { icon: Scissors, title: 'Polish', text: 'Edit, music, captions and revisions.' },
    ],
    why: {
      text: 'We focus on the message first, then choose the visual style that serves it.',
      points: ['Scripts written in plain language', 'Storyboards approved before production', 'Live action or animation, whichever explains better', 'Captions for sound-off viewing'],
    },
    showcase: {
      title: 'Planned scene by scene.',
      sub: 'Illustrative storyboard and animation views.',
      items: [{ kind: 'storyboard' }, { kind: 'motion' }],
    },
    faqs: [
      { q: 'Should my explainer be animated or live action?', a: 'Animation works well for abstract ideas and software; live action builds trust when showing real people, products or places. We recommend based on your message.' },
      { q: 'How long should an explainer be?', a: 'Usually 60 to 120 seconds. Shorter is better if the message can be kept clear.' },
      { q: 'Do you provide the voice-over?', a: 'Yes. We arrange professional voice-over talent and can discuss language options.' },
      { q: 'Can we use the explainer on our website and in sales meetings?', a: 'Yes. We deliver formats suitable for websites, presentations and social media.' },
    ],
    related: [`${vp}/motion-graphics-animation`, `${dm}/content-marketing`, `${vp}/corporate-videos`],
  },
  {
    parent: 'video-production', slug: 'reels-short-form-videos', featureId: 'reels', name: 'Reels & Short-form Videos',
    seo: {
      title: 'Instagram Reels & Short-form Video Production in Coimbatore | EVM',
      description: 'Instagram Reels, YouTube Shorts and short social videos, shot vertically and edited for engagement by Elite Vision Media in Coimbatore.',
      keywords: ['Instagram reels production Coimbatore', 'short-form video', 'YouTube Shorts', 'social media videos', 'reels editing'],
    },
    hero: {
      kicker: 'Reels & Short-form',
      title: 'Short videos made for the scroll.',
      subtitle: 'Vertical Reels and Shorts with strong hooks, fast pacing and on-trend editing, shot and cut by our team.',
      media: { photo: '/videos/reels/reel-29.webp', alt: 'Frame from a fashion reel produced by EVM', vertical: true },
    },
    overview: {
      title: 'Where attention lives today.',
      what: 'Short-form videos are vertical clips, usually under a minute, made for Instagram Reels, YouTube Shorts and similar feeds.',
      why: 'Short video gets the most reach on social platforms today. Regular, well-made reels keep your brand visible and introduce you to new audiences.',
      how: 'EVM plans hooks and concepts, shoots vertically with proper lighting and audio, and edits with captions, music and pacing built for each platform.',
    },
    offers: [
      { icon: Smartphone, title: 'Instagram Reels', text: 'Vertical videos designed for Reels reach and engagement.' },
      { icon: Video, title: 'YouTube Shorts', text: 'Short videos formatted for the Shorts feed.' },
      { icon: Lightbulb, title: 'Concepts & hooks', text: 'Ideas and opening seconds planned to stop the scroll.' },
      { icon: Camera, title: 'Vertical shoots', text: 'Shot natively in 9:16 with proper light and sound.' },
      { icon: Type, title: 'Captions & text', text: 'On-screen text and subtitles for sound-off viewing.' },
      { icon: Users, title: 'Behind-the-scenes', text: 'Authentic content showing your people and process.' },
    ],
    process: [
      { icon: Lightbulb, title: 'Ideas', text: 'We pitch concepts and hooks that suit your brand.' },
      { icon: Calendar, title: 'Batch plan', text: 'Several reels are planned for one efficient shoot day.' },
      { icon: Camera, title: 'Shoot', text: 'Filmed vertically with lighting, audio and direction.' },
      { icon: Scissors, title: 'Edit & post', text: 'Fast-paced edits with captions and music, ready to publish.' },
    ],
    why: {
      text: 'Reels are a big part of what our team shoots every week.',
      points: ['Shot natively vertical, not cropped from widescreen', 'Batch shoots for consistent monthly content', 'Editing styles matched to your brand', 'Can be combined with social media management'],
    },
    showcase: {
      title: 'Reels shot and edited by EVM.',
      sub: 'Frames from real EVM reels. Watch them in Our Work → Reels.',
      items: [
        { photo: '/videos/reels/reel-29.webp', alt: 'Frame from a fashion reel by EVM', vertical: true },
        { photo: '/videos/reels/crumbor-r04.webp', alt: 'Frame from a bakery reel by EVM', vertical: true },
        { photo: '/videos/reels/edm-bar-06.webp', alt: 'Frame from a bar and drinks reel by EVM', vertical: true },
        { photo: '/videos/reels/happy-ending.webp', alt: 'Frame from a lifestyle brand reel by EVM', vertical: true },
      ],
    },
    faqs: [
      { q: 'How many reels can you shoot in one day?', a: 'It depends on the concepts and locations. Batch shoots let us capture several reels in one session; we plan the number during pre-production.' },
      { q: 'Do you post the reels for us?', a: 'We can, as part of our social media marketing service, or deliver ready-to-post files to your team.' },
      { q: 'Can you edit footage we shot on a phone?', a: 'Yes. Our editors can work with your footage and advise on how to shoot for better results.' },
      { q: 'Do you use trending audio?', a: 'For business accounts we use music that is licensed or available for commercial use on the platform, to avoid takedowns.' },
    ],
    related: [`${dm}/social-media-marketing`, `${vp}/promotional-videos`, `${vp}/video-editing-post-production`],
  },
  {
    parent: 'video-production', slug: 'motion-graphics-animation', featureId: 'motion', name: 'Motion Graphics & Animation',
    seo: {
      title: 'Motion Graphics & Animation Services in Coimbatore | EVM',
      description: 'Motion graphics, animated titles, logo animations, 2D animated videos and infographic videos that communicate ideas visually. By Elite Vision Media, Coimbatore.',
      keywords: ['motion graphics Coimbatore', 'logo animation', '2D animation', 'infographic video', 'animated titles'],
    },
    hero: {
      kicker: 'Motion Graphics & Animation',
      title: 'Ideas that move.',
      subtitle: 'Logo animations, animated titles, infographics and 2D videos that make information clear and memorable.',
      media: { kind: 'motion' },
    },
    overview: {
      title: 'Show what cameras can’t.',
      what: 'Motion graphics animate text, shapes, icons and illustrations to explain ideas, present data or add polish to video content.',
      why: 'Some messages, such as data, processes and abstract services, are hard to film. Animation makes them simple to follow and consistent with your brand.',
      how: 'EVM designs styleframes in your brand language first, then animates them with timing and sound that keep viewers watching.',
    },
    offers: [
      { icon: Sparkles, title: 'Motion graphics', text: 'Animated shapes, icons and text for videos and social.' },
      { icon: Type, title: 'Animated titles', text: 'Title sequences, lower thirds and kinetic typography.' },
      { icon: Zap, title: 'Logo animations', text: 'Short animated logo reveals for videos and presentations.' },
      { icon: Film, title: '2D animated videos', text: 'Illustrated, character or object-based animation.' },
      { icon: BarChart3, title: 'Infographic videos', text: 'Data and statistics brought to life with clear visuals.' },
      { icon: Layers, title: 'Video graphics packages', text: 'Reusable graphic templates for your ongoing content.' },
    ],
    process: [
      { icon: PenTool, title: 'Script & style', text: 'The message is scripted and the visual style agreed.' },
      { icon: Palette, title: 'Styleframes', text: 'Key frames are designed so you see the look before animation.' },
      { icon: Sparkles, title: 'Animate', text: 'Frames are animated with timing that matches the voice and music.' },
      { icon: Music, title: 'Sound & deliver', text: 'Sound design and music are added and files delivered.' },
    ],
    why: {
      text: 'Our designers and animators share one brand language with the rest of your content.',
      points: ['Styleframes approved before animation starts', 'Brand colours and fonts used consistently', 'Graphics that can be reused across videos', 'Combined easily with filmed footage'],
    },
    showcase: {
      title: 'Designed, then animated.',
      sub: 'Illustrative styleframes and animation timelines.',
      items: [{ kind: 'motion' }, { kind: 'storyboard' }],
    },
    faqs: [
      { q: 'What is the difference between motion graphics and animation?', a: 'Motion graphics usually animate text, shapes and icons; character or illustrated animation tells a story with drawn scenes. Many projects mix both.' },
      { q: 'Can you animate our existing logo?', a: 'Yes. We work from your logo files to create a short animated reveal.' },
      { q: 'Do you do 3D animation?', a: 'Our focus is 2D motion graphics and animation. Ask us about your project and we will advise on the best approach.' },
      { q: 'What files will I receive?', a: 'Final videos in the formats you need, and on request transparent versions for use in other edits.' },
    ],
    related: [`${vp}/explainer-videos`, `${vp}/video-editing-post-production`, `${vp}/promotional-videos`],
  },
  {
    parent: 'video-production', slug: 'video-editing-post-production', featureId: 'editing', name: 'Video Editing & Post-production',
    seo: {
      title: 'Video Editing & Post-production Services in Coimbatore | EVM',
      description: 'Professional video editing, colour grading, sound editing, transitions, titles and subtitles that turn raw footage into polished videos. Elite Vision Media.',
      keywords: ['video editing services Coimbatore', 'post-production', 'colour grading', 'sound editing', 'subtitles'],
    },
    hero: {
      kicker: 'Editing & Post-production',
      title: 'Raw footage, turned into a finished film.',
      subtitle: 'Editing, colour, sound, titles and subtitles that bring polish and pace to your video.',
      media: { kind: 'timeline' },
    },
    overview: {
      title: 'The edit is where the story is made.',
      what: 'Post-production covers everything after filming: selecting and arranging shots, pacing, colour correction and grading, sound clean-up, music, graphics and captions.',
      why: 'Great footage can still feel amateur without a good edit. Professional post-production makes videos clearer, more engaging and consistent with your brand.',
      how: 'EVM’s editors review your footage, build a rough cut around the story, then refine pacing, colour and audio through agreed revision rounds.',
    },
    offers: [
      { icon: Scissors, title: 'Video editing', text: 'Story, pacing and structure built from your footage.' },
      { icon: Palette, title: 'Colour correction & grading', text: 'Consistent, cinematic colour across every shot.' },
      { icon: Mic, title: 'Sound editing', text: 'Clean dialogue, balanced levels and noise reduction.' },
      { icon: Music, title: 'Music & sound design', text: 'Licensed tracks and effects that lift the edit.' },
      { icon: Sparkles, title: 'Transitions & effects', text: 'Purposeful transitions and visual effects.' },
      { icon: Type, title: 'Titles & subtitles', text: 'Branded titles, lower thirds and accurate subtitles.' },
    ],
    process: [
      { icon: FileSearch, title: 'Review footage', text: 'We go through your footage and brief to understand the story.' },
      { icon: Scissors, title: 'Rough cut', text: 'A first edit establishes structure and pacing for your feedback.' },
      { icon: Palette, title: 'Fine cut & finish', text: 'Colour, sound, graphics and captions are added.' },
      { icon: Rocket, title: 'Deliver', text: 'Final files are exported for every platform you need.' },
    ],
    why: {
      text: 'Our editors work on our own productions every week, so they know how to shape a story.',
      points: ['Clear revision rounds agreed upfront', 'Colour and sound finished, not left raw', 'Exports for web, social and presentation', 'Footage from any camera or phone welcomed'],
    },
    showcase: {
      title: 'Edited and graded by EVM.',
      sub: 'Frames from finished EVM edits, alongside an illustrative timeline.',
      items: [
        { kind: 'timeline' },
        { photo: '/videos/reels/edm-bar-06.webp', alt: 'Colour-graded frame from a bar video edited by EVM', vertical: true },
        { photo: '/videos/reels/happy-ending.webp', alt: 'Frame from a lifestyle reel edited by EVM', vertical: true },
      ],
    },
    faqs: [
      { q: 'Can you edit footage that we filmed ourselves?', a: 'Yes. Share your footage and brief, and we will advise on what is possible with the material.' },
      { q: 'How many revisions are included?', a: 'Revision rounds are agreed upfront in the proposal, typically after the rough cut and fine cut.' },
      { q: 'How do I send large video files?', a: 'We can share a cloud upload link, or collect drives for larger projects.' },
      { q: 'Do you add subtitles in other languages?', a: 'Tell us the languages you need and we will confirm what we can provide for your project.' },
    ],
    related: [`${vp}/corporate-videos`, `${vp}/reels-short-form-videos`, `${vp}/motion-graphics-animation`],
  },
];

export const detailPath = (d: ServiceDetail) => `${parentInfo[d.parent].path}/${d.slug}`;
export const detailsFor = (parent: string) => serviceDetails.filter((d) => d.parent === parent);
export const detailByPath = (path: string) => serviceDetails.find((d) => detailPath(d) === path);
export const detailByFeature = (featureId: string) => serviceDetails.find((d) => d.featureId === featureId);
