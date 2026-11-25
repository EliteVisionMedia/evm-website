import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ServiceCTA from '../components/services/ServiceCTA';
import PillLink from '../components/services/PillLink';
import Reveal from '../components/Reveal';
import evmLogo from '../assets/evm-logo.png';
import useSeo, { breadcrumbSchema, evmOrg } from '../lib/useSeo';
import { processSteps } from '../data/site';
import { aboutSeo, aboutValues, capabilities, journey, team, whoWeAre } from '../data/about';

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');

const schema = [
  { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Elite Vision Media', url: 'https://elitevisionmedia.com/about', about: evmOrg },
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }]),
];

/* 1. Hero: light surface matching the rest of the site with a subtle teal glow and studio frame. */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '5%']);
  const reduce = useReducedMotion();
  const words = 'We turn ideas into visual experiences.'.split(' ');

  return (
    <section ref={ref} className="relative overflow-x-clip bg-paper pb-16 text-ink md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] [background:radial-gradient(55%_65%_at_78%_18%,rgba(1,154,157,.14),transparent_70%)]"
      />

      <div className="wrap relative pt-6 md:pt-8">
        <p className="text-xs text-slate">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink/80">About Us</span>
        </p>

        <div className="mt-6 grid items-end gap-6 lg:mt-8 lg:grid-cols-[1.35fr_1fr] lg:gap-[5vw]">
          <div>
            <motion.span
              className="kicker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              Our story
            </motion.span>

            <h1 className="h-display mt-3 text-[12vw] leading-[0.98] md:text-[8.5vw] lg:text-[5.6vw] min-[1440px]:text-[84px]">
              {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                  <motion.span
                    className={`inline-block ${w === 'visual' ? 'text-teal' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.95, delay: 0.1 + i * 0.07, ease }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <motion.p
            className="max-w-[46ch] text-base leading-relaxed text-slate md:text-lg lg:pb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
          >
            We are a creative team passionate about bringing ideas to life through design,
            technology, marketing and storytelling.
          </motion.p>
        </div>

        <motion.div
          className="relative mt-10 aspect-video w-full overflow-hidden rounded-[20px] bg-ink shadow-[0_30px_70px_-30px_rgba(12,13,17,0.45)] md:mt-14 md:rounded-[28px]"
          initial={reduce ? false : { opacity: 0, clipPath: 'inset(12% 4% 0% 4% round 28px)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
        >
          <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[6%]">
            <video src="/videos/reels/showreel.mp4" poster="/videos/reels/showreel.webp" autoPlay={!reduce} muted loop playsInline preload="metadata" aria-label="EVM showreel" className="absolute inset-0 block h-full w-full object-cover" />
          </motion.div>
          <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 md:inset-x-7 md:bottom-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-md backdrop-blur sm:px-4 sm:py-2 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-teal" />
              Coimbatore, Tamil Nadu
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-white/85 sm:block">EVM Showreel</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* 2. Who we are: editorial statement with offset imagery. */
function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <section className="wrap border-t border-line pb-16 pt-16 md:pb-24 md:pt-20 lg:pb-[7vw] lg:pt-24">
      <div ref={ref} className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-[5vw]">
        <div className="relative hidden lg:block">
          <motion.div style={{ y: y1 }} className="relative ml-[12%] aspect-[3/4] overflow-hidden rounded-[22px]">
            <div className="grid h-full w-full place-items-center bg-white p-[16%]"><img src={evmLogo} alt="Elite Vision Media logo" className="h-auto w-full object-contain" /></div>
          </motion.div>
          {/* <div className="absolute -bottom-6 left-0 aspect-square w-[42%] overflow-hidden rounded-[18px] ring-8 ring-paper">
            <img src="/images/work/model/model-02.webp" alt="Portrait photography by Elite Vision Media" loading="lazy" className="h-full w-full object-cover object-top" />
          </div> */}
        </div>
        <div>
          <Reveal>
            <span className="kicker">Who we are</span>
            <h2 className="h-display text-[11vw] leading-[1] md:text-[7vw] lg:text-[5vw] min-[1440px]:text-[72px]">{whoWeAre.title}</h2>
          </Reveal>
          <Reveal delay={0.1}><p className="mt-8 font-display text-xl font-semibold leading-snug tracking-[-0.01em] md:text-2xl">{whoWeAre.lead}</p></Reveal>
          {whoWeAre.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.15 + i * 0.05}><p className="mt-5 max-w-[60ch] leading-[1.75] text-slate md:text-lg">{p}</p></Reveal>
          ))}
          <div className="mt-8 aspect-[16/10] overflow-hidden rounded-[20px] lg:hidden">
            <div className="relative h-full"><div className="grid h-full w-full place-items-center bg-white px-[22%]"><img src={evmLogo} alt="Elite Vision Media logo" className="h-auto w-full object-contain" /></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 3. Journey: scroll-driven timeline. Entries are placeholders until EVM confirms them. */
function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 50%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  return (
    <section className="bg-ink text-paper">
      <div className="wrap section-pad">
        <div className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
          <div>
            <span className="kicker !text-teal">Our story & journey</span>
            <h2 className="h-display text-[10vw] leading-[1] md:text-[6vw] lg:text-[4.6vw] min-[1440px]:text-[68px]">How we got here.</h2>
          </div>
          <p className="max-w-[36ch] text-white/60">The milestones that shaped EVM. <span className="sample-tag !text-white/45">Placeholders: details to be added by EVM</span></p>
        </div>
        <ol ref={ref} className="relative">
          <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 md:left-1/2" />
          <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-teal md:left-1/2" />
          {journey.map((j, i) => {
            const right = i % 2 === 1;
            return (
              <motion.li
                key={j.title}
                initial={{ opacity: 0, x: right ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.8, ease }}
                className={`relative grid pb-12 pl-12 last:pb-0 md:w-1/2 md:pl-0 ${right ? 'md:ml-auto md:pl-14' : 'md:pr-14 md:text-right'}`}
              >
                <span className={`absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full bg-ink ring-2 ring-teal md:top-2 ${right ? 'md:-left-3' : 'md:-right-3 md:left-auto'}`}>
                  <span className="h-2 w-2 rounded-full bg-teal" />
                </span>
                <span className="font-display text-sm font-bold text-teal">{pad(i + 1)} · {j.when}</span>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.015em] md:text-[32px]">{j.title}</h3>
                <p className={`mt-2 text-white/60 ${j.confirmed ? '' : 'italic'}`}>{j.text}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* 4. What we do: large typographic rows with a floating visual preview on hover (inline visuals on mobile). */
function WhatWeDo() {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const box = useRef<HTMLDivElement>(null);
  return (
    <section className="wrap section-pad">
      <Reveal className="mb-10 md:mb-14">
        <span className="kicker">What we do</span>
        <h2 className="h-display text-[10vw] leading-[1] md:text-[6vw] lg:text-[4.6vw] min-[1440px]:text-[68px]">Four crafts, one studio.</h2>
      </Reveal>
      <div
        ref={box}
        className="relative border-t border-ink/15"
        onMouseMove={(e) => { const r = box.current!.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
        onMouseLeave={() => setHover(null)}
      >
        {capabilities.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.7, delay: i * 0.06, ease }}>
            <Link to={c.to} onMouseEnter={() => setHover(i)} onFocus={() => setHover(null)} className="group grid gap-4 border-b border-ink/15 py-7 md:grid-cols-[80px_1fr_1fr_auto] md:items-center md:gap-8 md:py-10">
              <span className="font-display text-sm font-bold text-teal">{pad(i + 1)}</span>
              <h3 className="font-display text-[8vw] font-bold leading-[1.02] tracking-[-0.02em] transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-teal-deep md:text-[3.6vw] min-[1440px]:text-[52px]">{c.title}</h3>
              <div className="relative aspect-[16/9] overflow-hidden rounded-[16px] bg-ink md:hidden"><img src={c.image} alt={c.alt} loading="lazy" className="h-full w-full object-cover object-[50%_30%]" /></div>
              <p className="max-w-[40ch] text-slate">{c.text}</p>
              <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          </motion.div>
        ))}
        <AnimatePresence>
          {hover !== null && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute z-10 hidden aspect-[4/3] w-[300px] overflow-hidden rounded-[18px] shadow-2xl md:block min-[1440px]:w-[340px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, x: pos.x - 150, y: pos.y - 120 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.6 }}
              style={{ left: 0, top: 0 }}
            >
              <img src={capabilities[hover].image} alt="" className="h-full w-full bg-ink object-cover object-[50%_30%]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* 5. Values: oversized outlined words that fill with ink as they enter view. */
function Values() {
  return (
    <section className="bg-[#e6f4f4]">
      <div className="wrap section-pad">
        <Reveal className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <div>
            <span className="kicker">Our values</span>
            <h2 className="h-display text-[10vw] leading-[1] md:text-[6vw] lg:text-[4.6vw] min-[1440px]:text-[68px]">What we stand for.</h2>
          </div>
          <p className="max-w-[30ch] text-slate">We fuel bold ideas, driving them forward with sharp strategy.</p>
        </Reveal>
        <div className="space-y-2">
          {aboutValues.map((v, i) => (
            <motion.article key={v.title} initial="off" whileInView="on" viewport={{ once: true, margin: '-25% 0px -25% 0px' }} className="group grid min-w-0 gap-4 border-t border-ink/15 py-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center md:gap-10">
              <div className="relative">
                <h3 className="text-outline font-display text-[13vw] font-extrabold leading-[0.9] tracking-[-0.03em] md:text-[6.2vw] min-[1440px]:text-[90px]">{v.title}</h3>
                <motion.span aria-hidden variants={{ off: { clipPath: 'inset(0 100% 0 0)' }, on: { clipPath: 'inset(0 0% 0 0)' } }} transition={{ duration: 1.1, delay: 0.1, ease }}
                  className="absolute inset-0 font-display text-[13vw] font-extrabold leading-[0.9] tracking-[-0.03em] text-ink md:text-[6.2vw] min-[1440px]:text-[90px]">
                  {v.title}
                </motion.span>
              </div>
              <div className="flex gap-4">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-white text-teal-deep transition-colors duration-500 group-hover:bg-teal group-hover:text-white"><v.icon size={22} /></span>
                <p className="leading-[1.75] text-slate">{v.text}</p>
              </div>
              <span className="sr-only">Value {i + 1}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6. Process: sticky left header paired with a scroll-driven vertical timeline on the right. */
function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 75%'] });
  const line = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  return (
    <section className="bg-ink text-paper">
      <div className="wrap section-pad">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <span className="kicker !text-teal">Our creative process</span>
            <h2 className="h-display mt-2 max-w-[14ch] text-[10vw] leading-[0.98] md:text-[5.5vw] lg:text-[56px]">
              Discover. Strategy. Create. Deliver.
            </h2>
            <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-white/65">
              We start with the business problem, not with a list of platforms or tools.
            </p>
          </Reveal>

          <div className="relative pl-14 sm:pl-16">
            <span
              aria-hidden
              className="absolute bottom-6 left-[19px] top-6 w-px bg-white/15 sm:left-[23px]"
            />
            <motion.span
              aria-hidden
              style={{ scaleY: line }}
              className="absolute bottom-6 left-[19px] top-6 w-px origin-top bg-teal sm:left-[23px]"
            />

            <ol ref={ref} className="flex flex-col gap-10 md:gap-12">
              {processSteps.map((s, i) => (
                <motion.li
                  key={s.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                  transition={{ duration: 0.65, delay: i * 0.08, ease }}
                  className="group relative"
                >
                  <span className="absolute -left-14 top-0.5 grid h-10 w-10 place-items-center rounded-full bg-teal font-display text-xs font-bold text-white ring-8 ring-ink transition-transform duration-300 group-hover:scale-110 sm:-left-16 sm:h-12 sm:w-12 sm:text-sm">
                    {s.number}
                  </span>
                  <div className="pt-0.5 sm:pt-1.5">
                    <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-white sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-white/70 sm:text-base">
                      {s.description}
                    </p>
                    {s.detail && (
                      <p className="mt-3 max-w-[46ch] text-xs leading-relaxed text-white/45 sm:text-sm">
                        {s.detail}
                      </p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 7. Behind the scenes: placeholder mosaic, ready for real team and studio photos. */
function Team() {
  const shape = { wide: 'md:col-span-2', tall: 'md:row-span-2', square: '' };
  return (
    <section className="wrap section-pad">
      <div className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-2 lg:items-end">
        <Reveal>
          <span className="kicker">Behind the scenes</span>
          <h2 className="h-display text-[10vw] leading-[1] md:text-[6vw] lg:text-[4.6vw] min-[1440px]:text-[68px]">The people behind the work.</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:justify-self-end">
          <p className="max-w-[42ch] text-slate">Strategists, designers, developers, photographers and filmmakers working as one team. <span className="sample-tag">Team photos coming soon</span></p>
          <div className="mt-6"><PillLink to="/contact" tone="outline">Work with us</PillLink></div>
        </Reveal>
      </div>
      <div className="grid auto-rows-[52vw] gap-3 sm:auto-rows-[30vw] md:grid-cols-3 md:auto-rows-[20vw] md:gap-4 min-[1440px]:auto-rows-[290px]">
        {team.map((t, i) => (
          <motion.div key={t.label} initial={{ opacity: 0, clipPath: 'inset(15% 0% 0% 0% round 20px)' }} whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 20px)' }} viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease }}
            className={`group relative overflow-hidden rounded-[20px] ${shape[t.shape]}`}>
            <img src={t.src} alt={`${t.label} by Elite Vision Media`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full bg-ink object-cover object-[50%_30%] transition-transform duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">{t.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function About() {
  useSeo({ ...aboutSeo, schema });
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <Journey />
      <WhatWeDo />
      <Values />
      <Process />
      <Team />
      <ServiceCTA
        title="Let's create something meaningful together."
        text="Have an idea, a project or a vision for your brand? Let's bring it to life."
        button="Start a Project"
        secondary="Explore Our Work"
        secondaryTo="/work"
      />
    </main>
  );
}