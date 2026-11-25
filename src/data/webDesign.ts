import { Code2, FileSearch, LayoutTemplate, Palette, PenTool, Rocket, ShoppingCart, TestTube2, Wrench, LayoutGrid } from 'lucide-react';
import type { Feature, Step } from './digitalMarketing';

/** Copy for /services/web-design-development, supplied by EVM. */

export const wdSeo = {
  title: 'Website Design & Development Company in Coimbatore | EVM',
  description: 'Elite Vision Media offers website design and development in Coimbatore, including custom websites, WordPress, e-commerce and UI/UX solutions.',
  path: '/services/web-design-development',
};

export const wdHero = {
  kicker: 'Web Design & Development',
  title: 'Websites designed to make your business stand out.',
  subtitle: 'We design and develop modern, responsive websites that bring your brand to life, create better user experiences and help your business build a stronger digital presence.',
};

export const wdOverview = {
  kicker: 'Overview',
  title: 'Website design that works for your business.',
  paragraphs: [
    'Your website is often the first interaction customers have with your business. It should do more than look attractive. It should communicate your value, build trust and make it easy for visitors to take action.',
    'At Elite Vision Media, we combine thoughtful design, user-focused experiences and reliable development to create websites aligned with your brand identity and business objectives.',
    'Whether you need a business website, an online store or a custom web application, we focus on creating digital experiences that are functional, responsive and easy to use.',
  ],
};

export const wdFeatures: Feature[] = [
  { id: 'custom-design', icon: Palette, title: 'Custom Website Design', text: 'Create a distinctive online presence with a website designed around your brand, audience and business goals.', listTitle: "What's included", items: ['Custom layouts and visual design', 'Brand-focused design systems', 'Responsive page layouts', 'Interactive UI elements', 'User-focused navigation'] },
  { id: 'business-websites', icon: LayoutTemplate, title: 'Business Website Development', text: 'Establish your business online with a professional website that clearly communicates your services and makes it easier for customers to connect with you.', listTitle: "What's included", items: ['Company and corporate websites', 'Service-based websites', 'Landing pages', 'Contact and enquiry forms', 'Mobile-friendly development'] },
  { id: 'wordpress', icon: Code2, title: 'WordPress Website Development', text: 'Build a manageable website using WordPress, with flexible content management and features suited to your business.', listTitle: "What's included", items: ['Custom WordPress websites', 'Theme customization', 'Plugin integration', 'Content management setup', 'WordPress website optimization'] },
  { id: 'ecommerce', icon: ShoppingCart, title: 'E-commerce Website Development', text: 'Take your business online with an e-commerce experience that makes browsing, shopping and purchasing simple.', listTitle: "What's included", items: ['Product catalogue design', 'Shopping cart functionality', 'Checkout integration', 'Payment gateway integration', 'Order management features'] },
  { id: 'ui-ux', icon: PenTool, title: 'UI/UX Design', text: 'Create intuitive digital experiences through thoughtful layouts, clear navigation and user-focused interface design.', listTitle: "What's included", items: ['User research and planning', 'Wireframes and prototypes', 'User interface design', 'User experience improvements', 'Website usability optimization'] },
  { id: 'redesign-maintenance', icon: Wrench, title: 'Website Redesign & Maintenance', text: 'Improve your existing website with a refreshed design, better usability and ongoing technical care.', listTitle: "What's included", items: ['Website redesign', 'Layout and visual improvements', 'Content updates', 'Bug fixes and maintenance', 'Performance and security updates'] },
];

export const wdPillars = {
  title: 'Good websites look good. Great websites work for your business.',
  sub: 'A professional website should combine strong visuals with a clear purpose.',
  items: [
    { title: 'Strong Content', text: 'Communicate your products and services clearly.' },
    { title: 'Modern Design', text: 'Create a polished experience that reflects your brand.' },
    { title: 'Better User Experience', text: 'Make information easy to find and navigate.' },
    { title: 'Business-Focused Functionality', text: 'Help visitors enquire, connect and take action.' },
    { title: 'Responsive Experience', text: 'Deliver a consistent experience across devices.' },
  ],
};

export const wdProcess = {
  kicker: 'Our process',
  title: 'Our website development process.',
  sub: 'A clear process from the first idea to the final launch.',
  steps: [
    { icon: FileSearch, title: 'Discovery & Planning', text: 'Understand your business, target audience, requirements and project goals.' },
    { icon: LayoutGrid, title: 'Wireframing & Structure', text: 'Plan the sitemap, page layouts, content structure and website functionality.' },
    { icon: PenTool, title: 'UI/UX Design', text: 'Develop the visual direction, interface and user experience.' },
    { icon: Code2, title: 'Development', text: 'Turn the approved designs into a responsive and functional website.' },
    { icon: TestTube2, title: 'Testing & Optimization', text: 'Check responsiveness, functionality, browser compatibility and performance.' },
    { icon: Rocket, title: 'Launch', text: 'Prepare the website for launch and provide the agreed handover.' },
  ] as Step[],
};

export const wdWhy = {
  title: 'Why choose EVM for website design?',
  points: [
    'Design and development aligned with your business goals.',
    'Customized solutions instead of one-size-fits-all templates.',
    'Responsive layouts for mobile, tablet and desktop.',
    'Focus on usability, functionality and performance.',
    'Clear communication throughout the project.',
    'A combination of design, development and creative thinking.',
  ],
};

export const wdFaqs = [
  { q: 'How much does website design cost?', a: 'Website costs depend on the number of pages, design requirements, functionality, integrations and overall project scope. Contact us to discuss your requirements and receive a suitable quotation.' },
  { q: 'How long does it take to develop a website?', a: "The timeline depends on the project's complexity, content availability, features and approval process. We define the expected timeline during project planning." },
  { q: 'Will my website work on mobile devices?', a: 'Yes. We design responsive websites that adapt to different screen sizes and devices.' },
  { q: 'Can you redesign my existing website?', a: 'Yes. We can review your existing website and discuss improvements to its design, usability, content and functionality.' },
  { q: 'Do you provide website maintenance?', a: 'Maintenance requirements can be discussed based on your website and the support you need.' },
  { q: 'Can you integrate payment gateways and enquiry forms?', a: 'Yes. We can discuss suitable payment, enquiry and third-party integrations according to your project requirements.' },
];

export const wdCta = {
  title: 'Your next website starts with a conversation.',
  text: "Let's create a website that represents your brand, connects with your audience and supports your business goals.",
};

