import { useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { testimonials } from '../data/site';
import type { Testimonial } from '../types';

type RichTestimonial = Testimonial & {
  highlight?: string;
  image?: string;
};

const demoImages = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
];

const extraDemoTestimonials: RichTestimonial[] = [
  {
    name: 'Elena Rostova',
    company: 'Vespera Labs',
    quote:
      'From our very first strategy call, the team understood our positioning better than agencies we had worked with for years. Every milestone shipped on schedule.',
    highlight: 'Our inbound demo requests doubled within six weeks of launch.',
    image: demoImages[3],
    sample: true,
  },
  {
    name: 'Marcus Vance',
    company: 'Northstar Logistics',
    quote:
      'We needed a complete visual overhaul without losing the trust of our enterprise buyers. The new experience feels sharp, fast, and unmistakable.',
    highlight: 'Clear communication, zero guesswork, and measurable ROI.',
    image: demoImages[4],
    sample: true,
  },
  {
    name: 'Priya Nair',
    company: 'Kova Studio',
    quote:
      'They turned a scattered brief into a cohesive brand system and high-converting site. Every detail felt intentional from typography to motion.',
    highlight: 'Best creative partnership we have had to date.',
    image: demoImages[5],
    sample: true,
  },
];

const glows = [
  'radial-gradient(55% 55% at 50% 45%, rgba(1, 154, 157, 0.34) 0%, rgba(1, 127, 130, 0.12) 45%, transparent 75%)',
  'radial-gradient(50% 50% at 35% 60%, rgba(79, 208, 210, 0.22) 0%, transparent 70%)',
  'radial-gradient(55% 55% at 68% 35%, rgba(1, 154, 157, 0.25) 0%, transparent 72%)',
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, idx) => (
        <Star
          key={idx}
          size={15}
          className="fill-teal text-teal"
          strokeWidth={1.75}
        />
      ))}
    </div>
  );
}

function SectionHeader({ className = '' }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-xl px-4 text-center ${className}`}>
      <span className="kicker !text-teal">Testimonials</span>
      <h2 className="h-display mt-2 text-[38px] font-bold leading-[1.02] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl">
        Trusted by
        <br />
        Happy Clients.
      </h2>
      <p className="mx-auto mt-3.5 max-w-[38ch] text-sm leading-relaxed text-white/70 md:text-base">
        In their own words, from the brands we work with.{' '}
        <span className="sample-tag">Sample testimonials, to be replaced</span>
      </p>
    </div>
  );
}

function TestimonialCard({ item, index }: { item: RichTestimonial; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const cardImg = item.image || item.avatar || demoImages[index % demoImages.length];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={() => setFlipped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
      className="group relative h-[430px] w-full max-w-[360px] cursor-pointer select-none sm:h-[440px] sm:w-[350px] focus:outline-none"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Inner Card: flips on hover (desktop) OR tap/click (mobile/touch) */}
      <div
        className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
        }`}
      >
        {/* FRONT FACE (Normal Testimonial Card) */}
        <article className="absolute inset-0 flex flex-col justify-between rounded-[24px] border border-white/10 bg-[#141619] p-6 text-left text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)] [backface-visibility:hidden] md:p-7">
          <div>
            <Stars count={5} />

            <p className="mt-5 text-[14.5px] leading-[1.58] text-white/85">
              “{item.quote}”
            </p>

            {item.highlight && (
              <p className="mt-5 font-display text-[15px] font-bold leading-[1.38] text-white">
                {item.highlight}
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 pt-1">
            <div className="flex min-w-0 items-center gap-3.5">
              <img
                src={cardImg}
                alt={item.name}
                loading="lazy"
                className="h-10 w-10 shrink-0 rounded-[6px] object-cover object-top ring-1 ring-white/15"
              />
              <div className="min-w-0 leading-tight">
                <div className="truncate font-display text-sm font-bold text-white">
                  {item.name}
                  {item.sample && <span className="sample-tag ml-2">Sample</span>}
                </div>
                {item.company && (
                  <div className="mt-0.5 truncate text-xs text-white/60">
                    {item.company}
                  </div>
                )}
              </div>
            </div>

            <span className="shrink-0 text-[11px] font-medium text-teal/80 md:hidden">
              Tap photo
            </span>
          </div>
        </article>

        {/* BACK FACE (Full User Portrait Revealed on Hover / Tap) */}
        <article className="absolute inset-0 overflow-hidden rounded-[28px] border border-teal/40 bg-[#141619] text-left text-white shadow-[0_28px_70px_rgba(1,154,157,0.28)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img
            src={cardImg}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-7">
            <div>
              <Stars count={5} />
              <p className="mt-2 font-display text-lg font-bold text-white">
                {item.name}
              </p>
              {item.company && (
                <p className="text-xs text-white/75">{item.company}</p>
              )}
            </div>
            <span className="text-[11px] font-medium text-white/70 md:hidden">
              Tap to flip
            </span>
          </div>
        </article>
      </div>
    </div>
  );
}

function FloatingTestimonial({
  item,
  index,
  total,
  progress,
}: {
  item: RichTestimonial;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isLeft = index % 2 === 0;
  const step = total > 1 ? index / (total - 1) : 0;

  const start = step * 0.55;
  const end = Math.min(1, start + 0.45);

  const startY = 520 + (index % 2) * 120;
  const endY = -560 - ((total - 1 - index) % 2) * 100;

  const y = useTransform(progress, [start, end], [startY, endY]);

  return (
    <motion.div
      style={{ y }}
      className={`pointer-events-auto absolute inset-x-0 top-1/2 flex -translate-y-1/2 will-change-transform ${
        isLeft
          ? 'justify-start pl-[6%] lg:pl-[12%]'
          : 'justify-end pr-[6%] lg:pr-[12%]'
      }`}
    >
      <TestimonialCard item={item} index={index} />
    </motion.div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const allTestimonials: RichTestimonial[] = [
    ...testimonials.map((t, i) => ({
      ...t,
      image: t.avatar || demoImages[i % demoImages.length],
    })),
    ...extraDemoTestimonials,
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.35,
  });

  const headingScale = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0.96, 1, 0.98]);
  const headingOpacity = useTransform(smoothProgress, [0.03, 0.18, 0.88, 0.98], [0.35, 1, 1, 0.4]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-[#07070a] text-white md:min-h-[340vh]"
    >
      {/* MOBILE LAYOUT (< md): Clean stacked heading + vertical cards with tap-to-flip */}
      <div className="relative overflow-hidden px-4 py-16 md:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `${glows[0]}, ${glows[1]}` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-1/4 top-[14%] h-[32%] w-[150%] -rotate-12 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.05)_0_2px,transparent_2px_10px)] blur-[1px]"
        />

        <SectionHeader className="relative z-10" />

        <div className="relative z-10 mt-10 flex flex-col items-center gap-6">
          {allTestimonials.map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full justify-center"
            >
              <TestimonialCard item={t} index={i} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* DESKTOP LAYOUT (>= md): Pinned dark stage with scroll-gliding 3D flip cards */}
      {reduce ? (
        <div className="hidden py-20 md:block">
          <div className="wrap">
            <SectionHeader />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allTestimonials.map((t, i) => (
                <TestimonialCard key={i} item={t} index={i} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 hidden h-screen w-full items-center justify-center overflow-hidden md:flex">
          {/* Atmospheric radial glow & subtle light streaks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `${glows[0]}, ${glows[1]}, ${glows[2]}` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -left-1/4 top-[24%] h-[42%] w-[150%] -rotate-12 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.04)_0_2px,transparent_2px_10px)] blur-[1px]"
          />

          {/* Centered Backdrop Heading */}
          <motion.div
            style={{ scale: headingScale, opacity: headingOpacity }}
            className="relative z-0 mx-auto max-w-2xl px-6 text-center will-change-transform"
          >
            <SectionHeader />
          </motion.div>

          {/* Staggered Floating Cards Layer */}
          <div className="pointer-events-none absolute inset-0 z-10 mx-auto max-w-[1280px]">
            {allTestimonials.map((t, i) => (
              <FloatingTestimonial
                key={`${t.name}-${i}`}
                item={t}
                index={i}
                total={allTestimonials.length}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
} 