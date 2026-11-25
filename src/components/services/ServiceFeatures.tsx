import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { detailByFeature, detailPath } from '../../data/serviceDetails';
import CenteredHeading from '../CenteredHeading';
import type { Feature } from '../../data/digitalMarketing';

const ease = [0.22, 1, 0.36, 1] as const;

/** Grid of detailed service cards (icon, H3, description, checklist) with a staggered entrance. */
export default function ServiceFeatures({ kicker, title, sub, features, dark = false }: { kicker: string; title: string; sub: string; features: Feature[]; dark?: boolean }) {
  // Highlight the card named in the URL hash (e.g. from the navbar topic menu) for a few seconds.
  const { hash } = useLocation();
  const [focus, setFocus] = useState<string | null>(null);
  useEffect(() => {
    const id = hash.slice(1);
    if (!features.some((f) => f.id === id)) return;
    setFocus(id);
    const t = window.setTimeout(() => setFocus(null), 3200);
    return () => window.clearTimeout(t);
  }, [hash, features]);
  return (
    <section id="services" className={dark ? 'bg-ink text-paper' : ''}>
      <div className={`wrap section-pad ${dark ? '[&_h2]:text-paper [&_p]:!text-white/60' : ''}`}>
      <CenteredHeading kicker={kicker} title={title} sub={sub} />
      <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.article
            id={f.id}
            key={f.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.75, delay: (i % 3) * 0.09, ease }}
            className={`group relative flex scroll-mt-28 flex-col overflow-hidden rounded-[22px] p-6 ${dark ? 'bg-white/[0.05] ring-1 ring-white/10' : 'bg-white'} transition-[box-shadow,transform] duration-500 hover:shadow-[0_30px_60px_-30px_rgba(1,127,130,.35)] md:p-8 ${focus === f.id ? 'is-focus !ring-2 !ring-teal -translate-y-1.5 shadow-[0_34px_70px_-28px_rgba(1,154,157,.6)]' : ''}`}
          >
            <span aria-hidden className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal/10 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[2.2] [.is-focus_&]:scale-[2.2]" />
            <div className="relative flex items-center justify-between">
              <span className={`grid h-14 w-14 place-items-center rounded-2xl ${dark ? 'bg-teal/15 text-teal' : 'bg-[#e6f4f4] text-teal-deep'} transition-colors duration-500 group-hover:bg-teal group-hover:text-white [.is-focus_&]:bg-teal [.is-focus_&]:text-white`}>
                <f.icon size={26} strokeWidth={2} />
              </span>
              <span className="font-display text-sm font-bold text-slate/60">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="relative mt-7 font-display text-[22px] font-bold leading-tight tracking-[-0.015em]">{f.title}</h3>
            <p className="relative mt-3 text-[15px] leading-[1.7] text-slate">{f.text}</p>
            <div className={`relative mt-6 border-t pt-5 ${dark ? 'border-white/10' : 'border-mist'}`}>
              <span className={`block text-sm font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{f.listTitle}</span>
              <ul className="mt-3 space-y-2.5">
                {f.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[14px] text-slate">
                    <Check size={16} className="mt-0.5 flex-none text-teal" strokeWidth={2.5} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            {detailByFeature(f.id) && (
              <Link to={detailPath(detailByFeature(f.id)!)} className={`group/l relative mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold ${dark ? 'text-teal' : 'text-teal-deep'}`}>
                Learn more <span className="sr-only">about {f.title}</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover/l:translate-x-1" />
              </Link>
            )}
          </motion.article>
        ))}
      </div>
      </div>
    </section>
  );
}
