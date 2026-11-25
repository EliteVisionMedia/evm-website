const words = ['Digital Marketing', 'Web Design', 'Video Production', 'Social Media', 'Performance Ads', 'SEO & Growth', 'Brand Films', 'UI/UX'];

export default function KeywordMarquee() {
  return (
    <div aria-hidden className="marquee overflow-hidden border-b border-line bg-paper py-5">
      <div className="marquee-track flex w-max">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-3 border-r border-line px-6 font-display text-base uppercase tracking-wide text-slate md:px-8 md:text-lg">
            <span className="text-teal-deep">/</span>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
