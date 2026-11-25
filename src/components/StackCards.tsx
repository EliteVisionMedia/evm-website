import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

export interface StackItem {
  key: string;
  content: ReactNode;
  visual: ReactNode;
}

const ease = [0.22, 1, 0.36, 1] as const;

function StackCard({ item, index, total, progress }: { item: StackItem; index: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  // Each card shrinks a little as the cards after it slide over.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.035]);
  const dim = useTransform(progress, [index / total, Math.min(1, (index + 1) / total)], [0, index === total - 1 ? 0 : 0.07]);

  return (
    <div className="sticky pb-6 md:pb-10" style={{ top: `calc(88px + ${index * 18}px)` }}>
      <motion.article
        style={reduce ? undefined : { scale, transformOrigin: 'top center' }}
        initial={reduce ? false : { opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, ease }}
        className="group relative mx-auto grid max-w-[1320px] overflow-hidden rounded-[24px] bg-white shadow-[0_-16px_40px_-18px_rgba(12,13,17,0.25)] md:grid-cols-2 md:rounded-[28px]"
      >
        <div className="relative order-1 aspect-[4/3] overflow-hidden md:order-2 md:aspect-auto md:min-h-[420px]">
          <div className="absolute inset-0 transition-transform duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]">{item.visual}</div>
        </div>
        <div className="order-2 flex flex-col p-6 md:order-1 md:p-[3.4vw] min-[1440px]:p-12">{item.content}</div>
        {!reduce && <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />}
      </motion.article>
    </div>
  );
}

/** Cards that pin one after another and stack on scroll (desktop and mobile). */
export default function StackCards({ items }: { items: StackItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref} className="relative">
      {items.map((it, i) => (
        <StackCard key={it.key} item={it} index={i} total={items.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

/** Divider row used inside cards: small label, then a value with a teal dot. */
export function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="border-t border-line py-4">
      <span className="text-sm text-slate">{label}</span>
      <div className="mt-2 flex items-center gap-2 text-[17px] font-medium text-ink">
        <span className="h-2.5 w-2.5 rounded-full bg-teal" />
        {value}
      </div>
    </div>
  );
}
