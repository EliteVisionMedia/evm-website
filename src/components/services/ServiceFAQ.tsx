import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import Reveal from '../Reveal';

/** Accordion FAQ for a service page. Pair with faqSchema() so structured data matches the visible answers. */
export default function ServiceFAQ({ title, faqs }: { title: string; faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="wrap section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-[5vw]">
        <Reveal>
          <span className="kicker">FAQ</span>
          <h2 className="h-display text-[9vw] leading-[1.05] md:text-[5vw] lg:text-[3.4vw] min-[1440px]:text-[48px]">{title}</h2>
        </Reveal>
        <div className="divide-y divide-mist border-y border-mist">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-bold tracking-[-0.01em] md:text-xl"
                  >
                    <span className="transition-colors duration-300 group-hover:text-teal-deep">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35 }}
                      className={`grid h-10 w-10 flex-none place-items-center rounded-full transition-colors duration-300 ${isOpen ? 'bg-teal text-white' : 'bg-white text-ink'}`}
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-6 pr-12 text-[15px] leading-[1.75] text-slate md:text-base">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
