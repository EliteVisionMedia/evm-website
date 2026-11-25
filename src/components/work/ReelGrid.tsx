import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Play } from 'lucide-react';
import Modal from './Modal';
import type { VideoItem } from '../../data/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Vertical (9:16) reel grid. Only the lightweight poster loads with the page;
 * a video file is requested only when its card is clicked.
 */
export default function ReelGrid({ items }: { items: VideoItem[] }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const current = open !== null ? items[open] : null;

  const modalKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : Math.min(items.length - 1, o + 1)));
    if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : Math.max(0, o - 1)));
  }, [items.length]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {items.map((v, i) => (
          <motion.li
            key={v.id}
            className={v.wide ? 'col-span-full' : undefined}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, delay: v.wide ? 0 : ((i - 1) % 4) * 0.08, ease }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Play ${v.title}`}
              className={`group relative block w-full ${v.wide ? 'aspect-video' : 'aspect-[9/16]'} overflow-hidden rounded-[18px] bg-[#0C0D11] text-left ring-1 ring-white/10 transition-shadow duration-500 hover:shadow-[0_30px_60px_-24px_rgba(1,154,157,.65)] md:rounded-[22px]`}
            >
              {v.poster && (
                <img src={v.poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]" />
              )}
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-teal text-white shadow-[0_0_0_8px_rgba(1,154,157,.25)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#017F82] md:h-16 md:w-16">
                  <Play size={22} fill="currentColor" className="ml-0.5" />
                </span>
              </span>
              <span className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-teal">{v.type}</span>
                <span className="mt-1 block font-display text-base font-bold leading-tight text-white md:text-xl">{v.title}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <Modal open={!!current} label={current ? `${current.title} reel` : ''} onClose={() => setOpen(null)} onKey={modalKey}>
        {current?.video && (
          <div className="mx-auto w-fit overflow-hidden rounded-[18px] bg-black">
            <video
              key={current.id}
              src={current.video}
              poster={current.poster}
              controls
              autoPlay
              playsInline
              preload="none"
              className={`block h-auto ${current.wide ? 'aspect-video w-[min(calc(100vw-2rem),1200px,calc(85vh*16/9))]' : 'aspect-[9/16] w-[min(calc(100vw-2rem),calc(85vh*9/16))]'}`}
            />
          </div>
        )}
      </Modal>
    </>
  );
}
