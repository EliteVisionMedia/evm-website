import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, MapPin, MousePointerClick, Search, Share2 } from 'lucide-react';
import ServiceSplitHero from '../components/services/ServiceSplitHero';
import ServiceOverview from '../components/services/ServiceOverview';
import ServiceFeatures from '../components/services/ServiceFeatures';
import ProcessSection from '../components/services/ProcessSection';
import ServiceFAQ from '../components/services/ServiceFAQ';
import ServiceCTA from '../components/services/ServiceCTA';
import PillLink from '../components/services/PillLink';
import CenteredHeading from '../components/CenteredHeading';
import Reveal from '../components/Reveal';
import { servicePages } from '../data/services';
import useSeo, { breadcrumbSchema, faqSchema, serviceSchema } from '../lib/useSeo';
import { dmFaqs, dmFeatures, dmHero, dmMetrics, dmOverview, dmProcess, dmSeo, dmStrategy, dmWhy } from '../data/digitalMarketing';

const ease = [0.22, 1, 0.36, 1] as const;

/** Illustrative analytics dashboard. Shapes only: no real figures. */
function HeroVisual() {
  const bars = [38, 52, 44, 63, 58, 74, 82];
  return (
    <div role="img" aria-label="Illustration of a marketing analytics dashboard with search, social and ads channels" className="relative aspect-[1.05] overflow-hidden rounded-[28px] bg-ink p-5 md:aspect-[1.2] md:p-8">
      <div aria-hidden className="absolute inset-0 [background:radial-gradient(60%_60%_at_80%_15%,rgba(1,154,157,.55),transparent_60%),radial-gradient(50%_50%_at_10%_95%,rgba(1,127,130,.4),transparent_60%)]" />
      {/* dashboard card */}
      <div className="absolute inset-x-[7%] bottom-[9%] top-[18%] rounded-[18px] bg-white/95 p-4 shadow-2xl md:p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink md:text-sm">Campaign overview</span>
          <span className="sample-tag">Illustration</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 md:mt-4 md:gap-3">
          {['Leads', 'Traffic', 'Conversions'].map((l, i) => (
            <div key={l} className="rounded-xl bg-paper p-2 md:p-3">
              <span className="block text-[10px] font-medium text-slate md:text-xs">{l}</span>
              <motion.span
                className="mt-2 block h-1.5 rounded-full bg-teal"
                initial={{ width: '10%' }}
                animate={{ width: `${55 + i * 15}%` }}
                transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease }}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-4 bottom-4 top-[46%] flex items-end gap-[3%] md:inset-x-6 md:bottom-6">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className={`flex-1 rounded-t-md ${i === bars.length - 1 ? 'bg-teal' : 'bg-[#cfeaea]'}`}
              initial={{ height: '0%' }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: 0.7 + i * 0.07, ease }}
            />
          ))}
        </div>
      </div>
      {/* floating channel chips */}
      {[
        { icon: Search, label: 'SEO', cls: 'left-[4%] top-[6%]' },
        { icon: Share2, label: 'Social', cls: 'right-[5%] top-[8%]' },
        { icon: MousePointerClick, label: 'Google Ads', cls: 'right-[2%] top-[42%] hidden sm:flex' },
        { icon: MapPin, label: 'Local SEO', cls: 'bottom-[3%] left-[10%]' },
      ].map((c, i) => (
        <motion.span
          key={c.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ opacity: { delay: 1 + i * 0.12 }, y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: 1 + i * 0.12 } }}
          className={`absolute flex items-center gap-2 rounded-full bg-teal px-3 py-2 text-xs font-semibold text-white shadow-lg md:px-4 md:text-sm ${c.cls}`}
        >
          <c.icon size={15} /> {c.label}
        </motion.span>
      ))}
    </div>
  );
}

function StrategyBand() {
  return (
    <section className="wrap">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, ease }}
        className="relative grid gap-10 overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-paper md:px-12 md:py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-[5vw] lg:px-16 lg:py-20"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_70%_at_100%_0%,rgba(1,154,157,.35),transparent_60%)]" />
        <div className="relative">
          <span className="kicker !text-teal">Customized strategy</span>
          <h2 className="h-display text-[8.5vw] leading-[1.05] md:text-[4.6vw] lg:text-[3.2vw] min-[1440px]:text-[46px]">{dmStrategy.title}</h2>
          {dmStrategy.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="mt-5 max-w-[56ch] text-base leading-[1.75] text-white/70">{p}</p>
          ))}
          <div className="mt-8"><PillLink to="/contact">Book a Strategy Call</PillLink></div>
        </div>
        <ul className="relative grid content-center gap-3">
          {dmStrategy.points.map((pt, i) => (
            <motion.li
              key={pt}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease }}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[15px] font-medium"
            >
              <span className="font-display text-sm font-bold text-teal">{String(i + 1).padStart(2, '0')}</span>
              {pt}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

/** Sparkline shape for metric cards: decorative only. */
function Spark({ seed }: { seed: number }) {
  const d = useMemo(() => {
    const pts = Array.from({ length: 8 }, (_, i) => 26 - i * 2.4 - (((seed + i) * 7) % 5));
    return pts.map((y, i) => `${i ? 'L' : 'M'}${i * 14},${y}`).join(' ');
  }, [seed]);
  return (
    <svg aria-hidden viewBox="0 0 100 30" className="h-8 w-24 overflow-visible">
      <motion.path d={d} fill="none" stroke="#019A9D" strokeWidth="2.2" strokeLinecap="round" pathLength={1} strokeDasharray="1" initial={{ strokeDashoffset: 1 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 + seed * 0.05, ease }} />
    </svg>
  );
}

function Metrics() {
  return (
    <section className="bg-[#e6f4f4]">
      <div className="wrap section-pad">
        <CenteredHeading kicker="Performance & measurement" title={dmMetrics.title} sub={dmMetrics.sub} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {dmMetrics.items.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease }}
              className="group flex items-end justify-between gap-4 rounded-[18px] bg-white p-5 transition-transform duration-500 hover:-translate-y-1 md:p-6"
            >
              <div>
                <span className="text-xs font-medium text-slate">Metric {String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.01em]">{m.name}</h3>
                <p className="mt-1 text-sm text-slate">{m.note}</p>
              </div>
              <Spark seed={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="wrap section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[5vw]">
        <Reveal>
          <span className="kicker">Why EVM</span>
          <h2 className="h-display text-[9vw] leading-[1.05] md:text-[5vw] lg:text-[3.4vw] min-[1440px]:text-[48px]">{dmWhy.title}</h2>
          <p className="mt-5 max-w-[48ch] text-base leading-[1.75] text-slate md:text-lg">{dmWhy.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PillLink to="/contact">Book a Meeting</PillLink>
            <PillLink to="/work" tone="outline">See Our Work</PillLink>
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {dmWhy.points.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease }}
              className="group rounded-[18px] bg-ink p-5 text-paper transition-colors duration-500 hover:bg-teal-deep md:p-6"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-teal text-white transition-colors group-hover:bg-white group-hover:text-teal-deep">
                <Check size={16} strokeWidth={3} />
              </span>
              <p className="mt-6 text-[15px] font-medium leading-snug">{p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Internal links to the other two services. */
function Related() {
  const others = servicePages.filter((s) => s.slug !== 'digital-marketing');
  return (
    <section className="wrap pb-12 md:pb-16">
      <div className="grid gap-3 md:grid-cols-2">
        {others.map((s) => (
          <Link key={s.slug} to={s.path} className="group flex items-center justify-between gap-4 rounded-[20px] border border-mist bg-white px-6 py-6 transition-colors duration-500 hover:border-teal md:px-8">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate">Also from EVM</span>
              <p className="mt-1 font-display text-xl font-bold tracking-[-0.01em] md:text-2xl">{s.title}</p>
            </div>
            <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-paper transition-all duration-500 group-hover:rotate-45 group-hover:bg-teal group-hover:text-white">
              <ArrowUpRight size={20} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const schema = [
  serviceSchema('Digital Marketing', dmSeo.description, dmSeo.path, dmFeatures.map((f) => f.title)),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Digital Marketing', path: dmSeo.path }]),
  faqSchema(dmFaqs),
];

export default function DigitalMarketing() {
  useSeo({ ...dmSeo, schema });
  return (
    <main>
      <ServiceSplitHero {...dmHero} crumb="Digital Marketing" visual={<HeroVisual />} />
      <ServiceOverview {...dmOverview} />
      <StrategyBand />
      <ServiceFeatures
        kicker="What we offer"
        title="Our digital marketing services."
        sub="Connected services that help you get found, build trust and turn interest into enquiries."
        features={dmFeatures}
      />
      <ProcessSection {...dmProcess} />
      <Metrics />
      <WhyChoose />
      <ServiceFAQ title="Questions about digital marketing." faqs={dmFaqs} />
      <Related />
      <ServiceCTA title="Ready to grow your business online?" button="Start Your Project" />
    </main>
  );
}
