import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

/** SAMPLE posts. Replace with real articles (or a CMS feed) when EVM publishes them. */
const posts = [
  {
    category: 'Digital Marketing',
    title: 'Why most local ad campaigns stop working after a month',
    excerpt: 'Sample article. Creative fatigue, targeting and what to refresh first.',
    art: 'bg-[radial-gradient(60%_70%_at_70%_30%,#019A9D,transparent_60%),linear-gradient(140deg,#0c0d11,#14303a)]',
    img: '/images/services/digital-marketing.webp',
  },
  {
    category: 'Web Design',
    title: 'What a fast website is worth to a small business',
    excerpt: 'Sample article. Load time, trust and conversions in plain numbers.',
    art: 'bg-[radial-gradient(50%_60%_at_30%_30%,#6fd3d4,transparent_60%),linear-gradient(140deg,#dff3f3,#9fd8d9)]',
    img: '/images/about/web-design.webp',
  },
  {
    category: 'Video Production',
    title: 'Planning a brand film: what to decide before the shoot',
    excerpt: 'Sample article. Script, locations and cut-downs for reels.',
    art: 'bg-[radial-gradient(45%_55%_at_50%_45%,#2f2f3a,#07070a),radial-gradient(60%_60%_at_80%_20%,#019A9D,transparent_60%)]',
    img: '/videos/reels/showreel.webp',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;
type Post = (typeof posts)[number];

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e6f4f4] px-4 py-2 text-sm font-medium text-ink">
      <span className="h-2 w-2 rounded-full bg-teal" />
      {label}
    </span>
  );
}

function ViewButton() {
  return (
    <span className="relative mt-6 block overflow-hidden rounded-full border border-ink py-3.5 text-center text-[15px] font-medium text-ink">
      <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
      <span className="relative transition-colors duration-300 group-hover:text-paper">View Blog</span>
    </span>
  );
}

function PostCard({ post, featured, delay }: { post: Post; featured?: boolean; delay: number }) {
  return (
    <motion.a
      href="/blog"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
      className={`group grid gap-5 rounded-[20px] bg-white p-3 md:p-[18px] ${featured ? 'md:grid-cols-2 md:gap-10' : ''}`}
    >
      <div className={`relative overflow-hidden rounded-[14px] ${featured ? 'aspect-[4/3] md:aspect-square' : 'aspect-[16/10]'}`}>
        <img src={post.img} alt="" loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] ${post.art}`} />
        <span className="absolute right-3 top-3 font-sans font-medium text-[10px] uppercase tracking-[0.08em] text-white/80 mix-blend-difference">SAMPLE</span>
      </div>
      <div className="flex flex-col px-1 pb-1 md:px-0 md:pb-0">
        <CategoryPill label={post.category} />
        <h3 className={`mt-5 font-display font-semibold leading-tight tracking-[-0.015em] text-ink ${featured ? 'text-2xl md:text-[28px]' : 'text-xl md:text-2xl'}`}>
          {post.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate">{post.excerpt}</p>
        <div className={featured ? 'mt-auto' : ''}>
          <ViewButton />
        </div>
      </div>
    </motion.a>
  );
}

export default function Blog() {
  const [featured, ...rest] = posts;
  return (
    <section id="blog" className="wrap pb-16 pt-16 md:pb-24 md:pt-24 lg:pb-[7vw] lg:pt-[7vw] min-[1440px]:pb-[100px] min-[1440px]:pt-[100px]">
      <SectionHeading
        kicker="Blog & insights"
        title="Insights that drive growth."
        aside={<>Marketing, web and video tips from the EVM team. <span className="sample-tag">Sample articles</span></>}
      />
      <div className="mx-auto flex max-w-[1350px] flex-col gap-5 md:gap-6">
        <PostCard post={featured} featured delay={0} />
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {rest.map((p, i) => (
            <PostCard key={p.title} post={p} delay={0.1 + i * 0.08} />
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <Button to="/blog" variant="dark">See all articles</Button>
      </div>
    </section>
  );
}
