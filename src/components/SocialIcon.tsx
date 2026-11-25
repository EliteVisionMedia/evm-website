import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import type { SocialLink } from '../types';

const icons = { instagram: Instagram, youtube: Youtube, facebook: Facebook, linkedin: Linkedin };

export default function SocialIcon({ link, className = '' }: { link: SocialLink; className?: string }) {
  const Icon = icons[link.icon];
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Elite Vision Media on ${link.label}`}
      className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 ${className}`}
    >
      <Icon size={17} />
    </a>
  );
}
