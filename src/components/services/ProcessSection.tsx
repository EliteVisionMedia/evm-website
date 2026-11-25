import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import type { Step } from '../../data/digitalMarketing';

const ease = [0.22, 1, 0.36, 1] as const;

/** Dark process section: the heading stays pinned on desktop while steps scroll past a filling progress line. */
export default function ProcessSection({ kicker, title, sub, steps }: { kicker: string; title: string; sub: string; steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="overflow-x-clip bg-ink text-paper">
      <div className="wrap section-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[6vw]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="kicker !text-teal">{kicker}</span>
          <h2 className="h-display text-[9vw] leading-[1.03] md:text-[5vw] lg:text-[3.6vw] min-[1440px]:text-[52px]">{title}</h2>
          <p className="mt-5 max-w-[40ch] text-base text-white/60 md:text-lg">{sub}</p>
        </div>
        <ol ref={ref} className="relative space-y-4">
          <span aria-hidden className="absolute bottom-8 left-[27px] top-8 w-px bg-white/10 md:left-[31px]" />
          <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-8 left-[27px] top-8 w-px origin-top bg-teal md:left-[31px]" />
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.7, ease }}
              className="group relative flex gap-5 rounded-[20px] p-2 transition-colors duration-500 hover:bg-white/[0.04] md:gap-7 md:p-4"
            >
              <span className="relative z-10 grid h-[40px] w-[40px] flex-none place-items-center rounded-full bg-teal font-display text-sm font-bold text-white ring-8 ring-ink md:h-12 md:w-12 md:text-base">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pb-4 pt-1.5 md:pt-2.5">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.015em] md:text-[28px]">{s.title}</h3>
                  <s.icon size={20} className="text-teal opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.7] text-white/65 md:text-base">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
