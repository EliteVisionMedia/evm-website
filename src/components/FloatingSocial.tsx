import { useEffect, useRef, useState, type ComponentType } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Instagram, Linkedin, Share2, X } from 'lucide-react';
import { contact, socials } from '../data/site';

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

interface FloatingLink {
  key: string;
  label: string;
  href: string;
  ariaLabel: string;
  Icon: ComponentType<{ size?: number }>;
}

const instagram = socials.find((s) => s.icon === 'instagram');
const linkedin = socials.find((s) => s.icon === 'linkedin');

/** Top-to-bottom display order: WhatsApp first, LinkedIn nearest the main button. */
const links: FloatingLink[] = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: contact.whatsappWithText("Hi EVM, I'd like to discuss a project."),
    ariaLabel: 'Chat with Elite Vision Media on WhatsApp (opens in a new tab)',
    Icon: WhatsAppIcon,
  },
  ...(instagram
    ? [
        {
          key: 'instagram',
          label: instagram.label,
          href: instagram.href,
          ariaLabel: `Elite Vision Media on ${instagram.label} (opens in a new tab)`,
          Icon: Instagram,
        },
      ]
    : []),
  ...(linkedin
    ? [
        {
          key: 'linkedin',
          label: linkedin.label,
          href: linkedin.href,
          ariaLabel: `Elite Vision Media on ${linkedin.label} (opens in a new tab)`,
          Icon: Linkedin,
        },
      ]
    : []),
];

/** Site-wide floating social menu. Mounted once in App, below the mobile menu and modals in stacking order. */
export default function FloatingSocial() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed z-30 flex flex-col items-center gap-3 right-[max(16px,env(safe-area-inset-right,0px))] bottom-[calc(88px+env(safe-area-inset-bottom,0px))] md:right-6 md:bottom-[calc(100px+env(safe-area-inset-bottom,0px))]"
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            id="floating-social-list"
            className="flex flex-col items-center gap-3"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: reduce ? 0 : 0.05, staggerDirection: -1 } },
              closed: { transition: { staggerChildren: reduce ? 0 : 0.04 } },
            }}
          >
            {links.map(({ key, label, href, ariaLabel, Icon }) => (
              <motion.li
                key={key}
                className="group relative"
                variants={{
                  open: { opacity: 1, y: 0, scale: 1 },
                  closed: { opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.8 },
                }}
                transition={{ duration: reduce ? 0.01 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink shadow-[0_8px_20px_-8px_rgba(12,13,17,0.35)] transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-teal hover:text-white focus-visible:bg-teal focus-visible:text-white"
                >
                  <Icon size={18} />
                </a>
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        ref={btnRef}
        type="button"
        aria-label={open ? 'Close social media links' : 'Open social media links'}
        aria-expanded={open}
        aria-controls="floating-social-list"
        onClick={() => setOpen((v) => !v)}
        className="grid h-14 w-14 place-items-center rounded-full bg-teal text-white shadow-[0_12px_28px_-8px_rgba(1,154,157,0.6)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-teal-deep hover:shadow-[0_16px_32px_-8px_rgba(1,154,157,0.7)]"
      >
        <motion.span
          className="grid place-items-center"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {open ? <X size={22} aria-hidden /> : <Share2 size={22} aria-hidden />}
        </motion.span>
      </button>
    </div>
  );
}