import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import type { ServicePage } from '../../data/services';

const ease = [0.22, 1, 0.36, 1] as const;

/** Overview card: visual, number, title, summary and an "Explore Service" link. The whole card is clickable. */
/** Simple motif per service so each visual reads at a glance (until real photography is added). */
function Motif({ slug }: { slug: string }) {
  if (slug === 'digital-marketing')
    return (
      <div className="absolute inset-x-[14%] bottom-[16%] flex h-[46%] items-end gap-[5%]">
        {[38, 55, 46, 72, 64, 92].map((h, i) => (
          <span key={i} className="flex-1 rounded-t-md bg-white/85 transition-[height] duration-700 group-hover:bg-white" style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  if (slug === 'web-design-development')
    return (
      <div className="absolute inset-x-[14%] bottom-0 top-[18%] rounded-t-[12px] bg-white shadow-[0_20px_50px_rgba(1,127,130,.25)] transition-transform duration-700 group-hover:-translate-y-2">
        <div className="flex gap-1.5 p-3">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-mist" />)}</div>
        <span className="mx-3 block h-[38%] rounded-[8px] bg-gradient-to-br from-teal-deep to-[#6fd3d4]" />
        <span className="mx-3 mt-3 block h-2 w-[45%] rounded bg-mist" />
        <span className="mx-3 mt-2 block h-2 w-[30%] rounded bg-mist" />
      </div>
    );
  return (
    <>
      <span className="absolute inset-x-0 top-[8%] h-[7%] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.18)_0_14px,transparent_14px_26px)]" />
      <span className="absolute inset-x-0 bottom-[8%] h-[7%] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.18)_0_14px,transparent_14px_26px)]" />
      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-teal text-white shadow-[0_0_0_10px_rgba(1,154,157,.25)] transition-transform duration-500 group-hover:scale-110">
        <Play size={22} fill="currentColor" />
      </span>
    </>
  );
}

export default function ServiceCard({ service, index, wide }: { service: ServicePage; index: number; wide?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
      className="h-full"
    >
      <Link
        to={service.path}
        className="group flex h-full flex-col rounded-[22px] bg-white p-3 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(1,127,130,0.45)] md:p-4"
      >
        <motion.div
          className={`relative aspect-[4/3] overflow-hidden rounded-[16px] ${wide ? 'md:aspect-[16/7] lg:aspect-[4/3]' : ''}`}
          initial={{ clipPath: 'inset(10% 6% 0% 6% round 16px)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.1, ease }}
        >
          <div
            className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
            style={{ background: service.art }}
          >
            <Motif slug={service.slug} />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">{service.number}</span>
        </motion.div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-6 md:px-3">
          <h3 className="font-display text-2xl font-bold tracking-[-0.015em] text-ink">{service.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-slate">{service.summary}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[15px] font-semibold text-teal-deep">
            Explore Service
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e6f4f4] transition-all duration-300 group-hover:rotate-45 group-hover:bg-teal-deep group-hover:text-white">
              <ArrowUpRight size={16} />
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
