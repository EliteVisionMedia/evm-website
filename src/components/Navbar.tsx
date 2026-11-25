import { useEffect, useState } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { servicePages } from '../data/services';
import { contact, navLinks, socials } from '../data/site';
import { detailPath, detailsFor } from '../data/serviceDetails';
import Logo from './Logo';
import Button from './Button';
import SocialIcon from './SocialIcon';

const dropdownItems = servicePages;
/** Topics shown beside each service in the dropdown; each links to its card on the service page. */
const topicsFor = (slug: string) => detailsFor(slug).map((d) => ({ id: d.slug, title: d.name, to: detailPath(d) }));

/** Header shows Process via the homepage only (/#process still works); footer keeps the full list. */
const baseLinks = navLinks.filter((l) => l.to !== '/#process');
const hasBlogsLink = baseLinks.some((l) => l.to === '/blogs' || l.label === 'Blogs');
const headerLinks = hasBlogsLink
  ? baseLinks
  : [
      ...baseLinks.slice(0, -1),
      { label: 'Blogs', to: '/blogs' },
      baseLinks[baseLinks.length - 1],
    ];

/** Routes whose top hero uses a dark background before scrolling. */
const darkHeroRoutes = new Set<string>([]);

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [sub, setSub] = useState(dropdownItems[0].slug);
  const subItem = dropdownItems.find((d) => d.slug === sub) ?? dropdownItems[0];
  const { pathname, hash } = useLocation();

  const onDarkHero = !scrolled && !open && darkHeroRoutes.has(pathname);

  const isActive = (to: string) =>
    to.includes('#')
      ? pathname + hash === to
      : to === '/services'
        ? pathname.startsWith('/services')
        : to === '/blogs'
          ? pathname.startsWith('/blog')
          : to === '/industries'
          ? pathname.startsWith('/industries') || pathname.startsWith('/case-studies')
          : pathname === to && !hash;

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 200 && y > prev && !open);
  });

  useEffect(() => {
    setOpen(false);
    setDropdown(false);
    setMobileServices(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="sticky top-0 z-50"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-[background-color,box-shadow,backdrop-filter,color] duration-300 ${
            scrolled
              ? 'bg-paper/85 text-ink shadow-[0_1px_0_#D8D9DE] backdrop-blur-md'
              : onDarkHero
                ? 'bg-ink/80 text-white backdrop-blur-sm'
                : 'bg-paper/80 text-ink backdrop-blur-sm'
          }`}
        >
          <nav
            className={`wrap flex items-center justify-between gap-5 transition-[padding] duration-300 ${
              scrolled ? 'py-3' : 'py-4 md:py-5'
            }`}
            aria-label="Main"
          >
            <Logo
              className={`w-auto transition-[height,background-color] duration-300 ${
                scrolled ? 'h-11 md:h-12' : 'h-12 md:h-14'
              } ${onDarkHero ? 'rounded-md bg-paper px-1' : ''}`}
            />

            <ul className="hidden items-center gap-6 text-[15px] font-medium lg:flex xl:gap-8">
              {headerLinks.map((link) => {
                const isServices = link.to === '/services';
                return (
                  <li
                    key={link.to}
                    className="relative"
                    onMouseEnter={isServices ? () => { setDropdown(true); setSub(dropdownItems.find((d) => pathname.startsWith(d.path))?.slug ?? dropdownItems[0].slug); } : undefined}
                    onMouseLeave={isServices ? () => setDropdown(false) : undefined}
                    onFocus={isServices ? () => setDropdown(true) : undefined}
                    onBlur={
                      isServices
                        ? (e) => !e.currentTarget.contains(e.relatedTarget as Node) && setDropdown(false)
                        : undefined
                    }
                  >
                    <RouterNavLink
                      to={link.to}
                      end={!isServices && link.to !== '/blogs' && link.to !== '/industries'}
                      className="group relative flex items-center gap-1.5 py-1.5"
                      aria-haspopup={isServices || undefined}
                      aria-expanded={isServices ? dropdown : undefined}
                    >
                      {() => (
                        <>
                          <span>{link.label}</span>
                          {isServices && (
                            <ChevronDown
                              size={15}
                              className={`mt-0.5 transition-transform duration-300 ${
                                dropdown ? 'rotate-180 text-teal' : ''
                              }`}
                            />
                          )}
                          <span
                            className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-teal transition-transform duration-300 ${
                              isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`}
                          />
                        </>
                      )}
                    </RouterNavLink>

                    {isServices && (
                      <AnimatePresence>
                        {dropdown && (
                          <motion.div
                            className="absolute left-1/2 top-full z-50 w-[620px] -translate-x-1/2 pt-4"
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="grid grid-cols-[260px_1fr] overflow-hidden rounded-[18px] border border-line bg-white text-ink shadow-[0_24px_50px_-20px_rgba(12,13,17,0.25)]">
                              <ul className="border-r border-line p-2">
                                {dropdownItems.map((sp, i) => (
                                  <motion.li
                                    key={sp.slug}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                                    onMouseEnter={() => setSub(sp.slug)}
                                    onFocus={() => setSub(sp.slug)}
                                  >
                                    <Link
                                      to={sp.path}
                                      className={`group/item flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors duration-200 ${
                                        sub === sp.slug ? 'bg-[#e6f4f4] text-teal-deep' : pathname === sp.path ? 'text-teal-deep' : 'text-ink'
                                      }`}
                                    >
                                      {sp.title}
                                      <ChevronRight
                                        size={16}
                                        className={`transition-transform duration-200 ${sub === sp.slug ? 'translate-x-1 text-teal-deep' : 'text-slate'}`}
                                      />
                                    </Link>
                                  </motion.li>
                                ))}
                              </ul>
                              <div className="bg-[#f7fbfb] p-3">
                                <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal">{subItem.title}</p>
                                <AnimatePresence mode="wait" initial={false}>
                                  <motion.ul
                                    key={subItem.slug}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -6 }}
                                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                  >
                                    {topicsFor(subItem.slug).map((t) => (
                                      <li key={t.id}>
                                        <Link
                                          to={t.to}
                                          className={`group/t flex items-center gap-2.5 rounded-lg px-3 py-2 text-[14px] ${pathname === t.to ? 'bg-white text-teal-deep' : 'text-ink/80'} transition-colors duration-200 hover:bg-white hover:text-teal-deep`}
                                        >
                                          <span className="h-1.5 w-1.5 flex-none rounded-full bg-teal/40 transition-all duration-200 group-hover/t:w-3 group-hover/t:bg-teal" />
                                          {t.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </motion.ul>
                                </AnimatePresence>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="hidden lg:block">
              <Button to="/contact" variant={onDarkHero ? 'primary' : 'dark'}>
                Let's Talk
              </Button>
            </div>

            <button
              type="button"
              className={`grid h-11 w-11 place-items-center rounded-xl transition-colors lg:hidden ${
                onDarkHero ? 'bg-white text-ink' : 'bg-ink text-white'
              }`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper lg:hidden"
            style={{
              paddingTop: 'calc(env(safe-area-inset-top, 0px) + 84px)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="wrap flex flex-1 flex-col gap-8 pb-8">
              <ul className="flex flex-col border-t border-line">
                {headerLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                    className="border-b border-line"
                  >
                    {link.to === '/services' ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={mobileServices}
                          aria-controls="mobile-services"
                          onClick={() => setMobileServices((v) => !v)}
                          className={`flex w-full items-center justify-between py-4 text-left font-display text-[32px] font-bold tracking-[-0.01em] ${
                            isActive(link.to) ? 'text-teal-deep' : ''
                          }`}
                        >
                          {link.label}
                          <ChevronDown
                            size={26}
                            className={`text-slate transition-transform duration-300 ${
                              mobileServices ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileServices && (
                            <motion.ul
                              id="mobile-services"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              {dropdownItems.map((sp) => (
                                <li key={sp.slug}>
                                  <Link
                                    to={sp.path}
                                    className={`flex min-h-[48px] items-center justify-between rounded-xl px-3 text-lg font-medium ${
                                      pathname === sp.path ? 'bg-[#e6f4f4] text-teal-deep' : 'text-ink'
                                    }`}
                                  >
                                    {sp.title}
                                    <ChevronRight size={18} className="text-slate" />
                                  </Link>
                                  <ul className="mb-2 ml-3 border-l border-line pl-3">
                                    {topicsFor(sp.slug).map((t) => (
                                      <li key={t.id}>
                                        <Link to={t.to} className={`flex min-h-[40px] items-center text-[15px] ${pathname === t.to ? 'font-semibold text-teal-deep' : 'text-slate'}`}>
                                          {t.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                              <li className="h-3" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <RouterNavLink
                        to={link.to}
                        end={link.to !== '/blogs' && link.to !== '/industries'}
                        className={`flex items-center justify-between py-4 font-display text-[32px] font-bold tracking-[-0.01em] ${
                          isActive(link.to) ? 'text-teal-deep' : ''
                        }`}
                      >
                        {link.label}
                        <span className="font-sans text-xs font-medium text-slate">0{i + 1}</span>
                      </RouterNavLink>
                    )}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-5">
                <Button to="/contact" variant="primary" className="w-full">
                  Start a Project
                </Button>
                <div className="flex items-center justify-between gap-4">
                  <a href={`mailto:${contact.email}`} className="text-sm font-semibold">
                    {contact.email}
                  </a>
                  <div className="flex gap-2">
                    {socials.map((s) => (
                      <SocialIcon
                        key={s.icon}
                        link={s}
                        className="border-line hover:border-ink hover:bg-ink hover:text-white"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}