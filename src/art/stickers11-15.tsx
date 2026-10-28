/** Sticker artwork for Weeks 11–15 (same 200 × 200 conventions as stickers.tsx). */
import type { ReactNode } from 'react';
import { Alien, Coin, Dino, Gem, Heart, INK, Robot, Sparkle, Star } from './primitives';

type Art = (u: string) => ReactNode;

const ground = (y = 178, fill = '#8fd16a') => <ellipse cx={100} cy={y} rx={78} ry={10} fill={fill} />;

export const ART_11_15: Record<string, Art> = {
  // ───────────── Week 11 ─────────────
  'stk-abundant': () => (
    <g>
      <rect x={20} y={150} width={160} height={28} rx={8} fill="#a0704a" />
      <circle cx={50} cy={140} r={20} fill="#ff5a5f" />
      <circle cx={86} cy={136} r={22} fill="#ff9f43" />
      <circle cx={124} cy={140} r={20} fill="#ffd23f" />
      <circle cx={156} cy={142} r={18} fill="#5cc47a" />
      <circle cx={68} cy={108} r={18} fill="#a77bff" />
      <circle cx={106} cy={104} r={20} fill="#ff5c8a" />
      <circle cx={142} cy={110} r={17} fill="#ff5a5f" />
      <circle cx={88} cy={74} r={17} fill="#ffd23f" />
      <circle cx={124} cy={76} r={15} fill="#5cc47a" />
      <path d="M106 58 q4 -14 14 -18" stroke="#3f8f3a" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Sparkle cx={34} cy={60} r={9} />
      <Sparkle cx={170} cy={70} r={7} />
    </g>
  ),
  'stk-fragile': () => (
    <g>
      <ellipse cx={100} cy={168} rx={70} ry={14} fill="#ffb3d6" />
      <circle cx={100} cy={104} r={56} fill="#c8f1ff" opacity={0.9} />
      <path d="M70 76 Q84 60 104 60" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M118 120 l10 -12 l-4 -10 l12 -8" stroke="#7a93b8" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Star cx={100} cy={110} r={18} fill="#ffd23f" />
      <path d="M30 40 l10 -6 M30 40 l12 4 M170 50 l-10 -6 M170 50 l-12 4" stroke="#ff5a5f" strokeWidth={4} strokeLinecap="round" />
    </g>
  ),
  'stk-eager': () => (
    <g>
      {ground(180, '#c9b6ff')}
      <Alien x={40} y={36} s={1} mood="happy" eyes={2} color="#5cc47a" belly="#d4f7c2" />
      <path d="M40 30 q-6 -10 0 -18 M160 30 q6 -10 0 -18" stroke="#ffd23f" strokeWidth={5} fill="none" strokeLinecap="round" />
      <rect x={136} y={96} width={40} height={26} rx={5} fill="#ffd23f" transform="rotate(-14 156 109)" />
      <Star cx={156} cy={108} r={7} fill="#ff5a5f" />
      <path d="M30 172 q8 -10 16 0 M154 172 q8 -10 16 0" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-cooperate': () => (
    <g>
      <Robot x={6} y={52} s={0.8} mood="happy" color="#5aa9ff" accent="#ffd23f" />
      <Robot x={114} y={52} s={0.8} mood="happy" color="#ff8a3d" accent="#5cc47a" flip />
      <Star cx={100} cy={48} r={36} fill="#ffd23f" />
      <path d="M72 82 L64 92 M128 82 L136 92" stroke="#8a8fa8" strokeWidth={8} strokeLinecap="round" />
      <Sparkle cx={100} cy={46} r={8} />
    </g>
  ),
  'stk-rapid': () => (
    <g>
      <path d="M14 70 H90 M24 100 H96 M10 130 H84" stroke="#9be7ff" strokeWidth={8} strokeLinecap="round" />
      <path d="M60 60 Q110 80 150 100 Q110 120 60 140 Q90 100 60 60Z" fill="#7ff0ff" opacity={0.7} />
      <circle cx={148} cy={100} r={30} fill="#ffd23f" />
      <circle cx={140} cy={92} r={6} fill="#ffb300" />
      <circle cx={156} cy={110} r={5} fill="#ffb300" />
      <circle cx={170} cy={56} r={10} fill="#a77bff" />
      <Sparkle cx={40} cy={40} r={8} />
    </g>
  ),
  // ───────────── Week 12 ─────────────
  'stk-obstacle': () => (
    <g>
      <rect x={14} y={168} width={172} height={14} fill="#7a5230" />
      <rect x={96} y={96} width={36} height={36} fill="#c26a3a" stroke={INK} strokeWidth={3} />
      <rect x={96} y={132} width={36} height={36} fill="#c26a3a" stroke={INK} strokeWidth={3} />
      <rect x={132} y={132} width={36} height={36} fill="#c26a3a" stroke={INK} strokeWidth={3} />
      <path d="M96 96 l6 -12 l6 12 l6 -12 l6 12 l6 -12 l6 12" fill="#c7cbe0" />
      <Robot x={16} y={40} s={0.62} rotate={-12} mood="determined" color="#5cc47a" accent="#ffd23f" />
      <path d="M56 136 q20 -60 50 -70" stroke="#fff" strokeWidth={4} strokeDasharray="6 8" fill="none" />
    </g>
  ),
  'stk-hesitate': () => (
    <g>
      <rect x={14} y={120} width={70} height={60} fill="#5cc47a" />
      <rect x={130} y={120} width={56} height={60} fill="#5cc47a" />
      <rect x={14} y={112} width={70} height={12} fill="#7a5230" />
      <rect x={130} y={112} width={56} height={12} fill="#7a5230" />
      <Robot x={22} y={22} s={0.62} mood="worried" color="#a77bff" accent="#ffd23f" />
      <circle cx={112} cy={50} r={20} fill="#fff" />
      <text x={112} y={62} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={32} fill={INK}>?</text>
    </g>
  ),
  'stk-precise': () => (
    <g>
      <circle cx={100} cy={104} r={76} fill="#ff5a5f" />
      <circle cx={100} cy={104} r={58} fill="#fff" />
      <circle cx={100} cy={104} r={40} fill="#ff5a5f" />
      <circle cx={100} cy={104} r={22} fill="#fff" />
      <circle cx={100} cy={104} r={9} fill="#ffd23f" />
      <path d="M100 104 L170 34" stroke="#7a5230" strokeWidth={6} strokeLinecap="round" />
      <path d="M170 34 l14 -4 l-8 12 l12 0 l-14 8Z" fill="#5aa9ff" />
      <Sparkle cx={40} cy={30} r={8} />
    </g>
  ),
  'stk-triumph': () => (
    <g>
      <g stroke="#ff5c8a" strokeWidth={4} strokeLinecap="round">
        <path d="M40 40 l-10 -10 M40 40 l12 -8 M40 40 l-2 -14" />
      </g>
      <g stroke="#5aa9ff" strokeWidth={4} strokeLinecap="round">
        <path d="M160 34 l10 -10 M160 34 l-12 -8 M160 34 l2 -14" />
      </g>
      <rect x={74} y={160} width={52} height={16} rx={4} fill="#7a5230" />
      <rect x={92} y={132} width={16} height={30} fill="#ffc531" />
      <path d="M62 60 H138 V84 Q138 132 100 134 Q62 132 62 84Z" fill="#ffc531" />
      <path d="M62 70 Q40 70 44 92 Q48 108 66 108 M138 70 Q160 70 156 92 Q152 108 134 108" stroke="#ffc531" strokeWidth={8} fill="none" />
      <Star cx={100} cy={92} r={18} fill="#ff8a1f" />
    </g>
  ),
  'stk-generous': () => (
    <g>
      <Robot x={14} y={46} s={0.85} mood="happy" color="#ff8a3d" accent="#5aa9ff" />
      <path d="M100 110 Q124 108 132 96" stroke="#8a8fa8" strokeWidth={8} fill="none" strokeLinecap="round" />
      <Coin cx={146} cy={86} r={16} />
      <Coin cx={164} cy={124} r={14} />
      <Coin cx={140} cy={150} r={13} />
      <Heart cx={160} cy={46} s={1.1} />
    </g>
  ),
  // ───────────── Week 13 ─────────────
  'stk-ancient': () => (
    <g>
      <path d="M30 176 V110 L100 60 L170 110 V176Z" fill="#c9b18f" />
      <path d="M22 112 L100 54 L178 112" stroke="#a88d6b" strokeWidth={10} fill="none" strokeLinejoin="round" />
      <rect x={82} y={124} width={36} height={52} rx={16} fill="#6b5a4e" />
      <rect x={44} y={120} width={14} height={56} fill="#b39878" />
      <rect x={142} y={120} width={14} height={56} fill="#b39878" />
      <path d="M50 100 q14 6 28 -6 q20 18 40 0 M120 160 q16 -10 30 4" stroke="#5cc47a" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M150 140 l4 6 M60 150 l-4 8 M110 96 l4 4" stroke="#8c7357" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  'stk-fierce': () => (
    <g>
      {ground(178, '#c99a6b')}
      <Dino x={14} y={40} s={0.95} mood="determined" color="#e8434a" spikes="#ffd23f" belly="#ffc7b8" />
      <path d="M144 88 l4 8 l4 -8 M154 86 l4 8 l4 -8" fill="#fff" />
      <path d="M170 50 q12 -4 16 -14 M174 70 q14 2 20 -6" stroke="#ff9f43" strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-migrate': () => (
    <g>
      <circle cx={170} cy={40} r={20} fill="#ffd23f" />
      <path d="M14 160 Q60 140 100 156 T186 150 V186 H14Z" fill="#8fd16a" />
      <Dino x={96} y={86} s={0.5} mood="happy" color="#56c271" spikes="#ff9f43" />
      <Dino x={50} y={100} s={0.42} mood="happy" color="#4fb6a0" spikes="#ffd23f" />
      <Dino x={14} y={114} s={0.34} mood="happy" color="#7fd3a0" spikes="#c38bff" />
      <path d="M40 50 l8 6 l8 -6 M66 40 l8 6 l8 -6 M92 52 l8 6 l8 -6" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  ),
  'stk-camouflage': () => (
    <g>
      <path d="M20 180 Q30 90 60 60 Q50 130 70 180Z" fill="#3f9a4a" />
      <path d="M180 180 Q170 80 130 50 Q150 130 128 180Z" fill="#3f9a4a" />
      <Dino x={24} y={50} s={0.95} mood="happy" color="#4fa85a" spikes="#2f7d3a" belly="#7cc47a" />
      <path d="M60 100 q10 -8 20 0 M90 120 q10 -8 20 0 M48 128 q8 -6 16 0" stroke="#2f7d3a" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M100 180 Q110 120 150 100 Q130 150 130 180Z" fill="#5cc47a" />
    </g>
  ),
  'stk-survive': () => (
    <g>
      <path d="M14 150 Q50 140 80 150 T150 150 T186 148 V186 H14Z" fill="#4fb6ff" />
      <path d="M60 150 L80 100 H130 L150 150Z" fill="#9b8574" />
      <Dino x={64} y={36} s={0.5} mood="determined" color="#56c271" spikes="#ffd23f" />
      <Sparkle cx={40} cy={50} r={9} />
      <Sparkle cx={170} cy={60} r={8} />
      <path d="M160 100 l6 10 h-12Z" fill="#ffd23f" />
    </g>
  ),
  // ───────────── Week 14 ─────────────
  'stk-vast': () => (
    <g>
      <circle cx={100} cy={100} r={84} fill="#2d2a6e" />
      <path d="M30 120 Q100 40 170 90" stroke="#a77bff" strokeWidth={14} fill="none" opacity={0.6} strokeLinecap="round" />
      <path d="M40 80 Q100 150 166 120" stroke="#5aa9ff" strokeWidth={10} fill="none" opacity={0.5} strokeLinecap="round" />
      <Star cx={50} cy={60} r={6} />
      <Star cx={150} cy={50} r={5} />
      <Star cx={140} cy={150} r={6} />
      <Star cx={60} cy={150} r={4} />
      <path d="M96 108 l10 -10 l4 4 l-10 10Z" fill="#ff5a5f" />
      <path d="M94 110 l-4 6 l6 -2Z" fill="#ffd23f" />
    </g>
  ),
  'stk-navigate': () => (
    <g>
      <circle cx={100} cy={100} r={74} fill="#ffe7a8" stroke="#c99400" strokeWidth={8} />
      <circle cx={100} cy={100} r={60} fill="#fff8e1" />
      <path d="M100 44 L114 100 L100 156 L86 100Z" fill="#ff5a5f" />
      <path d="M100 100 L114 100 L100 156 L86 100Z" fill="#5aa9ff" />
      <circle cx={100} cy={100} r={7} fill={INK} />
      <text x={100} y={40} textAnchor="middle" fontFamily="Fredoka Variable, sans-serif" fontWeight={700} fontSize={18} fill={INK}>N</text>
      <Sparkle cx={166} cy={36} r={9} />
    </g>
  ),
  'stk-collide': () => (
    <g>
      <circle cx={62} cy={110} r={40} fill="#9b8574" />
      <circle cx={140} cy={98} r={36} fill="#b39278" />
      <circle cx={52} cy={100} r={8} fill="#7d6a5d" />
      <circle cx={150} cy={88} r={6} fill="#8c6f5b" />
      <Star cx={102} cy={104} r={30} fill="#ffd23f" />
      <Star cx={102} cy={104} r={14} fill="#ff8a1f" />
      <path d="M20 60 L34 72 M180 150 L166 140 M30 160 l12 -8" stroke="#ffd23f" strokeWidth={5} strokeLinecap="round" />
    </g>
  ),
  'stk-fascinate': () => (
    <g>
      <Alien x={14} y={56} s={0.9} mood="surprised" eyes={1} color="#ff9f43" belly="#ffe0bd" />
      <rect x={110} y={84} width={50} height={18} rx={8} fill="#5c6b8a" transform="rotate(-30 135 93)" />
      <circle cx={160} cy={46} r={22} fill="#ff5c8a" />
      <ellipse cx={160} cy={46} rx={36} ry={9} fill="none" stroke="#ffd23f" strokeWidth={5} transform="rotate(-15 160 46)" />
      <Sparkle cx={120} cy={26} r={8} />
    </g>
  ),
  'stk-solitary': () => (
    <g>
      <circle cx={100} cy={100} r={84} fill="#1f2a44" />
      <circle cx={100} cy={100} r={38} fill="#e7e9f5" />
      <circle cx={88} cy={88} r={8} fill="#c7cbe0" />
      <circle cx={112} cy={114} r={6} fill="#c7cbe0" />
      <circle cx={108} cy={84} r={4} fill="#c7cbe0" />
      <Star cx={40} cy={50} r={4} />
      <Star cx={160} cy={160} r={4} />
    </g>
  ),
  // ───────────── Week 15 ─────────────
  'stk-courageous': () => (
    <g>
      <path d="M110 180 V80 Q150 40 186 80 V180Z" fill="#3a3355" />
      <path d="M40 60 H100 V110 Q100 150 70 166 Q40 150 40 110Z" fill="#5aa9ff" stroke="#ffd23f" strokeWidth={6} />
      <Star cx={70} cy={106} r={20} fill="#ffd23f" />
      <path d="M126 120 q6 -8 14 0 M148 110 q6 -8 14 0" stroke="#ff5a5f" strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={133} cy={124} r={3} fill="#ff5a5f" />
      <circle cx={155} cy={114} r={3} fill="#ff5a5f" />
    </g>
  ),
  'stk-reliable': () => (
    <g>
      <Robot x={22} y={40} s={0.9} mood="happy" color="#5cc47a" accent="#ffd23f" />
      <path d="M120 70 H176 V110 Q176 140 148 150 Q120 140 120 110Z" fill="#fff" stroke="#5aa9ff" strokeWidth={6} />
      <path d="M134 108 l10 10 l20 -22" stroke="#5cc47a" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  'stk-frustrated': () => (
    <g>
      <Robot x={44} y={50} s={0.9} mood="worried" color="#ff5a5f" accent="#ffd23f" />
      <path d="M40 60 q-10 -10 -4 -20 q10 -4 8 -14 M160 60 q10 -10 4 -20 q-10 -4 -8 -14" stroke="#c7cbe0" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M20 170 q20 -20 40 0 q20 20 40 0 q20 -20 40 0 q20 20 40 0" stroke="#ffd23f" strokeWidth={5} fill="none" />
    </g>
  ),
  'stk-humble': () => (
    <g>
      <Robot x={60} y={50} s={0.8} mood="happy" color="#a77bff" accent="#ffd23f" />
      <Robot x={6} y={80} s={0.55} mood="happy" color="#5aa9ff" accent="#ff5c8a" />
      <Robot x={140} y={80} s={0.55} mood="happy" color="#5cc47a" accent="#ff9f43" flip />
      <rect x={90} y={20} width={20} height={22} fill="#ffc531" />
      <path d="M84 14 H116 V24 Q116 38 100 40 Q84 38 84 24Z" fill="#ffc531" />
      <Heart cx={40} cy={40} s={0.8} />
      <Heart cx={162} cy={40} s={0.8} />
    </g>
  ),
  'stk-clumsy': () => (
    <g>
      {ground(182, '#c9b6ff')}
      <Robot x={30} y={44} s={0.85} rotate={22} mood="surprised" color="#ff9f43" accent="#5aa9ff" />
      <path d="M140 40 h22 l-4 26 h-14Z" fill="#fff" stroke="#5aa9ff" strokeWidth={4} transform="rotate(30 151 53)" />
      <Coin cx={160} cy={110} r={12} />
      <Coin cx={30} cy={40} r={10} />
      <path d="M150 140 q10 10 26 6" stroke="#5aa9ff" strokeWidth={6} fill="none" strokeLinecap="round" />
      <Gem cx={176} cy={74} s={0.6} />
      <Star cx={100} cy={26} r={8} />
      <Sparkle cx={120} cy={170} r={7} />
    </g>
  ),
};
