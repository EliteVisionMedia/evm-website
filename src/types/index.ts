export type ServiceCategory = 'Digital Marketing' | 'Website Development' | 'Video Production';

export interface NavLink {
  label: string;
  to: string;
}

export interface Service {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  /** CSS background for the art-directed placeholder visual. Swap for an image path later. */
  visual: string;
  visualBadge: string;
  /** Optional looping video (MP4) shown over `visual`; `visualPoster` is its still frame. */
  visualVideo?: string;
  visualPoster?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
  theme: 'coal' | 'mist' | 'teal-soft' | 'teal';
}

export interface Project {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  /** Set to false once a real EVM project replaces this entry. */
  sample: boolean;
  visual: 'film' | 'web' | 'campaign';
  featured?: boolean;
}

export interface ClientLogo {
  name: string;
  /** Path to the logo file. Leave undefined to render a SAMPLE slot. */
  logo?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  avatar?: string;
  sample: boolean;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'youtube' | 'facebook' | 'linkedin';
}
