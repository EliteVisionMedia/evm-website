import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import footerLogo from '../assets/evm-logo-footer.png';
import SocialIcon from './SocialIcon';
import { contact, navLinks, services, socials } from '../data/site';

const headingCls = 'mb-5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[#7d808c]';

export default function Footer() {
  return (
    <footer
      className="mt-20 bg-ink pb-8 pt-20 text-[#c9cbd3] md:mt-28 md:pt-28"
      style={{ paddingBottom: 'max(32px, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="wrap">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] lg:gap-x-16 lg:gap-y-14">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" aria-label="Elite Vision Media, home" className="inline-flex shrink-0"><img src={footerLogo} alt="Elite Vision Media" width={1200} height={459} draggable={false} className="h-12 w-auto select-none md:h-14" /></Link>
            <p className="mt-6 max-w-[36ch] text-sm leading-relaxed">
              Elite Vision Media is a Coimbatore studio for digital marketing, web design &amp; development and video production.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <SocialIcon
                  key={s.icon}
                  link={s}
                  className="border-[#33353e] text-white hover:border-teal hover:bg-teal"
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className={headingCls}>Navigate</h4>
            <ul className="grid gap-3.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headingCls}>Services</h4>
            <ul className="grid gap-3.5 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className={headingCls}>Studio</h4>
            <ul className="grid gap-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-teal" />
                <span className="leading-relaxed">{contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-teal" />
                <a href={contact.phoneHref} className="hover:text-white">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-teal" />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={contact.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-white hover:text-teal"
                >
                  Open in Google Maps <ArrowUpRight size={15} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Link
          to="/"
          aria-label="Elite Vision Media — Back to Home"
          className="mt-20 block select-none whitespace-nowrap bg-[linear-gradient(180deg,#01B3B6_0%,#019A9D_25%,rgba(1,127,130,0.45)_60%,rgba(12,13,17,0)_92%)] bg-clip-text pb-[0.06em] text-center font-display text-[11.2vw] font-bold leading-[0.85] tracking-[-0.015em] text-transparent transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal md:mt-24 min-[1440px]:text-[160px]"
        >
          Elite Vision Media
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-[#23252d] pt-6 text-xs text-[#7d808c] md:mt-10 md:flex-row">
          <span>© {new Date().getFullYear()} Elite Vision Media. All rights reserved.</span>
          <span>Made in Coimbatore</span>
        </div>
      </div>
    </footer>
  );
}