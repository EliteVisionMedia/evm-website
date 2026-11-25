/**
 * Single source of truth for EVM content.
 * Replace SAMPLE entries here as real projects, client logos, testimonials and verified stats arrive.
 */
import type {
  ClientLogo,
  NavLink,
  ProcessStep,
  Project,
  Service,
  SocialLink,
  Stat,
  Testimonial,
} from '../types';

export const contact = {
  email: 'media.evm@gmail.com',
  phoneDisplay: '+91 81224 37026',
  phoneHref: 'tel:+918122437026',
  whatsapp: 'https://wa.me/918122437026',
  whatsappWithText: (text: string) => `https://wa.me/918122437026?text=${encodeURIComponent(text)}`,
  maps: 'https://maps.app.goo.gl/M8BfZ2m169eYCeGAA',
  address: '1st Floor, 13, Diwan Bahadur Rd, above Bullet Miami, R.S. Puram, Coimbatore, Tamil Nadu 641002, India',
  addressShort: 'R.S. Puram, Coimbatore',
};

export const socials: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/elite_vision_media/', icon: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@EliteVisionMedia/', icon: 'youtube' },
  { label: 'Facebook', href: 'https://www.facebook.com/people/Mediaevm/61579103185868/', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/elite-vision-media/', icon: 'linkedin' },
];

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Process', to: '/#process' },
  { label: 'Industries', to: '/industries' },
  { label: 'Our Work', to: '/work' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const services: Service[] = [
  {
    id: 'digital-marketing',
    number: '01',
    eyebrow: 'Marketing Service',
    title: 'Digital Marketing',
    description:
      'Performance campaigns on Meta and social content calendars and SEO, measured against leads rather than likes.',
    tags: ['Social Media', 'Paid Ads', 'SEO', 'Analytics'],
    visual: "url('/images/services/digital-marketing.webp') center / cover no-repeat, #11131c",
    visualBadge: '',
  },
 {
    id: 'web-design-development',
    number: '02',
    eyebrow: 'Design & Build Service',
    title: 'Web Design & Development',
    description:
      'High-performance custom websites, full-stack web applications, and API-driven platforms engineered for speed and conversion.',
    tags: ['React & TypeScript', 'Full-Stack Web Apps', 'REST APIs & CMS', 'SEO & Speed Tuning'],
    visual:
      'linear-gradient(180deg, transparent 55%, rgba(12,13,17,.35)), radial-gradient(60% 70% at 30% 30%, #6fd3d4, transparent 60%), linear-gradient(135deg, #dff3f3, #9fd8d9)',
    visualBadge: 'Website build · SAMPLE',
  },
  {
    id: 'video-production',
    number: '03',
    eyebrow: 'Production Service',
    title: 'Video Production',
    description: 'Brand films, ads, reels and product shoots, from script and shoot through edit and colour.',
    tags: ['Brand Films', 'Ads & Reels', 'Product Shoots', 'Post-production'],
    visual: "url('/images/services/video-production.jpg') 58% center / cover no-repeat, #07070a",
    visualBadge: '',
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand client requirements, business goals and target audience.',
    detail: 'Workshops, competitor review and audience research before a single idea is pitched.',
    theme: 'coal',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Plan the creative direction, technology and execution strategy.',
    detail: 'Channels, content pillars, site architecture and shoot plans signed off in one roadmap.',
    theme: 'mist',
  },
  {
    number: '03',
    title: 'Create',
    description: 'Design, develop and produce the required digital experience.',
    detail: 'Design, code, shoot and edit in-house, with review rounds at every milestone.',
    theme: 'teal-soft',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Launch, optimize and support the final project.',
    detail: 'We go live, watch the numbers and keep tuning what underperforms.',
    theme: 'teal',
  },
];

export const projectCategories = ['All', 'Digital Marketing', 'Website Development', 'Video Production'] as const;

export const projects: Project[] = [
  {
    id: 'sample-brand-film',
    title: 'Brand film · Sample project',
    category: 'Video Production',
    description: 'Placeholder. A real EVM video project goes here: title, client and a short description.',
    sample: true,
    visual: 'film',
    featured: true,
  },
  {
    id: 'sample-website',
    title: 'Website · Sample project',
    category: 'Website Development',
    description: 'Placeholder for an EVM website project.',
    sample: true,
    visual: 'web',
  },
  {
    id: 'sample-campaign',
    title: 'Campaign · Sample project',
    category: 'Digital Marketing',
    description: 'Placeholder for an EVM marketing campaign.',
    sample: true,
    visual: 'campaign',
  },
];

/** Add `logo: '/clients/name.svg'` to each entry when real logos are approved for use. */
export const clients: ClientLogo[] = Array.from({ length: 6 }, (_, i) => ({ name: `Client ${i + 1}` }));

export const testimonials: Testimonial[] = [
  {
    quote: 'A real client quote goes here. This large card is for the strongest one.',
    name: 'Client Name',
    company: 'Role, Company',
    sample: true,
  },
  { quote: 'A real client quote goes here once permission is given.', name: 'Client Name', company: 'Role, Company', sample: true },
  { quote: 'A real client quote goes here once permission is given.', name: 'Client Name', company: 'Role, Company', sample: true },
];

/**
 * Verified statistics only. Leave empty until EVM confirms real figures;
 * the section then shows a placeholder. Example entry:
 *   { value: 120, suffix: '+', label: 'Projects delivered' }
 */
export const stats: Stat[] = [];
