import { useCallback, useState } from 'react';
import { motion, type PanInfo } from 'motion/react';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import Modal from './Modal';
import Placeholder from './Placeholder';
import { artAt, type ImageItem } from '../../data/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;
const span = { tall: 'row-span-2', wide: 'sm:col-span-2', square: '' };

/** Editorial mixed-size grid with a keyboard/swipe lightbox. `offset` varies the placeholder art per gallery. */
export default function EditorialGallery({ items, offset = 0, dark = false }: { items: ImageItem[]; offset?: number; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);
  const onKey = useCallback((e: KeyboardEvent) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); }, [step]);
  const onDragEnd = (_: unknown, info: PanInfo) => { if (info.offset.x < -60) step(1); else if (info.offset.x > 60) step(-1); };
  const cur = open !== null ? items[open] : null;

  return (
    <>
      <div className="grid auto-rows-[44vw] grid-cols-2 gap-3 sm:auto-rows-[26vw] md:gap-4 lg:grid-cols-4 lg:auto-rows-[17vw] min-[1440px]:auto-rows-[245px]">
        {items.map((it, i) => (
          <motion.button
            key={it.id}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Enlarge ${it.title}, ${it.type}`}
            initial={{ opacity: 0, clipPath: 'inset(14% 0% 0% 0% round 18px)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 18px)' }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease }}
            className={`group relative overflow-hidden rounded-[18px] text-left ${span[it.shape]}`}
          >
            <div className="absolute inset-0 transition-transform duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]">
              {it.src ? <img src={it.src} alt={`${it.title}: ${it.type}`} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <Placeholder bg={artAt(i + offset)} />}
            </div>
            <div className="absolute inset-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 via-black/0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
              <div className="translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-teal">{it.type}</span>
                <h3 className="font-display text-lg font-bold text-white">{it.title}</h3>
              </div>
              <Maximize2 size={18} className="mb-1 flex-none text-white" />
            </div>
          </motion.button>
        ))}
      </div>

      <Modal open={!!cur} label={cur ? `${cur.title} image` : ''} onClose={() => setOpen(null)} onKey={onKey}>
        {cur && (
          <div className="flex flex-col items-center">
            <motion.div key={cur.id} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3} onDragEnd={onDragEnd}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease }}
              className={`relative mx-auto max-w-full cursor-grab overflow-hidden rounded-[18px] active:cursor-grabbing ${cur.src ? '' : `w-full max-w-[900px] ${cur.shape === 'tall' ? 'aspect-[3/4] max-h-[75vh] max-w-[56vh]' : cur.shape === 'wide' ? 'aspect-[16/9]' : 'aspect-square max-h-[75vh] max-w-[75vh]'}`}`}>
              {cur.src ? <img src={cur.src} alt={`${cur.title}: ${cur.type}`} className="block h-auto max-h-[80vh] w-auto max-w-full object-contain" draggable={false} /> : <Placeholder bg={artAt(open! + offset)} />}
            </motion.div>
            <div className={`mt-5 flex w-full max-w-[900px] items-center justify-between gap-4 text-white ${dark ? '' : ''}`}>
              <button type="button" aria-label="Previous image" onClick={() => step(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-colors hover:bg-teal"><ArrowLeft size={20} /></button>
              <div className="text-center">
                <p className="font-display text-lg font-bold">{cur.title}</p>
                <p className="text-sm text-white/60">{cur.type} · {open! + 1} / {items.length}</p>
              </div>
              <button type="button" aria-label="Next image" onClick={() => step(1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-colors hover:bg-teal"><ArrowRight size={20} /></button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
