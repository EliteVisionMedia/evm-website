import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PillLink from './PillLink';

const ease = [0.22, 1, 0.36, 1] as const;

interface Props {
  kicker: string;
  title: string;
  subtitle: string;
  crumb: string;
  /** Optional middle breadcrumb (e.g. the parent service). */
  parent?: { label: string; to: string };
  visual: React.ReactNode;
  dark?: boolean;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}

/** Split hero for individual service pages: word-by-word headline reveal beside a visual slot. */
export default function ServiceSplitHero({ kicker, title, subtitle, crumb, parent, visual, dark, primary = { label: 'Book a Free Consultation', to: '/contact' }, secondary = { label: 'Contact Us', to: '/contact' } }: Props) {
  const words = title.split(' ');
  return (
    <section className={dark ? 'bg-ink text-paper' : ''}>
      <div className="wrap grid items-center gap-10 pb-14 pt-8 md:pb-20 md:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-[4vw] lg:pb-24 lg:pt-16">
        <div>
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`mb-8 flex flex-wrap items-center gap-1.5 text-sm font-medium ${dark ? 'text-white/60' : 'text-slate'}`}
          >
            <Link to="/" className="hover:text-teal">Home</Link>
            <ChevronRight size={14} />
            <Link to="/services" className="hover:text-teal">Services</Link>
            <ChevronRight size={14} />
            {parent && (<><Link to={parent.to} className="hover:text-teal">{parent.label}</Link><ChevronRight size={14} /></>)}
            <span className={dark ? 'text-white' : 'text-ink'} aria-current="page">{crumb}</span>
          </motion.nav>
          <motion.span className="kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            {kicker}
          </motion.span>
          <h1 className="h-display text-[11vw] leading-[1.02] sm:text-[8vw] lg:text-[4.6vw] min-[1440px]:text-[68px]">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className={`mt-5 max-w-[48ch] text-base md:text-lg ${dark ? 'text-white/70' : 'text-slate'}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
          >
            <PillLink to={primary.to}>{primary.label}</PillLink>
            <PillLink to={secondary.to} tone={dark ? 'light' : 'outline'}>{secondary.label}</PillLink>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(10% 10% 10% 10% round 28px)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
        >
          {visual}
        </motion.div>
      </div>
    </section>
  );
}
