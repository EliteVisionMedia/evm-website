import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, ArrowUpRight, Check, CheckCircle2, ChevronDown, Loader2, Mail, MapPin, MessageCircle, Navigation, X } from 'lucide-react';
import Reveal from '../components/Reveal';
import CenteredHeading from '../components/CenteredHeading';
import useSeo, { breadcrumbSchema, SITE_URL } from '../lib/useSeo';
import evmLogo from '../assets/evm-logo.png';
import { contact } from '../data/site';
import { ApiError, submitContact } from '../services/api';

const ease = [0.22, 1, 0.36, 1] as const;

const serviceOptions = ['Digital Marketing', 'Web Design & Development', 'Video Production', 'Photography', 'Model Photoshoot', 'Product Shoot', 'Graphics Design', '2D / 3D Animation', 'AI Videos', 'Branding & Visual Identity', 'Other'];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Elite Vision Media',
    url: SITE_URL,
    email: contact.email,
    telephone: '+91-81224-37026',
    hasMap: contact.maps,
    address: { '@type': 'PostalAddress', streetAddress: '1st Floor, 13, Diwan Bahadur Rd, above Bullet Miami, R.S. Puram', addressLocality: 'Coimbatore', addressRegion: 'Tamil Nadu', postalCode: '641002', addressCountry: 'IN' },
  },
  { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Elite Vision Media', url: `${SITE_URL}/contact` },
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
];

type Fields = { firstName: string; lastName: string; email: string; phone: string; service: string[]; message: string; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
const empty: Fields = { firstName: '', lastName: '', email: '', phone: '', service: [], message: '', website: '' };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.firstName.trim()) e.firstName = 'Please enter your first name.';
  if (!f.lastName.trim()) e.lastName = 'Please enter your last name.';
  if (!f.email.trim()) e.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!f.phone.trim()) e.phone = 'Please enter your phone number.';
  else if (!/^\+?[\d\s()-]{7,18}$/.test(f.phone.trim()) || f.phone.replace(/\D/g, '').length < 7) e.phone = 'Please enter a valid phone number.';
  if (!f.service.length) e.service = 'Please select at least one service.';
  return e;
}

const inputCls = (bad?: string) =>
  `w-full rounded-[14px] border bg-paper px-4 py-3.5 text-[16px] text-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-slate/70 focus:bg-white focus:shadow-[0_0_0_4px_rgba(1,154,157,.15)] ${bad ? 'border-[#d6453d] focus:border-[#d6453d]' : 'border-transparent hover:border-mist focus:border-teal'}`;

function Field({ id, label, required, error, children, className = '' }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label} {required ? <span className="text-teal" aria-hidden>*</span> : <span className="font-medium text-slate">(optional)</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p id={`${id}-error`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-1.5 pt-2 text-sm font-medium text-[#c13a33]">
            <AlertCircle size={14} className="flex-none" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Multi-select checkbox dropdown for services. Selected items show as removable chips. */
function ServiceMultiSelect({ value, error, onChange, onClose }: { value: string[]; error?: string; onChange: (v: string[]) => void; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const toggle = (s: string) => onChange(value.includes(s) ? value.filter((x) => x !== s) : [...value, s]);
  const close = (refocus = false) => { setOpen(false); onClose(); if (refocus) triggerRef.current?.focus(); };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!rootRef.current?.contains(e.target as Node)) close(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(true); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  });

  return (
    <fieldset className="sm:col-span-2" aria-describedby={`service-help${error ? ' service-error' : ''}`}>
      <legend className="mb-1 block text-sm font-semibold text-ink">
        Which services are you interested in? <span className="text-teal" aria-hidden>*</span>
      </legend>
      <p id="service-help" className="mb-2 text-sm text-slate">Select all that apply.</p>
      <div ref={rootRef} className="relative" onBlur={(e) => open && !e.currentTarget.contains(e.relatedTarget as Node) && close()}>
        <button
          ref={triggerRef}
          id="service"
          type="button"
          aria-expanded={open}
          aria-controls="service-options"
          aria-invalid={!!error}
          onClick={() => (open ? close() : setOpen(true))}
          className={`${inputCls(error)} flex items-center justify-between gap-3 pr-4 text-left ${open ? 'bg-white shadow-[0_0_0_4px_rgba(1,154,157,.15)] !border-teal' : ''}`}
        >
          <span className={value.length ? 'text-ink' : 'text-slate/70'}>
            {value.length ? `${value.length} service${value.length > 1 ? 's' : ''} selected` : 'Choose services…'}
          </span>
          <ChevronDown size={18} className={`flex-none text-slate transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              id="service-options"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
              className="absolute inset-x-0 top-full z-20 mt-2 max-h-[320px] overflow-y-auto rounded-[14px] border border-line bg-white p-2 shadow-[0_24px_50px_-20px_rgba(12,13,17,0.3)]"
            >
              <div className="grid gap-0.5 sm:grid-cols-2">
                {serviceOptions.map((s) => {
                  const on = value.includes(s);
                  return (
                    <label key={s} className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2 text-[15px] transition-colors hover:bg-[#e6f4f4] ${on ? 'font-semibold text-teal-deep' : 'text-ink'}`}>
                      <input type="checkbox" checked={on} onChange={() => toggle(s)} className="peer sr-only" />
                      <span aria-hidden className={`grid h-5 w-5 flex-none place-items-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-teal peer-focus-visible:ring-offset-2 ${on ? 'border-teal bg-teal text-white' : 'border-slate/50 bg-white'}`}>
                        {on && <Check size={13} strokeWidth={3} />}
                      </span>
                      {s}
                    </label>
                  );
                })}
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-line px-2 pt-2">
                <button type="button" onClick={() => onChange([])} disabled={!value.length} className="min-h-[40px] px-2 text-sm font-medium text-slate hover:text-ink disabled:opacity-40">Clear</button>
                <button type="button" onClick={() => close(true)} className="min-h-[40px] rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-teal-deep">Done</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {value.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Selected services">
          {value.map((s) => (
            <li key={s} className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f4f4] py-1.5 pl-3 pr-1.5 text-sm font-medium text-ink">
              {s}
              <button type="button" onClick={() => toggle(s)} aria-label={`Remove ${s}`} className="grid h-6 w-6 place-items-center rounded-full text-slate hover:bg-teal hover:text-white">
                <X size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p id="service-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex items-center gap-1.5 pt-2 text-sm font-medium text-[#c13a33]">
            <AlertCircle size={14} className="flex-none" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </fieldset>
  );
}

function ContactForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false); // synchronous lock: state updates are too slow to stop a fast double-click

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...f, [k]: e.target.value };
    setF(next);
    if (touched[k]) setErrors((p) => ({ ...p, [k]: validate(next)[k] }));
  };
  const blur = (k: keyof Fields) => () => { setTouched((t) => ({ ...t, [k]: true })); setErrors((p) => ({ ...p, [k]: validate(f)[k] })); };
  const a11y = (k: keyof Fields) => ({ id: k, name: k, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-error` : undefined, onBlur: blur(k), onChange: set(k), value: f[k] as string });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return; // prevent duplicate submissions
    if (f.website) return; // honeypot: bots fill hidden fields
    const v = validate(f);
    setErrors(v);
    setTouched({ firstName: true, lastName: true, email: true, phone: true, service: true, message: true });
    const first = Object.keys(v)[0];
    if (first) { formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(); return; }
    inFlight.current = true;
    setStatus('sending');
    setServerMsg('');
    try {
      await submitContact({ firstName: f.firstName.trim(), lastName: f.lastName.trim(), email: f.email.trim(), phone: f.phone.trim(), services: f.service, message: f.message.trim() });
      setStatus('sent');
      setF(empty); setTouched({});
    } catch (err) {
      if (err instanceof ApiError && err.fields) {
        const { services, ...rest } = err.fields;
        setErrors({ ...rest, ...(services ? { service: services } : {}) } as Errors);
      }
      setServerMsg(err instanceof ApiError && err.status < 500 && err.status !== 404 ? err.message : "We couldn't send your message right now.");
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  };

  const mailFallback = `mailto:${contact.email}?subject=${encodeURIComponent(`Project enquiry${f.service.length ? `: ${f.service.join(', ')}` : ''}`)}&body=${encodeURIComponent(`${f.message}\n\n${f.firstName} ${f.lastName}\n${f.phone}`)}`;

  return (
    <div className="relative rounded-[26px] bg-white p-5 sm:p-8 lg:p-10">
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div key="sent" role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} className="flex min-h-[520px] flex-col items-center justify-center text-center">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} className="grid h-16 w-16 place-items-center rounded-full bg-teal text-white"><CheckCircle2 size={30} /></motion.span>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-[-0.015em]">Message sent.</h2>
            <p className="mt-3 max-w-[36ch] text-slate">Thanks for reaching out. We've received your enquiry and will get back to you soon.</p>
            <button type="button" onClick={() => setStatus('idle')} className="mt-8 min-h-[48px] rounded-full border border-ink/80 px-6 font-semibold transition-colors hover:bg-ink hover:text-paper">Send another message</button>
          </motion.div>
        ) : (
          <motion.form key="form" ref={formRef} noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2" aria-label="Project enquiry form">
            <Field id="firstName" label="First Name" required error={errors.firstName}>
              <input {...a11y('firstName')} autoComplete="given-name" placeholder="Your first name" className={inputCls(errors.firstName)} />
            </Field>
            <Field id="lastName" label="Last Name" required error={errors.lastName}>
              <input {...a11y('lastName')} autoComplete="family-name" placeholder="Your last name" className={inputCls(errors.lastName)} />
            </Field>
            <Field id="email" label="Email Address" required error={errors.email}>
              <input {...a11y('email')} type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" className={inputCls(errors.email)} />
            </Field>
            <Field id="phone" label="Phone Number" required error={errors.phone}>
              <input {...a11y('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" className={inputCls(errors.phone)} />
            </Field>
            <ServiceMultiSelect
              value={f.service}
              error={errors.service}
              onChange={(next) => {
                const nf = { ...f, service: next };
                setF(nf);
                if (touched.service) setErrors((p) => ({ ...p, service: validate(nf).service }));
              }}
              onClose={() => { setTouched((t) => ({ ...t, service: true })); setErrors((p) => ({ ...p, service: validate(f).service })); }}
            />
            <Field id="message" label="Message" error={errors.message} className="sm:col-span-2">
              <textarea {...a11y('message')} rows={5} placeholder="Tell us about your project, goals and timeline…" className={`${inputCls(errors.message)} resize-y`} />
            </Field>
            {/* Honeypot: hidden from people and screen readers. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={f.website} onChange={set('website')} />

            <AnimatePresence>
              {status === 'error' && (
                <motion.div role="alert" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-[14px] bg-[#fdecea] p-4 text-sm text-[#8f2a24] sm:col-span-2">
                  <p className="flex items-center gap-2 font-semibold"><AlertCircle size={16} /> {serverMsg}</p>
                  <p className="mt-1">Your details are still here. Please try again, or reach us directly by{' '}
                    <a href={mailFallback} className="font-semibold underline underline-offset-2">email</a> or{' '}
                    <a href={contact.whatsappWithText(`Hi EVM, I'd like to discuss ${f.service.join(', ') || 'a project'}. ${f.message}`)} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">WhatsApp</a>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate"><span className="text-teal">*</span> Required fields</p>
              <button type="submit" disabled={status === 'sending'} className="group relative inline-flex min-h-[54px] items-center justify-center gap-2.5 overflow-hidden rounded-full bg-teal px-8 text-[16px] font-semibold text-white disabled:cursor-wait disabled:opacity-80 sm:min-w-[200px]">
                <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 group-disabled:scale-x-0" />
                {status === 'sending' ? (
                  <><Loader2 size={18} className="relative animate-spin" /><span className="relative">Sending…</span></>
                ) : (
                  <><span className="relative">Send Message</span><ArrowUpRight size={18} className="relative transition-transform duration-300 group-hover:rotate-45" /></>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Hero() {
  return (
    <section className="wrap pb-10 pt-10 text-center md:pb-14 md:pt-16 lg:pt-20">
      <motion.span className="kicker" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>Tell us about your project.</motion.span>
      <h1 className="h-display overflow-hidden pb-[0.08em] text-[13vw] leading-[1] md:text-[8vw] lg:text-[6.4vw] min-[1440px]:text-[92px]">
        <motion.span className="block" initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 0.95, delay: 0.1, ease }}>Contact Us Today</motion.span>
      </h1>
      <motion.p className="mx-auto mt-5 max-w-[58ch] text-base text-slate md:text-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}>
        We're thrilled that you're here! Let's make this as smooth and enjoyable as possible. Tell us what you're looking for, and let's start creating something great together.
      </motion.p>
    </section>
  );
}

function FormSection() {
  return (
    <section className="wrap pb-16 md:pb-24">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }}>
          <ContactForm />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(12% 0% 0% 0% round 26px)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 26px)' }}
          transition={{ duration: 1.1, delay: 0.45, ease }}
          className="group relative min-h-[240px] overflow-hidden rounded-[26px] sm:min-h-[340px] lg:min-h-0"
        >
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]">
            <div className="grid h-full w-full place-items-center bg-white px-[18%] pb-[28%]"><img src={evmLogo} alt="Elite Vision Media logo" className="h-auto w-full object-contain" /></div>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-ink p-6 text-white md:p-8">
            <p className="font-display text-2xl font-bold leading-tight tracking-[-0.015em] md:text-3xl">Prefer to talk it through?</p>
            <a href={contact.whatsappWithText("Hi EVM, I'd like to discuss a project.")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-teal hover:text-white">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactInfo() {
  const cards = [
    { icon: Mail, title: contact.email, note: 'Send us an email any time', href: `mailto:${contact.email}`, label: `Email ${contact.email}`, ext: false },
    { icon: MessageCircle, title: contact.phoneDisplay, note: 'Message or call us on WhatsApp', href: contact.whatsapp, label: `WhatsApp ${contact.phoneDisplay}`, ext: true },
    { icon: MapPin, title: 'R.S. Puram, Coimbatore', note: '1st Floor, 13, Diwan Bahadur Rd, above Bullet Miami, R.S. Puram, Coimbatore, Tamil Nadu 641002', href: contact.maps, label: 'Our address on Google Maps', ext: true },
    { icon: Navigation, title: 'Visit Us', note: 'Get directions to our studio on Google Maps', href: contact.maps, label: 'Get directions on Google Maps', ext: true },
  ];
  return (
    <section className="wrap section-pad pt-0 md:pt-0 lg:pt-0 min-[1440px]:pt-0">
      <CenteredHeading kicker="Get in touch" title="We'd love to hear from you." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            aria-label={c.label}
            {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease }}
            className="group flex flex-col items-center rounded-[22px] bg-[#e6f4f4] px-5 py-8 text-center transition-[background-color,transform] duration-500 hover:-translate-y-1 hover:bg-ink hover:text-paper md:py-10"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-teal-deep transition-colors duration-500 group-hover:bg-teal group-hover:text-white"><c.icon size={24} /></span>
            <h3 className="mt-6 break-all font-display text-lg font-bold tracking-[-0.01em] sm:break-normal md:text-xl">{c.title}</h3>
            <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-slate transition-colors duration-500 group-hover:text-white/65">{c.note}</p>
          </motion.a>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <p className="text-slate">You can also find us on social media through the links in the footer.</p>
      </Reveal>
    </section>
  );
}

export default function Contact() {
  useSeo({
    title: 'Contact Elite Vision Media | Coimbatore',
    description: 'Contact Elite Vision Media in R.S. Puram, Coimbatore for digital marketing, web design & development, video production and creative design. Email, WhatsApp or send us your project details.',
    path: '/contact',
    schema,
  });
  return (
    <main>
      <Hero />
      <FormSection />
      <ContactInfo />
    </main>
  );
}
