import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Button from '../components/Button';
import { services } from '../data/site';

const metrics = [
  { value: '10+', label: 'Years of Craft & Strategy' },
  { value: '500M+', label: 'Campaign Reach & Impressions' },
  { value: '220+', label: 'Brands, Sites & Films Launched' },
];

/**
 * Giant "VISION" word with a moving colour field clipped inside the letters,
 * followed by a dark band with studio metrics, positioning line, CTAs and service pills.
 */
export default function BigWordBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgPos = useTransform(scrollYProgress, [0, 1], ['0% 50%', '100% 50%']);
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section ref={ref} aria-label="Elite Vision Media" className="overflow-hidden pt-14 md:pt-20">
      <div className="wrap relative flex items-end justify-between gap-4">
        <span className="hidden pb-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink/75 sm:inline-block">
          ©{new Date().getFullYear()}
        </span>

        <motion.h2
          aria-label="Vision"
          className="mx-auto select-none whitespace-nowrap px-[max(8px,1.5vw)] text-center font-display text-[24vw] font-bold uppercase leading-[0.8] tracking-[-0.015em] text-transparent sm:text-[21vw] lg:text-[19vw]"
          style={{
            backgroundImage:
              'linear-gradient(100deg, #071B2B 0%, #017F82 18%, #6fd3d4 30%, #019A9D 42%, #071B2B 55%, #167D8D 68%, #6fd3d4 80%, #017F82 90%, #071B2B 100%)',
            backgroundSize: '220% 100%',
            backgroundPosition: reduce ? '50% 50%' : bgPos,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          Vision
        </motion.h2>

        <span className="hidden pb-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink/75 sm:inline-block">
          EVM Studio
        </span>
      </div>

      <div className="relative mt-10 overflow-hidden bg-ink text-white md:mt-14">
        {/* Placeholder art: replace with an EVM shoot photo (object-cover) when available. */}
        <motion.div
          aria-hidden
          style={{
            y: reduce ? 0 : y,
            background:
              'radial-gradient(40% 60% at 50% 70%, #167D8D, transparent 70%), radial-gradient(50% 70% at 85% 20%, #019A9D, transparent 60%), radial-gradient(45% 60% at 10% 90%, #071B2B, transparent 60%), #071B2B',
          }}
          className="absolute inset-[-10%]"
        />
        <span className="absolute right-4 top-4 font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-white/50 md:right-[5vw]">
          Photo · SAMPLE
        </span>

        <div className="wrap relative grid min-h-[540px] content-between gap-10 py-10 md:min-h-[500px] md:py-14 lg:min-h-[580px]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-x-10 gap-y-3 font-sans text-xs font-medium uppercase tracking-[0.1em] text-white/70">
              <span>Coimbatore</span>
              <span>Tamil Nadu</span>
              <span>India</span>
            </div>

            <dl className="grid grid-cols-1 gap-6 border-y border-white/15 py-5 sm:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {m.value}
                  </dt>
                  <dd className="mt-1 text-xs font-medium text-[#B9E4E8]/80 sm:text-sm">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-2">
            <div>
              <p className="max-w-[40ch] text-lg font-medium leading-snug md:text-xl">
                Digital marketing, websites and video production, planned together so your brand grows from one clear strategy.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/contact" variant="light">
                  Start your project
                </Button>
                <Button
                  to="/work"
                  variant="outline"
                  className="text-white hover:!border-white hover:!bg-white hover:!text-ink"
                >
                  See our work
                </Button>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {[...services.map((s) => s.title), 'Social Media', 'SEO', 'Brand Films'].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/40 bg-white/5 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}