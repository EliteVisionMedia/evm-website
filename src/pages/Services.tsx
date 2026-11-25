import Reveal from '../components/Reveal';
import ServiceHero from '../components/services/ServiceHero';
import ServiceCard from '../components/services/ServiceCard';
import ServiceCTA from '../components/services/ServiceCTA';
import { Link } from 'react-router-dom';
import { industries, industryPath } from '../data/industries';
import { servicePages } from '../data/services';

function IndustryLinks({ only }: { only?: string[] }) {
  const list = industries.filter((i) => !only || only.includes(i.slug));
  return (
    <section className="wrap pb-12 md:pb-16">
      <div className="flex flex-col gap-4 rounded-[22px] border border-mist bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div><span className="kicker !mb-1">Industries</span><p className="font-display text-xl font-bold tracking-[-0.01em]">See how we apply this for your industry.</p></div>
        <div className="flex flex-wrap gap-2">
          {list.map((i) => <Link key={i.slug} to={industryPath(i.slug)} className="rounded-full border border-mist px-4 py-2 text-sm font-semibold transition-colors hover:border-teal hover:text-teal-deep">{i.name} →</Link>)}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <ServiceHero
        title="Our Services"
        subtitle="Creative thinking, strategic marketing and digital experiences designed to move your business forward."
      />

      <section className="wrap border-t border-line py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
          <Reveal>
            <span className="kicker">What we do</span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-[22px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink md:text-[30px] lg:text-[34px]">
              At Elite Vision Media, we bring marketing, web development and video production together to help businesses
              build a stronger digital presence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="wrap pb-16 md:pb-24 lg:pb-[7vw] min-[1440px]:pb-[100px]">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {servicePages.map((s, i) => (
            <div key={s.slug} className={i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}>
              <ServiceCard service={s} index={i} wide={i === 2} />
            </div>
          ))}
        </div>
      </section>

      <IndustryLinks />
      <ServiceCTA />
    </>
  );
}
