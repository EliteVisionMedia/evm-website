import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { clients } from '../data/site';

export default function OurClients() {
  return (
    <section id="clients" className="wrap pb-16 md:pb-24 lg:pb-[7vw] min-[1440px]:pb-[100px]">
      <SectionHeading kicker="Our clients" title="Brands that trust EVM." aside="Placeholder logos. Real logos are added in one config array." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {clients.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.05} y={16}>
            {c.logo ? (
              <div className="grid h-24 place-items-center rounded-2xl bg-white p-5">
                <img src={c.logo} alt={c.name} className="max-h-10 w-auto grayscale transition hover:grayscale-0" />
              </div>
            ) : (
              <div className="grid h-20 place-items-center rounded-2xl border-[1.5px] border-dashed border-[#b9bcc6] font-sans font-medium text-xs uppercase tracking-[0.08em] text-slate md:h-24">
                Logo · SAMPLE
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
