import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Play, X } from 'lucide-react';
import ServiceSplitHero from '../components/services/ServiceSplitHero';
import ServiceOverview from '../components/services/ServiceOverview';
import ServiceFeatures from '../components/services/ServiceFeatures';
import ServiceFAQ from '../components/services/ServiceFAQ';
import ServiceCTA from '../components/services/ServiceCTA';
import RelatedServices from '../components/services/RelatedServices';
import CenteredHeading from '../components/CenteredHeading';
import useSeo, { breadcrumbSchema, faqSchema, serviceSchema } from '../lib/useSeo';
import { vpCta, vpFaqs, vpFeatures, vpHero, vpMore, vpOverview, vpProcess, vpSeo } from '../data/videoProduction';

const ease = [0.22, 1, 0.36, 1] as const;

/** Cinematic scene backdrops (pure CSS, illustrative only). */
const scenes = {
  dusk: 'radial-gradient(40% 30% at 50% 62%, rgba(255,190,120,.55), transparent 70%), linear-gradient(180deg, #0c0d11 0%, #123b44 45%, #019A9D 62%, #0c0d11 63%, #07070a 100%)',
  studio: 'radial-gradient(30% 45% at 30% 35%, rgba(255,255,255,.35), transparent 70%), radial-gradient(50% 60% at 75% 70%, rgba(1,154,157,.55), transparent 65%), linear-gradient(140deg, #07070a, #1a1c25)',
  city: 'radial-gradient(6% 6% at 20% 30%, rgba(111,211,212,.9), transparent), radial-gradient(5% 5% at 70% 40%, rgba(255,200,140,.8), transparent), radial-gradient(7% 7% at 45% 65%, rgba(1,154,157,.9), transparent), radial-gradient(4% 4% at 85% 75%, rgba(255,255,255,.6), transparent), linear-gradient(180deg, #07070a, #0f2a30)',
  product: 'radial-gradient(35% 40% at 50% 50%, rgba(1,154,157,.8), transparent 70%), radial-gradient(60% 30% at 50% 100%, rgba(255,255,255,.12), transparent), #0c0d11',
  motion: 'conic-gradient(from 210deg at 60% 50%, #019A9D, #0c0d11 25%, #017F82 50%, #0c0d11 75%, #019A9D)',
};


function PlayButton({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  const s = size === 'lg' ? 'h-20 w-20 md:h-24 md:w-24' : 'h-14 w-14';
  return (
    <span className={`relative grid ${s} place-items-center rounded-full bg-teal text-white shadow-[0_0_0_10px_rgba(1,154,157,.18)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110`}>
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-teal/40 [animation-duration:2.4s]" />
      <Play size={size === 'lg' ? 28 : 20} fill="currentColor" className="relative ml-1" />
    </span>
  );
}

/** Lightbox shown when a play button is pressed. No real footage yet, so it says so plainly. */
function Player({ open, title, onClose }: { open: boolean; title: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} preview`}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-video w-full max-w-[1100px] overflow-hidden rounded-[20px] text-white"
            style={{ background: scenes.studio }}
          >
            {videoFor[title] ? (
              <video key={title} src={`/videos/reels/${videoFor[title]}.mp4`} poster={`/videos/reels/${videoFor[title]}.webp`} controls autoPlay playsInline preload="none" className="absolute inset-0 h-full w-full bg-black object-contain" />
            ) : (<>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div className="px-6">
                <span className="kicker !text-teal">{title}</span>
                <p className="font-display text-2xl font-bold md:text-4xl">Showreel coming soon</p>
                <p className="mx-auto mt-3 max-w-[40ch] text-sm text-white/60 md:text-base">EVM's video work will play here once it is added to the site.</p>
              </div>
            </div>
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 text-xs text-white/70">
              <Play size={14} fill="currentColor" />
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                <motion.div className="h-full bg-teal" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 8, ease: 'linear', repeat: Infinity }} />
              </div>
              <span>00:00</span>
            </div>
            </>)}
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close video" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-ink">
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroVisual({ onPlay }: { onPlay: () => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <button type="button" onClick={onPlay} aria-label="Play EVM Showreel with sound" className="group relative block aspect-video w-full overflow-hidden rounded-[20px] bg-black text-left">
        <video src="/videos/reels/showreel.mp4" poster="/videos/reels/showreel.webp" autoPlay={!reduce} muted loop playsInline preload="metadata" aria-hidden className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
        <span className="absolute left-4 top-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85">
          <span className="rec-dot h-2 w-2 rounded-full bg-[#ff4d4d]" /> EVM Showreel
        </span>
        <span className="absolute inset-0 grid place-items-center"><PlayButton size="lg" /></span>
        <span className="absolute bottom-5 left-4 right-4 font-display text-2xl font-bold tracking-[-0.015em] text-white md:text-4xl">Watch the showreel</span>
      </button>
      <div aria-hidden className="pointer-events-none absolute -bottom-3 left-6 right-6 flex justify-between">
        {Array.from({ length: 14 }).map((_, i) => <span key={i} className="h-1.5 w-3 rounded-sm bg-white/15" />)}
      </div>
    </div>
  );
}

/** Real EVM videos (public/videos/reels). Played full size, with sound, in the Player. */
const videoFor: Record<string, string> = {
  'EVM Showreel': 'showreel',
  'Corporate Film': 'video-project-4',
  'Fashion Reel': 'reel-29',
  'Food & Product Reel': 'crumbor-r04',
  'Lifestyle Reel': 'edm-bar-06',
};

const gallery: { label: string; type: string; cls: string; aspect: string }[] = [
  { label: 'Corporate Film', type: 'Corporate video', cls: 'md:col-span-2', aspect: 'aspect-video' },
  { label: 'Fashion Reel', type: 'Reels & Shorts', cls: 'md:row-span-2', aspect: 'aspect-[9/16] md:aspect-auto md:h-full' },
  { label: 'Food & Product Reel', type: 'Product video', cls: '', aspect: 'aspect-[4/3]' },
  { label: 'Lifestyle Reel', type: 'Reels & Shorts', cls: '', aspect: 'aspect-[4/3]' },
];

/** Real video tile: lightweight poster, muted preview only while hovered, click to play with sound. */
function VideoThumb({ label, type, aspect, onPlay }: { label: string; type: string; aspect: string; onPlay: () => void }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const f = videoFor[label];
  return (
    <button type="button" onClick={onPlay} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} aria-label={`Play ${label}`} className={`group relative block w-full overflow-hidden rounded-[20px] bg-black text-left ${aspect}`}>
      <img src={`/videos/reels/${f}.webp`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]" />
      {hover && !reduce && <video src={`/videos/reels/${f}.mp4`} muted autoPlay loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover" />}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
      <span className="absolute left-4 top-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85">
        <span className="rec-dot h-2 w-2 rounded-full bg-[#ff4d4d]" /> {type}
      </span>
      <span className="absolute inset-0 grid place-items-center"><PlayButton size="sm" /></span>
      <span className="absolute bottom-5 left-4 right-4 font-display text-lg font-bold tracking-[-0.015em] text-white md:text-xl">{label}</span>
    </button>
  );
}

function Gallery({ onPlay }: { onPlay: (t: string) => void }) {
  return (
    <section className="wrap section-pad pt-0 md:pt-0 lg:pt-0 min-[1440px]:pt-0">
      <div className="mb-8 flex flex-col justify-between gap-3 md:mb-10 md:flex-row md:items-end">
        <h2 className="h-display text-[9vw] leading-[1.05] md:text-[5vw] lg:text-[3.6vw] min-[1440px]:text-[52px]">Formats we produce.</h2>
        <p className="max-w-[38ch] text-slate">Real work shot and edited by EVM. Hover to preview, click to watch with sound.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {gallery.map((g, i) => (
          <motion.div
            key={g.label}
            className={g.cls}
            initial={{ opacity: 0, clipPath: 'inset(18% 8% 0% 8% round 20px)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 20px)' }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1, delay: i * 0.1, ease }}
          >
            <VideoThumb label={g.label} type={g.type} aspect={g.aspect} onPlay={() => onPlay(g.label)} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/** Timeline: horizontal on desktop with a playhead that runs along as you scroll; vertical on mobile. */
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  return (
    <section className="wrap section-pad">
      <CenteredHeading kicker="Our process" title={vpProcess.title} sub={vpProcess.sub} />
      <div ref={ref} className="relative">
        <span aria-hidden className="absolute left-[19px] top-0 h-full w-px bg-mist md:left-0 md:top-[19px] md:h-px md:w-full" />
        <motion.span aria-hidden style={{ scaleX: p }} className="absolute left-0 top-[19px] hidden h-px w-full origin-left bg-teal md:block" />
        <motion.span aria-hidden style={{ scaleY: p }} className="absolute left-[19px] top-0 h-full w-px origin-top bg-teal md:hidden" />
        <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
          {vpProcess.steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              className="group relative pl-14 md:pl-0"
            >
              <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white ring-8 ring-paper transition-colors duration-500 group-hover:bg-teal md:relative">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="rounded-[20px] md:mt-8">
                <h3 className="font-display text-2xl font-bold tracking-[-0.015em]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-slate">{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function More() {
  return (
    <section className="bg-ink text-paper">
      <div className="wrap section-pad">
        <div className="mb-10 grid gap-4 md:mb-14 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="kicker !text-teal">Our approach</span>
            <h2 className="h-display text-[9vw] leading-[1.05] md:text-[5vw] lg:text-[3.6vw] min-[1440px]:text-[52px]">{vpMore.title}</h2>
          </div>
          <p className="max-w-[40ch] text-white/60 md:text-lg lg:justify-self-end">{vpMore.sub}</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[22px] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {vpMore.items.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="group relative bg-ink p-6 transition-colors duration-500 hover:bg-[#10262a] md:p-8"
            >
              <span className="font-display text-sm font-bold text-teal">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-8 font-display text-xl font-bold tracking-[-0.01em] md:text-2xl">{m.title}</h3>
              <p className="mt-2 text-white/60">{m.text}</p>
              <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-teal transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const schema = [
  serviceSchema('Video Production', vpSeo.description, vpSeo.path, vpFeatures.map((f) => f.title)),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Video Production', path: vpSeo.path }]),
  faqSchema(vpFaqs),
];

export default function VideoProduction() {
  useSeo({ ...vpSeo, schema });
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <main>
      <ServiceSplitHero
        {...vpHero}
        dark
        crumb="Video Production"
        visual={<HeroVisual onPlay={() => setPlaying('EVM Showreel')} />}
        primary={{ label: 'Start Your Video Project', to: '/contact' }}
        secondary={{ label: 'Explore Our Work', to: '/work' }}
      />
      <ServiceOverview {...vpOverview} />
      <Gallery onPlay={setPlaying} />
      <ServiceFeatures dark kicker="What we offer" title="Our video production services." sub="Creative video solutions for businesses, brands and digital platforms." features={vpFeatures} />
      <Timeline />
      <More />
      <ServiceFAQ title="Questions about video production." faqs={vpFaqs} />
      <RelatedServices current="video-production" />
      <ServiceCTA title={vpCta.title} text={vpCta.text} button="Start Your Video Project" secondary="Contact EVM" />
      <Player open={!!playing} title={playing ?? ''} onClose={() => setPlaying(null)} />
    </main>
  );
}
