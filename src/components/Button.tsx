import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'dark' | 'outline' | 'light';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

const styles: Record<Variant, string> = {
  primary: 'bg-teal-deep text-white hover:bg-ink',
  dark: 'bg-ink text-paper hover:bg-teal-deep',
  outline: 'border-[1.5px] border-current hover:bg-ink hover:text-paper hover:border-ink',
  light: 'bg-white text-teal-deep hover:bg-ink hover:text-white',
};

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  arrow = true,
  className = '',
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const cls = `group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors duration-300 disabled:opacity-60 ${styles[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="grid h-[22px] w-[22px] place-items-center overflow-hidden rounded-full bg-white/20">
          <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:rotate-45" />
        </span>
      )}
    </>
  );

  if (to) return <Link to={to} className={cls}>{content}</Link>;
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}
