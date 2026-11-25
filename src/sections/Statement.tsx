import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

const text =
  "We don't do generic. Every brand we work with gets a strategy built from scratch, content made in-house and campaigns we measure until the numbers move.";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

/** Words darken one by one as the paragraph scrolls through the viewport. */
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');

  return (
    <section className="wrap section-pad grid gap-6 lg:grid-cols-[1fr_2.2fr] lg:gap-[4vw]">
      <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans font-medium text-xs uppercase tracking-[0.1em] text-slate lg:flex-col">
        <span className="text-teal-deep">Who we are</span>
        <span>Coimbatore · India</span>
        <span>Marketing · Web · Video</span>
      </div>
      <p ref={ref} className="font-display text-[7.6vw] font-bold leading-[1.12] tracking-[-0.015em] md:text-[4.6vw] lg:text-[3.3vw] min-[1440px]:text-[48px]">
        {reduce
          ? text
          : words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
      </p>
    </section>
  );
}
