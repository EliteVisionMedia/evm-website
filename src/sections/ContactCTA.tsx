import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import ctaRingImg from '../assets/cta-3d-ring.png';

export default function ContactCTA() {
  return (
    <section id="contact" className="wrap py-10 md:py-14">
      <Reveal className="relative flex flex-col items-center overflow-hidden rounded-[24px]   px-6 py-9 text-center  md:rounded-[32px] md:px-12 md:py-12">
        {/* Soft ambient glow behind the 3D centerpiece */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-6 h-40 w-40 rounded-full bg-[#167D8D]/20 blur-3xl"
        />

        {/* Compact 3D Image Centerpiece */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="relative mb-4 h-28 w-28 select-none sm:h-32 sm:w-32 md:h-36 md:w-36"
        >
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <img
              src={ctaRingImg}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="h-full w-full object-contain drop-shadow-[0_14px_22px_rgba(22,125,141,0.26)]"
            />
          </motion.div>
        </motion.div>

        {/* Centered Headline & Subtext */}
        <h2 className="h-display relative max-w-[26ch] text-[8.5vw] leading-[1.05] tracking-[-0.02em] text-[#071B2B] sm:text-[38px] lg:max-w-none lg:text-[48px] xl:text-[54px]">
          Ready to Grow Your Brand?
        </h2>
        <p className="relative mt-2.5 max-w-[42ch] text-sm font-normal text-[#071B2B]/70 sm:text-base">
          Let&apos;s build something that actually works.
        </p>

        {/* Primary Pill CTA */}
        <div className="relative mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#167D8D] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#167D8D]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#071B2B]"
          >
            <span>Contact Us</span>
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}