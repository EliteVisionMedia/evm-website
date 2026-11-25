import type { ReactNode } from 'react';
import { motion } from 'motion/react';

/** Teal panel wipes across between routes; content fades in underneath. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] origin-left bg-teal-deep"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
        exit={{ scaleX: 1, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } }}
        style={{ transformOrigin: 'right' }}
      />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.15 } }} exit={{ opacity: 0 }}>
        {children}
      </motion.main>
    </>
  );
}
