/**
 * Reusable SVG character primitives. All shapes are flat fills with no outer stroke: the sticker
 * filter (see StickerArt) draws a single outline around the whole silhouette, which gives a clean
 * die-cut sticker look. Small interior details use INK strokes.
 */
import type { ReactNode } from 'react';

export const INK = '#2b2340';

type Mood = 'happy' | 'worried' | 'surprised' | 'determined' | 'focused';

interface Placed {
  x?: number;
  y?: number;
  s?: number;
  flip?: boolean;
  rotate?: number;
}

export function at({ x = 0, y = 0, s = 1, flip = false, rotate = 0 }: Placed, w = 0): string {
  return `translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -s : s} ${s})${flip ? ` translate(${-w} 0)` : ''}`;
}

export function Eye({ cx, cy, r = 7, look = [1, 0.5] }: { cx: number; cy: number; r?: number; look?: [number, number] }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" />
      <circle cx={cx + look[0] * r * 0.3} cy={cy + look[1] * r * 0.3} r={r * 0.55} fill={INK} />
      <circle cx={cx + look[0] * r * 0.3 + r * 0.2} cy={cy + look[1] * r * 0.3 - r * 0.22} r={r * 0.18} fill="#fff" />
    </g>
  );
}

export function Star({ cx, cy, r, fill = '#ffd23f', rotate = 0 }: { cx: number; cy: number; r: number; fill?: string; rotate?: number }) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2 + (rotate * Math.PI) / 180;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return <polygon points={pts.join(' ')} fill={fill} strokeLinejoin="round" />;
}

export function Sparkle({ cx, cy, r = 8, fill = '#fff6a8' }: { cx: number; cy: number; r?: number; fill?: string }) {
  return <path d={`M${cx} ${cy - r} Q${cx + r * 0.18} ${cy - r * 0.18} ${cx + r} ${cy} Q${cx + r * 0.18} ${cy + r * 0.18} ${cx} ${cy + r} Q${cx - r * 0.18} ${cy + r * 0.18} ${cx - r} ${cy} Q${cx - r * 0.18} ${cy - r * 0.18} ${cx} ${cy - r}Z`} fill={fill} />;
}

export function Heart({ cx, cy, s = 1, fill = '#ff5c8a' }: { cx: number; cy: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${cx} ${cy}) scale(${s})`}
      d="M0 8 C-14 -2 -10 -14 -3 -12 C-1 -11.5 0 -10 0 -9 C0 -10 1 -11.5 3 -12 C10 -14 14 -2 0 8Z"
      fill={fill}
    />
  );
}

function Brows({ mood, left, right, y }: { mood: Mood; left: number; right: number; y: number }) {
  if (mood === 'worried')
    return (
      <g stroke={INK} strokeWidth={3} strokeLinecap="round">
        <path d={`M${left - 6} ${y - 2} L${left + 5} ${y - 6}`} />
        <path d={`M${right - 5} ${y - 6} L${right + 6} ${y - 2}`} />
      </g>
    );
  if (mood === 'determined' || mood === 'focused')
    return (
      <g stroke={INK} strokeWidth={3} strokeLinecap="round">
        <path d={`M${left - 6} ${y - 7} L${left + 5} ${y - 3}`} />
        <path d={`M${right - 5} ${y - 3} L${right + 6} ${y - 7}`} />
      </g>
    );
  if (mood === 'surprised')
    return (
      <g stroke={INK} strokeWidth={3} strokeLinecap="round" fill="none">
        <path d={`M${left - 6} ${y - 6} Q${left} ${y - 11} ${left + 6} ${y - 6}`} />
        <path d={`M${right - 6} ${y - 6} Q${right} ${y - 11} ${right + 6} ${y - 6}`} />
      </g>
    );
  return null;
}

/** Cute side-view dinosaur facing right. Local box ≈ 160 × 140. */
export function Dino({
  color = '#5cc47a',
  belly = '#c9f2b8',
  spikes = '#ff9f43',
  eyes = 1,
  mood = 'happy',
  children,
  ...placed
}: Placed & { color?: string; belly?: string; spikes?: string; eyes?: 1 | 2 | 3; mood?: Mood; children?: ReactNode }) {
  const eyePos: [number, number][] = eyes === 3 ? [[106, 34], [120, 25], [134, 33]] : eyes === 2 ? [[114, 33], [132, 33]] : [[128, 34]];
  const mouth =
    mood === 'surprised' ? (
      <ellipse cx={138} cy={53} rx={6} ry={7} fill={INK} />
    ) : mood === 'worried' ? (
      <path d="M126 55 Q131 51 136 55 Q141 59 146 54" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
    ) : mood === 'determined' ? (
      <path d="M124 52 Q136 60 148 50 L146 56 Q136 64 126 57Z" fill={INK} />
    ) : mood === 'focused' ? (
      <path d="M128 54 L144 52" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    ) : (
      <path d="M124 51 Q136 61 148 49" stroke={INK} strokeWidth={3.2} fill="none" strokeLinecap="round" />
    );
  return (
    <g transform={at(placed, 160)}>
      {/* spikes */}
      <g fill={spikes}>
        <path d="M30 76 L36 58 L46 72Z" />
        <path d="M46 68 L56 48 L66 64Z" />
        <path d="M66 63 L78 44 L88 62Z" />
        <path d="M90 60 L100 42 L106 58Z" />
        <path d="M104 24 L112 6 L120 20Z" />
      </g>
      {/* tail, body, legs, neck, head */}
      <path d="M36 92 Q6 92 0 58 Q22 80 44 76Z" fill={color} />
      <rect x={38} y={104} width={22} height={32} rx={9} fill={color} />
      <rect x={86} y={104} width={20} height={32} rx={9} fill={color} />
      <ellipse cx={70} cy={94} rx={46} ry={33} fill={color} />
      <path d="M88 82 Q92 52 106 44 L126 58 Q112 74 110 100Z" fill={color} />
      <ellipse cx={122} cy={40} rx={34} ry={28} fill={color} />
      <ellipse cx={78} cy={104} rx={27} ry={16} fill={belly} />
      <ellipse cx={108} cy={98} rx={7} ry={5} fill={color} transform="rotate(30 108 98)" />
      <circle cx={150} cy={36} r={2} fill={INK} />
      <circle cx={141} cy={47} r={5} fill="#ff8fab" opacity={0.6} />
      {eyePos.map(([cx, cy], i) => (
        <Eye key={i} cx={cx} cy={cy} r={eyes === 1 ? 7.5 : 6.5} look={mood === 'focused' ? [1, 0] : [0.8, 0.4]} />
      ))}
      <Brows mood={mood} left={eyePos[0][0]} right={eyePos[eyePos.length - 1][0]} y={eyePos[0][1] - 6} />
      {mouth}
      {children}
    </g>
  );
}

/** Friendly robot. Local box ≈ 100 × 140. */
export function Robot({
  color = '#5aa9ff',
  accent = '#ffd23f',
  mood = 'happy',
  antennaTop,
  children,
  ...placed
}: Placed & { color?: string; accent?: string; mood?: Mood; antennaTop?: ReactNode; children?: ReactNode }) {
  return (
    <g transform={at(placed, 100)}>
      <rect x={47} y={0} width={6} height={16} fill="#8a8fa8" />
      {antennaTop ?? <circle cx={50} cy={4} r={7} fill={accent} />}
      <rect x={4} y={34} width={10} height={16} rx={4} fill={accent} />
      <rect x={86} y={34} width={10} height={16} rx={4} fill={accent} />
      <rect x={12} y={14} width={76} height={56} rx={16} fill={color} />
      <rect x={22} y={24} width={56} height={34} rx={10} fill="#1f2a44" />
      {mood === 'focused' ? (
        <g fill="#7ff0ff">
          <rect x={30} y={36} width={14} height={5} rx={2.5} />
          <rect x={56} y={36} width={14} height={5} rx={2.5} />
        </g>
      ) : (
        <g fill="#7ff0ff">
          <circle cx={37} cy={38} r={6} />
          <circle cx={63} cy={38} r={6} />
        </g>
      )}
      {mood === 'surprised' ? (
        <ellipse cx={50} cy={51} rx={4} ry={4} fill="#7ff0ff" />
      ) : (
        <path d="M40 49 Q50 56 60 49" stroke="#7ff0ff" strokeWidth={3} fill="none" strokeLinecap="round" />
      )}
      <rect x={24} y={74} width={52} height={42} rx={10} fill={color} />
      <rect x={34} y={82} width={32} height={18} rx={5} fill="#e9f3ff" />
      <circle cx={42} cy={91} r={3.5} fill="#ff5c8a" />
      <circle cx={50} cy={91} r={3.5} fill={accent} />
      <circle cx={58} cy={91} r={3.5} fill="#5cc47a" />
      <rect x={30} y={114} width={14} height={22} rx={5} fill="#8a8fa8" />
      <rect x={56} y={114} width={14} height={22} rx={5} fill="#8a8fa8" />
      <rect x={26} y={132} width={22} height={9} rx={4} fill={color} />
      <rect x={52} y={132} width={22} height={9} rx={4} fill={color} />
      {children}
    </g>
  );
}

/** Round little alien. Local box ≈ 120 × 130. */
export function Alien({
  color = '#a77bff',
  belly = '#e3d4ff',
  eyes = 1,
  mood = 'happy',
  children,
  ...placed
}: Placed & { color?: string; belly?: string; eyes?: 1 | 2 | 3; mood?: Mood; children?: ReactNode }) {
  const eyeList: [number, number, number][] = eyes === 3 ? [[40, 50, 11], [60, 42, 12], [80, 50, 11]] : eyes === 2 ? [[46, 50, 12], [74, 50, 12]] : [[60, 48, 17]];
  return (
    <g transform={at(placed, 120)}>
      <path d="M36 24 Q30 6 20 4" stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M84 24 Q90 6 100 4" stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={20} cy={4} r={7} fill="#7cf5c0" />
      <circle cx={100} cy={4} r={7} fill="#7cf5c0" />
      <ellipse cx={30} cy={122} rx={14} ry={8} fill={color} />
      <ellipse cx={90} cy={122} rx={14} ry={8} fill={color} />
      <path d="M14 80 Q6 92 12 104" stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M106 80 Q114 92 108 104" stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M60 18 C100 18 112 52 106 82 C100 112 82 122 60 122 C38 122 20 112 14 82 C8 52 20 18 60 18Z" fill={color} />
      <ellipse cx={60} cy={96} rx={28} ry={20} fill={belly} />
      {eyeList.map(([cx, cy, r], i) => (
        <Eye key={i} cx={cx} cy={cy} r={mood === 'surprised' ? r * 1.15 : r} look={[0, 0.3]} />
      ))}
      {mood === 'surprised' ? (
        <ellipse cx={60} cy={78} rx={8} ry={10} fill={INK} />
      ) : mood === 'worried' ? (
        <path d="M50 78 Q55 74 60 78 Q65 82 70 78" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M48 74 Q60 86 72 74" stroke={INK} strokeWidth={3.2} fill="none" strokeLinecap="round" />
      )}
      <circle cx={34} cy={72} r={5} fill="#ff8fab" opacity={0.55} />
      <circle cx={86} cy={72} r={5} fill="#ff8fab" opacity={0.55} />
      {children}
    </g>
  );
}

/** Astronaut. Local box ≈ 110 × 150. */
export function Astronaut({ suit = '#f4f6ff', trim = '#ff7a59', visor = '#5aa9ff', children, ...placed }: Placed & { suit?: string; trim?: string; visor?: string; children?: ReactNode }) {
  return (
    <g transform={at(placed, 110)}>
      <rect x={14} y={60} width={82} height={56} rx={14} fill="#c9cfe6" />
      <rect x={26} y={104} width={24} height={40} rx={9} fill={suit} />
      <rect x={60} y={104} width={24} height={40} rx={9} fill={suit} />
      <rect x={22} y={136} width={32} height={12} rx={6} fill={trim} />
      <rect x={56} y={136} width={32} height={12} rx={6} fill={trim} />
      <rect x={22} y={58} width={66} height={56} rx={18} fill={suit} />
      <rect x={6} y={64} width={20} height={42} rx={10} fill={suit} />
      <rect x={84} y={64} width={20} height={42} rx={10} fill={suit} />
      <circle cx={16} cy={108} r={9} fill={trim} />
      <circle cx={94} cy={108} r={9} fill={trim} />
      <rect x={38} y={76} width={34} height={20} rx={5} fill="#dfe5ff" />
      <circle cx={47} cy={86} r={4} fill={trim} />
      <circle cx={63} cy={86} r={4} fill="#5cc47a" />
      <circle cx={55} cy={34} r={32} fill={suit} />
      <ellipse cx={55} cy={36} rx={23} ry={19} fill={visor} />
      <circle cx={47} cy={36} r={3.4} fill={INK} />
      <circle cx={63} cy={36} r={3.4} fill={INK} />
      <path d="M48 45 Q55 51 62 45" stroke={INK} strokeWidth={2.6} fill="none" strokeLinecap="round" />
      <path d="M40 26 Q46 20 54 20" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.8} />
      {children}
    </g>
  );
}

export function Gem({ cx, cy, s = 1, fill = '#5ee6eb', shine = '#d8fbff' }: { cx: number; cy: number; s?: number; fill?: string; shine?: string }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <path d="M-16 -6 L-8 -16 L8 -16 L16 -6 L0 16Z" fill={fill} />
      <path d="M-8 -16 L-4 -6 L4 -6 L8 -16Z M-16 -6 L-4 -6 L0 16Z" fill={shine} opacity={0.7} />
    </g>
  );
}

export function Coin({ cx, cy, r = 12 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#ffc531" />
      <circle cx={cx} cy={cy} r={r * 0.68} fill="#ffe27a" />
      <rect x={cx - r * 0.12} y={cy - r * 0.45} width={r * 0.24} height={r * 0.9} rx={r * 0.1} fill="#e8a400" />
    </g>
  );
}
