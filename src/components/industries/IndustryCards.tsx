import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, HeartPulse } from 'lucide-react';
import { caseStudyPath, industries, industryPath, type CaseStudy, type Industry } from '../../data/industries';

const ease = [0.22, 1, 0.36, 1] as const;

/** Designed visual for an industry without an approved public photo. */
export function IndustryArt({ industry, className = '' }: { industry: Industry; className?: string }) {
  if (industry.image) return <img src={industry.image.src} alt={industry.image.alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />;
  return (
    <div role="img" aria-label={`${industry.name} illustration`} className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-teal-deep via-teal to-[#4fd0d2] ${className}`}>
      <span aria-hidden className="absolute -right-10 -top-10 h-52 w-52 rounded-full border-[28px] border-white/15" />
      <span aria-hidden className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-ink/15" />
      <HeartPulse aria-hidden className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-white/90" strokeWidth={1.4} />
      <span className="absolute bottom-3 right-4 text-[10px] font-medium uppercase tracking-[0.1em] text-white/70">Illustration</span>
    </div>
  );
}

export function IndustryCard({ industry, i = 0, cta = 'Explore industry' }: { industry: Industry; i?: number; cta?: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, delay: i * 0.1, ease }}
    >
      <Link to={industryPath(industry.slug)} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-ink">
          <div className="h-full w-full transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
            <IndustryArt industry={industry} />
          </div>
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 md:inset-x-6 md:bottom-6">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7fe3e5]">Industry</span>
            <h3 className="mt-1 font-display text-3xl font-bold tracking-[-0.02em] text-white">{industry.name}</h3>
          </div>
          <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-teal group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-slate">{industry.card}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep">
          {cta} <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.article>
  );
}

export function IndustryGrid({ cta }: { cta?: string }) {
  return (
    <div className="grid gap-8 md:grid-cols-3 md:gap-5 lg:gap-7">
      {industries.map((ind, i) => <IndustryCard key={ind.slug} industry={ind} i={i} cta={cta} />)}
    </div>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link to={caseStudyPath(study.slug)} className="group grid overflow-hidden rounded-[24px] border border-mist bg-white transition-colors duration-500 hover:border-teal md:grid-cols-[0.9fr_1.1fr]">
      <div className="aspect-[4/3] overflow-hidden bg-ink md:aspect-auto">
        <img src={study.images[0].src} alt={study.images[0].alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-[1.05]" />
      </div>
      <div className="flex flex-col justify-center p-6 md:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-teal">Case study · {study.client}</span>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-[-0.015em]">{study.title}</h3>
        <div className="mt-5 flex flex-wrap gap-5">
          {study.stats.slice(0, 2).map((s) => (
            <div key={s.label}><p className="font-display text-2xl font-extrabold text-teal-deep">{s.value}</p><p className="text-xs text-slate">{s.label}</p></div>
          ))}
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep">Read case study <ArrowUpRight size={15} /></span>
      </div>
    </Link>
  );
}
