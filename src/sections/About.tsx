import Reveal from '../components/Reveal';
import StatCounter from '../components/StatCounter';
import { stats } from '../data/site';

const team = [
  { cls: 'row-span-2', src: '/images/work/product/product-07.webp', alt: 'Campaign shoot by Elite Vision Media', pos: 'object-[60%_40%]' },
  { cls: '', src: '/images/industries/clothing/fashion-red-car.webp', alt: 'Fashion campaign by Elite Vision Media', pos: 'object-[50%_25%]' },
  { cls: '', src: '/videos/reels/showreel.webp', alt: 'Frame from the EVM showreel', pos: 'object-center' },
];

export default function About() {
  return (
    <section id="about" className="wrap pb-16 md:pb-24 lg:pb-[7vw] min-[1440px]:pb-[100px]">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-[5vw]">
        <Reveal>
          <span className="kicker">About EVM</span>
          <p className="font-display text-[7.4vw] font-bold leading-[1.08] tracking-[-0.015em] md:text-[4.4vw] lg:text-[3.2vw] min-[1440px]:text-[46px]">
            We're a Coimbatore team of marketers, developers and filmmakers.{' '}
            <span className="text-[#a3a6b1]">We make brands easy to find, easy to trust and hard to forget.</span>
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] bg-white p-6">
              <b className="font-sans font-medium text-[11px] uppercase tracking-[0.1em] text-teal-deep">Vision</b>
              <p className="mt-2 text-sm text-[#4a4d57]">To be South India's most trusted partner for brands growing online.</p>
            </div>
            <div className="rounded-[18px] bg-white p-6">
              <b className="font-sans font-medium text-[11px] uppercase tracking-[0.1em] text-teal-deep">Mission</b>
              <p className="mt-2 text-sm text-[#4a4d57]">Combine strategy, design and film to deliver growth you can measure.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-[1.2fr_1fr] grid-rows-[150px_150px] gap-3 md:grid-rows-[200px_200px]">
          {team.map((t) => (
            <div key={t.src} className={`group relative overflow-hidden rounded-[18px] bg-ink ${t.cls}`}>
              <img src={t.src} alt={t.alt} loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover ${t.pos} transition-transform duration-[1000ms] group-hover:scale-[1.06]`} />
            </div>
          ))}
        </Reveal>
      </div>

      {/* {stats.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 border-t border-line md:grid-cols-4 lg:mt-[5vw]">
          {stats.map((s) => <StatCounter key={s.label} stat={s} />)}
        </div>
      ) : (
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border-[1.5px] border-dashed border-[#b9bcc6] p-6 text-sm text-slate lg:mt-[5vw]">
          <span className="font-display text-[40px] font-bold tracking-[-0.015em] text-[#c4c6cf]">— &nbsp; — &nbsp; — &nbsp; —</span>
          <span>Statistics hidden until EVM sends verified figures. Then they count up from 0.</span>
        </div>
      )} */}
    </section>
  );
}
