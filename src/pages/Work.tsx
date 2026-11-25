import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import ReelGrid from '../components/work/ReelGrid';
import EditorialGallery from '../components/work/EditorialGallery';
import WebsiteShowcase from '../components/work/WebsiteShowcase';
import ServiceCTA from '../components/services/ServiceCTA';
import useSeo, { breadcrumbSchema } from '../lib/useSeo';
import { categories, photos, sectionFor, stats, videos, websites, type Category } from '../data/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;

const seo = {
  title: 'Our Work | Video, Photography, Design & Websites | Elite Vision Media',
  description: 'Explore the Elite Vision Media portfolio: reels, model and product photography and websites from our Coimbatore studio.',
  path: '/work',
  schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Our Work', path: '/work' }])],
};

function Hero() {
  const words = 'Work that speaks louder than words.'.split(' ');
  const shown = stats.filter((s) => s.verified);
  return (
    <section className="wrap pb-12 pt-10 md:pb-16 md:pt-16 lg:pt-20">
      <motion.span className="kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>Our work</motion.span>
      <h1 className="h-display max-w-[14ch] text-[13vw] leading-[0.98] md:text-[9vw] lg:text-[7.4vw] min-[1440px]:text-[108px]">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span className={`inline-block ${i === 3 ? 'text-teal' : ''}`} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease }}>{w}&nbsp;</motion.span>
          </span>
        ))}
      </h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <motion.p className="max-w-[52ch] text-base text-slate md:text-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }}>
          Every image, video, website and brand identity we've crafted, all in one place. Browse our complete showcase below.
        </motion.p>
        {/* Stats render only once each figure is marked verified in data/portfolio.ts. */}
        {shown.length > 0 && (
          <div className="flex gap-8 md:gap-12">
            {shown.map((s) => (
              <div key={s.label}><p className="h-display text-4xl md:text-5xl">{s.value}</p><p className="mt-1 text-sm text-slate">{s.label}</p></div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryBar({ active, onPick }: { active: Category; onPick: (c: Category) => void }) {
  // Mirror the navbar: it slides away on scroll-down, so the bar moves up to take its place.
  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (Math.abs(y - prev) > 4) setNavHidden(y > prev && y > 200);
  });
  return (
    <motion.div
      animate={{ top: navHidden ? 0 : 64 }}
      transition={{ duration: 0.35, ease }}
      className="sticky z-40 border-y border-mist bg-paper/90 backdrop-blur-md"
    >
      <div role="tablist" aria-label="Filter work by category" className="wrap flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <button key={c} type="button" role="tab" aria-selected={active === c} onClick={() => onPick(c)}
            className={`relative min-h-[40px] shrink-0 rounded-full px-4 text-[14px] font-medium transition-colors duration-300 ${active === c ? 'text-paper' : 'bg-white text-slate hover:text-ink'}`}>
            {active === c && <motion.span layoutId="work-cat" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function Head({ kicker, title, sub, dark }: { kicker: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div className="wrap mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
      <div>
        <span className={`kicker ${dark ? '!text-teal' : ''}`}>{kicker}</span>
        <h2 className="h-display text-[10vw] leading-[1] md:text-[6vw] lg:text-[4.6vw] min-[1440px]:text-[68px]">{title}</h2>
      </div>
      {sub && <p className={`max-w-[38ch] ${dark ? 'text-white/60' : 'text-slate'}`}>{sub}</p>}
    </div>
  );
}

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.4 } };

export default function Work() {
  useSeo(seo);
  const [cat, setCat] = useState<Category>('All Work');
  const top = useRef<HTMLDivElement>(null);
  const show = sectionFor(cat);
  const match = <T extends { cats: Category[] }>(list: T[]) => (cat === 'All Work' ? list : list.filter((x) => x.cats.includes(cat)));
  const vids = useMemo(() => match(videos), [cat]);
  const pics = useMemo(() => match(photos), [cat]);

  const pick = (c: Category) => {
    setCat(c);
    const y = (top.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 70;
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <main>
      <Hero />
      <div ref={top} />
      <CategoryBar active={cat} onPick={pick} />
      <AnimatePresence mode="popLayout" initial={false}>
        {show.videos && vids.length > 0 && (
          <motion.section key={`videos-${cat}`} {...fade} id="videos" className="bg-ink py-16 text-paper md:py-24">
            <Head dark kicker="Reels" title="Made for the scroll." sub="Short-form vertical reels shot and edited by EVM. Tap any reel to play it with sound." />
            <div className="wrap"><ReelGrid items={vids} /></div>
          </motion.section>
        )}
        {show.photos && pics.length > 0 && (
          <motion.section key={`photos-${cat}`} {...fade} id="photography" className="section-pad">
            <Head kicker="Photography & model gallery" title="Frames worth keeping." sub="Model photoshoots, product shoots and editorial photography." />
            <div className="wrap"><EditorialGallery items={pics} offset={3} /></div>
          </motion.section>
        )}
        {show.websites && (
          <motion.section key="web" {...fade} id="websites" className="section-pad">
            <Head kicker="Website portfolio" title="Websites we've built." sub="Hover a preview to scroll the page. Live links appear once each URL is confirmed." />
            <div className="wrap"><WebsiteShowcase items={websites} /></div>
          </motion.section>
        )}
      </AnimatePresence>
      <div className="pt-16 md:pt-24">
        <ServiceCTA title="Have a project in mind? Let's make it next." button="Start Your Project" secondary="Contact EVM" />
      </div>
    </main>
  );
}
