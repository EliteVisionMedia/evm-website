import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import Reveal from '../components/Reveal';
import { processSteps } from '../data/site';
import type { ProcessStep } from '../types';

/** Card background photos (one per step). */
const photos: Record<ProcessStep['theme'], string> = {
  coal: '/images/process/discover.webp',
  mist: '/images/process/strategy.webp',
  'teal-soft': '/images/process/create.webp',
  teal: '/images/process/deliver.webp',
};

function CardBody({ step }: { step: ProcessStep }) {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-[20px] bg-[#0C0D11] bg-cover bg-center p-7 text-white shadow-[0_30px_60px_-20px_rgba(1,154,157,0.45)] ring-1 ring-white/10 lg:p-8"
      style={{ backgroundImage: `url('${photos[step.theme]}')` }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/55 to-transparent" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
      />

      {/* Top-right oversized number matching reference */}
      <span className="relative self-end font-display text-[22vw] font-bold leading-[0.82] tracking-[-0.03em] sm:text-[96px] md:text-[6.8vw] min-[1440px]:text-[98px]">
        {step.number}
      </span>

      {/* Title & Description positioned in the lower half */}
      <div className="relative mt-auto pt-6">
        <h3 className="font-display text-xl font-bold tracking-[-0.015em] lg:text-[22px]">
          {step.title}
        </h3>
        <p className="mt-3 text-[14px] font-normal leading-[1.45] text-white/85 lg:text-[15px]">
          {step.description}
        </p>
      </div>
    </div>
  );
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const GAP = 16;

/** Exact card sizing matching the 4-column reference layout */
function useLayout() {
  const calc = () => {
    if (typeof window === 'undefined') return { cardW: 260, cardH: 450 };
    const vh = window.innerHeight;
    // Match container width (~1160px max on desktop) so 4 cards span cleanly under the heading
    const containerW = Math.min(window.innerWidth * 0.86, 1180);
    const cardW = (containerW - 3 * GAP) / 4;
    // Aspect ratio ~0.58 (tall portrait), capped so heading + cards fit inside 100vh
    const cardH = Math.min(vh * 0.54, cardW / 0.58, 500);
    return { cardW, cardH };
  };

  const [l, setL] = useState(calc);
  useEffect(() => {
    const on = () => setL(calc());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return l;
}

/**
 * Desktop Staircase:
 * - Card 01 starts aligned at y = 0.
 * - Cards 02, 03, 04 start staggered downward by ~54% of cardH per step (so 03 peeks from the bottom just like the screenshot).
 * - Each card glides smoothly into the top row one after another as you scroll.
 */
function StairCard({
  step,
  index,
  progress,
  cardW,
  cardH,
}: {
  step: ProcessStep;
  index: number;
  progress: MotionValue<number>;
  cardW: number;
  cardH: number;
}) {
  // Card 0 stays at 0; Cards 1, 2, 3 animate sequentially across scroll progress
  const stepSpan = 0.26;
  const start = (index - 1) * 0.22;
  const end = start + stepSpan;

  // Stagger offset: 0.54 * cardH per index matches the exact half-card step in the reference
  const initialOffset = index * (cardH * 0.54);

  const y = useTransform(progress, (p) => {
    if (index === 0) return 0;
    const t = easeOutCubic(clamp01((p - start) / (end - start)));
    return initialOffset * (1 - t);
  });

  return (
    <motion.div
      style={{ y, width: cardW, height: cardH }}
      className="shrink-0 will-change-transform"
    >
      <CardBody step={step} />
    </motion.div>
  );
}

function DesktopStairs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  });
  const { cardW, cardH } = useLayout();

  return (
    <div ref={ref} className="relative hidden h-[320vh] md:block">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-12">
        <div className="mx-auto w-full max-w-[1180px]">
          <Heading />
          <div className="mt-12 flex items-start justify-between" style={{ gap: GAP }}>
            {processSteps.map((s, i) => (
              <StairCard
                key={s.number}
                step={s}
                index={i}
                progress={progress}
                cardW={cardW}
                cardH={cardH}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile: alternating offset stack */
function MobileStack() {
  const reduce = useReducedMotion();
  return (
    <div className="md:hidden">
      <Heading />
      <div className="mt-8 flex flex-col gap-5">
        {processSteps.map((s, i) => (
          <motion.div
            key={s.number}
            initial={reduce ? false : { opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`h-[440px] w-[86%] ${i % 2 ? 'self-end' : 'self-start'}`}
          >
            <CardBody step={s} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Heading() {
  return (
    <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      <div>
        <h2 className="font-display text-[12vw] font-bold leading-[0.98] tracking-[-0.02em] text-white md:text-[52px] lg:text-[60px]">
          Our
          <br />
          Process
        </h2>
      </div>
      <p className="max-w-[38ch] text-[15px] leading-relaxed text-white/55 md:text-right">
        A four-step path from brief to launch, so you always know what&apos;s happening and what&apos;s next.
      </p>
    </Reveal>
  );
}

export default function OurProcess() {
  const reduce = useReducedMotion();
  return (
    <section id="process" className="bg-[#090808] text-paper">
      <div className="wrap section-pad md:!py-0">
        {reduce ? (
          <div className="mx-auto max-w-[1180px] py-20">
            <Heading />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((s) => (
                <div key={s.number} className="h-[460px]">
                  <CardBody step={s} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <DesktopStairs />
            <MobileStack />
          </>
        )}
      </div>
    </section>
  );
}