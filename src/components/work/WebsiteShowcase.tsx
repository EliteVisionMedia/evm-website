import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { WebsiteItem } from '../../data/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;

/** Abstract long page that scrolls inside the browser frame on hover. */
function MockPage({ name, i }: { name: string; i: number }) {
  const hero = ['bg-[linear-gradient(120deg,#0c0d11,#14303a)]', 'bg-[radial-gradient(60%_60%_at_60%_40%,#6fd3d4,#019A9D_60%,#017F82)]', 'bg-[linear-gradient(140deg,#dff3f3,#9fd8d9)]'][i % 3];
  return (
    <div className="space-y-3 p-4 transition-transform duration-[2500ms] ease-in-out group-hover:-translate-y-[45%]">
      <div className="flex items-center justify-between"><span className="font-display text-[11px] font-bold text-ink">{name}</span><span className="flex gap-1.5">{[0, 1, 2].map((k) => <span key={k} className="h-1.5 w-6 rounded bg-mist" />)}</span></div>
      <div className={`flex aspect-[16/7] flex-col justify-end rounded-lg p-4 ${hero}`}><span className="h-2.5 w-1/2 rounded bg-white/90" /><span className="mt-1.5 h-2.5 w-1/3 rounded bg-white/90" /><span className="mt-3 h-4 w-16 rounded-full bg-teal" /></div>
      <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((k) => <span key={k} className="aspect-[4/3] rounded-md bg-paper" />)}</div>
      <span className="block h-2 w-2/3 rounded bg-mist" /><span className="block h-2 w-1/2 rounded bg-mist" />
      <div className="grid grid-cols-2 gap-2">{[0, 1].map((k) => <span key={k} className="aspect-video rounded-md bg-[#cfeaea]" />)}</div>
      <div className="grid grid-cols-4 gap-2">{[0, 1, 2, 3].map((k) => <span key={k} className="aspect-square rounded-md bg-paper" />)}</div>
      <span className="block h-16 rounded-md bg-ink" />
    </div>
  );
}

export default function WebsiteShowcase({ items }: { items: WebsiteItem[] }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {items.map((w, i) => (
        <motion.article
          key={w.name}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.9, ease }}
          className={`grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-[5vw] ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
        >
          <div className="group relative rounded-[26px] bg-[#e6f4f4] p-[5%] pb-[9%]">
            <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_30px_60px_-25px_rgba(1,127,130,.45)] ring-1 ring-black/5">
              <div className="flex items-center gap-1.5 border-b border-mist px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff6159]" /><span className="h-2 w-2 rounded-full bg-[#ffbd2e]" /><span className="h-2 w-2 rounded-full bg-[#28c941]" />
                <span className="ml-2 truncate rounded-full bg-paper px-3 py-0.5 text-[10px] font-medium text-slate">{w.name}</span>
              </div>
              <div className="aspect-[16/10] overflow-hidden">
                {w.screenshot ? <img src={w.screenshot} alt={`${w.name} website homepage`} loading="lazy" className="w-full transition-transform duration-[2500ms] ease-in-out group-hover:-translate-y-[45%]" /> : <MockPage name={w.name} i={i} />}
              </div>
            </div>
            <div className="absolute -bottom-2 right-[6%] w-[22%] overflow-hidden rounded-[16px] border-[4px] border-ink bg-white shadow-2xl transition-transform duration-700 group-hover:-translate-y-3">
              <div className="aspect-[9/17] overflow-hidden"><div className="origin-top-left scale-[0.5] w-[200%]"><MockPage name={w.name} i={i} /></div></div>
            </div>
            <span className="sample-tag absolute left-[5%] top-2">Preview placeholder</span>
          </div>
          <div>
            <span className="font-display text-sm font-bold text-teal">{String(i + 1).padStart(2, '0')}</span>
            <span className="ml-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate">{w.category}</span>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.015em] md:text-[40px]">{w.name}</h3>
            <p className="mt-3 max-w-[40ch] text-slate">{w.description}</p>
            {w.url && (
              <a href={w.url} target="_blank" rel="noopener noreferrer" className="group/b relative mt-6 inline-flex min-h-[48px] items-center gap-2.5 overflow-hidden rounded-full bg-teal px-6 py-3 text-[15px] font-semibold text-white">
                <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover/b:scale-x-100" />
                <span className="relative">View Website</span><ArrowUpRight size={17} className="relative transition-transform group-hover/b:rotate-45" />
              </a>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
