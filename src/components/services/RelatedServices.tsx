import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { servicePages } from '../../data/services';

/** Internal links to the other service pages. */
export default function RelatedServices({ current }: { current: string }) {
  return (
    <section className="wrap pb-12 md:pb-16">
      <div className="grid gap-3 md:grid-cols-2">
        {servicePages.filter((s) => s.slug !== current).map((s) => (
          <Link key={s.slug} to={s.path} className="group flex items-center justify-between gap-4 rounded-[20px] border border-mist bg-white px-6 py-6 transition-colors duration-500 hover:border-teal md:px-8">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate">Also from EVM</span>
              <p className="mt-1 font-display text-xl font-bold tracking-[-0.01em] md:text-2xl">{s.title}</p>
            </div>
            <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-paper transition-all duration-500 group-hover:rotate-45 group-hover:bg-teal group-hover:text-white">
              <ArrowUpRight size={20} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
