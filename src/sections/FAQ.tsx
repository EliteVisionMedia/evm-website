import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import CenteredHeading from '../components/CenteredHeading';

/** SAMPLE answers drafted from EVM's services. Review and replace with confirmed details. */
const faqs: Record<string, { q: string; a: string }[]> = {
  General: [
    { q: 'What does Elite Vision Media do?', a: 'We are a Coimbatore studio for digital marketing, website design and development, and video production. We can handle one of these for you, or plan all three together so your brand looks and sounds the same everywhere.' },
    { q: 'Do you only work with businesses in Coimbatore?', a: 'We are based in Coimbatore and love working with local brands, but most of our process runs online, so we can work with businesses across Tamil Nadu, India and beyond.' },
    { q: 'How do we start a project with you?', a: 'Get in touch through the contact page. We will set up a short discovery call to understand your goals, audience and timeline, then send a clear proposal with scope and next steps.' },
    { q: 'How long does a typical project take?', a: 'It depends on the scope. After the discovery call we share a timeline with clear milestones, so you always know what is happening and what comes next.' },
    { q: 'How is pricing decided?', a: 'Every project is quoted on its scope: the services involved, the size of the work and the timeline. You get a transparent proposal before anything starts, with no hidden costs.' },
  ],
  'Digital Marketing': [
    { q: 'Which platforms do you run campaigns on?', a: 'We plan and run campaigns across the channels your audience actually uses, such as Instagram, Facebook, YouTube and Google, and pick the mix based on your goals.' },
    { q: 'Do you create the content for social media too?', a: 'Yes. Our team writes, designs and shoots content in-house, so your posts, ads and videos stay consistent with your brand.' },
    { q: 'How will I know if the campaigns are working?', a: 'We agree on clear goals at the start and share regular reports on the numbers that matter for your business, not vanity metrics.' },
  ],
  Websites: [
    { q: 'What kind of websites do you build?', a: 'Business websites, landing pages and portfolio sites, designed for your brand and built to be fast, mobile-friendly and easy to find on search.' },
    { q: 'Can I update the website myself after launch?', a: 'Yes. We can set up an easy way for you to edit content, and walk you through it at handover.' },
    { q: 'Do you offer support after the website goes live?', a: 'We support every launch and can stay on for updates, improvements and maintenance if you need it.' },
  ],
  'Video Production': [
    { q: 'What types of videos do you produce?', a: 'Brand films, ads, product videos, social media reels and event coverage, from scripting and shooting through to editing.' },
    { q: 'Do you help with the script and planning?', a: 'Yes. We plan the concept, script, locations and shot list with you before the shoot, so the day runs smoothly.' },
    { q: 'Can one shoot give us content for social media too?', a: 'Yes. We plan shoots so the main film can also be cut into shorter versions and reels for your social channels.' },
  ],
};

const tabs = Object.keys(faqs);
const ease = [0.22, 1, 0.36, 1] as const;

export default function FAQ() {
  const [tab, setTab] = useState(tabs[0]);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="wrap section-pad">
      <CenteredHeading
        kicker="FAQ"
        title="Frequently Asked Questions"
        sub={<>Answers to common questions about EVM's services. <span className="sample-tag">Sample answers</span></>}
      />

      <div className="-mx-4 mb-8 flex justify-start gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:justify-center md:mb-12">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setTab(t); setOpen(null); }}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-300 ${tab === t ? 'text-paper' : 'bg-white text-slate hover:text-ink'}`}
          >
            {tab === t && <motion.span layoutId="faq-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={tab}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="mx-auto flex max-w-[1350px] flex-col gap-3"
        >
          {faqs[tab].map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                onMouseEnter={() => setOpen(i)}
                onMouseLeave={() => setOpen(null)}
                className={`rounded-[20px] transition-colors duration-300 ${isOpen ? 'bg-[#017F82] shadow-md' : 'bg-white'}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
                >
                  <span className={`text-[16px] font-medium transition-colors duration-300 md:text-lg ${isOpen ? 'text-white' : 'text-ink'}`}>
                    {f.q}
                  </span>
                  <motion.span
                    animate={{
                      rotate: isOpen ? 180 : 0,
                      backgroundColor: isOpen ? '#FFFFFF' : '#0C0D11',
                      color: isOpen ? '#017F82' : '#FFFFFF',
                    }}
                    transition={{ duration: 0.4, ease }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full md:h-12 md:w-12"
                  >
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[80ch] px-5 pb-6 text-base leading-relaxed text-white/90 md:px-7">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}