import Button from '../components/Button';
import CenteredHeading from '../components/CenteredHeading';
import { IndustryGrid } from '../components/industries/IndustryCards';

/** Homepage work preview: three industry previews, labelled SAMPLE until case studies are approved. */
export default function FeaturedWork() {
  return (
    <section id="work" className="wrap section-pad">
      <CenteredHeading
        kicker="Selected work"
        title="Work that delivers results."
        sub="A closer look at how we help brands solve problems, improve performance and grow. Sample projects shown until EVM's case studies are added."
      />
      <div className="mb-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-[#e6f4f4] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" /> Sample
        </span>
      </div>
      <IndustryGrid cta="View project" />
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button to="/industries" variant="dark">Explore industries</Button>
        <Button to="/work" variant="outline">See all work</Button>
      </div>
    </section>
  );
}
