import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, X } from 'lucide-react';
import useSeo, { breadcrumbSchema, evmOrg, SITE_URL } from '../lib/useSeo';
import { blogCategories, blogPosts, blogSeo, coverOf, formatDate, readingTime, type BlogPost } from '../data/blog';

const ease = [0.22, 1, 0.36, 1] as const;
const PAGE = 6;

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Elite Vision Media Blog',
    url: SITE_URL + '/blog',
    publisher: evmOrg,
  },
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]),
];

export function Meta({ post, light = false }: { post: BlogPost; light?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-sm ${light ? 'text-white/70' : 'text-slate'}`}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span>{readingTime(post)} min read</span>
    </p>
  );
}

export function CategoryTag({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e6f4f4] px-3.5 py-1.5 text-[13px] font-medium text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-teal" />
      {label}
    </span>
  );
}

export function Cover({ post, className = '', eager = false }: { post: BlogPost; className?: string; eager?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-mist ${className}`}>
      <img
        src={coverOf(post)}
        alt={post.cover ? post.title : ''}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
      />
    </div>
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease }}
      className="group"
    >
      <Link to={`/blog/${post.slug}`} className="flex h-full flex-col rounded-[20px] bg-white p-3 transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(12,13,17,0.35)] md:p-4">
        <Cover post={post} className="aspect-[16/10] rounded-[14px]" />
        <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
          <div className="flex items-center justify-between gap-3">
            <CategoryTag label={post.category} />
            <span className="sample-tag">Sample</span>
          </div>
          <h3 className="mt-4 font-display text-xl font-bold leading-tight tracking-[-0.015em] md:text-[22px]">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-slate">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between pt-5">
            <Meta post={post} />
            <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-teal group-hover:bg-teal group-hover:text-white">
              <ArrowUpRight size={17} aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function Featured({ post }: { post: BlogPost }) {
  return (
    <motion.article initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease }} className="group">
      <Link to={`/blog/${post.slug}`} className="grid overflow-hidden rounded-[24px] bg-ink text-paper lg:grid-cols-[1.25fr_1fr]">
        <Cover post={post} eager className="aspect-[16/10] lg:aspect-auto lg:min-h-[440px]" />
        <div className="flex flex-col gap-5 p-6 md:p-10">
          <div className="flex items-center justify-between gap-3">
            <span className="kicker !mb-0 !text-teal">Featured article</span>
            <span className="sample-tag !text-white/50">Sample</span>
          </div>
          <CategoryTag label={post.category} />
          <h2 className="h-display text-[28px] leading-[1.05] md:text-[40px]">{post.title}</h2>
          <p className="text-base leading-relaxed text-white/70 md:text-lg">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-2">
            <Meta post={post} light />
            <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-teal">
              Read article <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:rotate-45" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogList() {
  useSeo({ ...blogSeo, path: '/blog', schema });
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);

  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const filtering = category !== 'All' || query.trim() !== '';

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter(
      (p) => (category === 'All' || p.category === category) && (!q || p.title.toLowerCase().includes(q)) && (filtering || p !== featured),
    );
  }, [category, query, filtering, featured]);

  const shown = results.slice(0, limit);
  const words = 'Insights, Ideas & Inspiration.'.split(' ');

  return (
    <>
      {/* Hero */}
      <section className="wrap pb-10 pt-10 md:pb-14 md:pt-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate">
          <Link to="/" className="hover:text-teal-deep">Home</Link> <span aria-hidden>/</span> <span className="text-ink">Blog</span>
        </nav>
        <span className="kicker">Blog & insights</span>
        <h1 className="h-display max-w-[14ch] text-[13vw] leading-[0.95] md:text-[8vw] lg:text-[6.6vw] min-[1440px]:text-[96px]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
              <motion.span className={`inline-block ${w === 'Inspiration.' ? 'text-teal' : ''}`} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, delay: 0.05 + i * 0.07, ease }}>
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }} className="mt-6 max-w-[52ch] text-lg text-slate md:text-xl">
          Explore creative insights, digital trends, practical guides and ideas to help your brand grow.
        </motion.p>
        <p className="mt-4 rounded-xl border border-dashed border-line px-4 py-3 text-sm text-slate md:w-fit">
          Demo content: the articles below are sample posts that show the layout. Real EVM articles will replace them.
        </p>
      </section>

      <section className="wrap" aria-label="Featured article">
        <Featured post={featured} />
      </section>

      {/* Filters + grid */}
      <section className="wrap section-pad" aria-labelledby="latest-heading">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="latest-heading" className="h-display text-[34px] leading-none md:text-[48px]">
            {filtering ? 'Search results' : 'Latest articles'}
          </h2>
          <label className="relative block w-full lg:w-[340px]">
            <span className="sr-only">Search articles by title</span>
            <Search size={18} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
            <input
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setLimit(PAGE); }}
              placeholder="Search articles"
              className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-11 text-[15px] outline-none transition-colors placeholder:text-slate focus:border-teal [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-slate hover:bg-mist hover:text-ink">
                <X size={15} />
              </button>
            )}
          </label>
        </div>

        <div role="group" aria-label="Filter by category" className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {['All', ...blogCategories].map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => { setCategory(c); setLimit(PAGE); }}
                className={`relative shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${active ? 'border-ink text-white' : 'border-line bg-white text-ink hover:border-ink'}`}
              >
                {active && <motion.span layoutId="blog-cat" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.4, ease }} />}
                <span className="relative">{c}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">{results.length} articles found</p>

        {shown.length ? (
          <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {shown.map((p) => <PostCard key={p.slug} post={p} />)}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-10 rounded-[20px] border border-dashed border-line px-6 py-14 text-center">
            <p className="font-display text-xl font-bold">No articles found</p>
            <p className="mt-2 text-slate">Try a different search or category.</p>
            <button type="button" onClick={() => { setQuery(''); setCategory('All'); }} className="mt-5 rounded-full border border-ink px-5 py-2.5 text-sm font-semibold hover:bg-ink hover:text-white">
              Reset filters
            </button>
          </div>
        )}

        {results.length > limit && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-teal-deep">
              Load more articles
            </button>
          </div>
        )}
      </section>
    </>
  );
}
