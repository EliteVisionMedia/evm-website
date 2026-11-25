import { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/site';

export default function Services() {
  const [active, setActive] = useState(services[0].id);

  return (
    <section id="services" className="section-pad overflow-x-clip">
      <div className="wrap mb-10 text-center md:mb-14">
        <h2 className="h-display text-[8vw] font-bold tracking-[-0.02em] text-ink md:text-[48px] lg:text-[56px]">
          What we offer / Service
        </h2>
        <p className="mx-auto mt-2.5 max-w-[38ch] text-sm text-slate sm:text-base">
          End to end solutions to build, grow, and scale your brand.
        </p>
      </div>

      <div>
        {services.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            active={active === s.id}
            onActivate={() => setActive(s.id)}
          />
        ))}
      </div>
    </section>
  );
}