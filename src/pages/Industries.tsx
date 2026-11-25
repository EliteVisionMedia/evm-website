import { useEffect, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, ChevronRight, Quote } from 'lucide-react';
import Reveal from '../components/Reveal';
import CenteredHeading from '../components/CenteredHeading';
import PillLink from '../components/services/PillLink';
import ServiceCTA from '../components/services/ServiceCTA';
import { CaseStudyCard, IndustryArt, IndustryGrid } from '../components/industries/IndustryCards';
import ComingSoon from './ComingSoon';
import useSeo, { breadcrumbSchema, evmOrg, SITE_URL } from '../lib/useSeo';
import { serviceDetails, detailPath } from '../data/serviceDetails';
import {
  approvals, caseStudies, caseStudyPath, industries, industryPath, isApproved, PREVIEW_PARAM, type Industry, type Stat,
} from '../data/industries';

const ease = [0.22, 1, 0.36, 1] as const;

function Crumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm font-medium text-slate">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={14} />}
          {it.to ? <Link to={it.to} className="hover:text-teal">{it.label}</Link> : <span className="text-ink" aria-current="page">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

function Stats({ items, dark = true }: { items: Stat[]; dark?: boolean }) {
  return (
    <div className={`grid gap-px overflow-hidden rounded-[22px] sm:grid-cols-2 ${items.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} ${dark ? 'bg-white/10' : 'bg-mist'}`}>
      {items.map((s) => (
        <div key={s.label} className={`p-6 md:p-8 ${dark ? 'bg-ink' : 'bg-white'}`}>
          <p className="font-display text-4xl font-extrabold tracking-[-0.02em] text-teal md:text-5xl">{s.value}</p>
          <p className={`mt-2 text-[15px] ${dark ? 'text-white/70' : 'text-slate'}`}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function RelatedServices({ paths }: { paths: string[] }) {
  const items = paths.map((p) => serviceDetails.find((d) => detailPath(d) === p)).filter(Boolean);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((d) => (
        <Link key={d!.slug} to={detailPath(d!)} className="group flex items-center justify-between gap-4 rounded-[20px] border border-mist bg-white px-6 py-5 transition-colors duration-500 hover:border-teal">
          <span className="font-display text-lg font-bold tracking-[-0.01em]">{d!.name}</span>
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-paper transition-all duration-500 group-hover:rotate-45 group-hover:bg-teal group-hover:text-white"><ArrowUpRight size={17} /></span>
        </Link>
      ))}
    </div>
  );
}

/* ───────────── /industries ───────────── */
export function IndustriesOverview() {
  const schema = useMemo(() => [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }])], []);
  useSeo({
    title: 'Industries We Serve | Healthcare, FMCG & Clothing | Elite Vision Media',
    description: 'Industry-focused creative production and digital growth from Elite Vision Media, Coimbatore: healthcare, FMCG and clothing brands.',
    path: '/industries', schema, image: '/images/industries/clothing/fashion-red-car.webp',
  });
  return (
    <>
      <section className="wrap pb-12 pt-8 md:pb-16 md:pt-12 lg:pt-16">
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: 'Industries' }]} />
        <motion.span className="kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>Industries</motion.span>
        <motion.h1 className="h-display max-w-[16ch] text-[12vw] leading-[1] md:text-[7vw] lg:text-[5.6vw] min-[1440px]:text-[80px]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
          Built for the industries we know.
        </motion.h1>
        <p className="mt-6 max-w-[54ch] text-lg text-slate">Each industry has its own audience, rules and buying journey. Explore how EVM positions, creates and grows brands in each one.</p>
      </section>
      <section className="wrap pb-20 md:pb-28"><IndustryGrid /></section>
      <ServiceCTA title="Let's Grow Your Business Together." button="Start Your Project" secondary="Contact EVM" />
    </>
  );
}

/* ───────────── /industries/:slug ───────────── */
function IndustryDetail({ ind }: { ind: Industry }) {
  const path = industryPath(ind.slug);
  const study = caseStudies.find((c) => c.slug === ind.caseStudy && isApproved(c.gate));
  const showStats = ind.stats && approvals[ind.stats.gate];
  const schema = useMemo(() => [
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }, { name: ind.name, path }]),
    { '@context': 'https://schema.org', '@type': 'Service', name: `${ind.name} marketing & creative production`, serviceType: ind.groups.map((g) => g.title).join(', '), description: ind.seo.description, url: SITE_URL + path, provider: evmOrg, areaServed: [{ '@type': 'City', name: 'Coimbatore' }, { '@type': 'Country', name: 'India' }] },
  ], [ind, path]);
  useSeo({ title: ind.seo.title, description: ind.seo.description, path, schema, image: ind.image?.src ?? '/images/services/digital-marketing.webp', keywords: ind.seo.keywords });
  const words = ind.hero.title.split(' ');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-x-clip">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[520px] [background:radial-gradient(55%_65%_at_80%_20%,rgba(1,154,157,.14),transparent_70%)]" />
        <div className="wrap relative grid items-center gap-10 pb-14 pt-8 md:pb-20 md:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[4vw] lg:pt-16">
          <div>
            <Crumbs items={[{ label: 'Home', to: '/' }, { label: 'Industries', to: '/industries' }, { label: ind.name }]} />
            <motion.span className="kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>{ind.hero.kicker}</motion.span>
            <h1 className="h-display text-[10.5vw] leading-[1.02] sm:text-[7.5vw] lg:text-[4.4vw] min-[1440px]:text-[64px]">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-top">
                  <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease }}>{w}&nbsp;</motion.span>
                </span>
              ))}
            </h1>
            <motion.p className="mt-5 max-w-[50ch] text-base text-slate md:text-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }}>{ind.hero.subtitle}</motion.p>
            <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65, ease }}>
              <PillLink to="/contact">Start Your Project</PillLink>
              <PillLink to="/contact" tone="outline">Contact Us</PillLink>
            </motion.div>
          </div>
          <motion.div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[28px] bg-ink" initial={{ opacity: 0, clipPath: 'inset(10% 10% 10% 10% round 28px)' }} animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }} transition={{ duration: 1.1, delay: 0.25, ease }}>
            <IndustryArt industry={ind} />
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-ink text-paper">
        <div className="wrap section-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[6vw]">
          <Reveal><h2 className="h-display text-[9vw] leading-[1.03] text-paper md:text-[5vw] lg:text-[3.6vw] min-[1440px]:text-[52px]">{ind.intro.title}</h2></Reveal>
          <div className="space-y-5">{ind.intro.paragraphs.map((p) => <Reveal key={p}><p className="text-lg leading-relaxed text-white/70">{p}</p></Reveal>)}</div>
        </div>
      </section>

      {/* Groups */}
      <section className="wrap section-pad">
        <CenteredHeading kicker={ind.name} title={ind.groupsTitle} />
        <div className={`grid gap-4 sm:grid-cols-2 ${ind.groups.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
          {ind.groups.map((g, i) => (
            <motion.div key={g.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.07, ease }} className="group rounded-[22px] border border-mist bg-white p-6 transition-colors duration-500 hover:border-teal">
              <span className="font-display text-sm font-bold text-teal">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-[-0.01em]">{g.title}</h3>
              {g.items.length > 0 && <ul className="mt-4 space-y-2">{g.items.map((it) => <li key={it} className="flex gap-2 text-[14px] text-slate"><Check size={15} className="mt-0.5 flex-none text-teal" />{it}</li>)}</ul>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="bg-[#e6f4f4]/60">
        <div className="wrap section-pad">
          <CenteredHeading kicker="Our approach" title={ind.approach.title} sub={ind.approach.sub} />
          <ol className={`grid gap-4 sm:grid-cols-2 ${ind.approach.steps.length === 3 ? 'lg:grid-cols-3' : ind.approach.steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'}`}>
            {ind.approach.steps.map((s, i) => (
              <motion.li key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease }} className="relative rounded-[22px] bg-white p-6 md:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-teal font-display text-sm font-bold text-white">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Highlights */}
      <section className="wrap section-pad space-y-16 md:space-y-24">
        {ind.highlights.map((h, i) => (
          <div key={h.title} className={`grid items-center gap-8 lg:gap-[5vw] ${h.image ? 'lg:grid-cols-2' : ''}`}>
            {h.image && (
              <Reveal className={i % 2 ? 'lg:order-2' : ''}>
                <div className="mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[24px] bg-ink">
                  <img src={h.image.src} alt={h.image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]" />
                </div>
              </Reveal>
            )}
            <Reveal className={h.image ? '' : 'rounded-[28px] border border-mist bg-white p-7 md:p-12'}>
              <span className="kicker">{h.kicker}</span>
              <h2 className="h-display text-[8.5vw] leading-[1.04] md:text-[4.6vw] lg:text-[3.2vw] min-[1440px]:text-[46px]">{h.title}</h2>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-slate">{h.text}</p>
              {h.list && (
                <ul className={`mt-7 grid gap-x-8 gap-y-3 ${h.list.length > 5 ? 'sm:grid-cols-2' : ''}`}>
                  {h.list.map((l) => <li key={l} className="flex items-center gap-2.5 text-[15px] font-medium"><span className="h-1.5 w-1.5 flex-none rounded-full bg-teal" />{l}</li>)}
                </ul>
              )}
            </Reveal>
          </div>
        ))}
      </section>

      {/* Gallery */}
      {ind.gallery && (
        <section className="wrap pb-20 md:pb-28">
          <Reveal className="mb-10"><span className="kicker">Creative concepts</span><h2 className="h-display text-[8.5vw] leading-[1.04] md:text-[4.6vw] lg:text-[3.2vw] min-[1440px]:text-[46px]">What if your brand looked different from everyone else?</h2></Reveal>
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            {ind.gallery.map((g, i) => (
              <motion.figure key={g.src} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease }}>
                <div className="aspect-[4/5] overflow-hidden rounded-[18px] bg-ink"><img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1100ms] hover:scale-[1.05]" /></div>
                {g.caption && <figcaption className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-slate md:text-xs">{g.caption}</figcaption>}
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      {/* Stats (approval-gated) */}
      {showStats && (
        <section className="bg-ink text-paper"><div className="wrap section-pad"><Reveal className="mb-10"><h2 className="h-display text-[8.5vw] leading-[1.04] text-paper md:text-[4.6vw] lg:text-[3.2vw]">{ind.stats!.title}</h2></Reveal><Stats items={ind.stats!.items} /></div></section>
      )}

      {/* Case study (approval-gated) */}
      {study && <section className="wrap section-pad"><CaseStudyCard study={study} /></section>}

      {/* Why */}
      <section className="bg-ink text-paper">
        <div className="wrap section-pad">
          <Reveal className="mb-10 md:mb-14"><span className="kicker !text-teal">Why EVM</span><h2 className="h-display max-w-[20ch] text-[9vw] leading-[1.03] text-paper md:text-[5vw] lg:text-[3.6vw] min-[1440px]:text-[52px]">{ind.why.title}</h2></Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ind.why.points.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease }} className="rounded-[22px] bg-white/[0.05] p-6 ring-1 ring-white/10 md:p-7">
                <Check className="text-teal" size={22} />
                <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
                {p.text && <p className="mt-2 text-[15px] text-white/60">{p.text}</p>}
              </motion.div>
            ))}
          </div>
          <Reveal><p className="mt-12 max-w-[40ch] font-display text-2xl font-bold leading-snug text-white md:text-3xl"><Quote className="mb-3 text-teal" size={28} />{ind.closing}</p></Reveal>
        </div>
      </section>

      {/* Related services */}
      <section className="wrap section-pad">
        <Reveal className="mb-8"><span className="kicker">Related services</span><h2 className="h-display text-[8vw] leading-[1.05] md:text-[4vw] lg:text-[3vw] min-[1440px]:text-[44px]">Services {ind.name.toLowerCase() === 'fmcg' ? 'FMCG' : ind.name.toLowerCase()} brands use most.</h2></Reveal>
        <RelatedServices paths={ind.services} />
        <div className="mt-10 flex flex-wrap gap-3">
          {industries.filter((o) => o.slug !== ind.slug).map((o) => (
            <Link key={o.slug} to={industryPath(o.slug)} className="rounded-full border border-mist px-5 py-2.5 text-sm font-semibold transition-colors hover:border-teal hover:text-teal-deep">{o.name} industry →</Link>
          ))}
        </div>
      </section>

      <ServiceCTA title="Let's Grow Your Business Together." button="Start Your Project" secondary="Contact EVM" />
    </>
  );
}

export function IndustryPage() {
  const { slug } = useParams();
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return <ComingSoon title="Industry not found" notFound />;
  return <IndustryDetail key={ind.slug} ind={ind} />;
}

/* ───────────── /case-studies/:slug (approval-gated) ───────────── */
function useNoIndex(on: boolean) {
  useEffect(() => {
    if (!on) return;
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => m.remove();
  }, [on]);
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const { search } = useLocation();
  const study = caseStudies.find((c) => c.slug === slug);
  const approved = !!study && isApproved(study.gate);
  const preview = new URLSearchParams(search).has(PREVIEW_PARAM);
  const visible = !!study && (approved || preview);
  const ind = study ? industries.find((i) => i.slug === study.industry)! : undefined;
  const path = study ? caseStudyPath(study.slug) : '/case-studies';

  const schema = useMemo(() => (study && approved ? [
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }, { name: ind!.name, path: industryPath(ind!.slug) }, { name: study.client, path }]),
    { '@context': 'https://schema.org', '@type': 'CreativeWork', name: study.seo.title, description: study.seo.description, url: SITE_URL + path, creator: evmOrg, image: SITE_URL + study.images[0].src },
  ] : undefined), [study, approved, ind, path]);
  // Drafts never expose client details in metadata: neutral title, noindex, no schema.
  useSeo(approved && study
    ? { title: study.seo.title, description: study.seo.description, path, schema, image: study.images[0].src }
    : { title: 'Case study (draft) | Elite Vision Media', description: 'Draft case study awaiting client approval.', path });
  useNoIndex(!approved);

  if (!visible || !study || !ind) return <ComingSoon title="Case study not found" notFound />;

  return (
    <>
      {!approved && (
        <div className="sticky top-0 z-[60] bg-[#ffbd2e] px-4 py-2 text-center text-sm font-semibold text-ink">
          DRAFT PREVIEW. Not public: awaiting client approval for name, photos and figures. Hidden from search engines.
        </div>
      )}
      <section className="wrap pb-12 pt-8 md:pb-16 md:pt-12 lg:pt-16">
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: 'Industries', to: '/industries' }, { label: ind.name, to: industryPath(ind.slug) }, { label: study.client }]} />
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[4vw]">
          <div>
            <span className="kicker">Case study · {ind.name}</span>
            <p className="font-display text-xl font-bold text-teal-deep md:text-2xl">{study.client}</p>
            <h1 className="h-display mt-2 text-[10vw] leading-[1.03] sm:text-[7vw] lg:text-[4.2vw] min-[1440px]:text-[60px]">{study.title}</h1>
            <p className="mt-5 max-w-[48ch] text-lg text-slate">{study.summary}</p>
          </div>
          <div className="mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[28px] bg-ink">
            <img src={study.images[0].src} alt={study.images[0].alt} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="wrap section-pad">
          <Reveal className="mb-10"><span className="kicker !text-teal">The impact</span><h2 className="h-display text-[8.5vw] leading-[1.04] text-paper md:text-[4.6vw] lg:text-[3.2vw]">Results.</h2></Reveal>
          <Stats items={study.stats} />
          {study.quote && <p className="mt-12 max-w-[44ch] font-display text-2xl font-bold leading-snug md:text-3xl"><Quote className="mb-3 text-teal" size={28} />{study.quote}</p>}
        </div>
      </section>

      <section className="wrap section-pad grid gap-10 md:grid-cols-2 md:gap-14">
        {study.sections.map((s) => (
          <Reveal key={s.title}>
            <h2 className="font-display text-3xl font-bold tracking-[-0.015em]">{s.title}</h2>
            {s.paragraphs?.map((p) => <p key={p} className="mt-4 text-lg leading-relaxed text-slate">{p}</p>)}
            {s.list && <ul className="mt-5 space-y-3">{s.list.map((l, i) => <li key={l} className="flex gap-3 text-[16px] font-medium"><span className="font-display font-bold text-teal">{String(i + 1).padStart(2, '0')}</span>{l}</li>)}</ul>}
          </Reveal>
        ))}
      </section>

      {study.images.length > 1 && (
        <section className="wrap pb-16 md:pb-24">
          <div className="grid gap-4 sm:grid-cols-2">
            {study.images.slice(1).concat(study.images.slice(0, 1)).map((im) => (
              <div key={im.src} className="aspect-[4/3] overflow-hidden rounded-[22px] bg-paper"><img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-contain" /></div>
            ))}
          </div>
        </section>
      )}

      <section className="wrap pb-16 md:pb-24">
        <Reveal className="mb-8"><span className="kicker">Related services</span><h2 className="h-display text-[8vw] leading-[1.05] md:text-[4vw] lg:text-[3vw]">The services behind this work.</h2></Reveal>
        <RelatedServices paths={study.services} />
      </section>

      <ServiceCTA title="Let's Grow Your Business Together." button="Start Your Project" secondary="Contact EVM" />
    </>
  );
}
