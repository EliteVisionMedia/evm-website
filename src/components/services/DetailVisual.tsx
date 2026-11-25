import type { ComponentType } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Bell, Heart, MapPin, MessageCircle, Play, Search, ShoppingCart, Star, CheckCircle2, Shield, Zap, Gauge, Plus, Type,
} from 'lucide-react';
import type { DetailMedia, VisualKind } from '../../data/serviceDetails';

const ease = [0.22, 1, 0.36, 1] as const;

/** Small reusable bits */
const Bar = ({ w, c = 'bg-ink/10' }: { w: string; c?: string }) => <span className={`block h-2 rounded-full ${c}`} style={{ width: w }} />;
const Dot = ({ c }: { c: string }) => <span className={`h-2.5 w-2.5 rounded-full ${c}`} />;

function Window({ children, url = 'yourbrand.com', dark = false }: { children: React.ReactNode; url?: string; dark?: boolean }) {
  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-[14px] ${dark ? 'bg-[#13151b]' : 'bg-white'} shadow-[0_30px_60px_-30px_rgba(12,13,17,.45)] ring-1 ring-black/5`}>
      <div className={`flex items-center gap-1.5 px-3.5 py-2.5 ${dark ? 'bg-white/5' : 'bg-[#f1f3f3]'}`}>
        <Dot c="bg-[#ff6159]" /><Dot c="bg-[#ffbd2e]" /><Dot c="bg-[#28c941]" />
        <span className={`ml-3 truncate rounded-md px-3 py-0.5 text-[10px] ${dark ? 'bg-white/10 text-white/50' : 'bg-white text-slate'}`}>{url}</span>
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function Search_() {
  return (
    <Window url="google.com/search?q=services+in+coimbatore">
      <div className="space-y-4 p-5">
        <div className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[12px] text-slate"><Search size={14} className="text-teal" /> services in coimbatore</div>
        {[0, 1].map((i) => (
          <div key={i} className={`rounded-xl p-3 ${i === 0 ? 'bg-[#e6f4f4] ring-1 ring-teal/40' : ''}`}>
            <span className="text-[10px] text-slate">{i === 0 ? 'yourbrand.com' : 'competitor.com'}</span>
            <p className={`mt-0.5 text-[13px] font-semibold ${i === 0 ? 'text-teal-deep' : 'text-[#1a0dab]/70'}`}>{i === 0 ? 'Your Brand – Trusted Services in Coimbatore' : 'Another business listing'}</p>
            <div className="mt-1.5 space-y-1"><Bar w="92%" /><Bar w="70%" /></div>
          </div>
        ))}
        <div className="flex items-end gap-1.5 rounded-xl bg-ink p-3">
          {[28, 36, 34, 48, 56, 70, 84].map((h, i) => <span key={i} className="flex-1 rounded-sm bg-teal" style={{ height: h * 0.6, opacity: 0.4 + i * 0.09 }} />)}
          <span className="ml-2 text-[10px] font-semibold text-white/70">Organic traffic</span>
        </div>
      </div>
    </Window>
  );
}

function Social() {
  const tiles = ['from-teal to-teal-deep', 'from-[#f4e7d6] to-[#b89b7d]', 'from-[#0c0d11] to-[#123b44]', 'from-[#9fd8d9] to-[#dff3f3]', 'from-[#ffbd2e]/70 to-[#ff6159]/60', 'from-teal/60 to-ink'];
  return (
    <div className="grid h-full grid-cols-[1fr_0.9fr] gap-3">
      <div className="rounded-[22px] bg-ink p-2.5 shadow-xl">
        <div className="h-full overflow-hidden rounded-[16px] bg-white p-3">
          <div className="flex items-center gap-2"><span className="h-7 w-7 rounded-full bg-gradient-to-br from-teal to-teal-deep" /><Bar w="40%" c="bg-ink/20" /></div>
          <div className="mt-3 grid grid-cols-3 gap-1">{tiles.map((t, i) => <span key={i} className={`aspect-square rounded-[4px] bg-gradient-to-br ${t}`} />)}</div>
          <div className="mt-3 flex gap-3 text-ink/60"><Heart size={14} /><MessageCircle size={14} /></div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl bg-white p-3 shadow-lg">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-teal">Content calendar</p>
          <div className="mt-2 grid grid-cols-5 gap-1">{Array.from({ length: 15 }, (_, i) => <span key={i} className={`h-4 rounded ${[1, 4, 7, 10, 13].includes(i) ? 'bg-teal' : [2, 8].includes(i) ? 'bg-teal/40' : 'bg-ink/5'}`} />)}</div>
        </div>
        <div className="flex-1 rounded-2xl bg-white p-3 shadow-lg">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-teal">Engagement</p>
          <svg viewBox="0 0 100 40" className="mt-2 h-14 w-full"><path d="M0 34 C 20 30, 30 22, 45 24 S 70 10, 100 6" fill="none" stroke="#019A9D" strokeWidth="2.5" /></svg>
          <div className="mt-1 flex items-center gap-1 text-[10px] text-slate"><Bell size={11} className="text-teal" /> New comments to reply</div>
        </div>
      </div>
    </div>
  );
}

function Ads() {
  return (
    <Window url="business.facebook.com/adsmanager" dark>
      <div className="grid h-full grid-cols-3 gap-3 p-4 text-white">
        {['Reach', 'Clicks', 'Leads'].map((l, i) => (
          <div key={l} className="rounded-xl bg-white/5 p-3">
            <span className="text-[10px] text-white/50">{l}</span>
            <div className="mt-2"><Bar w={`${55 + i * 15}%`} c="bg-teal" /></div>
          </div>
        ))}
        <div className="col-span-2 rounded-xl bg-white/5 p-3">
          <span className="text-[10px] text-white/50">Campaign performance</span>
          <div className="mt-3 flex h-24 items-end gap-2">{[30, 45, 40, 62, 58, 75, 90].map((h, i) => <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-teal-deep to-teal" style={{ height: `${h}%` }} />)}</div>
        </div>
        <div className="rounded-xl bg-white p-2 text-ink">
          <span className="block aspect-[4/5] rounded-lg bg-gradient-to-br from-teal to-ink" />
          <Bar w="80%" c="mt-2 bg-ink/15" />
          <span className="mt-2 block rounded-md bg-teal py-1 text-center text-[9px] font-bold text-white">Learn more</span>
        </div>
      </div>
    </Window>
  );
}

function Content() {
  return (
    <div className="grid h-full grid-cols-[1.1fr_0.9fr] gap-3">
      <Window url="yourbrand.com/blog/guide">
        <div className="p-4">
          <span className="block aspect-[16/8] rounded-lg bg-gradient-to-br from-[#dff3f3] to-teal/60" />
          <p className="mt-3 font-display text-[13px] font-bold leading-tight text-ink">A practical guide to choosing the right service</p>
          <div className="mt-2 space-y-1.5"><Bar w="100%" /><Bar w="94%" /><Bar w="80%" /><Bar w="96%" /><Bar w="60%" /></div>
        </div>
      </Window>
      <div className="rounded-[14px] bg-ink p-4 text-white shadow-xl">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-teal">Editorial plan</p>
        {['Guide', 'Case story', 'Newsletter', 'Video script', 'FAQ page'].map((t, i) => (
          <div key={t} className="mt-2.5 flex items-center gap-2 text-[11px]">
            <CheckCircle2 size={13} className={i < 3 ? 'text-teal' : 'text-white/25'} />
            <span className={i < 3 ? 'text-white' : 'text-white/50'}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapV() {
  return (
    <div className="relative h-full overflow-hidden rounded-[14px] bg-[#e9efe9] shadow-[0_30px_60px_-30px_rgba(12,13,17,.45)]">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <path d="M-10 90 L 410 140 M 120 -10 L 160 310 M -10 230 L 410 200 M 290 -10 L 260 310" stroke="#fff" strokeWidth="14" />
        <path d="M-10 90 L 410 140 M 120 -10 L 160 310 M -10 230 L 410 200 M 290 -10 L 260 310" stroke="#d8dcd4" strokeWidth="1" />
        <rect x="175" y="150" width="70" height="40" rx="6" fill="#cfe6d3" />
      </svg>
      {[[22, 30], [70, 62], [40, 75]].map(([x, y], i) => <MapPin key={i} size={22} className="absolute text-slate/50" style={{ left: `${x}%`, top: `${y}%` }} />)}
      <div className="absolute left-[48%] top-[30%] -translate-x-1/2"><MapPin size={44} className="fill-teal text-white drop-shadow-lg" /></div>
      <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white p-3 shadow-lg">
        <p className="text-[13px] font-bold text-ink">Your Business</p>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={11} className="fill-[#fbbc04] text-[#fbbc04]" />)} · Coimbatore · Open now</div>
        <div className="mt-2 flex gap-2">{['Call', 'Directions', 'Website'].map((b) => <span key={b} className="rounded-full bg-[#e6f4f4] px-2.5 py-1 text-[10px] font-semibold text-teal-deep">{b}</span>)}</div>
      </div>
    </div>
  );
}

function Browser() {
  return (
    <Window>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-5 py-3"><span className="font-display text-[12px] font-extrabold">BRAND</span><div className="flex gap-2">{[0, 1, 2].map((i) => <Bar key={i} w="28px" />)}</div></div>
        <div className="grid flex-1 grid-cols-2 items-center gap-4 bg-gradient-to-br from-[#f7f9f9] to-[#e6f4f4] px-5">
          <div><p className="font-display text-[18px] font-extrabold leading-[1.05] text-ink">Designed for <span className="text-teal">your</span> brand.</p><div className="mt-2 space-y-1"><Bar w="90%" /><Bar w="70%" /></div><span className="mt-3 inline-block rounded-full bg-teal px-3 py-1 text-[9px] font-bold text-white">Get started</span></div>
          <div className="relative aspect-square"><span className="absolute inset-[10%] rounded-full bg-teal/80" /><span className="absolute bottom-0 right-0 h-1/2 w-1/2 rounded-[18px] bg-ink" /></div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4">{[0, 1, 2].map((i) => <span key={i} className="h-10 rounded-lg bg-ink/5" />)}</div>
      </div>
    </Window>
  );
}

function Business() {
  return (
    <Window url="yourcompany.in">
      <div className="space-y-3 p-4">
        <div className="rounded-xl bg-ink p-4 text-white"><p className="font-display text-[15px] font-bold">Trusted engineering since day one.</p><div className="mt-2 flex gap-2"><span className="rounded-full bg-teal px-3 py-1 text-[9px] font-bold">Our services</span><span className="rounded-full border border-white/30 px-3 py-1 text-[9px]">Contact</span></div></div>
        <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="rounded-lg border border-line p-2"><span className="block h-5 w-5 rounded-md bg-[#e6f4f4]" /><Bar w="70%" c="mt-2 bg-ink/15" /><Bar w="90%" c="mt-1 bg-ink/5" /></div>)}</div>
        <div className="flex items-center gap-2 rounded-xl border border-teal/40 bg-[#e6f4f4] p-3"><MessageCircle size={14} className="text-teal" /><span className="text-[11px] font-semibold text-teal-deep">Enquiry form · WhatsApp · Call</span></div>
      </div>
    </Window>
  );
}

function WordPress() {
  return (
    <Window url="yoursite.com/wp-admin">
      <div className="grid h-full grid-cols-[70px_1fr]">
        <div className="space-y-2 bg-[#1d2327] p-2.5">{Array.from({ length: 7 }, (_, i) => <span key={i} className={`block h-2.5 rounded ${i === 2 ? 'bg-teal' : 'bg-white/15'}`} />)}</div>
        <div className="p-4">
          <div className="flex items-center justify-between"><Bar w="40%" c="bg-ink/25" /><span className="rounded bg-teal px-2 py-0.5 text-[9px] font-bold text-white">Publish</span></div>
          <div className="mt-3 rounded-lg border border-dashed border-teal/50 p-3"><p className="font-display text-[14px] font-bold">Page title</p><div className="mt-2 space-y-1"><Bar w="96%" /><Bar w="88%" /></div></div>
          <div className="mt-2 grid grid-cols-2 gap-2"><span className="h-14 rounded-lg bg-gradient-to-br from-[#dff3f3] to-teal/50" /><div className="space-y-1 pt-1"><Bar w="90%" /><Bar w="70%" /><Bar w="80%" /></div></div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate"><Plus size={12} className="text-teal" /> Add block</div>
        </div>
      </div>
    </Window>
  );
}

function Shop() {
  const cols = ['from-[#f4e7d6] to-[#b89b7d]', 'from-[#dff3f3] to-teal', 'from-[#0c0d11] to-[#123b44]', 'from-[#ffe1d6] to-[#ff8a65]', 'from-[#e9eef0] to-[#8aa5ab]', 'from-teal/40 to-teal-deep'];
  return (
    <Window url="yourstore.in/shop">
      <div className="p-4">
        <div className="flex items-center justify-between"><span className="font-display text-[12px] font-extrabold">STORE</span><span className="relative"><ShoppingCart size={16} /><span className="absolute -right-1.5 -top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-teal text-[8px] font-bold text-white">2</span></span></div>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {cols.map((c, i) => (
            <div key={i}>
              <span className={`block aspect-square rounded-lg bg-gradient-to-br ${c}`} />
              <Bar w="80%" c="mt-1.5 bg-ink/15" />
              <span className="mt-1 block text-[9px] font-bold text-teal-deep">₹ ----</span>
            </div>
          ))}
        </div>
        <span className="mt-3 block rounded-lg bg-ink py-2 text-center text-[10px] font-bold text-white">Secure checkout</span>
      </div>
    </Window>
  );
}

function Wireframe() {
  return (
    <div className="grid h-full grid-cols-[0.55fr_1fr] gap-3">
      <div className="rounded-[18px] border-2 border-dashed border-ink/20 bg-white p-3">
        <span className="block h-3 w-1/2 rounded bg-ink/15" />
        <span className="mt-3 block aspect-[4/3] rounded border border-dashed border-ink/25 bg-[repeating-linear-gradient(45deg,transparent_0_6px,rgba(12,13,17,.05)_6px_7px)]" />
        <div className="mt-3 space-y-1.5"><Bar w="90%" /><Bar w="70%" /></div>
        <span className="mt-3 block h-6 rounded-full border border-dashed border-ink/30" />
      </div>
      <div className="relative rounded-[18px] bg-white p-4 shadow-xl">
        <span className="block h-3 w-1/3 rounded bg-ink" />
        <span className="mt-3 block aspect-[16/9] rounded-xl bg-gradient-to-br from-teal to-teal-deep" />
        <div className="mt-3 space-y-1.5"><Bar w="80%" c="bg-ink/20" /><Bar w="60%" /></div>
        <span className="mt-3 inline-block rounded-full bg-teal px-4 py-1.5 text-[10px] font-bold text-white">Continue</span>
        <span className="absolute -left-5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-ink text-white shadow-lg">→</span>
      </div>
    </div>
  );
}

function Maintenance() {
  const items = [{ i: Gauge, l: 'Performance', v: '96' }, { i: Shield, l: 'Security', v: 'OK' }, { i: Zap, l: 'Updates', v: '✓' }];
  return (
    <div className="grid h-full grid-cols-2 gap-3">
      <div className="relative overflow-hidden rounded-[14px] bg-[#e9e9e4] p-3 opacity-80 shadow-md">
        <span className="absolute left-3 top-3 rounded bg-ink/60 px-2 py-0.5 text-[9px] font-bold text-white">BEFORE</span>
        <div className="mt-8 space-y-2"><span className="block h-14 bg-[#c9c9c1]" /><Bar w="90%" c="bg-ink/20" /><Bar w="70%" c="bg-ink/15" /><div className="grid grid-cols-4 gap-1">{[0, 1, 2, 3].map((i) => <span key={i} className="h-6 bg-[#d5d5cd]" />)}</div></div>
      </div>
      <div className="relative overflow-hidden rounded-[14px] bg-white p-3 shadow-xl ring-1 ring-teal/30">
        <span className="absolute left-3 top-3 rounded bg-teal px-2 py-0.5 text-[9px] font-bold text-white">AFTER</span>
        <div className="mt-8 space-y-2"><span className="block h-14 rounded-lg bg-gradient-to-br from-teal to-ink" /><Bar w="80%" c="bg-ink/25" /><Bar w="60%" /><span className="inline-block rounded-full bg-teal px-3 py-1 text-[9px] font-bold text-white">Enquire</span></div>
      </div>
      <div className="col-span-2 grid grid-cols-3 gap-2 rounded-[14px] bg-ink p-3 text-white">
        {items.map(({ i: I, l, v }) => <div key={l} className="flex items-center gap-2"><I size={16} className="text-teal" /><div><p className="text-[9px] text-white/50">{l}</p><p className="font-display text-[13px] font-bold">{v}</p></div></div>)}
      </div>
    </div>
  );
}

function Storyboard() {
  const scenes = ['Problem', 'Solution', 'How it works', 'Call to action'];
  return (
    <div className="grid h-full grid-cols-2 gap-3">
      {scenes.map((s, i) => (
        <div key={s} className="flex flex-col rounded-[14px] bg-white p-2.5 shadow-lg">
          <div className="relative flex-1 rounded-lg border border-line bg-[#f7f9f9]">
            <span className="absolute left-2 top-2 font-display text-[10px] font-bold text-slate">0{i + 1}</span>
            <svg viewBox="0 0 100 60" className="absolute inset-0 m-auto h-[70%] w-[70%]">
              {i === 0 && <><circle cx="35" cy="30" r="12" fill="none" stroke="#0C0D11" strokeWidth="2" /><path d="M60 22 l10 16 M70 22 l-10 16" stroke="#ff6159" strokeWidth="3" /></>}
              {i === 1 && <><circle cx="35" cy="30" r="12" fill="none" stroke="#0C0D11" strokeWidth="2" /><path d="M58 30 l7 7 l13 -15" fill="none" stroke="#019A9D" strokeWidth="3" /></>}
              {i === 2 && <><rect x="12" y="20" width="18" height="18" rx="3" fill="#019A9D" /><rect x="42" y="20" width="18" height="18" rx="3" fill="#017F82" opacity=".7" /><rect x="72" y="20" width="18" height="18" rx="3" fill="#0C0D11" /><path d="M31 29h10M61 29h10" stroke="#0C0D11" strokeWidth="1.5" /></>}
              {i === 3 && <rect x="25" y="22" width="50" height="16" rx="8" fill="#019A9D" />}
            </svg>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-ink">{s}</p>
        </div>
      ))}
    </div>
  );
}

function MotionV() {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[14px] bg-ink shadow-xl">
      <div className="relative flex-1 overflow-hidden">
        <motion.span className="absolute left-[15%] top-[20%] h-20 w-20 rounded-full bg-teal" animate={reduce ? undefined : { x: [0, 40, 0], scale: [1, 1.15, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.span className="absolute right-[18%] top-[30%] h-16 w-16 rounded-2xl bg-[#4fd0d2]" animate={reduce ? undefined : { rotate: [0, 90, 0], y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-[18%] left-[12%] flex items-center gap-2 font-display text-[22px] font-extrabold text-white" animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}>
          <Type size={20} className="text-teal" /> Your message.
        </motion.div>
      </div>
      <div className="space-y-1.5 border-t border-white/10 bg-white/5 p-3">
        {[['20%', '45%', 'bg-teal'], ['35%', '40%', 'bg-[#4fd0d2]'], ['10%', '70%', 'bg-white/40']].map(([l, w, c], i) => (
          <div key={i} className="relative h-3 rounded bg-white/5"><span className={`absolute top-0 h-3 rounded ${c}`} style={{ left: l, width: w }} /></div>
        ))}
        <div className="relative h-px bg-white/20"><span className="absolute -top-2 left-[48%] h-4 w-0.5 bg-[#ff6159]" /></div>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[14px] bg-[#16181f] shadow-xl">
      <div className="grid flex-1 grid-cols-[1fr_0.45fr] gap-2 p-3">
        <div className="relative overflow-hidden rounded-lg bg-[url('/videos/reels/showreel.webp')] bg-cover bg-center"><span className="absolute inset-0 grid place-items-center"><span className="grid h-10 w-10 place-items-center rounded-full bg-teal text-white"><Play size={16} fill="currentColor" /></span></span></div>
        <div className="space-y-2 rounded-lg bg-white/5 p-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-white/50">Colour</p>
          {['#ff6159', '#28c941', '#4fd0d2'].map((c) => <div key={c} className="h-1.5 rounded-full bg-white/10"><span className="block h-1.5 w-2/3 rounded-full" style={{ background: c }} /></div>)}
          <p className="pt-1 text-[9px] font-semibold uppercase tracking-wider text-white/50">Audio</p>
          <div className="flex h-6 items-center gap-px">{Array.from({ length: 22 }, (_, i) => <span key={i} className="flex-1 rounded-sm bg-teal" style={{ height: `${25 + ((i * 37) % 70)}%` }} />)}</div>
        </div>
      </div>
      <div className="space-y-1.5 border-t border-white/10 p-3">
        {[[['0%', '30%'], ['32%', '25%'], ['59%', '38%']], [['10%', '40%'], ['55%', '30%']], [['0%', '97%']]].map((row, r) => (
          <div key={r} className="relative h-4 rounded bg-white/5">
            {row.map(([l, w], i) => <span key={i} className={`absolute top-0 h-4 rounded ${r === 0 ? 'bg-teal/80' : r === 1 ? 'bg-[#a78bfa]/70' : 'bg-[#4fd0d2]/40'}`} style={{ left: l, width: w }} />)}
          </div>
        ))}
        <div className="relative h-px"><span className="absolute -top-14 left-[44%] h-16 w-0.5 bg-[#ff6159]" /></div>
      </div>
    </div>
  );
}

const map: Record<VisualKind, ComponentType> = {
  search: Search_, social: Social, ads: Ads, content: Content, map: MapV,
  browser: Browser, business: Business, wordpress: WordPress, shop: Shop, wireframe: Wireframe, maintenance: Maintenance,
  storyboard: Storyboard, motion: MotionV, timeline: Timeline,
};

/** Renders a service visual: real EVM photo/frame, or a code-drawn illustration on a soft teal stage. */
export default function DetailVisual({ media, hero = false, className = '' }: { media: DetailMedia; hero?: boolean; className?: string }) {
  if ('photo' in media) {
    return (
      <div className={`relative overflow-hidden rounded-[24px] bg-ink ${media.vertical ? 'aspect-[4/5]' : 'aspect-[16/10]'} ${hero && media.vertical ? 'mx-auto w-full max-w-[460px]' : ''} ${className}`}>
        <img src={media.photo} alt={media.alt} loading={hero ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur">EVM work</span>
      </div>
    );
  }
  const V = map[media.kind];
  return (
    <motion.div
      role="img"
      aria-label="Illustration"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className={`relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#e6f4f4] via-[#f4f8f8] to-[#d3ecec] p-5 sm:p-7 ${hero ? 'aspect-[4/3.4]' : 'aspect-[16/11]'} ${className}`}
    >
      <span aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal/15" />
      <span aria-hidden className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-teal/10" />
      <div className="relative h-full">
        <V />
      </div>
      <span className="absolute bottom-3 right-4 text-[10px] font-medium uppercase tracking-[0.1em] text-teal-deep/60">Illustration</span>
    </motion.div>
  );
}

