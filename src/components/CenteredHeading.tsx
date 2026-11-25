import type { ReactNode } from 'react';
import Reveal from './Reveal';

export default function CenteredHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: ReactNode }) {
  return (
    <Reveal className="mx-auto mb-10 flex max-w-[900px] flex-col items-center text-center md:mb-14">
      <span className="kicker">{kicker}</span>
      <h2 className="h-display text-[11vw] leading-[0.95] md:text-[6vw] lg:text-[4.8vw] min-[1440px]:text-[68px]">{title}</h2>
      {sub && <p className="mt-4 max-w-[60ch] text-base text-slate md:text-lg">{sub}</p>}
    </Reveal>
  );
}
