import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

/** Accessible full-screen modal: focus on open, Esc to close, body scroll locked, focus restored on close. */
export default function Modal({ open, label, onClose, onKey, children }: { open: boolean; label: string; onClose: () => void; onKey?: (e: KeyboardEvent) => void; children: React.ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const h = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : onKey?.(e));
    window.addEventListener('keydown', h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = prev; prevFocus?.focus(); };
  }, [open, onClose, onKey]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[1200px]">{children}</div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white hover:text-ink">
            <X size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
