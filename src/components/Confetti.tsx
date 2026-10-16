import { useMemo } from 'react';
import { useReducedMotion } from 'motion/react';

const COLORS = ['#ff5a5f', '#ffc531', '#5cc47a', '#5aa9ff', '#a77bff', '#ff8fd0'];

/** A short, one-shot confetti burst. Skipped entirely when reduced motion is on. */
export function Confetti({ pieces = 28 }: { pieces?: number }) {
  const reduce = useReducedMotion();
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        dur: 1.6 + Math.random() * 1.2,
        dx: `${(Math.random() - 0.5) * 30}vw`,
        color: COLORS[i % COLORS.length],
        w: 8 + Math.random() * 8,
        round: Math.random() > 0.6,
      })),
    [pieces],
  );
  if (reduce || document.documentElement.classList.contains('motion-reduced')) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {bits.map((b, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: `${b.left}%`,
            width: b.w,
            height: b.round ? b.w : b.w * 1.6,
            background: b.color,
            borderRadius: b.round ? '50%' : 3,
            animation: `wq-confetti ${b.dur}s ease-in ${b.delay}s forwards`,
            ['--dx' as string]: b.dx,
            transform: 'translateY(-10vh)',
          }}
        />
      ))}
    </div>
  );
}
