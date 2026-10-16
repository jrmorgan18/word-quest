/**
 * Original sticker artwork. Every sticker is drawn in a 200 × 200 box (content kept inside ~14px
 * margins so the white die-cut border fits). `u` is a unique prefix for gradient/clip ids so many
 * copies can live in one scene SVG.
 */
import { useId, type ReactNode } from 'react';
import { Alien, Astronaut, Coin, Dino, Eye, Gem, Heart, INK, Robot, Sparkle, Star } from './primitives';

type Art = (u: string) => ReactNode;

const ground = (y = 178, fill = '#8fd16a') => <ellipse cx={100} cy={y} rx={78} ry={10} fill={fill} />;

const ART: Record<string, Art> = {
  // ───────────── Week 1 ─────────────
  'stk-peculiar': () => (
    <g>
      {ground(176, '#9be07a')}
      <Dino x={18} y={36} eyes={3} color="#56c271" spikes="#c38bff" belly="#d4f7c2" />
      <path d="M30 40 q0 -14 12 -14 q12 0 12 12 q0 8 -10 10 v6" stroke="#c38bff" strokeWidth={6} fill="none" strokeLinecap="round" />
      <circle cx={44} cy={64} r={4} fill="#c38bff" />
    </g>
  ),
  'stk-reluctant': () => (
    <g>
      <path d="M14 168 Q40 156 66 168 T118 168 T170 168 T186 166 V186 H14Z" fill="#4fb6ff" />
      <rect x={14} y={120} width={20} height={58} rx={4} fill="#c7cbe0" />
      <rect x={14} y={116} width={124} height={12} rx={6} fill="#ffb347" />
      <Dino x={48} y={36} s={0.6} mood="worried" color="#7fd3a0" spikes="#5aa9ff" />
      <path d="M152 48 q6 10 0 14 q-6 -4 0 -14Z" fill="#7fd3ff" />
    </g>
  ),
  'stk-observe': () => (
    <g>
      {ground(176)}
      <Dino x={10} y={44} s={0.88} mood="focused" color="#4fb36b" spikes="#ffd23f" />
      <g>
        <rect x={120} y={64} width={34} height={14} rx={6} fill="#3a3355" />
        <rect x={120} y={80} width={34} height={14} rx={6} fill="#3a3355" />
        <circle cx={156} cy={71} r={8} fill="#8fd8ff" />
        <circle cx={156} cy={87} r={8} fill="#8fd8ff" />
      </g>
      <g transform="translate(166 30)">
        <path d="M0 0 Q-14 -14 -16 2 Q-10 10 0 0Z" fill="#ff7ab6" />
        <path d="M0 0 Q14 -14 16 2 Q10 10 0 0Z" fill="#ffb3d6" />
        <rect x={-1.5} y={-6} width={3} height={14} rx={1.5} fill={INK} />
      </g>
    </g>
  ),
  // ───────────── Week 2 ─────────────
  'stk-inevitable': () => (
    <g>
      <path d="M146 54 Q172 26 186 14 Q182 44 162 76Z" fill="#ff7a3d" />
      <path d="M148 60 Q168 40 178 30 Q174 50 160 70Z" fill="#ffd23f" />
      <circle cx={134} cy={74} r={28} fill="#9b8574" />
      <circle cx={126} cy={66} r={7} fill="#7d6a5d" />
      <circle cx={142} cy={84} r={5} fill="#7d6a5d" />
      <circle cx={122} cy={86} r={4} fill="#7d6a5d" />
      <circle cx={58} cy={146} r={38} fill="#4fb6ff" />
      <path d="M34 130 q10 -10 22 -4 q8 10 -4 16 q-14 2 -18 -12Z M64 150 q14 -6 20 6 q-4 12 -18 8Z" fill="#6fd38a" />
      <ellipse cx={58} cy={150} rx={56} ry={12} fill="none" stroke="#ffd23f" strokeWidth={6} transform="rotate(-12 58 150)" />
      <Sparkle cx={30} cy={40} r={9} />
      <Sparkle cx={86} cy={30} r={6} />
    </g>
  ),
  'stk-resourceful': () => (
    <g>
      <Astronaut x={14} y={30} s={0.92} />
      <g transform="rotate(-30 104 108)">
        <rect x={96} y={80} width={10} height={44} rx={4} fill="#9aa3bd" />
        <path d="M90 74 a12 12 0 1 1 22 0 l-5 8 h-12Z" fill="#9aa3bd" />
      </g>
      <rect x={120} y={132} width={66} height={44} rx={8} fill="#ff5a5f" />
      <rect x={120} y={132} width={66} height={14} rx={6} fill="#e8434a" />
      <path d="M138 132 v-10 h30 v10" stroke="#3a3355" strokeWidth={6} fill="none" />
      <rect x={146} y={150} width={14} height={8} rx={2} fill="#ffd23f" />
    </g>
  ),
  'stk-astonished': () => (
    <g>
      <Alien x={34} y={34} s={1.1} mood="surprised" eyes={2} color="#a77bff" />
      <g fill="#ffd23f">
        <rect x={18} y={28} width={8} height={24} rx={4} transform="rotate(-20 22 40)" />
        <circle cx={28} cy={60} r={4.5} />
        <rect x={172} y={28} width={8} height={24} rx={4} transform="rotate(20 176 40)" />
        <circle cx={170} cy={60} r={4.5} />
      </g>
    </g>
  ),
  // ───────────── Week 3 ─────────────
  'stk-anticipate': () => (
    <g>
      <path d="M16 70 H130 V176 H16" fill="none" stroke="#e7e9f5" strokeWidth={7} strokeLinejoin="round" />
      <path d="M30 70 V176 M50 70 V176 M70 70 V176 M90 70 V176 M110 70 V176 M16 96 H130 M16 122 H130 M16 148 H130" stroke="#e7e9f5" strokeWidth={2} />
      <Robot x={58} y={44} s={0.9} rotate={-18} mood="focused" color="#ff8a3d" accent="#5aa9ff" />
      <g transform="translate(160 52)">
        <circle r={20} fill="#fff" />
        <path d="M0 -8 L8 -2 L5 8 L-5 8 L-8 -2Z" fill={INK} />
        <path d="M-12 -14 l4 5 M12 -14 l-4 5 M-19 4 l6 0 M19 4 l-6 0 M-6 18 l3 -6 M6 18 l-3 -6" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      </g>
      <path d="M176 86 q10 6 10 18 M186 70 q8 6 6 14" stroke="#ffd23f" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-persistent': () => (
    <g>
      <path d="M14 186 L112 44 Q122 32 132 44 L186 186Z" fill="#b39278" />
      <path d="M46 150 l10 -6 l8 8Z M94 98 l12 -4 l4 10Z M128 128 l10 -2 l2 10Z M70 172 l12 -6 l6 8Z" fill="#8c6f5b" />
      <rect x={120} y={14} width={4} height={34} fill="#6b5a4e" />
      <path d="M124 16 L150 24 L124 32Z" fill="#ff5a5f" />
      <Dino x={34} y={70} s={0.5} rotate={-38} mood="determined" color="#56c271" spikes="#ffd23f" />
      <path d="M28 150 q6 -4 12 0 M20 136 q6 -4 12 0" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.8} />
    </g>
  ),
  'stk-consequence': () => (
    <g>
      <rect x={14} y={170} width={172} height={8} rx={4} fill="#c9a77d" />
      {[
        { x: 22, r: 66, c: '#ff5a5f' },
        { x: 56, r: 44, c: '#ff9f43' },
        { x: 88, r: 22, c: '#ffd23f' },
        { x: 120, r: 0, c: '#5cc47a' },
        { x: 152, r: 0, c: '#5aa9ff' },
      ].map((d, i) => (
        <g key={i} transform={`rotate(${d.r} ${d.x + 22} 170)`}>
          <rect x={d.x} y={104} width={22} height={66} rx={4} fill={d.c} />
          <circle cx={d.x + 11} cy={122} r={3.5} fill="#fff" />
          <circle cx={d.x + 11} cy={152} r={3.5} fill="#fff" />
          <rect x={d.x + 4} y={136} width={14} height={3} rx={1.5} fill="#fff" />
        </g>
      ))}
      <path d="M20 70 q16 -18 34 -6 l-6 -10 M54 64 l-10 2" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      <Star cx={160} cy={60} r={16} fill="#ffd23f" />
    </g>
  ),
  // ───────────── Week 4 ─────────────
  'stk-cautious': () => (
    <g>
      <path d="M14 140 Q40 130 66 140 T118 140 T170 140 T186 140 V184 H14Z" fill="#ff6b2d" />
      <path d="M14 156 Q40 148 66 156 T118 156 T170 156 T186 156 V184 H14Z" fill="#ffb02e" />
      <circle cx={40} cy={170} r={5} fill="#ffe08a" />
      <circle cx={140} cy={168} r={4} fill="#ffe08a" />
      <ellipse cx={36} cy={146} rx={22} ry={9} fill="#8f8aa3" />
      <ellipse cx={100} cy={150} rx={24} ry={9} fill="#8f8aa3" />
      <ellipse cx={164} cy={146} rx={20} ry={9} fill="#8f8aa3" />
      <Dino x={52} y={60} s={0.58} mood="worried" color="#ff9f43" belly="#ffe2b8" spikes="#7a5cff" />
    </g>
  ),
  'stk-persuade': () => (
    <g>
      <Alien x={12} y={58} s={0.92} color="#5cd6a0" belly="#d4f7e8" eyes={2} />
      <rect x={110} y={70} width={6} height={80} rx={3} fill="#b08968" />
      <rect x={84} y={22} width={102} height={56} rx={10} fill="#fff7d6" />
      <text x={135} y={58} textAnchor="middle" fontFamily="Fredoka Variable, Fredoka, sans-serif" fontWeight={700} fontSize={22} fill="#7a5cff">
        PLEASE?
      </text>
      <Heart cx={168} cy={104} s={1.2} />
      <Heart cx={150} cy={124} s={0.8} fill="#ffa3c2" />
    </g>
  ),
  'stk-remarkable': (u) => (
    <g>
      <defs>
        <clipPath id={`${u}egg`}>
          <path d="M100 30 C140 30 160 90 158 120 C156 156 130 176 100 176 C70 176 44 156 42 120 C40 90 60 30 100 30Z" />
        </clipPath>
      </defs>
      <g stroke="#fff3a8" strokeWidth={6} strokeLinecap="round" opacity={0.9}>
        <path d="M100 14 v10 M30 60 l10 6 M170 60 l-10 6 M20 130 h12 M180 130 h-12" />
      </g>
      <g clipPath={`url(#${u}egg)`}>
        <rect x={30} y={20} width={140} height={170} fill="#ff6b8b" />
        <path d="M30 70 l20 -10 l20 10 l20 -10 l20 10 l20 -10 l20 10 l20 -10 v26 l-20 10 l-20 -10 l-20 10 l-20 -10 l-20 10 l-20 -10 l-20 10Z" fill="#ffd23f" />
        <path d="M30 110 l20 -10 l20 10 l20 -10 l20 10 l20 -10 l20 10 l20 -10 v26 l-20 10 l-20 -10 l-20 10 l-20 -10 l-20 10 l-20 -10 l-20 10Z" fill="#5cc47a" />
        <path d="M30 150 l20 -10 l20 10 l20 -10 l20 10 l20 -10 l20 10 l20 -10 v40 h-140Z" fill="#5aa9ff" />
        <ellipse cx={78} cy={70} rx={10} ry={20} fill="#fff" opacity={0.45} transform="rotate(20 78 70)" />
      </g>
      <Sparkle cx={160} cy={36} r={12} />
      <Sparkle cx={38} cy={160} r={9} />
    </g>
  ),
  // ───────────── Week 5 ─────────────
  'stk-scarce': () => (
    <g>
      <path d="M36 92 L52 34 H148 L164 92Z" fill="#b5651d" />
      <path d="M48 86 L60 44 H140 L152 86Z" fill="#5a2e10" />
      <rect x={30} y={92} width={140} height={84} rx={10} fill="#c97b2e" />
      <rect x={30} y={92} width={140} height={16} fill="#e0a95b" />
      <rect x={30} y={130} width={140} height={10} fill="#a35f1f" />
      <rect x={90} y={120} width={20} height={26} rx={4} fill="#ffd23f" />
      <Gem cx={100} cy={82} s={1.1} fill="#ff5c8a" shine="#ffd1df" />
      <Sparkle cx={128} cy={66} r={8} />
    </g>
  ),
  'stk-essential': () => (
    <g>
      <rect x={146} y={60} width={34} height={96} rx={16} fill="#5cc47a" />
      <rect x={154} y={50} width={18} height={14} rx={4} fill="#9aa3bd" />
      <path d="M150 120 Q120 150 96 146" stroke="#9aa3bd" strokeWidth={7} fill="none" strokeLinecap="round" />
      <circle cx={88} cy={92} r={64} fill="#f4f6ff" />
      <ellipse cx={88} cy={92} rx={46} ry={40} fill="#5aa9ff" />
      <path d="M58 72 Q70 56 90 56" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.8} />
      <rect x={40} y={146} width={96} height={24} rx={10} fill="#ff7a59" />
      <Heart cx={88} cy={158} s={0.9} fill="#fff" />
    </g>
  ),
  'stk-investigate': () => (
    <g>
      <g fill="#7d6a5d" opacity={0.6}>
        <ellipse cx={150} cy={178} rx={8} ry={5} />
        <ellipse cx={176} cy={170} rx={8} ry={5} />
      </g>
      <Dino x={10} y={50} s={0.82} mood="focused" color="#5aa9ff" belly="#d6ecff" spikes="#ff9f43">
        <path d="M92 18 Q120 -14 150 16 Z" fill="#a0703c" />
        <rect x={88} y={12} width={68} height={10} rx={5} fill="#7a5230" />
      </Dino>
      <g transform="rotate(30 160 112)">
        <rect x={155} y={124} width={10} height={36} rx={5} fill="#7a5230" />
        <circle cx={160} cy={108} r={20} fill="#3a3355" />
        <circle cx={160} cy={108} r={14} fill="#bfefff" />
      </g>
    </g>
  ),
  // ───────────── Week 6 ─────────────
  'stk-vivid': () => (
    <g>
      <path d="M100 30 C160 30 188 70 180 112 C174 140 144 132 132 150 C120 172 70 178 40 154 C10 130 20 60 60 40 C72 34 86 30 100 30Z" fill="#f2d6a8" />
      <ellipse cx={122} cy={124} rx={13} ry={11} fill="#fff6e6" />
      <circle cx={62} cy={70} r={14} fill="#ff3b6b" />
      <circle cx={100} cy={56} r={14} fill="#ffd23f" />
      <circle cx={140} cy={70} r={14} fill="#2fd56b" />
      <circle cx={158} cy={104} r={12} fill="#2f8cff" />
      <circle cx={58} cy={112} r={14} fill="#a44bff" />
      <circle cx={84} cy={146} r={12} fill="#ff8a1f" />
      <g transform="rotate(-35 140 160)">
        <rect x={134} y={120} width={12} height={70} rx={6} fill="#b08968" />
        <rect x={133} y={110} width={14} height={14} fill="#c7cbe0" />
        <path d="M133 110 Q140 86 147 110Z" fill="#ff3b6b" />
      </g>
    </g>
  ),
  'stk-contrast': () => (
    <g>
      <path d="M100 26 A74 74 0 0 0 100 174Z" fill="#7fd0ff" />
      <path d="M100 26 A74 74 0 0 1 100 174Z" fill="#2b2a6b" />
      <circle cx={66} cy={76} r={18} fill="#ffd23f" />
      <path d="M40 132 q12 -10 26 -2 q10 -8 20 0 q6 6 0 12 h-44 q-8 -4 -2 -10Z" fill="#fff" />
      <path d="M140 66 a18 18 0 1 0 14 30 a14 14 0 1 1 -14 -30Z" fill="#fff3b0" />
      <Star cx={132} cy={124} r={7} fill="#fff" />
      <Star cx={154} cy={142} r={5} fill="#fff" />
      <Star cx={118} cy={150} r={4} fill="#fff" />
    </g>
  ),
  'stk-adapt': (u) => (
    <g>
      <defs>
        <linearGradient id={`${u}cham`} x1="0" x2="1">
          <stop offset="0" stopColor="#3ccf6e" />
          <stop offset="0.5" stopColor="#ffd23f" />
          <stop offset="1" stopColor="#ff5c8a" />
        </linearGradient>
      </defs>
      <path d="M14 150 Q100 128 186 146" stroke="#8a5a36" strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d="M150 140 q14 -14 20 -30" stroke="#5cc47a" strokeWidth={7} fill="none" strokeLinecap="round" />
      <ellipse cx={166} cy={104} rx={9} ry={14} fill="#5cc47a" transform="rotate(30 166 104)" />
      <path d="M56 120 C40 130 22 122 24 104 C26 88 46 88 46 100 C46 108 36 108 36 102" stroke={`url(#${u}cham)`} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M50 118 C50 80 90 66 124 78 C146 86 156 104 146 120 C130 134 70 134 50 118Z" fill={`url(#${u}cham)`} />
      <path d="M124 78 L150 72 L156 96 Z" fill="#ff8fab" />
      <rect x={70} y={124} width={10} height={22} rx={5} fill="#3ccf6e" />
      <rect x={118} y={124} width={10} height={22} rx={5} fill="#ff8fab" />
      <circle cx={138} cy={92} r={11} fill="#fff" />
      <circle cx={140} cy={92} r={5} fill={INK} />
      <path d="M150 108 q-8 4 -14 2" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  ),
  // ───────────── Week 7 ─────────────
  'stk-deliberate': () => (
    <g>
      <rect x={20} y={146} width={40} height={32} rx={4} fill="#ff5a5f" />
      <rect x={24} y={114} width={34} height={32} rx={4} fill="#ffd23f" />
      <rect x={22} y={82} width={36} height={32} rx={4} fill="#5aa9ff" />
      <text x={40} y={170} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={20} fill="#fff">A</text>
      <text x={41} y={138} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={20} fill="#fff">B</text>
      <text x={40} y={106} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={20} fill="#fff">C</text>
      <Robot x={86} y={38} s={0.98} mood="focused" color="#7a5cff" accent="#ffd23f" />
      <rect x={24} y={34} width={36} height={32} rx={4} fill="#5cc47a" />
      <path d="M60 50 H96" stroke="#8a8fa8" strokeWidth={8} strokeLinecap="round" />
      <path d="M30 76 v-4 M40 76 v-6 M50 76 v-4" stroke={INK} strokeWidth={2} strokeLinecap="round" opacity={0.5} />
    </g>
  ),
  'stk-examine': () => (
    <g>
      <rect x={34} y={164} width={120} height={16} rx={8} fill="#5a4e86" />
      <path d="M116 164 V120 Q116 96 96 86" stroke="#7a6cc0" strokeWidth={16} fill="none" strokeLinecap="round" />
      <rect x={44} y={122} width={86} height={12} rx={6} fill="#7a6cc0" />
      <rect x={66} y={112} width={44} height={10} rx={3} fill="#bfefff" />
      <circle cx={88} cy={117} r={4} fill="#5cc47a" />
      <g transform="rotate(-30 80 66)">
        <rect x={68} y={28} width={26} height={78} rx={10} fill="#f4f6ff" />
        <rect x={64} y={18} width={34} height={16} rx={6} fill="#5a4e86" />
        <rect x={72} y={102} width={18} height={12} rx={3} fill="#5a4e86" />
      </g>
      <Sparkle cx={150} cy={50} r={11} fill="#bfefff" />
      <Sparkle cx={170} cy={86} r={7} fill="#bfefff" />
    </g>
  ),
  'stk-significant': () => (
    <g>
      <g transform="rotate(-35 100 100)">
        <rect x={92} y={70} width={18} height={110} rx={9} fill="#ffc531" />
        <rect x={110} y={140} width={26} height={12} rx={4} fill="#ffc531" />
        <rect x={110} y={160} width={18} height={12} rx={4} fill="#ffc531" />
        <circle cx={101} cy={56} r={38} fill="#ffc531" />
        <circle cx={101} cy={56} r={26} fill="#ffe27a" />
        <Star cx={101} cy={56} r={18} fill="#ff8a1f" />
      </g>
      <Sparkle cx={164} cy={44} r={12} />
      <Sparkle cx={36} cy={150} r={10} />
    </g>
  ),
  // ───────────── Week 8 ─────────────
  'stk-conceal': () => (
    <g>
      <Star cx={38} cy={36} r={8} fill="#fff3a8" />
      <Star cx={168} cy={30} r={6} fill="#fff3a8" />
      <Alien x={52} y={34} s={0.8} color="#ff8a3d" belly="#ffe0c4" eyes={2} />
      <path d="M14 180 C14 132 40 112 100 112 C160 112 186 132 186 180Z" fill="#a9a3c4" />
      <ellipse cx={100} cy={120} rx={64} ry={10} fill="#8c86ab" />
      <circle cx={52} cy={152} r={10} fill="#8c86ab" />
      <circle cx={146} cy={160} r={7} fill="#8c86ab" />
    </g>
  ),
  'stk-transform': () => (
    <g>
      <path d="M140 74 Q182 40 186 96 Q164 84 146 100Z" fill="#ff8fd0" />
      <path d="M62 74 Q20 40 14 96 Q36 84 54 100Z" fill="#ff8fd0" />
      <ellipse cx={100} cy={92} rx={34} ry={36} fill="#7a5cff" />
      <path d="M86 56 l6 -16 l8 14 l8 -14 l6 16Z" fill="#ffd23f" />
      <ellipse cx={100} cy={108} rx={18} ry={14} fill="#c5b5ff" />
      <Eye cx={88} cy={84} r={8} look={[0, 0.3]} />
      <Eye cx={112} cy={84} r={8} look={[0, 0.3]} />
      <path d="M92 104 Q100 112 108 104" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M44 120 L60 108 L74 124 L88 108 L100 124 L112 108 L126 124 L140 108 L156 120 C160 160 134 182 100 182 C66 182 40 160 44 120Z" fill="#fff4dc" />
      <path d="M64 146 l10 -6 l8 8 M120 156 l10 -8" stroke="#e8c98f" strokeWidth={4} fill="none" strokeLinecap="round" />
      <Sparkle cx={40} cy={40} r={10} />
      <Sparkle cx={166} cy={136} r={8} />
    </g>
  ),
  'stk-strategy': () => (
    <g>
      <path d="M24 34 H176 Q186 34 186 44 V160 Q186 170 176 170 H24 Q14 170 14 160 V44 Q14 34 24 34Z" fill="#f6e2b3" />
      <path d="M14 44 Q24 54 14 64 M186 140 Q176 150 186 160" fill="#e8c98f" />
      <path d="M40 140 Q60 100 90 120 T140 80" stroke="#c0392b" strokeWidth={4} strokeDasharray="8 7" fill="none" strokeLinecap="round" />
      <path d="M144 62 l18 18 M162 62 l-18 18" stroke="#e8434a" strokeWidth={7} strokeLinecap="round" />
      <path d="M40 76 l14 -22 l14 22Z M60 76 l12 -18 l12 18Z" fill="#8c6f5b" />
      <path d="M118 150 q8 -12 18 -4 q10 -8 16 2 q-8 10 -34 2Z" fill="#5cc47a" />
      <circle cx={40} cy={140} r={6} fill="#5aa9ff" />
      <path d="M100 52 l8 4 M112 46 l2 8" stroke="#8c6f5b" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  // ───────────── Week 9 ─────────────
  'stk-distinguish': () => (
    <g>
      <Robot x={16} y={42} s={0.74} color="#5aa9ff" />
      <Robot x={110} y={42} s={0.74} color="#5aa9ff" antennaTop={<Heart cx={50} cy={4} s={0.9} fill="#ff5c8a" />} />
      <g transform="rotate(-20 152 52)">
        <circle cx={150} cy={40} r={24} fill="none" stroke="#3a3355" strokeWidth={8} />
        <rect x={146} y={64} width={9} height={30} rx={4.5} fill="#7a5230" />
      </g>
    </g>
  ),
  'stk-gradual': () => (
    <g>
      <path d="M22 186 L50 174 L78 186 M116 182 L170 182" stroke="none" />
      {[
        { x: 20, h: 0 },
        { x: 76, h: 1 },
        { x: 132, h: 2 },
      ].map((p, i) => (
        <g key={i}>
          <path d={`M${p.x} 146 h48 l-6 34 h-36Z`} fill="#e07a4f" />
          <rect x={p.x - 3} y={140} width={54} height={10} rx={4} fill="#c9603a" />
          {p.h === 0 && <ellipse cx={p.x + 24} cy={138} rx={7} ry={5} fill="#8c6f5b" />}
          {p.h === 1 && (
            <g>
              <path d={`M${p.x + 24} 140 V112`} stroke="#3ca35a" strokeWidth={5} strokeLinecap="round" />
              <ellipse cx={p.x + 16} cy={114} rx={9} ry={5} fill="#5cc47a" transform={`rotate(-25 ${p.x + 16} 114)`} />
              <ellipse cx={p.x + 32} cy={110} rx={9} ry={5} fill="#5cc47a" transform={`rotate(25 ${p.x + 32} 110)`} />
            </g>
          )}
          {p.h === 2 && (
            <g>
              <path d={`M${p.x + 24} 140 V58`} stroke="#3ca35a" strokeWidth={6} strokeLinecap="round" />
              <ellipse cx={p.x + 12} cy={104} rx={12} ry={6} fill="#5cc47a" transform={`rotate(-25 ${p.x + 12} 104)`} />
              <ellipse cx={p.x + 36} cy={92} rx={12} ry={6} fill="#5cc47a" transform={`rotate(25 ${p.x + 36} 92)`} />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <ellipse key={a} cx={p.x + 24} cy={38} rx={8} ry={14} fill="#ff7ab6" transform={`rotate(${a} ${p.x + 24} 52)`} />
              ))}
              <circle cx={p.x + 24} cy={52} r={9} fill="#ffd23f" />
            </g>
          )}
        </g>
      ))}
    </g>
  ),
  'stk-absurd': () => (
    <g>
      <Dino x={20} y={34} s={0.92} color="#ff8fd0" belly="#ffe0f2" spikes="#5aa9ff">
        <path d="M104 18 L118 -26 L136 14Z" fill="#ffd23f" />
        <circle cx={118} cy={-26} r={6} fill="#5aa9ff" />
        <circle cx={112} cy={4} r={3} fill="#ff5a5f" />
        <circle cx={126} cy={-6} r={3} fill="#5cc47a" />
        <path d="M108 70 l-10 -8 v16Z M108 70 l10 -8 v16Z" fill="#5aa9ff" />
        <circle cx={108} cy={70} r={4} fill="#3a7bd5" />
      </Dino>
      <g>
        <rect x={50} y={160} width={30} height={10} rx={5} fill="#ff5a5f" />
        <rect x={94} y={160} width={30} height={10} rx={5} fill="#ff5a5f" />
        {[56, 74, 100, 118].map((cx) => (
          <circle key={cx} cx={cx} cy={176} r={6} fill="#ffd23f" />
        ))}
      </g>
    </g>
  ),
  // ───────────── Week 10 ─────────────
  'stk-infer': () => (
    <g>
      <g fill="#8c6f5b">
        {[
          [24, 168],
          [50, 150],
          [76, 166],
          [102, 148],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(70)`}>
            <ellipse rx={7} ry={9} />
            <circle cx={-6} cy={-12} r={3} />
            <circle cx={0} cy={-14} r={3} />
            <circle cx={6} cy={-12} r={3} />
          </g>
        ))}
      </g>
      <g transform="rotate(-70 150 150)">
        <rect x={124} y={118} width={52} height={60} rx={14} fill="#bfefff" opacity={0.9} />
        <rect x={130} y={108} width={40} height={14} rx={4} fill="#ff9f43" />
      </g>
      <circle cx={128} cy={172} r={6} fill="#a0703c" />
      <circle cx={112} cy={180} r={4} fill="#a0703c" />
      <text x={150} y={78} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={64} fill="#7a5cff">?</text>
    </g>
  ),
  'stk-evidence': () => (
    <g>
      <rect x={32} y={34} width={104} height={136} rx={10} fill="#e8f6ff" opacity={0.95} />
      <rect x={32} y={34} width={104} height={14} rx={6} fill="#5aa9ff" />
      <rect x={42} y={56} width={84} height={18} rx={4} fill="#ff5a5f" />
      <text x={84} y={70} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={13} fill="#fff">EVIDENCE</text>
      <path d="M60 156 Q70 110 110 86 Q100 130 60 156Z" fill="#3ccf6e" />
      <path d="M60 156 L106 92" stroke="#1f8f4a" strokeWidth={3} />
      <g transform="rotate(25 150 120)">
        <rect x={146} y={136} width={10} height={40} rx={5} fill="#7a5230" />
        <circle cx={151} cy={116} r={24} fill="#3a3355" />
        <circle cx={151} cy={116} r={17} fill="#bfefff" opacity={0.85} />
      </g>
    </g>
  ),
  'stk-perspective': () => (
    <g>
      <g>
        {[
          [30, 160, '#ff7a59'],
          [60, 166, '#5aa9ff'],
          [94, 158, '#ffd23f'],
          [126, 166, '#a77bff'],
          [156, 160, '#5cc47a'],
        ].map(([x, y, c], i) => (
          <g key={i}>
            <rect x={Number(x) - 9} y={Number(y)} width={18} height={16} fill={String(c)} />
            <path d={`M${Number(x) - 11} ${Number(y)} L${x} ${Number(y) - 10} L${Number(x) + 11} ${Number(y)}Z`} fill="#c0392b" />
          </g>
        ))}
        <rect x={16} y={176} width={168} height={6} rx={3} fill="#8fd16a" />
      </g>
      <g transform="translate(100 74)">
        <path d="M0 0 Q-40 -40 -86 -20 Q-50 -10 -30 14Z" fill="#8a5a36" />
        <path d="M0 0 Q40 -40 86 -20 Q50 -10 30 14Z" fill="#8a5a36" />
        <ellipse cx={0} cy={8} rx={20} ry={28} fill="#a0703c" />
        <path d="M-10 30 L0 52 L10 30Z" fill="#8a5a36" />
        <circle cx={0} cy={-18} r={16} fill="#fff" />
        <path d="M2 -16 L18 -12 L4 -6Z" fill="#ffc531" />
        <circle cx={-4} cy={-20} r={3.5} fill={INK} />
      </g>
    </g>
  ),

  // ───────────── Weekly mega-stickers ─────────────
  'stk-week-1': () => (
    <g>
      <rect x={52} y={150} width={96} height={28} rx={8} fill="#8a5a36" />
      <circle cx={100} cy={92} r={60} fill="#ffc531" />
      <path d="M100 92 m0 -48 a48 48 0 1 1 -40 74 M100 92 m0 -30 a30 30 0 1 1 -24 46 M100 92 m0 -14 a14 14 0 1 1 -12 22" stroke="#e8a400" strokeWidth={7} fill="none" strokeLinecap="round" />
      <Sparkle cx={40} cy={40} r={12} />
      <Sparkle cx={164} cy={56} r={9} />
    </g>
  ),
  'stk-week-2': () => (
    <g>
      <path d="M86 150 Q100 194 114 150Z" fill="#ff7a3d" />
      <path d="M92 150 Q100 178 108 150Z" fill="#ffd23f" />
      <path d="M70 120 L50 156 L78 146Z M130 120 L150 156 L122 146Z" fill="#ff5a5f" />
      <path d="M100 14 C134 40 138 100 128 150 H72 C62 100 66 40 100 14Z" fill="#f4f6ff" />
      <circle cx={100} cy={78} r={16} fill="#5aa9ff" />
      <circle cx={100} cy={78} r={10} fill="#bfefff" />
      <path d="M78 40 Q100 30 122 40" stroke="#ff5a5f" strokeWidth={8} fill="none" />
      <Star cx={36} cy={60} r={12} />
      <Star cx={168} cy={96} r={10} />
      <Star cx={40} cy={140} r={7} />
    </g>
  ),
  'stk-week-3': () => (
    <g>
      <g fill="#fff59d" opacity={0.85}>
        <rect x={94} y={10} width={12} height={24} />
        <rect x={30} y={40} width={22} height={10} transform="rotate(30 41 45)" />
        <rect x={148} y={40} width={22} height={10} transform="rotate(-30 159 45)" />
      </g>
      <rect x={30} y={80} width={140} height={34} fill="#b5651d" />
      <rect x={30} y={114} width={140} height={64} fill="#c97b2e" />
      <rect x={30} y={80} width={140} height={8} fill="#e0a95b" />
      <rect x={30} y={136} width={140} height={8} fill="#8a4a14" />
      <rect x={30} y={80} width={10} height={98} fill="#ffc531" />
      <rect x={160} y={80} width={10} height={98} fill="#ffc531" />
      <rect x={88} y={108} width={24} height={30} fill="#ffc531" />
      <rect x={96} y={118} width={8} height={10} fill="#5a2e10" />
      <Star cx={100} cy={56} r={24} fill="#ffd23f" />
      <circle cx={92} cy={52} r={3} fill={INK} />
      <circle cx={108} cy={52} r={3} fill={INK} />
    </g>
  ),
  'stk-week-4': () => (
    <g>
      <path d="M16 180 L74 70 H126 L184 180Z" fill="#7a5c4f" />
      <path d="M74 70 H126 L116 90 Q100 98 84 90Z" fill="#ff6b2d" />
      <path d="M86 70 Q60 30 70 14 Q90 30 100 60 Q110 24 132 18 Q136 44 114 70Z" fill="#ff5c8a" />
      <path d="M92 66 Q84 40 90 30 Q100 46 104 62Z" fill="#ffd23f" />
      <path d="M84 92 Q78 130 64 150 M116 92 Q128 120 140 136" stroke="#ff9f43" strokeWidth={8} fill="none" strokeLinecap="round" />
      <circle cx={46} cy={40} r={8} fill="#5aa9ff" />
      <circle cx={160} cy={50} r={6} fill="#5cc47a" />
      <circle cx={30} cy={84} r={5} fill="#a77bff" />
    </g>
  ),
  'stk-week-5': () => (
    <g>
      <ellipse cx={100} cy={110} rx={88} ry={22} fill="#ffd23f" transform="rotate(-14 100 110)" />
      <circle cx={100} cy={100} r={56} fill="#a44bff" />
      <path d="M58 76 q30 -10 60 4 q20 8 36 2 M48 108 q40 10 104 -4" stroke="#c98bff" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M44 120 Q100 150 160 96" stroke="#ffd23f" strokeWidth={10} fill="none" strokeLinecap="round" transform="rotate(-14 100 110)" />
      <rect x={118} y={20} width={4} height={30} fill="#9aa3bd" />
      <path d="M122 22 L144 28 L122 34Z" fill="#7cf5c0" />
    </g>
  ),
  'stk-week-6': () => (
    <g>
      <rect x={26} y={60} width={34} height={118} fill="#9aa3bd" />
      <rect x={140} y={60} width={34} height={118} fill="#9aa3bd" />
      <rect x={52} y={94} width={96} height={84} fill="#b6bdd6" />
      {[26, 42, 140, 156].map((x) => (
        <rect key={x} x={x} y={48} width={12} height={14} fill="#9aa3bd" />
      ))}
      {[52, 72, 92, 112, 132].map((x) => (
        <rect key={x} x={x} y={82} width={12} height={14} fill="#b6bdd6" />
      ))}
      <rect x={84} y={130} width={32} height={48} rx={16} fill="#5a2e10" />
      <rect x={36} y={90} width={14} height={18} fill="#2b2a6b" />
      <rect x={150} y={90} width={14} height={18} fill="#2b2a6b" />
      <rect x={42} y={14} width={4} height={36} fill="#3a3355" />
      <path d="M46 16 h22 l-6 7 l6 7 h-22Z" fill="#ff5a5f" />
      <rect x={156} y={14} width={4} height={36} fill="#3a3355" />
      <path d="M160 16 h22 l-6 7 l6 7 h-22Z" fill="#5aa9ff" />
      <Coin cx={100} cy={60} r={14} />
    </g>
  ),
  'stk-week-7': () => (
    <g>
      <path d="M14 170 Q20 120 60 116 Q100 96 140 116 Q182 122 186 170Z" fill="#c9a77d" />
      <g fill="#fffaf0">
        <path d="M60 64 Q70 34 110 36 Q150 38 156 66 Q160 90 136 96 L128 112 H86 L80 96 Q56 92 60 64Z" />
        <rect x={40} y={126} width={120} height={10} rx={5} />
        {[56, 78, 100, 122, 144].map((x) => (
          <rect key={x} x={x - 4} y={118} width={8} height={40} rx={4} />
        ))}
      </g>
      <circle cx={92} cy={62} r={10} fill="#5a4e40" />
      <circle cx={130} cy={62} r={8} fill="#5a4e40" />
      <path d="M90 98 l4 10 l6 -10 l6 10 l6 -10 l6 10 l4 -10" stroke="#5a4e40" strokeWidth={3} fill="none" />
      <path d="M30 156 l10 -6 M168 150 l-8 -4" stroke="#a0805a" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
  'stk-week-8': () => (
    <g>
      <rect x={14} y={78} width={52} height={44} rx={4} fill="#3b5bdb" />
      <rect x={134} y={78} width={52} height={44} rx={4} fill="#3b5bdb" />
      <path d="M14 100 H66 M40 78 V122 M134 100 H186 M160 78 V122" stroke="#91a7ff" strokeWidth={3} />
      <rect x={66} y={95} width={68} height={10} fill="#9aa3bd" />
      <circle cx={100} cy={100} r={34} fill="#f4f6ff" />
      <circle cx={100} cy={100} r={14} fill="#5aa9ff" />
      <rect x={92} y={30} width={16} height={36} rx={6} fill="#dfe5ff" />
      <rect x={92} y={134} width={16} height={36} rx={6} fill="#dfe5ff" />
      <circle cx={100} cy={26} r={7} fill="#ff5a5f" />
      <Star cx={30} cy={40} r={8} fill="#fff3a8" />
      <Star cx={170} cy={164} r={8} fill="#fff3a8" />
    </g>
  ),
  'stk-week-9': () => (
    <g>
      <ellipse cx={100} cy={172} rx={80} ry={10} fill="#6b5a7e" />
      <path d="M84 170 L72 70 L96 30 L116 70 L108 170Z" fill="#a44bff" />
      <path d="M96 30 L116 70 L108 170 L96 170Z" fill="#c98bff" />
      <path d="M50 170 L36 104 L54 80 L72 108 L70 170Z" fill="#20c4d8" />
      <path d="M54 80 L72 108 L70 170 L58 170Z" fill="#7ff0ff" />
      <path d="M126 170 L132 96 L154 74 L168 106 L150 170Z" fill="#ff5c8a" />
      <path d="M154 74 L168 106 L150 170 L140 170Z" fill="#ffa3c2" />
      <Sparkle cx={40} cy={50} r={10} />
      <Sparkle cx={160} cy={40} r={12} />
    </g>
  ),
  'stk-week-10': () => (
    <g>
      <rect x={60} y={160} width={80} height={20} rx={6} fill="#7a5230" />
      <rect x={86} y={128} width={28} height={34} fill="#ffc531" />
      <path d="M44 34 H156 V64 Q156 128 100 132 Q44 128 44 64Z" fill="#ffc531" />
      <path d="M44 48 Q14 48 18 76 Q22 100 52 100" stroke="#ffc531" strokeWidth={10} fill="none" />
      <path d="M156 48 Q186 48 182 76 Q178 100 148 100" stroke="#ffc531" strokeWidth={10} fill="none" />
      <path d="M60 44 Q62 100 96 120" stroke="#ffe27a" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.8} />
      <Star cx={100} cy={78} r={24} fill="#ff8a1f" />
      <Sparkle cx={30} cy={24} r={10} />
      <Sparkle cx={172} cy={130} r={9} />
    </g>
  ),

  // ───────────── Achievements ─────────────
  'stk-ach-memory-1': () => (
    <g>
      <path d="M118 84 Q60 60 16 30 Q50 80 104 110Z" fill="#7ff0ff" opacity={0.85} />
      <path d="M116 92 Q70 80 30 64 Q64 96 108 108Z" fill="#c4f8ff" />
      <Star cx={128} cy={100} r={50} fill="#ffd23f" rotate={10} />
      <circle cx={118} cy={96} r={4} fill={INK} />
      <circle cx={138} cy={96} r={4} fill={INK} />
      <path d="M118 110 Q128 118 138 110" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-ach-memory-10': () => (
    <g>
      <path d="M70 20 L100 80 L130 20 H112 L100 46 L88 20Z" fill="#5aa9ff" />
      <path d="M60 20 H80 L100 70 L120 20 H140" stroke="#ff5a5f" strokeWidth={8} fill="none" />
      <circle cx={100} cy={124} r={56} fill="#ffc531" />
      <circle cx={100} cy={124} r={42} fill="#ffe27a" />
      <text x={100} y={140} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={44} fill="#e8a400">10</text>
    </g>
  ),
  'stk-ach-creative-3': () => (
    <g>
      <g stroke="#ffd23f" strokeWidth={7} strokeLinecap="round">
        <path d="M100 14 v14 M40 40 l10 10 M160 40 l-10 10 M22 96 h14 M178 96 h-14" />
      </g>
      <rect x={78} y={142} width={44} height={14} rx={5} fill="#9aa3bd" />
      <rect x={82} y={156} width={36} height={12} rx={5} fill="#8a8fa8" />
      <rect x={90} y={168} width={20} height={10} rx={5} fill="#6b7088" />
      <path d="M100 40 C136 40 152 68 146 94 C142 112 126 120 122 142 H78 C74 120 58 112 54 94 C48 68 64 40 100 40Z" fill="#fff59d" />
      <path d="M86 140 Q84 110 92 100 Q100 94 108 100 Q116 110 114 140" stroke="#ffb300" strokeWidth={4} fill="none" />
      <path d="M72 70 Q78 56 92 54" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" />
    </g>
  ),
};

/** Generic art for parent-added words: a colorful star badge with the word's first letter. */
function customArt(stickerId: string, label?: string): Art {
  const palette = ['#ff5a5f', '#ff9f43', '#5cc47a', '#5aa9ff', '#a77bff', '#ff5c8a'];
  let h = 0;
  for (const ch of stickerId) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const color = palette[h % palette.length];
  const letter = (label ?? stickerId.replace(/^stk-(custom-|week-)?/, '')).charAt(0).toUpperCase();
  return () => (
    <g>
      <Star cx={100} cy={104} r={84} fill={color} />
      <circle cx={100} cy={106} r={40} fill="#fff" opacity={0.9} />
      <text x={100} y={124} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={50} fill={color}>
        {letter}
      </text>
    </g>
  );
}

export function hasArt(id: string): boolean {
  return id in ART;
}

export type StickerVariant = 'sticker' | 'silhouette' | 'plain';

interface StickerSvgProps {
  id: string;
  label?: string;
  variant?: StickerVariant;
  /** For nesting inside a parent SVG (scene editor/export). */
  x?: number;
  y?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
  flip?: boolean;
}

/** Renders a sticker as an <svg>. Works standalone or nested inside another SVG. */
export function StickerSvg({ id, label, variant = 'sticker', x, y, width = '100%', height = '100%', className, title, flip }: StickerSvgProps) {
  const raw = useId();
  const u = `s${raw.replace(/[^a-zA-Z0-9]/g, '')}`;
  const art = (ART[id] ?? customArt(id, label))(u);
  const filterId = `${u}f`;
  return (
    <svg
      viewBox="0 0 200 200"
      x={x}
      y={y}
      width={width}
      height={height}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      <defs>
        {variant === 'silhouette' ? (
          <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="d" />
            <feFlood floodColor="#ffffff" />
            <feComposite in2="d" operator="in" result="white" />
            <feFlood floodColor="#cfc8e3" />
            <feComposite in2="SourceAlpha" operator="in" result="shape" />
            <feMerge>
              <feMergeNode in="white" />
              <feMergeNode in="shape" />
            </feMerge>
          </filter>
        ) : (
          <filter id={filterId} x="-15%" y="-15%" width="130%" height="135%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="2.6" result="d1" />
            <feFlood floodColor={INK} />
            <feComposite in2="d1" operator="in" result="outline" />
            {variant === 'sticker' && (
              <>
                <feMorphology in="SourceAlpha" operator="dilate" radius="8" result="d2" />
                <feFlood floodColor="#ffffff" />
                <feComposite in2="d2" operator="in" result="white" />
                <feGaussianBlur in="d2" stdDeviation="2.5" result="blur" />
                <feOffset in="blur" dy="4" result="off" />
                <feFlood floodColor="#2b2340" floodOpacity="0.22" />
                <feComposite in2="off" operator="in" result="shadow" />
              </>
            )}
            <feMerge>
              {variant === 'sticker' && <feMergeNode in="shadow" />}
              {variant === 'sticker' && <feMergeNode in="white" />}
              <feMergeNode in="outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>
      <g filter={`url(#${filterId})`} transform={flip ? 'translate(200 0) scale(-1 1)' : undefined}>
        {art}
      </g>
    </svg>
  );
}
