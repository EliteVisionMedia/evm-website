import { Building2, Film, Lightbulb, Megaphone, Scissors, Smartphone, Sparkles } from 'lucide-react';
import type { Feature } from './digitalMarketing';

/** Copy for /services/video-production, supplied by EVM. */

export const vpSeo = {
  title: 'Video Production Company in Coimbatore | EVM',
  description: 'Create engaging corporate, promotional and brand videos with Elite Vision Media, a creative video production company in Coimbatore.',
  path: '/services/video-production',
};

export const vpHero = {
  kicker: 'Video Production',
  title: 'Stories that bring your brand to life.',
  subtitle: 'From creative concepts to the final frame, we produce engaging videos that communicate your message, showcase your brand and connect with your audience.',
};

export const vpOverview = {
  kicker: 'Overview',
  title: 'Video content that makes your brand memorable.',
  paragraphs: [
    'A powerful video can communicate what words and images alone cannot. It helps businesses showcase their products, explain their services and create meaningful connections with their audiences.',
    'At Elite Vision Media, we bring creativity, planning and production together to create videos that align with your brand and communication goals.',
    'From corporate films and promotional videos to social media content, we help transform ideas into engaging visual stories.',
  ],
};

export const vpFeatures: Feature[] = [
  { id: 'corporate', icon: Building2, title: 'Corporate Videos', text: 'Present your company, people, services and business story through professional corporate video content.', listTitle: 'What we create', items: ['Company profile videos', 'Corporate brand videos', 'Team and workplace videos', 'Business introduction videos', 'Corporate event coverage'] },
  { id: 'promotional', icon: Megaphone, title: 'Promotional Videos', text: 'Showcase your products, services and campaigns through engaging promotional content.', listTitle: 'What we create', items: ['Product promotional videos', 'Service promotional videos', 'Brand campaign videos', 'Advertisement videos', 'Marketing campaign content'] },
  { id: 'brand-films', icon: Film, title: 'Brand Films', text: "Tell your brand's story through cinematic visuals, creative direction and meaningful storytelling.", listTitle: 'What we create', items: ['Brand storytelling videos', 'Company journey videos', 'Brand identity films', 'Creative campaign films', 'Visual brand presentations'] },
  { id: 'explainer', icon: Lightbulb, title: 'Explainer Videos', text: 'Make complex ideas, products and services easier to understand through clear and engaging videos.', listTitle: 'What we create', items: ['Product explainer videos', 'Service explainer videos', 'Animated explainers', 'Educational videos', 'Process explanation videos'] },
  { id: 'reels', icon: Smartphone, title: 'Reels & Short-form Videos', text: 'Create short, engaging video content designed for social media platforms and digital campaigns.', listTitle: 'What we create', items: ['Instagram Reels', 'YouTube Shorts', 'Social media videos', 'Behind-the-scenes content', 'Short promotional videos'] },
  { id: 'motion', icon: Sparkles, title: 'Motion Graphics & Animation', text: 'Communicate ideas through animated visuals, motion design and engaging graphic elements.', listTitle: 'What we create', items: ['Motion graphics', 'Animated titles', 'Logo animations', '2D animated videos', 'Infographic videos'] },
  { id: 'editing', icon: Scissors, title: 'Video Editing & Post-production', text: 'Turn raw footage into polished videos through editing, sound, colour and visual enhancements.', listTitle: "What's included", items: ['Video editing', 'Colour correction and grading', 'Sound editing', 'Transitions and visual effects', 'Titles and subtitles'] },
];

export const vpProcess = {
  title: 'Our video production process.',
  sub: 'Every great video begins with a clear idea and a well-planned process.',
  steps: [
    { title: 'Pre-production', text: 'We understand your objectives, audience and message, then prepare the creative direction, script, storyboard and shoot plan.' },
    { title: 'Production', text: 'We bring the concept to life through filming, camera work, lighting, direction and planned visual storytelling.' },
    { title: 'Post-production', text: 'We refine the footage through editing, colour grading, sound design, motion graphics and other finishing touches.' },
    { title: 'Review & Delivery', text: 'We review the final output, incorporate agreed feedback and prepare the video in the required formats.' },
  ],
};

export const vpMore = {
  title: 'More than just video production.',
  sub: 'We focus on creating video content with a clear purpose.',
  items: [
    { title: 'Creative Direction', text: 'Develop visual ideas that fit your brand.' },
    { title: 'Purposeful Storytelling', text: 'Communicate your message in an engaging way.' },
    { title: 'Visual Quality', text: 'Pay attention to framing, lighting, editing and detail.' },
    { title: 'Platform-ready Content', text: 'Prepare videos for the intended platforms and formats.' },
    { title: 'Consistent Brand Identity', text: "Keep your brand's tone and visual identity consistent." },
    { title: 'End-to-end Workflow', text: 'Coordinate planning, production and post-production.' },
  ],
};

export const vpFaqs = [
  { q: 'What types of videos does EVM produce?', a: 'We offer corporate videos, promotional videos, brand films, explainer videos, social media reels, motion graphics and video editing services.' },
  { q: 'Can you create videos for social media?', a: 'Yes. We create short-form video content for platforms such as Instagram and YouTube, based on your content requirements.' },
  { q: 'Do you help with scripting and concepts?', a: 'Yes. We can discuss your objectives and assist with creative concepts, scripts and storyboarding as part of the production process.' },
  { q: 'Can you edit footage that we already have?', a: 'Yes. We can discuss editing and post-production requirements for existing footage.' },
  { q: 'How long does video production take?', a: 'The timeline depends on the video type, length, production requirements and editing complexity. We discuss the schedule during planning.' },
  { q: 'Can videos be delivered in different formats?', a: 'Yes. Delivery formats and aspect ratios can be planned according to the platforms and intended use.' },
];

export const vpCta = {
  title: "Have an idea worth showing? Let's bring it to life.",
  text: 'Whether you need a corporate film, promotional video or social media content, EVM is ready to discuss your next video project.',
};

