/** Client logos: black monochrome, transparent PNGs generated from /images/logo/*.png. `h` balances visual weight. */
const logos = [
  { name: 'BNI', file: 'bni', h: 'h-8 sm:h-9' },
  { name: 'Conosh', file: 'conosh', h: 'h-10 sm:h-11' },
  { name: 'Dench Union', file: 'denchunion', h: 'h-9 sm:h-10' },
  { name: 'Fabtyle', file: 'fabtyle', h: 'h-14 sm:h-16' },
  { name: 'FANUC', file: 'fanuc', h: 'h-9 sm:h-10' },
  { name: 'Gokulam Park', file: 'gokulamendslide', h: 'h-12 sm:h-14' },
];

function LogoItem({ logo }: { logo: (typeof logos)[number] }) {
  return (
    <div className="group flex h-[84px] w-[176px] shrink-0 items-center justify-center rounded-[16px] border border-line/75 bg-white px-5 shadow-[0_8px_24px_-12px_rgba(12,13,17,0.12),0_2px_6px_-1px_rgba(12,13,17,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-teal/35 hover:shadow-[0_14px_30px_-10px_rgba(12,13,17,0.16)] sm:h-[96px] sm:w-[228px] sm:px-7">
      <img
        src={`/images/logo/mono/${logo.file}.png`}
        alt={logo.name}
        loading="lazy"
        draggable={false}
        className={`${logo.h} w-auto max-w-full select-none object-contain opacity-85 transition duration-300 ease-out group-hover:scale-105 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
      />
    </div>
  );
}

/** Infinite CSS marquee that never pauses on hover or pointer enter. */
export default function TrustedClients() {
  return (
    <section
      aria-label="Our Clients"
      className="overflow-hidden  bg-paper py-14 text-ink md:py-20"
    >
      <style>{`
        @keyframes clients-scroll-forever {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .clients-marquee-forever {
          animation: clients-scroll-forever 28s linear infinite !important;
          animation-play-state: running !important;
        }
        .clients-marquee-forever:hover {
          animation-play-state: running !important;
        }
      `}</style>

      {/* Split Header: Left Title + Right Two-Line Subtitle */}
    <div className="wrap mx-auto max-w-[1180px]">
  <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
    <div>
      <span className="kicker">Social Proof</span>
      <h2 className="mt-1.5 font-display text-[36px] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[44px] md:text-[48px]">
        Trusted by <span className="text-teal">50+ Brands.</span>
      </h2>
    </div>

    <div className="md:text-right">
      <p className="text-[14px] font-medium text-ink/80">
        Partnered with ambitious businesses across diverse industries
      </p>
      <p className="mt-1 text-[13px] tracking-wide text-slate">
        D2C &amp; Retail <span className="mx-1.5 text-teal">•</span> Service Brands{' '}
        <span className="mx-1.5 text-teal">•</span> Local Leaders
      </p>
    </div>
  </div>
</div>
      {/* Full-Bleed White Card Marquee Track */}
      <div className="relative mt-10 w-full overflow-hidden py-2 md:mt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-paper to-transparent sm:w-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-paper to-transparent sm:w-20"
        />

        <div className="clients-marquee-forever flex w-max gap-4 sm:gap-6 will-change-transform">
          {[...logos, ...logos].map((l, i) => (
            <div key={`${l.name}-${i}`} aria-hidden={i >= logos.length} className="flex-none">
              <LogoItem logo={l} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}