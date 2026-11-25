import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Code2, Megaphone, Play, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const ease = [0.22, 1, 0.36, 1] as const;

const tiles = [
  { icon: Megaphone, label: 'Digital Marketing', to: '/services/digital-marketing' },
  { icon: Code2, label: 'Web Design & Development', to: '/services/web-design-development' },
  { icon: Play, label: 'Video Editing', to: '/services/video-production' },
];

/**
 * Independent float loop + subtle hover lift with 3D depth.
 * `duration` is the full up-down cycle; `delay` offsets the phase so cards never move in sync.
 */
function Floating({ children, duration, delay = 0, amp = 8, depth = 30, rotate = 0, tilt = 0, hoverScale = 1.03, className = '' }: { children: ReactNode; duration: number; delay?: number; amp?: number; depth?: number; rotate?: number; tilt?: number; hoverScale?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ zIndex: depth }}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4 + delay, ease }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -amp], rotate: [-rotate, rotate], rotateY: [-tilt, tilt] }}
        transition={{ duration: duration / 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay }}
        whileHover={reduce ? undefined : { scale: hoverScale, transition: { duration: 0.35, ease: 'easeOut' } }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function Visual() {
  return (
    <div className="relative mx-auto aspect-[1/0.78] w-full max-w-[760px] [container-type:inline-size] [perspective:1600px] lg:-mr-[5vw] lg:ml-[-4vw] lg:w-[calc(100%+9vw)] lg:max-w-none min-[1440px]:-mr-[72px]" aria-label="Illustration: EVM website on a laptop with sample marketing results" role="img">
      {/* decorative shapes */}
      <div aria-hidden className="absolute left-[27%] top-[0%] h-[44%] w-[30%] rounded-full bg-teal/90 [clip-path:inset(0_0_50%_0)] scale-y-[2] origin-top" />
      <div aria-hidden className="absolute -right-[6%] top-[40%] h-[42%] w-[22%] rounded-full bg-gradient-to-br from-[#4fd0d2] to-teal-deep" />
      <svg aria-hidden viewBox="0 0 100 86" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <path d="M40 10 C 62 -2, 92 0, 99 14 S 96 40, 82 52" stroke="#019A9D" strokeOpacity=".45" strokeWidth=".22" />
      </svg>
      <motion.span aria-hidden className="absolute right-[10%] top-[1%] text-teal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <Send className="h-[5.5cqw] w-[5.5cqw] rotate-[10deg] fill-teal" strokeWidth={1.4} />
      </motion.span>

      {/* laptop */}
      <Floating duration={6} amp={6} tilt={1.5} hoverScale={1.01} depth={0} className="left-[16%] top-[13%] w-[84%]">
        <img src="/images/home/hero/laptop.webp" alt="" draggable={false} className="block h-auto w-full select-none" />
      </Floating>

      {/* Meta Ads */}
      <Floating duration={4.5} delay={0.2} rotate={1.2} depth={60} className="left-[11%] top-[8%] w-[18%]">
        <img src="/images/home/hero/meta.webp" alt="" draggable={false} className="block h-auto w-full select-none" />
      </Floating>

      {/* Google Ads */}
      <Floating duration={5.5} delay={0.9} rotate={0.6} depth={45} className="left-[7%] top-[38%] w-[20%]">
        <img src="/images/home/hero/google.webp" alt="" draggable={false} className="block h-auto w-full select-none" />
      </Floating>

      {/* Video preview */}
      <Floating duration={4} delay={0.35} hoverScale={1.05} depth={80} className="left-[12%] top-[64%] w-[30%]">
        <img src="/images/home/hero/video.webp" alt="" draggable={false} className="block h-auto w-full select-none" />
      </Floating>

      {/* Campaign Growth */}
      <Floating duration={5} delay={1.3} rotate={0.5} depth={70} className="left-[66%] top-[58%] w-[30%]">
        <img src="/images/home/hero/campaign.webp" alt="" draggable={false} className="block h-auto w-full select-none" />
      </Floating>
    </div>
  );
}

const fadeUp = (delay: number, reduce: boolean | null) =>
  reduce ? { initial: false as const } : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease } };

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#f7f9f9]" aria-labelledby="hero-heading">
      {/* soft background wash and curves */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_30%,rgba(1,154,157,.10),transparent_70%)]" />
      <svg aria-hidden viewBox="0 0 1440 200" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] w-full" fill="none">
        <path d="M0 180 C 300 40, 700 40, 1440 160" stroke="#019A9D" strokeOpacity=".12" />
        <path d="M400 200 C 700 80, 1100 60, 1440 120" stroke="#019A9D" strokeOpacity=".10" />
      </svg>

      <div className="wrap relative grid items-center gap-10 pb-14 pt-6 md:pb-20 md:pt-10 lg:grid-cols-[1fr_1fr] lg:gap-0 lg:pb-[5vw] lg:pt-[4vw]">
        <div className="min-w-0">
          {/* <motion.span {...fadeUp(0.05, reduce)} className="inline-flex items-center gap-2.5 rounded-full bg-[#e6f4f4] px-4 py-2 text-[15px] font-medium text-ink">
            <span className="h-2.5 w-2.5 rounded-full bg-teal" /> Creative Digital Agency
          </motion.span> */}

          <motion.h1 id="hero-heading" {...fadeUp(0.15, reduce)} className="mt-7 font-display text-[11vw] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-[8vw] lg:whitespace-nowrap lg:text-[4.7vw] min-[1440px]:text-[68px]">
            Digital Experiences <br className="hidden lg:block" />That <span className="text-teal">Drive Growth.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.3, reduce)} className="mt-7 max-w-[56ch] text-[17px] leading-relaxed text-[#4a4e5a] md:text-[19px]">
            We design, build, and grow digital experiences that help businesses stand out, connect with customers, and achieve real results.
          </motion.p>

          <motion.ul {...fadeUp(0.42, reduce)} className="mt-9 grid grid-cols-4 gap-2 sm:gap-5 lg:max-w-[620px]" aria-label="Our services">
            {tiles.map(({ icon: Icon, label, to }) => (
              <li key={label}>
                <Link to={to} className="group flex flex-col items-center gap-2.5 text-center text-[12px] font-medium leading-tight text-ink sm:text-[15px]">
                  <span className="grid aspect-[1.35/1] w-full max-w-[104px] place-items-center rounded-2xl bg-[#e6f4f4]/80 shadow-[0_10px_24px_-18px_rgba(1,154,157,.6)] text-teal-deep transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-teal group-hover:text-white group-hover:shadow-[0_14px_28px_-14px_rgba(1,154,157,.7)]">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.8} />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>

          <motion.div {...fadeUp(0.55, reduce)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="group inline-flex min-h-[54px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-teal px-8 text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-teal-deep">
              Let's Talk <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link to="/work" className="group inline-flex min-h-[54px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] border-teal px-8 text-[16px] font-semibold text-ink transition-colors duration-300 hover:bg-teal hover:text-white">
              Explore Our Work <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </motion.div>
        </div>

        <Visual />
      </div>
    </section>
  );
}
