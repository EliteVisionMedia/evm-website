import { motion } from 'motion/react';
import { Clapperboard, Lightbulb, Network, ShieldCheck, type LucideIcon } from 'lucide-react';

/** Drop a team photo URL here to replace the designed panel. */
const TEAM_PHOTO = '';

const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Network,
    title: 'Collaboration',
    text: 'Great work doesn’t happen in isolation. Strategists, designers, developers and filmmakers work as one team with you, from first brief to launch, so every idea is tested, refined and aligned with your goals.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    text: 'We push beyond the expected, trying new formats, platforms and tools early, and keeping what actually works for your audience. Fresh ideas, backed by results.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    text: 'Honest timelines, transparent reporting and clear pricing. No vanity metrics and no misleading claims, just work rooted in trust and a genuine commitment to your growth.',
  },
  {
    icon: Clapperboard,
    title: 'Craft',
    text: 'Every frame, page and post is finished properly, because details are what people remember. We sweat the small things so your brand looks and feels considered everywhere.',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ValueItem({ icon: Icon, title, text, delay }: (typeof values)[number] & { delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease }}
      className="group flex flex-col rounded-[18px] p-2 md:min-h-[290px] md:p-[1.8vw] min-[1440px]:p-7"
    >
      <span className="text-ink transition-colors duration-300 group-hover:text-teal">
        <Icon size={34} strokeWidth={2.2} />
      </span>
      <div className="mt-8 md:mt-auto">
        <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="mt-2 max-w-[52ch] text-sm leading-[1.75] text-slate">{text}</p>
      </div>
    </motion.article>
  );
}

export default function Values() {
  return (
    <section id="values" className="wrap section-pad">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-start">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="h-display text-[12vw] leading-[0.95] md:text-[5vw] min-[1440px]:text-[64px]"
        >
          Our Values
        </motion.h2>
        <p className="max-w-[30ch] text-base text-slate md:pt-3 md:text-right">
          We fuel bold ideas, driving them forward with sharp strategy.
        </p>
      </div>

      <div className="grid gap-x-[3vw] gap-y-8 md:grid-cols-2 min-[1440px]:gap-x-11">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="group relative aspect-[1.68] overflow-hidden rounded-[14px] bg-coal"
        >
          {TEAM_PHOTO ? (
            <img src={TEAM_PHOTO} alt="The EVM team" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 [background:radial-gradient(70%_90%_at_25%_30%,#019A9D_0%,transparent_60%),radial-gradient(60%_80%_at_85%_80%,#017F82_0%,transparent_65%),#1A1C25]">
              <span className="absolute bottom-5 left-5 font-display text-3xl font-bold text-white/90">One team.</span>
            </div>
          )}
        </motion.div>
        <ValueItem {...values[0]} delay={0.1} />
      </div>
      <div className="mt-8 grid gap-x-[3vw] gap-y-8 md:mt-[3vw] md:grid-cols-3 min-[1440px]:mt-11 min-[1440px]:gap-x-11">
        {values.slice(1).map((v, i) => (
          <ValueItem key={v.title} {...v} delay={0.1 + i * 0.1} />
        ))}
      </div>
    </section>
  );
}
