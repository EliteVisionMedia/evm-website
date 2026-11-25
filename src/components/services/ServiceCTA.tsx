import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PillLink from './PillLink';

const ease = [0.22, 1, 0.36, 1] as const;

/** Closing call to action shared by the services pages. */
export default function ServiceCTA({ title = "Let's build something meaningful together.", button = 'Start Your Project', text, secondary, secondaryTo = '/contact' }: { title?: string; button?: string; text?: string; secondary?: string; secondaryTo?: string }) {
  return (
    <section className="wrap pb-16 md:pb-24 lg:pb-[7vw] min-[1440px]:pb-[100px]">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.9, ease }}
        className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-14 text-center text-paper md:px-12 md:py-20 lg:py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_70%_at_85%_10%,rgba(1,154,157,.45),transparent_60%),radial-gradient(40%_60%_at_10%_100%,rgba(1,127,130,.35),transparent_60%)]" />
        <h2 className="h-display relative mx-auto max-w-[18ch] text-[9vw] leading-[1.05] md:text-[5vw] min-[1440px]:text-[64px]">{title}</h2>
        {text && <p className="relative mx-auto mt-5 max-w-[52ch] text-base text-white/70 md:text-lg">{text}</p>}
        <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Link
          to="/contact"
          className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-4 text-[16px] font-semibold text-teal-deep md:mt-10"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-teal transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
          <span className="relative transition-colors duration-300 group-hover:text-white">{button}</span>
          <ArrowUpRight size={18} className="relative transition-all duration-300 group-hover:rotate-45 group-hover:text-white" />
        </Link>
        {secondary && <div className="md:mt-10 sm:mt-8"><PillLink to={secondaryTo} tone="light">{secondary}</PillLink></div>}
        </div>
      </motion.div>
    </section>
  );
}
