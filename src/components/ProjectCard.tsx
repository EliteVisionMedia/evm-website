import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import type { Project } from '../types';

export const visuals: Record<Project['visual'], JSX.Element> = {
  film: (
    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,13,17,.1),rgba(12,13,17,.55)),radial-gradient(60%_80%_at_75%_40%,#1fb8bb,transparent_60%),linear-gradient(135deg,#0d2a2f,#145a63_50%,#7cc9c4)]">
      <span className="absolute bottom-[12%] left-[5%] font-display text-[11vw] font-bold leading-[0.9] tracking-[-0.015em] text-white md:text-[6vw] min-[1440px]:text-[86px]">SAMPLE PROJECT</span>
    </div>
  ),
  web: (
    <div className="absolute inset-0 bg-[#dff3f3]">
      <span className="absolute inset-x-[12%] -bottom-[10%] top-[16%] rounded-t-[14px] bg-white shadow-[0_20px_50px_rgba(1,127,130,.25)]" />
      <span className="absolute inset-x-[16%] top-[24%] h-[28%] rounded-[10px] bg-gradient-to-br from-teal-deep to-[#6fd3d4]" />
      <span className="absolute left-[16%] top-[58%] h-2.5 w-[40%] rounded bg-mist" />
      <span className="absolute left-[16%] top-[64%] h-2.5 w-[28%] rounded bg-mist" />
    </div>
  ),
  campaign: (
    <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_45%,#2f2f3a,#07070a)]">
      <span className="absolute left-[10%] top-[18%] rounded-xl bg-white/10 px-3 py-2 font-sans font-medium text-xs text-white backdrop-blur">CTR ▲ · SAMPLE</span>
      <span className="absolute right-[10%] top-[40%] rounded-xl bg-teal px-3 py-2 font-sans font-medium text-xs text-white">Leads ▲ · SAMPLE</span>
    </div>
  ),
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      className={`group ${project.featured ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/work" className="block">
        <motion.div
          className={`relative overflow-hidden rounded-[22px] ${project.featured ? 'aspect-[4/3] md:aspect-[21/9]' : 'aspect-[4/3] md:aspect-[16/11]'}`}
          initial={{ clipPath: 'inset(12% 6% 0% 6% round 22px)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 22px)' }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">{visuals[project.visual]}</div>
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink">{project.category}</span>
          {project.category === 'Video Production' ? (
            <span className="absolute left-1/2 top-1/2 grid h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 scale-90 place-items-center rounded-full bg-teal text-white opacity-90 transition-transform duration-500 group-hover:scale-100">
              <Play size={22} fill="currentColor" />
            </span>
          ) : (
            <span className="absolute bottom-4 right-4 grid h-12 w-12 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={20} />
            </span>
          )}
        </motion.div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-[22px] font-bold tracking-[-0.015em] md:text-[26px]">{project.title}</h3>
            <p className="mt-1 max-w-[44ch] text-sm text-slate">{project.description}</p>
          </div>
          {project.sample && <span className="sample-tag mt-2 flex-none">SAMPLE</span>}
        </div>
      </Link>
    </motion.article>
  );
}
