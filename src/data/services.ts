/** The three service pages. Used by the navbar dropdown, the overview cards and routing. */
export interface ServicePage {
  slug: string;
  path: string;
  number: string;
  title: string;
  summary: string;
  /** CSS background for the card visual until real photography is added. */
  art: string;
}

export const servicePages: ServicePage[] = [
  {
    slug: 'digital-marketing',
    path: '/services/digital-marketing',
    number: '01',
    title: 'Digital Marketing',
    summary: 'Build your brand presence, reach the right audience and turn attention into meaningful engagement.',
    art: 'radial-gradient(60% 70% at 72% 28%, #1fb7b9 0%, transparent 62%), radial-gradient(50% 60% at 15% 85%, #017F82 0%, transparent 60%), linear-gradient(150deg, #0c0d11, #12313a)',
  },
  {
    slug: 'web-design-development',
    path: '/services/web-design-development',
    number: '02',
    title: 'Web Design & Development',
    summary: 'Create modern, responsive and user-friendly digital experiences that help your business grow.',
    art: 'radial-gradient(55% 60% at 30% 25%, #6fd3d4 0%, transparent 62%), linear-gradient(150deg, #dff3f3, #9fd8d9)',
  },
  {
    slug: 'video-production',
    path: '/services/video-production',
    number: '03',
    title: 'Video Production',
    summary: 'Bring your brand story to life through engaging visuals, promotional videos and creative storytelling.',
    art: 'radial-gradient(45% 55% at 50% 45%, #2f2f3a 0%, #07070a 100%)',
  },
];
