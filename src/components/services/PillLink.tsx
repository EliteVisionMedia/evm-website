import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/** Animated pill button: a fill sweeps in on hover and the arrow turns. */
export default function PillLink({ to, children, tone = 'teal' }: { to: string; children: React.ReactNode; tone?: 'teal' | 'outline' | 'light' }) {
  const base = {
    teal: 'bg-teal text-white',
    outline: 'border border-ink/80 text-ink',
    light: 'border border-white/30 text-white',
  }[tone];
  const fill = tone === 'teal' ? 'bg-ink' : tone === 'light' ? 'bg-white' : 'bg-ink';
  const hoverText = tone === 'light' ? 'group-hover:text-ink' : 'group-hover:text-paper';
  return (
    <Link to={to} className={`group relative inline-flex min-h-[48px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-[15px] font-semibold ${base}`}>
      <span className={`absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 ${fill}`} />
      <span className={`relative transition-colors duration-300 ${hoverText}`}>{children}</span>
      <ArrowUpRight size={17} className={`relative transition-all duration-300 group-hover:rotate-45 ${hoverText}`} />
    </Link>
  );
}
