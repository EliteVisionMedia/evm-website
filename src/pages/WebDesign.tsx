import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ServiceSplitHero from '../components/services/ServiceSplitHero';
import ServiceOverview from '../components/services/ServiceOverview';
import ServiceFeatures from '../components/services/ServiceFeatures';
import ProcessSection from '../components/services/ProcessSection';
import ServiceFAQ from '../components/services/ServiceFAQ';
import ServiceCTA from '../components/services/ServiceCTA';
import WhyChooseGrid from '../components/services/WhyChooseGrid';
import RelatedServices from '../components/services/RelatedServices';
import CenteredHeading from '../components/CenteredHeading';
import useSeo, { breadcrumbSchema, faqSchema, serviceSchema } from '../lib/useSeo';
import { wdCta, wdFaqs, wdFeatures, wdHero, wdOverview, wdPillars, wdProcess, wdSeo, wdWhy } from '../data/webDesign';

const ease = [0.22, 1, 0.36, 1] as const;

/** Browser window chrome with any page mock inside. */
function Browser({ children, url = 'yourbusiness.in', className = '' }: { children: React.ReactNode; url?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[14px] bg-white shadow-[0_30px_60px_-25px_rgba(12,13,17,.45)] ring-1 ring-black/5 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-mist px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff6159]" /><span className="h-2 w-2 rounded-full bg-[#ffbd2e]" /><span className="h-2 w-2 rounded-full bg-[#28c941]" />
        <span className="ml-2 truncate rounded-full bg-paper px-3 py-0.5 text-[10px] font-medium text-slate">{url}</span>
      </div>
      {children}
    </div>
  );
}

/** Abstract page layouts (no real sites). */
const layouts = {
  business: (
    <div className="space-y-2 p-3">
      <div className="flex justify-between"><span className="h-2 w-10 rounded bg-ink" /><span className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-6 rounded bg-mist" />)}</span></div>
      <div className="grid grid-cols-[1.2fr_1fr] gap-2 pt-2">
        <div className="space-y-1.5 pt-2"><span className="block h-3 w-full rounded bg-ink" /><span className="block h-3 w-3/4 rounded bg-ink" /><span className="block h-1.5 w-5/6 rounded bg-mist" /><span className="block h-1.5 w-2/3 rounded bg-mist" /><span className="mt-2 block h-4 w-16 rounded-full bg-teal" /></div>
        <div className="aspect-square rounded-lg bg-[radial-gradient(60%_60%_at_60%_40%,#6fd3d4,#019A9D_60%,#017F82)]" />
      </div>
      <div className="grid grid-cols-3 gap-2 pt-1">{[0, 1, 2].map((i) => <span key={i} className="h-10 rounded-md bg-paper" />)}</div>
    </div>
  ),
  store: (
    <div className="space-y-2 p-3">
      <div className="flex justify-between"><span className="h-2 w-10 rounded bg-ink" /><span className="h-2 w-8 rounded bg-teal" /></div>
      <div className="h-12 rounded-lg bg-[linear-gradient(120deg,#0c0d11,#14303a)]" />
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-1"><span className={`block aspect-square rounded-md ${i % 2 ? 'bg-[#cfeaea]' : 'bg-mist'}`} /><span className="block h-1.5 w-3/4 rounded bg-mist" /><span className="block h-1.5 w-1/3 rounded bg-teal" /></div>
        ))}
      </div>
    </div>
  ),
  landing: (
    <div className="space-y-2 bg-ink p-3">
      <div className="flex justify-between"><span className="h-2 w-10 rounded bg-white" /><span className="h-2 w-8 rounded-full bg-teal" /></div>
      <div className="flex flex-col items-center gap-1.5 py-3"><span className="h-3 w-3/4 rounded bg-white" /><span className="h-3 w-1/2 rounded bg-white" /><span className="h-1.5 w-2/3 rounded bg-white/30" /><span className="mt-1 h-4 w-16 rounded-full bg-teal" /></div>
      <div className="grid grid-cols-2 gap-2">{[0, 1].map((i) => <span key={i} className="h-12 rounded-md bg-white/10" />)}</div>
    </div>
  ),
};

function HeroVisual() {
  return (
    <div role="img" aria-label="Illustration of a responsive business website shown in a desktop browser and on a phone" className="relative aspect-[1.05] overflow-hidden rounded-[28px] bg-[#dff3f3] md:aspect-[1.2]">
      <div aria-hidden className="absolute inset-0 [background:radial-gradient(55%_55%_at_80%_20%,#6fd3d4,transparent_65%),radial-gradient(45%_45%_at_10%_90%,rgba(1,154,157,.35),transparent_60%)]" />
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5, ease }} className="absolute left-[7%] right-[14%] top-[12%]">
        <Browser>{layouts.business}</Browser>
      </motion.div>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.75, ease }}
        className="absolute bottom-[7%] right-[6%] w-[30%] overflow-hidden rounded-[18px] border-[5px] border-ink bg-white shadow-2xl"
      >
        <div className="space-y-1.5 p-2">
          <span className="block h-1.5 w-8 rounded bg-ink" />
          <span className="block aspect-[4/3] rounded-md bg-[radial-gradient(60%_60%_at_60%_40%,#6fd3d4,#019A9D_60%,#017F82)]" />
          <span className="block h-2 w-full rounded bg-ink" /><span className="block h-2 w-2/3 rounded bg-ink" />
          <span className="block h-1 w-5/6 rounded bg-mist" /><span className="block h-3 w-12 rounded-full bg-teal" />
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.1, ease }}
        className="absolute bottom-[10%] left-[7%] rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white md:text-sm"
      >
        Responsive · Fast · Clear
      </motion.span>
      <span className="sample-tag absolute right-4 top-4">Illustration</span>
    </div>
  );
}

/** Interactive showcase of website types. Concept layouts, not client work. */
function Showcase() {
  const items = [
    { key: 'business' as const, title: 'Business websites', url: 'company.in' },
    { key: 'store' as const, title: 'Online stores', url: 'store.in' },
    { key: 'landing' as const, title: 'Landing pages', url: 'launch.in' },
  ];
  return (
    <section className="bg-ink text-paper">
      <div className="wrap section-pad">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <div>
            <span className="kicker !text-teal">What we build</span>
            <h2 className="h-display text-[9vw] leading-[1.05] md:text-[5vw] lg:text-[3.6vw] min-[1440px]:text-[52px]">From first page to full store.</h2>
          </div>
          <p className="max-w-[36ch] text-white/60">Concept layouts showing the kinds of websites we design and develop. <span className="sample-tag !text-white/50">Illustrations, not client work</span></p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.key}
              initial={{ opacity: 0, y: 50, clipPath: 'inset(15% 0% 0% 0% round 22px)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 22px)' }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
              className="group rounded-[22px] bg-white/[0.05] p-4 ring-1 ring-white/10 transition-colors duration-500 hover:bg-white/[0.09] md:p-5"
            >
              <div className="relative aspect-[4/3.4] overflow-hidden rounded-[16px] bg-[radial-gradient(70%_70%_at_50%_0%,rgba(1,154,157,.5),transparent_70%)] p-[8%]">
                <div className="transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.04]">
                  <Browser url={it.url}>{layouts[it.key]}</Browser>
                </div>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.01em]">{it.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Pillars beside a device mockup that shrinks from desktop to phone as you scroll. */
function Pillars() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const width = useTransform(scrollYProgress, [0.2, 0.7], ['100%', '42%']);
  const radius = useTransform(scrollYProgress, [0.2, 0.7], [14, 26]);
  return (
    <section ref={ref} className="wrap section-pad">
      <CenteredHeading kicker="Why it matters" title={wdPillars.title} sub={wdPillars.sub} />
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-[5vw]">
        <div role="img" aria-label="Illustration of one website layout adapting from desktop to mobile" className="flex aspect-[4/3] items-center justify-center rounded-[28px] bg-[#e6f4f4] p-[6%]">
          <motion.div style={{ width, borderRadius: radius }} className="overflow-hidden bg-white shadow-[0_30px_60px_-25px_rgba(1,127,130,.4)]">
            {layouts.business}
          </motion.div>
        </div>
        <ol className="divide-y divide-mist">
          {wdPillars.items.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
              className="group flex gap-5 py-5"
            >
              <span className="font-display text-sm font-bold text-teal">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-xl font-bold tracking-[-0.01em] transition-colors group-hover:text-teal-deep">{p.title}</h3>
                <p className="mt-1 text-slate">{p.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const schema = [
  serviceSchema('Website Design & Development', wdSeo.description, wdSeo.path, wdFeatures.map((f) => f.title)),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Web Design & Development', path: wdSeo.path }]),
  faqSchema(wdFaqs),
];

export default function WebDesign() {
  useSeo({ ...wdSeo, schema });
  return (
    <main>
      <ServiceSplitHero
        {...wdHero}
        crumb="Web Design & Development"
        visual={<HeroVisual />}
        primary={{ label: 'Start Your Project', to: '/contact' }}
        secondary={{ label: 'View Our Work', to: '/work' }}
      />
      <ServiceOverview {...wdOverview} />
      <ServiceFeatures
        kicker="What we offer"
        title="Our website design & development services."
        sub="Comprehensive website solutions designed around your business requirements."
        features={wdFeatures}
      />
      <Showcase />
      <Pillars />
      <ProcessSection {...wdProcess} />
      <WhyChooseGrid {...wdWhy} actions={[{ label: 'Start Your Project', to: '/contact' }, { label: 'View Our Work', to: '/work' }]} />
      <ServiceFAQ title="Questions about website design." faqs={wdFaqs} />
      <RelatedServices current="web-design-development" />
      <ServiceCTA title={wdCta.title} text={wdCta.text} button="Start Your Project" secondary="Contact EVM" />
    </main>
  );
}
