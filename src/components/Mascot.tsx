import type { ReactNode } from 'react';
import { Dino } from '../art/primitives';
import { motion } from 'motion/react';

/** Pip, the friendly guide dinosaur, with an optional speech bubble. */
export function PipArt({ className = '', mood = 'happy' }: { className?: string; mood?: 'happy' | 'surprised' | 'determined' }) {
  return (
    <svg viewBox="-8 -12 176 160" className={className} aria-hidden>
      <defs>
        <filter id="pip-ol" x="-10%" y="-10%" width="120%" height="120%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="2.4" result="d" />
          <feFlood floodColor="#2b2340" />
          <feComposite in2="d" operator="in" result="o" />
          <feMerge>
            <feMergeNode in="o" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#pip-ol)">
        <Dino color="#7a5cff" belly="#e3d9ff" spikes="#ffc531" mood={mood} />
      </g>
    </svg>
  );
}

export function Mascot({ children, mood }: { children?: ReactNode; mood?: 'happy' | 'surprised' | 'determined' }) {
  return (
    <div className="flex items-end gap-3">
      <motion.div className="w-24 shrink-0 sm:w-28" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <PipArt mood={mood} />
      </motion.div>
      {children && (
        <div className="relative mb-6 rounded-3xl bg-white px-5 py-3 text-lg font-semibold shadow-[0_4px_0_rgba(43,35,64,0.08)] before:absolute before:-left-2 before:bottom-4 before:h-4 before:w-4 before:rotate-45 before:bg-white">
          {children}
        </div>
      )}
    </div>
  );
}
