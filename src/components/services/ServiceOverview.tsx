import Reveal from '../Reveal';

/** Two-column intro: kicker + heading on the left, body copy on the right. */
export default function ServiceOverview({ kicker, title, paragraphs, children }: { kicker: string; title: string; paragraphs: string[]; children?: React.ReactNode }) {
  return (
    <section className="wrap section-pad">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-[5vw]">
        <Reveal>
          <span className="kicker">{kicker}</span>
          <h2 className="h-display text-[8.5vw] leading-[1.05] md:text-[5vw] lg:text-[3.4vw] min-[1440px]:text-[48px]">{title}</h2>
        </Reveal>
        <Reveal className="space-y-5 text-base leading-[1.75] text-slate md:text-lg lg:pt-10">
          {paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
