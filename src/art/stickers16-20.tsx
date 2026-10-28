/** Sticker artwork for Weeks 16–20 and the week-reward stickers for Weeks 11–20. */
import type { ReactNode } from 'react';
import { Alien, Astronaut, Dino, Gem, Heart, INK, Robot, Sparkle, Star } from './primitives';

type Art = (u: string) => ReactNode;

const ground = (y = 178, fill = '#8fd16a') => <ellipse cx={100} cy={y} rx={78} ry={10} fill={fill} />;

const volcano = (lava = '#ff7a3d') => (
  <g>
    <path d="M14 180 L74 70 H126 L186 180Z" fill="#7d6a5d" />
    <path d="M74 70 Q100 84 126 70 L118 96 Q100 104 84 92Z" fill={lava} />
  </g>
);

export const ART_16_20: Record<string, Art> = {
  // ───────────── Week 16 ─────────────
  'stk-erupt': () => (
    <g>
      {volcano()}
      <path d="M86 70 Q70 30 92 14 Q100 40 104 20 Q118 36 112 70Z" fill="#ff7a3d" />
      <path d="M94 68 Q86 40 98 30 Q104 48 106 68Z" fill="#ffd23f" />
      <circle cx={52} cy={36} r={9} fill="#ff9f43" />
      <circle cx={152} cy={30} r={7} fill="#ff9f43" />
      <circle cx={140} cy={56} r={5} fill="#ffd23f" />
      <path d="M100 110 q-10 20 4 40 q-8 14 0 30" stroke="#ff7a3d" strokeWidth={7} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-dense': () => (
    <g>
      {[20, 46, 72, 98, 124, 150].map((x, i) => (
        <path key={x} d={`M${x} 184 Q${x + 4} ${60 + (i % 2) * 20} ${x + 18} ${40 + (i % 3) * 14} Q${x + 30} ${100} ${x + 28} 184Z`} fill={['#2f7d3a', '#3f9a4a', '#5cc47a'][i % 3]} />
      ))}
      <Dino x={50} y={60} s={0.6} mood="happy" color="#ff9f43" spikes="#a77bff" />
      <path d="M14 120 Q60 110 100 128 T186 116" stroke="#3f9a4a" strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d="M30 70 q14 10 4 26 M160 60 q-14 10 -4 26" stroke="#2f7d3a" strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-fertile': () => (
    <g>
      <path d="M14 150 Q100 130 186 150 V186 H14Z" fill="#6b4a33" />
      <path d="M50 150 V100 M100 146 V80 M150 150 V104" stroke="#3f9a4a" strokeWidth={6} strokeLinecap="round" />
      <path d="M50 116 q-18 -6 -22 -20 q18 0 22 20 M100 100 q20 -8 26 -24 q-22 2 -26 24 M150 120 q18 -6 22 -20 q-18 0 -22 20" fill="#5cc47a" />
      <circle cx={50} cy={92} r={12} fill="#ff5c8a" />
      <circle cx={100} cy={70} r={16} fill="#ff9f43" />
      <circle cx={150} cy={96} r={12} fill="#ffd23f" />
      <path d="M40 170 q6 -4 12 0 M120 166 q6 -4 12 0" stroke="#ff9fb3" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-endure': () => (
    <g>
      {ground(180, '#c99a6b')}
      <Dino x={24} y={44} s={0.9} mood="determined" color="#4fb36b" spikes="#ff9f43" />
      <path d="M170 40 Q140 50 120 46 M180 80 Q150 90 130 84 M176 120 Q156 126 140 122" stroke="#c7cbe0" strokeWidth={6} fill="none" strokeLinecap="round" />
      <circle cx={160} cy={60} r={4} fill="#8a8fa8" />
      <circle cx={168} cy={102} r={3} fill="#8a8fa8" />
    </g>
  ),
  'stk-scorching': () => (
    <g>
      <circle cx={140} cy={56} r={34} fill="#ffb300" />
      <g stroke="#ffd23f" strokeWidth={6} strokeLinecap="round">
        <path d="M140 8 v8 M140 96 v8 M92 56 h8 M180 56 h8 M106 22 l6 6 M174 90 l-6 -6 M174 22 l-6 6 M106 90 l6 -6" />
      </g>
      {ground(182, '#f2c27a')}
      <Dino x={10} y={64} s={0.7} mood="worried" color="#ff7a59" spikes="#ffd23f" />
      <path d="M36 70 Q60 40 84 70Z" fill="#5aa9ff" />
      <path d="M60 70 V100" stroke={INK} strokeWidth={3} />
      <path d="M130 140 q6 -10 0 -20 M150 146 q6 -10 0 -20" stroke="#ff9f43" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  ),
  // ───────────── Week 17 ─────────────
  'stk-predict': () => (
    <g>
      <rect x={60} y={150} width={80} height={24} rx={8} fill="#7a5230" />
      <circle cx={100} cy={100} r={56} fill="#c4b5ff" opacity={0.9} />
      <circle cx={100} cy={100} r={56} fill="none" stroke="#fff" strokeWidth={4} opacity={0.6} />
      <path d="M90 120 l20 -40 l6 8 l-16 34Z" fill="#ff5a5f" />
      <path d="M88 124 l-6 10 l12 -4Z" fill="#ffd23f" />
      <path d="M70 74 Q80 60 96 58" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />
      <Sparkle cx={34} cy={40} r={9} />
      <Sparkle cx={166} cy={48} r={7} />
    </g>
  ),
  'stk-estimate': () => (
    <g>
      <rect x={96} y={36} width={84} height={20} rx={6} fill="#a0704a" />
      <path d="M100 56 H176 V168 Q176 180 164 180 H112 Q100 180 100 168Z" fill="#c8f1ff" opacity={0.85} />
      {[[116, 160], [136, 164], [158, 158], [124, 140], [148, 138], [114, 118], [138, 116], [162, 120], [128, 96], [152, 94]].map(([x, y], i) => (
        <Star key={i} cx={x} cy={y} r={9} fill={['#ffd23f', '#ff5c8a', '#5aa9ff'][i % 3]} />
      ))}
      <Robot x={6} y={62} s={0.65} mood="focused" color="#5cc47a" accent="#ffd23f" />
      <text x={46} y={42} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={30} fill="#a77bff">~?</text>
    </g>
  ),
  'stk-conclude': () => (
    <g>
      <Alien x={20} y={56} s={0.9} mood="happy" eyes={2} color="#5cc47a" belly="#d4f7c2" />
      <circle cx={144} cy={120} r={22} fill="none" stroke="#7a5230" strokeWidth={8} />
      <path d="M160 136 L180 160" stroke="#7a5230" strokeWidth={10} strokeLinecap="round" />
      <circle cx={144} cy={120} r={16} fill="#c8f1ff" opacity={0.7} />
      <path d="M86 20 C110 20 118 40 112 54 C108 62 102 64 100 74 H80 C78 64 72 62 68 54 C62 40 70 20 86 20Z" fill="#fff59d" />
      <rect x={80} y={74} width={20} height={8} rx={3} fill="#9aa3bd" />
      <path d="M54 30 l-10 -6 M120 30 l10 -6 M90 6 v-4" stroke="#ffd23f" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
  'stk-analyze': () => (
    <g>
      <Robot x={10} y={50} s={0.8} mood="focused" color="#5aa9ff" accent="#ff5a5f" />
      <path d="M78 96 L134 120 L134 150Z" fill="#7ff0ff" opacity={0.5} />
      <circle cx={148} cy={140} r={26} fill="#9b8574" />
      <circle cx={140} cy={132} r={6} fill="#7d6a5d" />
      <rect x={112} y={20} width={72} height={52} rx={8} fill="#1f2a44" />
      <rect x={122} y={52} width={10} height={12} fill="#5cc47a" />
      <rect x={138} y={40} width={10} height={24} fill="#ffd23f" />
      <rect x={154} y={30} width={10} height={34} fill="#ff5c8a" />
    </g>
  ),
  'stk-reveal': () => (
    <g>
      <rect x={20} y={18} width={160} height={14} rx={6} fill="#c99400" />
      <path d="M24 32 Q40 100 30 180 H60 Q74 100 56 32Z" fill="#e8434a" />
      <path d="M176 32 Q160 100 170 180 H140 Q126 100 144 32Z" fill="#e8434a" />
      <circle cx={100} cy={106} r={36} fill="#5aa9ff" />
      <path d="M78 96 q14 -10 26 0 q8 12 -4 18 q-16 2 -22 -18Z M108 118 q10 -4 16 4 q-4 10 -14 6Z" fill="#6fd38a" />
      <Sparkle cx={70} cy={60} r={8} />
      <Sparkle cx={134} cy={150} r={8} />
    </g>
  ),
  // ───────────── Week 18 ─────────────
  'stk-mischievous': () => (
    <g>
      <Alien x={34} y={40} s={1} mood="happy" eyes={2} color="#7fd36a" belly="#d4f7c2" />
      <path d="M66 70 l14 6 M120 76 l14 -6" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path d="M150 140 H186 M150 140 l10 -8 M150 140 l10 8" stroke="#ff5a5f" strokeWidth={6} strokeLinecap="round" transform="rotate(180 168 140)" />
      <rect x={14} y={128} width={30} height={22} rx={4} fill="#ffd23f" />
      <path d="M22 139 h14 M22 139 l5 -5 M22 139 l5 5" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  'stk-grateful': () => (
    <g>
      <Robot x={10} y={50} s={0.8} mood="happy" color="#ff8a3d" accent="#ffd23f" />
      <Heart cx={150} cy={96} s={2.4} />
      <Sparkle cx={180} cy={40} r={8} />
      <Sparkle cx={120} cy={40} r={6} />
      <path d="M90 112 Q110 108 120 100" stroke="#8a8fa8" strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-envious': () => (
    <g>
      <Alien x={4} y={66} s={0.8} mood="worried" eyes={1} color="#6fcf5a" belly="#c8f2b8" />
      <Robot x={106} y={66} s={0.75} mood="happy" color="#5aa9ff" accent="#ffd23f" />
      <path d="M118 66 L124 44 L138 58 L144 38 L152 58 L166 44 L172 66Z" fill="#ffc531" stroke="#c99400" strokeWidth={3} />
      <Gem cx={145} cy={56} s={0.4} fill="#ff5c8a" />
      <Sparkle cx={180} cy={30} r={7} />
    </g>
  ),
  'stk-compromise': () => (
    <g>
      <circle cx={70} cy={70} r={34} fill="#c98a4b" />
      <circle cx={60} cy={60} r={5} fill="#5a3a22" />
      <circle cx={78} cy={78} r={5} fill="#5a3a22" />
      <circle cx={136} cy={70} r={34} fill="#c98a4b" />
      <circle cx={130} cy={58} r={5} fill="#5a3a22" />
      <circle cx={146} cy={80} r={5} fill="#5a3a22" />
      <path d="M40 150 Q70 120 100 140 Q130 120 160 150" stroke="#ffd23f" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M40 150 Q70 120 100 140" stroke="#5aa9ff" strokeWidth={18} fill="none" strokeLinecap="round" />
      <Heart cx={100} cy={176} s={0.7} />
    </g>
  ),
  'stk-embarrassed': () => (
    <g>
      <Robot x={50} y={40} s={0.95} mood="worried" color="#a77bff" accent="#ffd23f" />
      <ellipse cx={74} cy={86} rx={10} ry={6} fill="#ff5c8a" opacity={0.8} />
      <ellipse cx={126} cy={86} rx={10} ry={6} fill="#ff5c8a" opacity={0.8} />
      <path d="M100 42 q-20 -4 -26 -18 q22 -6 30 6 q8 -14 30 -8 q-6 16 -34 20Z" fill="#fff" stroke="#ffb3d6" strokeWidth={3} />
      <path d="M22 170 q20 -14 40 0" stroke="#ffd23f" strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  ),
  // ───────────── Week 19 ─────────────
  'stk-abandon': () => (
    <g>
      <path d="M14 180 V90 L60 70 V180Z M140 180 V70 L186 90 V180Z" fill="#c99a6b" />
      <ellipse cx={100} cy={152} rx={56} ry={22} fill="#a0704a" />
      <ellipse cx={100} cy={144} rx={42} ry={14} fill="#6b4a33" />
      <path d="M64 140 l-8 -10 M136 140 l8 -10 M80 136 l-4 -12 M120 136 l4 -12" stroke="#a0704a" strokeWidth={5} strokeLinecap="round" />
      <path d="M92 138 q4 -10 14 -4 l-4 8Z" fill="#fff6e0" />
      <path d="M30 100 q10 20 0 40 M168 96 q-10 20 0 40" stroke="#5cc47a" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M150 40 q10 -8 20 0 M162 52 q10 -8 20 0" stroke="#8a8fa8" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-retreat': () => (
    <g>
      <path d="M120 180 V40 Q160 30 186 50 V180Z" fill="#b39278" />
      <circle cx={150} cy={70} r={12} fill="#9b8574" />
      <circle cx={140} cy={100} r={9} fill="#9b8574" />
      {ground(180, '#c99a6b')}
      <Dino x={6} y={70} s={0.65} flip mood="worried" color="#7fd3a0" spikes="#5aa9ff" />
      <path d="M118 120 h-20 M118 120 l-8 -6 M118 120 l-8 6" stroke="#fff" strokeWidth={5} strokeLinecap="round" transform="rotate(180 108 120)" />
    </g>
  ),
  'stk-ascend': () => (
    <g>
      <path d="M14 186 V60 Q30 50 50 64 V186Z M186 186 V40 Q170 30 150 48 V186Z" fill="#c99a6b" />
      <circle cx={100} cy={30} r={18} fill="#ffd23f" />
      <path d="M100 150 L76 120 L96 124 L100 96 L104 124 L124 120Z" fill="#a77bff" />
      <path d="M100 96 Q70 80 54 98 Q76 98 100 112 Q124 98 146 98 Q130 80 100 96Z" fill="#c38bff" />
      <circle cx={100} cy={92} r={8} fill="#a77bff" />
      <path d="M100 170 v-12 M88 176 v-8 M112 176 v-8" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
  'stk-emerge': () => (
    <g>
      {ground(180, '#c9a77d')}
      <path d="M50 150 Q50 186 100 186 Q150 186 150 150 L140 130 L124 142 L110 124 L96 140 L80 124 L66 140Z" fill="#fff6e0" stroke="#e8d5a8" strokeWidth={3} />
      <Dino x={52} y={44} s={0.55} mood="happy" color="#5cc47a" spikes="#ff9f43" />
      <path d="M40 90 L30 70 L50 80Z M164 96 L176 76 L156 84Z" fill="#fff6e0" stroke="#e8d5a8" strokeWidth={2} />
      <Sparkle cx={30} cy={40} r={8} />
      <Sparkle cx={170} cy={40} r={8} />
    </g>
  ),
  'stk-hover': () => (
    <g>
      <path d="M14 160 Q60 150 100 160 T186 156 V186 H14Z" fill="#4fb6ff" />
      <path d="M60 82 Q30 58 14 76 Q40 80 64 96Z M140 82 Q170 58 186 76 Q160 80 136 96Z" fill="#c38bff" />
      <ellipse cx={100} cy={92} rx={40} ry={18} fill="#a77bff" />
      <circle cx={132} cy={82} r={14} fill="#a77bff" />
      <path d="M144 82 L166 88 L144 92Z" fill="#ffd23f" />
      <circle cx={136} cy={78} r={3.5} fill={INK} />
      <path d="M80 126 v10 M100 130 v10 M120 126 v10" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeDasharray="3 5" />
    </g>
  ),
  // ───────────── Week 20 ─────────────
  'stk-magnificent': () => (
    <g>
      <circle cx={100} cy={104} r={80} fill="#2d2a6e" />
      <path d="M100 104 m-60 0 a60 30 -20 1 0 120 0 a60 30 -20 1 0 -120 0" fill="#ff5c8a" opacity={0.45} />
      <path d="M100 104 m-44 0 a44 20 30 1 0 88 0 a44 20 30 1 0 -88 0" fill="#5aa9ff" opacity={0.5} />
      <path d="M64 70 L74 44 L88 62 L100 36 L112 62 L126 44 L136 70Z" fill="#ffc531" stroke="#c99400" strokeWidth={3} />
      <Star cx={100} cy={110} r={22} fill="#ffd23f" />
      <Sparkle cx={40} cy={60} r={7} />
      <Sparkle cx={160} cy={150} r={7} />
      <Sparkle cx={150} cy={50} r={5} />
    </g>
  ),
  'stk-ordinary': () => (
    <g>
      {ground(178, '#c7cbe0')}
      <path d="M40 160 Q30 110 70 96 Q110 80 146 104 Q174 124 160 160Z" fill="#9aa3bd" />
      <path d="M60 120 q10 -8 22 -4 M118 112 q12 0 20 8" stroke="#8a8fa8" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M104 100 l6 16 l-8 10" stroke="#5c6b8a" strokeWidth={3} fill="none" />
      <Gem cx={108} cy={122} s={0.4} fill="#7ff0ff" />
      <Sparkle cx={124} cy={92} r={7} />
    </g>
  ),
  'stk-achieve': () => (
    <g>
      <path d="M14 186 L100 60 L186 186Z" fill="#c7cbe0" />
      <path d="M70 104 L100 60 L130 104 Q115 96 100 106 Q85 96 70 104Z" fill="#fff" />
      <Astronaut x={56} y={34} s={0.5} />
      <rect x={118} y={14} width={5} height={60} fill="#6b5a4e" />
      <path d="M123 16 H160 L150 28 L160 40 H123Z" fill="#ff5a5f" />
      <Star cx={140} cy={28} r={6} fill="#ffd23f" />
      <Sparkle cx={30} cy={40} r={8} />
    </g>
  ),
  'stk-eventually': () => (
    <g>
      <path d="M24 170 Q60 110 100 120 T176 50" stroke="#fff" strokeWidth={5} strokeDasharray="8 10" fill="none" strokeLinecap="round" />
      <circle cx={30} cy={170} r={12} fill="#5aa9ff" />
      <circle cx={162} cy={52} r={28} fill="#5cc47a" />
      <path d="M146 44 q10 -8 20 0 q-4 14 -20 0Z" fill="#3f9a4a" />
      <path d="M150 90 l12 -12 l4 4 l-12 12Z" fill="#ff5a5f" />
      <rect x={20} y={20} width={56} height={56} rx={8} fill="#fff" stroke="#5c6b8a" strokeWidth={4} />
      <rect x={20} y={20} width={56} height={14} rx={6} fill="#ff5a5f" />
      <path d="M32 46 l6 6 M44 46 l6 6 M56 46 l6 6 M32 58 l6 6 M44 58 l6 6" stroke="#8a8fa8" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  'stk-ponder': () => (
    <g>
      <circle cx={150} cy={50} r={28} fill="#5aa9ff" />
      <path d="M132 44 q10 -10 22 -2 q6 12 -6 16 q-12 0 -16 -14Z" fill="#6fd38a" />
      <path d="M14 186 Q20 150 60 150 H140 Q180 150 186 186Z" fill="#c7cbe0" />
      <Astronaut x={40} y={40} s={0.75} />
      <circle cx={112} cy={40} r={5} fill="#fff" />
      <circle cx={122} cy={26} r={7} fill="#fff" />
      <Sparkle cx={30} cy={30} r={7} />
    </g>
  ),

  // ───────────── Week rewards 11–20 ─────────────
  'stk-week-11': () => (
    <g>
      <path d="M20 160 Q80 120 130 80" stroke="#7ff0ff" strokeWidth={30} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M30 170 Q90 130 134 90" stroke="#c4f8ff" strokeWidth={12} fill="none" strokeLinecap="round" />
      <Star cx={144} cy={70} r={46} fill="#ffd23f" />
      <circle cx={134} cy={66} r={4} fill={INK} />
      <circle cx={154} cy={66} r={4} fill={INK} />
      <path d="M134 80 Q144 88 154 80" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-week-12': () => (
    <g>
      <path d="M24 150 L34 60 L70 100 L100 40 L130 100 L166 60 L176 150Z" fill="#ffc531" stroke="#c99400" strokeWidth={5} />
      <rect x={24} y={146} width={152} height={26} rx={6} fill="#ffb300" />
      <Gem cx={100} cy={120} s={1.1} fill="#ff5a5f" />
      <Gem cx={56} cy={124} s={0.7} fill="#5aa9ff" />
      <Gem cx={144} cy={124} s={0.7} fill="#5cc47a" />
      <circle cx={34} cy={60} r={7} fill="#fff" />
      <circle cx={100} cy={40} r={7} fill="#fff" />
      <circle cx={166} cy={60} r={7} fill="#fff" />
    </g>
  ),
  'stk-week-13': () => (
    <g>
      <path d="M100 18 Q160 40 170 100 Q170 170 100 182 Q30 170 30 100 Q40 40 100 18Z" fill="#ffb347" opacity={0.92} />
      <path d="M62 60 Q80 40 104 40" stroke="#ffe0a3" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M78 120 q10 -26 30 -20 q16 6 12 22 q-6 14 -22 12 M96 118 l-12 22 M110 120 l6 22" stroke="#7a4a1a" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Sparkle cx={146} cy={60} r={9} />
    </g>
  ),
  'stk-week-14': () => (
    <g>
      <circle cx={100} cy={100} r={80} fill="#4b3fc7" stroke="#ffd23f" strokeWidth={8} />
      <Star cx={100} cy={100} r={58} fill="#ffd23f" />
      <path d="M100 52 L110 100 L100 148 L90 100Z" fill="#ff5a5f" />
      <circle cx={100} cy={100} r={8} fill="#fff" />
      <Sparkle cx={40} cy={40} r={8} />
      <Sparkle cx={166} cy={160} r={8} />
    </g>
  ),
  'stk-week-15': () => (
    <g>
      <path d="M30 30 H170 V96 Q170 160 100 184 Q30 160 30 96Z" fill="#d93a41" stroke="#ffc531" strokeWidth={10} />
      <path d="M100 30 V184" stroke="#ffc531" strokeWidth={6} />
      <Star cx={100} cy={96} r={36} fill="#ffc531" />
      <Star cx={100} cy={96} r={16} fill="#fff6a8" />
    </g>
  ),
  'stk-week-16': () => (
    <g>
      {volcano('#ff5a5f')}
      <Gem cx={100} cy={46} s={2} fill="#ff7a3d" shine="#ffe0a3" />
      <Sparkle cx={40} cy={40} r={9} />
      <Sparkle cx={164} cy={30} r={9} />
    </g>
  ),
  'stk-week-17': () => (
    <g>
      <circle cx={100} cy={100} r={80} fill="#1f2a44" stroke="#5aa9ff" strokeWidth={10} />
      <ellipse cx={100} cy={100} rx={62} ry={22} fill="none" stroke="#ffd23f" strokeWidth={5} transform="rotate(-25 100 100)" />
      <path d="M100 50 Q122 74 118 120 H82 Q78 74 100 50Z" fill="#f4f6ff" />
      <circle cx={100} cy={86} r={9} fill="#5aa9ff" />
      <path d="M82 120 L72 136 L84 130Z M118 120 L128 136 L116 130Z" fill="#ff5a5f" />
      <path d="M92 124 Q100 150 108 124Z" fill="#ff9f43" />
    </g>
  ),
  'stk-week-18': () => (
    <g>
      <rect x={30} y={80} width={140} height={96} fill="#ff8fb3" />
      <rect x={20} y={56} width={40} height={120} fill="#ff6f9a" />
      <rect x={140} y={56} width={40} height={120} fill="#ff6f9a" />
      <path d="M20 56 h8 v-10 h8 v10 h8 v-10 h8 v10 h8 M140 56 h8 v-10 h8 v10 h8 v-10 h8 v10 h8" fill="none" stroke="#ff6f9a" strokeWidth={8} />
      <path d="M80 176 V136 Q100 116 120 136 V176Z" fill="#7a3a5a" />
      <Heart cx={100} cy={100} s={1.6} fill="#fff" />
    </g>
  ),
  'stk-week-19': () => (
    <g>
      <path d="M14 186 V110 Q40 96 60 108 V186Z M186 186 V100 Q160 88 140 104 V186Z" fill="#c99a6b" />
      <path d="M50 186 L100 70 L150 186Z" fill="#b37a4f" />
      <rect x={97} y={22} width={6} height={52} fill="#6b5a4e" />
      <path d="M103 24 H146 L136 38 L146 52 H103Z" fill="#ffc531" stroke="#c99400" strokeWidth={3} />
      <Dino x={20} y={60} s={0.35} mood="happy" color="#56c271" spikes="#ffd23f" />
    </g>
  ),
  'stk-week-20': () => (
    <g>
      <circle cx={100} cy={108} r={74} fill="#4b3fc7" />
      <path d="M30 120 L40 40 L76 84 L100 24 L124 84 L160 40 L170 120Z" fill="#ffc531" stroke="#c99400" strokeWidth={5} />
      <rect x={30} y={116} width={140} height={30} rx={8} fill="#ffb300" />
      <Gem cx={100} cy={96} s={1.2} fill="#a77bff" />
      <Star cx={56} cy={132} r={9} fill="#fff" />
      <Star cx={100} cy={132} r={9} fill="#fff" />
      <Star cx={144} cy={132} r={9} fill="#fff" />
      <Sparkle cx={28} cy={36} r={9} />
      <Sparkle cx={172} cy={170} r={9} />
    </g>
  ),
};

