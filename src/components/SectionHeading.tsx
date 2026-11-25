import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  aside?: ReactNode;
  tone?: 'light' | 'dark';
}

export default function SectionHeading({ kicker, title, aside, tone = 'light' }: SectionHeadingProps) {
  return (
    <Reveal className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end lg:mb-14">
      <div>
        <span className={`kicker ${tone === 'dark' ? '!text-teal' : ''}`}>{kicker}</span>
        <h2 className="h-display max-w-[14ch] text-[11vw] leading-[0.95] md:text-[6vw] lg:text-[4.4vw] min-[1440px]:text-[64px]">{title}</h2>
      </div>
      {aside && <div className={`max-w-[38ch] text-base ${tone === 'dark' ? 'text-slate-light' : 'text-slate'}`}>{aside}</div>}
    </Reveal>
  );
}
