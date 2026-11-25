import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import Reveal from '../Reveal';
import PillLink from './PillLink';

const ease = [0.22, 1, 0.36, 1] as const;

/** Heading + intro on the left, dark checklist cards on the right. */
export default function WhyChooseGrid({ title, text, points, actions }: { title: string; text?: string; points: string[]; actions?: { label: string; to: string }[] }) {
  return (
    <section className="wrap section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[5vw]">
        <Reveal>
          <span className="kicker">Why EVM</span>
          <h2 className="h-display text-[9vw] leading-[1.05] md:text-[5vw] lg:text-[3.4vw] min-[1440px]:text-[48px]">{title}</h2>
          {text && <p className="mt-5 max-w-[48ch] text-base leading-[1.75] text-slate md:text-lg">{text}</p>}
          {actions && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((a, i) => <PillLink key={a.label} to={a.to} tone={i ? 'outline' : 'teal'}>{a.label}</PillLink>)}
            </div>
          )}
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {points.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease }}
              className="group rounded-[18px] bg-ink p-5 text-paper transition-colors duration-500 hover:bg-teal-deep md:p-6"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-teal text-white transition-colors group-hover:bg-white group-hover:text-teal-deep">
                <Check size={16} strokeWidth={3} />
              </span>
              <p className="mt-6 text-[15px] font-medium leading-snug">{p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
