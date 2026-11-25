import Hero from '../sections/Hero';
import TrustedClients from '../sections/TrustedClients';
import BigWordBand from '../sections/BigWordBand';
import KeywordMarquee from '../sections/KeywordMarquee';
import Statement from '../sections/Statement';
import Services from '../sections/Services';
import OurProcess from '../sections/OurProcess';
import FeaturedWork from '../sections/FeaturedWork';
import About from '../sections/About';
import Values from '../sections/Values';
import OurClients from '../sections/OurClients';
import Testimonials from '../sections/Testimonials';
import Blog from '../sections/Blog';
import FAQ from '../sections/FAQ';
import ContactCTA from '../sections/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      {/* <BigWordBand />  */}
      {/* <KeywordMarquee /> */}
      <Statement />
      <TrustedClients />
      <OurProcess />
      <Values />
      <Services />
      <FeaturedWork />
      <About />
      {/* <OurClients /> */}
      <Testimonials />
      <Blog />
      <FAQ />
      <ContactCTA />
    </>
  );
}
