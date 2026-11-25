import { Link } from 'react-router-dom';
import logo from '../assets/evm-logo.png';

interface LogoProps {
  /** 'light' sits directly on Paper; 'dark' puts the original logo on a white plate so the black artwork stays visible. */
  variant?: 'light' | 'dark';
  className?: string;
}

/** The original EVM logo, never recoloured. Aspect ratio 3362:1280 is preserved via width:auto. */
export default function Logo({ variant = 'light', className = 'h-10 md:h-12' }: LogoProps) {
  const img = (
    <img src={logo} alt="Elite Vision Media" width={1200} height={457} className={`${className} w-auto select-none`} draggable={false} />
  );
  return (
    <Link to="/" aria-label="Elite Vision Media, home" className="inline-flex shrink-0">
      {variant === 'dark' ? <span className="inline-block rounded-2xl bg-white px-3.5 py-2.5">{img}</span> : img}
    </Link>
  );
}
