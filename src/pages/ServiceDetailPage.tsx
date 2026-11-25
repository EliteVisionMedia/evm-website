import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, HelpCircle, Lightbulb, Sparkles } from 'lucide-react';
import ServiceSplitHero from '../components/services/ServiceSplitHero';
import ProcessSection from '../components/services/ProcessSection';
import WhyChooseGrid from '../components/services/WhyChooseGrid';
import ServiceFAQ from '../components/services/ServiceFAQ';
import ServiceCTA from '../components/services/ServiceCTA';
import DetailVisual from '../components/services/DetailVisual';
import CenteredHeading from '../components/CenteredHeading';
import Reveal from '../components/Reveal';
import ComingSoon from './ComingSoon';
import { industries, industryPath } from '../data/industries';
import useSeo, { breadcrumbSchema, faqSchema, serviceSchema } from '../lib/useSeo';
import { detailByPath, parentInfo, serviceDetails, detailPath, type ServiceDetail } from '../data/serviceDetails';

const ease = [0.22, 1, 0.36, 1] as const;

/** Fallback share image per parent service when the hero is an illustration. */
const ogFallback = {
  'digital-marketing': '/images/services/digital-marketing.webp',
  'web-design-development': '/images/home/hero/laptop.webp',
  'video-production': '/images/services/video-production.jpg',
} as const;

function Overview({ d }: { d: ServiceDetail }) {
  const cols = [
    { icon: Lightbulb, label: `What is ${d.name.replace(/ \(.*\)/, '')}?`, text: d.overview.what },
    { icon: HelpCircle, label: 'Why businesses need it', text: d.overview.why },
    { icon: Sparkles, label: 'How EVM helps', text: d.overview.how },
  ];
  return (
    <section className="wrap section-pad">
      <Reveal className="max-w-[760px]">
        <span className="kicker">Overview</span>
        <h2 className="h-display text-[9vw] leading-[1.02] md:text-[5vw] lg:text-[3.6vw] min-[1440px]:text-[52px]">{d.overview.title}</h2>
      </Reveal>
      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
        {cols.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.7, delay: i * 0.08, ease }}
            className="rounded-[22px] border border-mist bg-white p-6 md:p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e6f4f4] text-teal-deep"><c.icon size={22} /></span>
            <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.01em]">{c.label}</h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-slate">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Offers({ d }: { d: ServiceDetail }) {
  return (
    <section className="bg-[#e6f4f4]/60">
      <div className="wrap section-pad">
        <CenteredHeading kicker="What we offer" title={`Our ${d.name.replace(/ \(.*\)/, '')} services.`} sub="What is included when you work with EVM on this service." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {d.offers.map((o, i) => (
            <motion.article key={o.title} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
              className="group relative overflow-hidden rounded-[22px] bg-white p-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(1,127,130,.35)] md:p-7">
              <span aria-hidden className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-teal/10 transition-transform duration-700 group-hover:scale-[2]" />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[#e6f4f4] text-teal-deep transition-colors duration-500 group-hover:bg-teal group-hover:text-white"><o.icon size={22} /></span>
              <h3 className="relative mt-6 font-display text-lg font-bold tracking-[-0.01em] md:text-xl">{o.title}</h3>
              <p className="relative mt-2 text-[15px] leading-[1.65] text-slate">{o.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase({ d }: { d: ServiceDetail }) {
  const items = d.showcase.items;
  const allVertical = items.every((m) => 'photo' in m && m.vertical);
  const grid = allVertical ? (items.length >= 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3') : items.length === 3 ? 'md:grid-cols-[1.6fr_1fr_1fr]' : 'md:grid-cols-2';
  return (
    <section className="wrap section-pad">
      <Reveal className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
        <div>
          <span className="kicker">In practice</span>
          <h2 className="h-display text-[9vw] leading-[1.02] md:text-[5vw] lg:text-[3.6vw] min-[1440px]:text-[52px]">{d.showcase.title}</h2>
        </div>
        <p className="max-w-[40ch] text-slate md:text-right">{d.showcase.sub}</p>
      </Reveal>
      <div className={`grid items-start gap-4 md:gap-5 ${grid}`}>
        {items.map((m, i) => <DetailVisual key={i} media={m} className={!allVertical && items.length === 3 && i > 0 ? '!aspect-[4/5]' : ''} />)}
      </div>
    </section>
  );
}

function Related({ d }: { d: ServiceDetail }) {
  const items = d.related.map((p) => serviceDetails.find((x) => detailPath(x) === p)).filter(Boolean) as ServiceDetail[];
  return (
    <section className="wrap pb-12 md:pb-16">
      <Reveal className="mb-8">
        <span className="kicker">Related services</span>
        <h2 className="h-display text-[8vw] leading-[1.05] md:text-[4vw] lg:text-[3vw] min-[1440px]:text-[44px]">Often paired with this service.</h2>
      </Reveal>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((r) => (
          <Link key={r.slug} to={detailPath(r)} className="group flex items-center justify-between gap-4 rounded-[20px] border border-mist bg-white px-6 py-6 transition-colors duration-500 hover:border-teal">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate">{parentInfo[r.parent].title}</span>
              <p className="mt-1 font-display text-lg font-bold leading-tight tracking-[-0.01em] md:text-xl">{r.name}</p>
            </div>
            <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-paper transition-all duration-500 group-hover:rotate-45 group-hover:bg-teal group-hover:text-white"><ArrowUpRight size={18} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Industry links: web pages only where the decks connect (clothing e-commerce visuals). */
const industryFit: Record<string, string[] | undefined> = { 'web-design-development': ['clothing', 'fmcg'] };

function IndustryLinks({ only }: { only?: string[] }) {
  const list = industries.filter((i) => !only || only.includes(i.slug));
  return (
    <section className="wrap pb-12 md:pb-16">
      <div className="flex flex-col gap-4 rounded-[22px] border border-mist bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div><span className="kicker !mb-1">Industries</span><p className="font-display text-xl font-bold tracking-[-0.01em]">See how we apply this for your industry.</p></div>
        <div className="flex flex-wrap gap-2">
          {list.map((i) => <Link key={i.slug} to={industryPath(i.slug)} className="rounded-full border border-mist px-4 py-2 text-sm font-semibold transition-colors hover:border-teal hover:text-teal-deep">{i.name} →</Link>)}
        </div>
      </div>
    </section>
  );
}

function Detail({ d }: { d: ServiceDetail }) {
  const parent = parentInfo[d.parent];
  const path = detailPath(d);
  const image = 'photo' in d.hero.media ? d.hero.media.photo : ogFallback[d.parent];
  const schema = useMemo(() => [
    serviceSchema(d.name, d.seo.description, path, d.offers.map((o) => o.title)),
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: parent.title, path: parent.path }, { name: d.name, path }]),
    faqSchema(d.faqs),
  ], [d, path, parent]);
  useSeo({ title: d.seo.title, description: d.seo.description, path, schema, image, keywords: d.seo.keywords });

  return (
    <>
      <ServiceSplitHero
        kicker={d.hero.kicker}
        title={d.hero.title}
        subtitle={d.hero.subtitle}
        crumb={d.name}
        parent={{ label: parent.title, to: parent.path }}
        visual={<DetailVisual media={d.hero.media} hero />}
        primary={{ label: 'Start Your Project', to: '/contact' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
      <Overview d={d} />
      <Offers d={d} />
      <ProcessSection kicker="Our approach" title={`How we deliver ${d.name.replace(/ \(.*\)/, '')}.`} sub="A clear, step-by-step process so you always know what happens next." steps={d.process} />
      <WhyChooseGrid title="Why choose EVM?" text={d.why.text} points={d.why.points} actions={[{ label: 'Start Your Project', to: '/contact' }, { label: `All ${parent.title} services`, to: parent.path }]} />
      <Showcase d={d} />
      <ServiceFAQ title={`Questions about ${d.name.replace(/ \(.*\)/, '')}.`} faqs={d.faqs} />
      <Related d={d} />
      <IndustryLinks only={industryFit[d.parent]} />
      <ServiceCTA title="Let's Grow Your Business Together." button="Start Your Project" secondary="Contact EVM" secondaryTo="/contact" />
    </>
  );
}

/** One component serves all 18 detail routes; unknown slugs fall through to the 404 page. */
export default function ServiceDetailPage() {
  const { pathname } = useLocation();
  const d = detailByPath(pathname.replace(/\/$/, ''));
  if (!d) return <ComingSoon title="Service not found" notFound />;
  return <Detail key={d.slug} d={d} />;
}
