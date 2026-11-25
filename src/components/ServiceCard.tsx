import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  active: boolean;
  onActivate: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServiceCard({ service, active, onActivate }: ServiceCardProps) {
  const reduceMotion = useReducedMotion();
  const statCount = (service as Service & { statCount?: string }).statCount;
  const statLabel = (service as Service & { statLabel?: string }).statLabel;

  return (
    <article
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen cursor-pointer border-t border-line transition-colors duration-500 last:border-b ${
        active ? 'bg-ink text-paper' : 'bg-transparent text-ink hover:bg-mist/50'
      }`}
    >
      <div className="wrap py-7 md:py-9 lg:py-11">
        {!active ? (
          /* COLLAPSED ROW */
          <div className="grid items-center gap-4 md:grid-cols-[56px_1fr_auto] md:gap-8">
            <span className="font-sans text-sm font-medium text-slate">
              {service.number}
            </span>

            <div className="min-w-0 lg:flex lg:items-center lg:justify-between lg:gap-8">
              <div>
                <span className="mb-1.5 block text-xs font-medium text-slate">
                  {service.eyebrow}
                </span>
                <h3 className="font-display text-[8vw] font-bold leading-[1.05] tracking-[-0.02em] md:text-[3.8vw] lg:text-[40px]">
                  {service.title}
                </h3>
              </div>

              <p className="mt-2 max-w-[46ch] text-[15px] text-[#4a4d57] lg:mt-0">
                {service.description}
              </p>
            </div>

            <Link
              to={`/services#${service.id}`}
              onClick={(e) => e.stopPropagation()}
              className="group/more inline-flex shrink-0 items-center gap-2.5 text-sm font-bold md:justify-self-end"
            >
              <span>Learn more</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-ink transition-all duration-300 group-hover/more:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        ) : (
          /* EXPANDED DARK PANEL */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="grid gap-6 lg:grid-cols-[44px_minmax(0,340px)_1fr] lg:items-stretch lg:gap-8"
          >
            {/* 01 Number */}
            <span className="pt-1 font-sans text-sm font-medium text-white/80">
              {service.number}
            </span>

            {/* Left Tall Visual Card */}
            <div className="relative order-last aspect-[4/4.5] min-h-[260px] overflow-hidden rounded-[22px] lg:order-none lg:min-h-[340px]">
              <div
                className="absolute inset-0 transition-transform duration-700 hover:scale-105"
                style={{ background: service.visual }}
              >
                {service.visualVideo && (
                  <video
                    className="h-full w-full object-cover"
                    src={service.visualVideo}
                    poster={service.visualPoster}
                    autoPlay={!reduceMotion}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden
                  />
                )}
              </div>
              {service.visualBadge && (
                <span className="absolute bottom-3.5 left-3.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-ink shadow-sm">
                  {service.visualBadge}
                </span>
              )}
            </div>

            {/* Right Content Column */}
            <div className="flex min-w-0 flex-col justify-between lg:pl-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="mb-2 block text-xs font-medium text-white/75">
                    {service.eyebrow}
                  </span>
                  <h3 className="font-display text-[9vw] font-bold leading-[1.02] tracking-[-0.02em] text-white md:text-[4.2vw] lg:text-[46px]">
                    {service.title}
                  </h3>
                </div>

                <Link
                  to={`/services#${service.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="group/more inline-flex shrink-0 items-center gap-2 rounded-full bg-teal-deep px-5 py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-teal sm:text-sm"
                >
                  <span>Start your project</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover/more:translate-x-0.5 group-hover/more:-translate-y-0.5"
                  />
                </Link>
              </div>

              <div className="mt-8 lg:mt-10">
                {statCount && (
                  <div className="mb-2 flex items-baseline gap-2.5">
                    <span className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {statCount}
                    </span>
                    {statLabel && (
                      <span className="text-base font-medium text-white/90 sm:text-lg">
                        {statLabel}
                      </span>
                    )}
                  </div>
                )}

                <p className="max-w-[56ch] text-sm leading-relaxed text-white/75 sm:text-[15px]">
                  {service.description}
                </p>

              {service.tags.length > 0 && (
  <>
    <style>{`
      @keyframes evm-tag-gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .evm-tag-grad-anim {
        background-image: linear-gradient(125deg, #ffffff 0%, #e6f4f4 45%, #b9e4e8 75%, #ffffff 100%);
        background-size: 240% 240%;
        animation: evm-tag-gradient 7s ease-in-out infinite;
      }
    `}</style>
    <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-[660px]">
      {service.tags.map((tag) => (
        <li
          key={tag}
          className="evm-tag-grad-anim flex min-h-[84px] transform-gpu items-center rounded-[18px] border border-white/25 px-5 py-4 font-display text-sm font-semibold leading-snug text-ink shadow-[0_10px_24px_-14px_rgba(7,27,43,0.45)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-[#B9E4E8] hover:shadow-[0_16px_32px_-12px_rgba(22,125,141,0.5)] sm:text-[15px]"
        >
          {tag}
        </li>
      ))}
    </ul>
  </>
)}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}