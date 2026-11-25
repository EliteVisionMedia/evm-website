import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import type { Stat } from '../types';

/**
 * Counts from 0 to `value` once when scrolled into view (~1.8s, ease-out).
 * Writes straight to the DOM node, so there are no React re-renders per frame.
 */
export default function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const format = (n: number) => Math.round(n).toLocaleString('en-IN');

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = format(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = format(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  return (
    <div className="pr-5 pt-7">
      <strong className="block font-display text-[12vw] font-bold leading-none tracking-[-0.015em] md:text-[6vw] lg:text-[4.4vw] min-[1440px]:text-[64px]">
        <span ref={ref} aria-label={`${stat.value}${stat.suffix}`}>0</span>
        <sup className="text-[0.45em] text-teal-deep">{stat.suffix}</sup>
      </strong>
      <span className="text-sm text-slate">{stat.label}</span>
    </div>
  );
}
