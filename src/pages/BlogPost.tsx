import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Facebook, Link2, Linkedin, MessageCircle } from 'lucide-react';
import useSeo, { breadcrumbSchema, evmOrg, SITE_URL } from '../lib/useSeo';
import { blogPosts, placeholderCover, type Block, type BlogPost as Post } from '../data/blog';
import { CategoryTag, Cover, Meta, PostCard } from './BlogList';
import ComingSoon from './ComingSoon';

const ease = [0.22, 1, 0.36, 1] as const;

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Share({ post }: { post: Post }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(post.title);
  const [copied, setCopied] = useState(false);
  const links = [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: <Facebook size={16} aria-hidden /> },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <Linkedin size={16} aria-hidden /> },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icon: <XIcon /> },
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, icon: <MessageCircle size={16} aria-hidden /> },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: leave the button as-is */
    }
  };
  const btn = 'grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-teal hover:bg-teal hover:text-white';
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold">Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${l.label} (opens in a new tab)`} className={btn}>
          {l.icon}
        </a>
      ))}
      <button type="button" onClick={copy} aria-label={copied ? 'Link copied' : 'Copy article link'} className={btn}>
        {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
      </button>
      <span aria-live="polite" className="sr-only">{copied ? 'Link copied to clipboard' : ''}</span>
    </div>
  );
}

function Content({ blocks, post }: { blocks: Block[]; post: Post }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2': return <h2 key={i} className="mt-12 font-display text-[26px] font-bold leading-tight tracking-[-0.015em] md:text-[32px]">{b.text}</h2>;
          case 'h3': return <h3 key={i} className="mt-8 font-display text-xl font-bold md:text-[22px]">{b.text}</h3>;
          case 'p': return <p key={i} className="mt-5 text-[17px] leading-[1.75] text-ink/85 md:text-lg">{b.text}</p>;
          case 'ul': return <ul key={i} className="mt-5 space-y-2.5 text-[17px] leading-relaxed text-ink/85 md:text-lg">{b.items.map((it) => <li key={it} className="flex gap-3"><span className="mt-[0.65em] h-1.5 w-1.5 flex-none rounded-full bg-teal" />{it}</li>)}</ul>;
          case 'ol': return <ol key={i} className="mt-5 space-y-2.5 text-[17px] leading-relaxed text-ink/85 md:text-lg">{b.items.map((it, n) => <li key={it} className="flex gap-3"><span className="flex-none font-display font-bold text-teal-deep">{String(n + 1).padStart(2, '0')}</span>{it}</li>)}</ol>;
          case 'quote': return <blockquote key={i} className="my-10 border-l-4 border-teal pl-6 font-display text-2xl font-semibold leading-snug tracking-[-0.01em] md:text-[28px]">{b.text}</blockquote>;
          case 'img': return (
            <figure key={i} className="my-10">
              <img src={placeholderCover(post.category, i + 3)} alt={b.alt} loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-[18px] bg-mist object-cover" />
              {b.caption && <figcaption className="mt-3 text-sm text-slate">{b.caption}</figcaption>}
            </figure>
          );
        }
      })}
    </>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const path = `/blog/${slug}`;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useSeo(
    post
      ? {
          title: `${post.title} | Elite Vision Media Blog`,
          description: post.description,
          path,
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              dateModified: post.date,
              articleSection: post.category,
              url: SITE_URL + path,
              mainEntityOfPage: SITE_URL + path,
              ...(post.cover ? { image: post.cover } : {}),
              author: { '@type': 'Organization', name: post.author, url: SITE_URL },
              publisher: evmOrg,
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path }]),
          ],
        }
      : { title: 'Article not found | Elite Vision Media', description: 'This article could not be found.', path },
  );

  if (!post) return <ComingSoon title="Article not found" notFound />;

  const related = [
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <article>
      <motion.div aria-hidden style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-teal" />

      <header className="wrap pt-8 md:pt-14">
        <nav aria-label="Breadcrumb" className="text-sm text-slate">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li><Link to="/" className="hover:text-teal-deep">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link to="/blog" className="hover:text-teal-deep">Blog</Link></li>
            <li aria-hidden>/</li>
            <li className="line-clamp-1 max-w-[40ch] text-ink" aria-current="page">{post.title}</li>
          </ol>
        </nav>

        <div className="mx-auto mt-10 max-w-[880px] md:mt-14">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex items-center gap-3">
            <CategoryTag label={post.category} />
            <span className="sample-tag">Sample article</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease }} className="h-display mt-6 text-[9.5vw] leading-[1.02] md:text-[52px] min-[1440px]:text-[60px]">
            {post.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-7 flex flex-col gap-5 border-y border-line py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white" aria-hidden>EVM</span>
              <div>
                <p className="text-[15px] font-semibold">{post.author}</p>
                <Meta post={post} />
              </div>
            </div>
            <Share post={post} />
          </motion.div>
        </div>
      </header>

      <motion.div initial={{ clipPath: 'inset(8% 4% 0% 4% round 24px)' }} animate={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }} transition={{ duration: 1.1, delay: 0.2, ease }} className="wrap mt-10 md:mt-14">
        <Cover post={post} eager className="aspect-[16/10] rounded-[24px] md:aspect-[21/9]" />
      </motion.div>

      <div className="wrap">
        <div className="mx-auto max-w-[720px] py-12 md:py-16">
          <Content blocks={post.body} post={post} />

          <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <Link to="/blog" className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-teal-deep">
              <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden /> Back to Blog
            </Link>
            <Share post={post} />
          </div>
        </div>
      </div>

      <section className="bg-mist/60" aria-labelledby="related-heading">
        <div className="wrap section-pad">
          <div className="flex items-end justify-between gap-4">
            <h2 id="related-heading" className="h-display text-[32px] leading-none md:text-[44px]">Related articles</h2>
            <Link to="/blog" className="hidden text-[15px] font-semibold text-teal-deep hover:underline sm:inline">View all</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {related.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </article>
  );
}

