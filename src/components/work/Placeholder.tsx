import { ImageOff } from 'lucide-react';

/** Marked stand-in visual used until real media is added. */
export default function Placeholder({ bg, label = 'Placeholder' }: { bg: string; label?: string }) {
  return (
    <div className="absolute inset-0" style={{ background: bg }}>
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/90 backdrop-blur">
        <ImageOff size={11} /> {label}
      </span>
    </div>
  );
}
