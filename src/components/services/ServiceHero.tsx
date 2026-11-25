import { motion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

interface ServiceHeroProps {
  kicker?: string;
  title: string;
  subtitle: string;
}

/** Large centred hero with a line-by-line reveal, shared by every services page. */
export default function ServiceHero({ kicker = 'Services', title, subtitle }: ServiceHeroProps) {
  return (
    <section className="wrap flex flex-col items-center pb-14 pt-14 text-center md:pb-20 md:pt-24 lg:pb-24 lg:pt-28">
      <motion.span
        className="kicker"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        {kicker}
      </motion.span>
      <h1 className="h-display max-w-[16ch] overflow-hidden pb-[0.08em] text-[13vw] leading-[1.02] sm:text-[10vw] md:text-[8vw] lg:text-[6.6vw] min-[1440px]:text-[96px]">
        <motion.span
          className="block"
          initial={{ y: '105%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.95, delay: 0.1, ease }}
        >
          {title}
        </motion.span>
      </h1>
      <motion.p
        className="mt-5 max-w-[54ch] text-base text-slate md:mt-6 md:text-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease }}
      >
        {subtitle}
      </motion.p>
    </section>
  );
}
