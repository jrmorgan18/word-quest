/** Scene backgrounds for decorating (1600 × 1000 coordinate space). Static, no animation. */
import type { SceneId } from '../engine/types';
import { Star } from './primitives';

export const SCENE_W = 1600;
export const SCENE_H = 1000;

export const SCENE_INFO: Record<SceneId, { title: string; emoji: string; color: string }> = {
  dino: { title: 'Dinosaur Island', emoji: '🦕', color: '#2fa36b' },
  space: { title: 'Space Explorer', emoji: '🚀', color: '#4b3fc7' },
  arcade: { title: 'Pixel Arcade', emoji: '🕹️', color: '#e8434a' },
};

function DinoIsland({ u }: { u: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${u}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd8ff" />
          <stop offset="1" stopColor="#d9f6ff" />
        </linearGradient>
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={`url(#${u}sky)`} />
      <circle cx={1380} cy={150} r={80} fill="#ffe066" />
      <g fill="#fff" opacity={0.9}>
        <ellipse cx={300} cy={140} rx={110} ry={34} />
        <ellipse cx={360} cy={118} rx={70} ry={34} />
        <ellipse cx={900} cy={100} rx={90} ry={28} />
      </g>
      {/* volcano */}
      <path d="M820 640 L1060 250 H1160 L1400 640Z" fill="#8a6a5c" />
      <path d="M1060 250 H1160 L1140 290 Q1110 310 1080 290Z" fill="#ff6b2d" />
      <path d="M1080 290 Q1060 360 1030 420 M1140 290 Q1170 380 1200 430" stroke="#ff9f43" strokeWidth={18} fill="none" strokeLinecap="round" />
      <g fill="#cfc4bd" opacity={0.85}>
        <circle cx={1110} cy={210} r={40} />
        <circle cx={1150} cy={160} r={50} />
        <circle cx={1200} cy={100} r={56} />
      </g>
      {/* mountains */}
      <path d="M0 640 L180 380 L330 560 L470 420 L660 640Z" fill="#6cbf8a" />
      <path d="M180 380 L230 450 L130 450Z" fill="#e8f7ee" />
      {/* waterfall */}
      <path d="M470 420 L520 430 L540 700 L480 700Z" fill="#8fdcff" />
      <path d="M490 450 V690 M515 450 V690" stroke="#e6f9ff" strokeWidth={6} />
      {/* ground layers */}
      <path d="M0 620 Q400 570 800 620 T1600 610 V1000 H0Z" fill="#7dd36a" />
      <path d="M380 700 Q520 680 640 720 Q700 760 600 790 Q470 800 400 770 Q330 740 380 700Z" fill="#5ec2ff" />
      <path d="M0 800 Q400 760 800 800 T1600 790 V1000 H0Z" fill="#5fbf55" />
      {/* palm trees */}
      {[
        [140, 660, 1],
        [1480, 650, -1],
      ].map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${d} 1)`}>
          <path d="M0 0 Q20 -120 -10 -240" stroke="#a0703c" strokeWidth={26} fill="none" strokeLinecap="round" />
          <path d="M-10 -240 Q-110 -260 -170 -190 Q-90 -230 -10 -230Z M-10 -240 Q90 -290 160 -220 Q70 -250 -10 -230Z M-10 -240 Q-70 -330 -10 -360 Q-20 -300 -4 -236Z M-10 -240 Q60 -320 120 -310 Q40 -290 -4 -236Z" fill="#3ca35a" />
        </g>
      ))}
      {/* ferns, fossils, eggs */}
      {[260, 760, 1220].map((x) => (
        <path key={x} d={`M${x} 850 q-60 -60 -90 -20 q50 0 90 20 q-20 -80 10 -110 q10 60 -10 110 q60 -60 100 -40 q-50 10 -100 40Z`} fill="#2f8f4a" />
      ))}
      <g transform="translate(960 900)" fill="#e9dcc7">
        <ellipse rx={70} ry={30} />
        <path d="M-30 -6 q30 -24 60 0" stroke="#bfae94" strokeWidth={6} fill="none" />
      </g>
      <ellipse cx={1340} cy={880} rx={26} ry={34} fill="#fff7e0" />
      <ellipse cx={1384} cy={892} rx={22} ry={28} fill="#e0f2ff" />
    </g>
  );
}

function SpaceExplorer({ u }: { u: string }) {
  const stars: [number, number, number][] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 70; i++) stars.push([rnd() * SCENE_W, rnd() * 640, 2 + rnd() * 4]);
  return (
    <g>
      <defs>
        <linearGradient id={`${u}sp`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1446" />
          <stop offset="1" stopColor="#3b2a86" />
        </linearGradient>
        <radialGradient id={`${u}neb`}>
          <stop offset="0" stopColor="#ff6fd8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff6fd8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={`url(#${u}sp)`} />
      <ellipse cx={420} cy={260} rx={360} ry={180} fill={`url(#${u}neb)`} />
      <ellipse cx={1240} cy={420} rx={300} ry={160} fill={`url(#${u}neb)`} opacity={0.6} />
      {stars.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.85} />
      ))}
      <Star cx={760} cy={120} r={18} fill="#fff3a8" />
      <Star cx={1480} cy={90} r={14} fill="#fff3a8" />
      {/* ringed planet */}
      <g transform="translate(1260 230)">
        <circle r={120} fill="#ff9f43" />
        <path d="M-110 -30 Q0 -60 110 -20 M-118 20 Q0 -10 116 30" stroke="#ffc078" strokeWidth={22} fill="none" />
        <ellipse rx={210} ry={40} fill="none" stroke="#ffe066" strokeWidth={18} transform="rotate(-16)" />
      </g>
      <circle cx={260} cy={200} r={60} fill="#5cd6a0" />
      <circle cx={240} cy={186} r={14} fill="#3fb886" />
      {/* moon surface */}
      <path d="M0 720 Q300 650 700 700 T1600 680 V1000 H0Z" fill="#a9a3c4" />
      <path d="M0 830 Q400 790 800 830 T1600 820 V1000 H0Z" fill="#8f89b0" />
      {[
        [240, 780, 70],
        [900, 760, 50],
        [1300, 880, 80],
        [560, 920, 46],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.32} fill="#77719a" />
          <ellipse cx={x} cy={y - r * 0.06} rx={r * 0.8} ry={r * 0.22} fill="#6a648c" />
        </g>
      ))}
      {/* distant space station */}
      <g transform="translate(700 420)" opacity={0.9}>
        <rect x={-120} y={-14} width={80} height={28} fill="#4c6ef5" />
        <rect x={40} y={-14} width={80} height={28} fill="#4c6ef5" />
        <rect x={-40} y={-5} width={80} height={10} fill="#c7cbe0" />
        <circle r={28} fill="#e9ecff" />
        <circle r={10} fill="#5aa9ff" />
      </g>
    </g>
  );
}

function PixelArcade() {
  const brick = (x: number, y: number, w: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={w} height={48} fill="#c8693a" />
      {Array.from({ length: Math.ceil(w / 48) }).map((_, i) => (
        <path key={i} d={`M${x + i * 48} ${y} v48 M${x} ${y + 24} h${w}`} stroke="#8a3f1c" strokeWidth={4} />
      ))}
    </g>
  );
  return (
    <g shapeRendering="crispEdges">
      <rect width={SCENE_W} height={SCENE_H} fill="#6fb5ff" />
      {/* pixel clouds */}
      {[
        [160, 120],
        [820, 80],
        [1280, 170],
      ].map(([x, y], i) => (
        <g key={i} fill="#fff">
          <rect x={x} y={y + 24} width={192} height={48} />
          <rect x={x + 24} y={y} width={72} height={24} />
          <rect x={x + 96} y={y - 12} width={72} height={36} />
        </g>
      ))}
      {/* pixel hills */}
      <path d="M0 760 h80 v-48 h48 v-48 h96 v-48 h96 v48 h48 v48 h48 v48 h80 Z" fill="#43c463" />
      <path d="M900 760 h64 v-48 h64 v-96 h128 v96 h64 v48 h64 Z" fill="#37a955" />
      {/* castle */}
      <g transform="translate(1240 340)">
        <rect x={0} y={120} width={300} height={300} fill="#9aa3bd" />
        <rect x={-40} y={40} width={90} height={380} fill="#8a92ad" />
        <rect x={250} y={40} width={90} height={380} fill="#8a92ad" />
        {[-40, 0, 250, 290].map((x) => (
          <rect key={x} x={x} y={10} width={40} height={30} fill="#8a92ad" />
        ))}
        <rect x={110} y={290} width={80} height={130} fill="#3a2a1a" />
        <rect x={130} y={170} width={40} height={50} fill="#2b2a6b" />
        <rect x={-6} y={-60} width={8} height={70} fill="#3a3355" />
        <rect x={2} y={-60} width={44} height={28} fill="#ff5a5f" />
      </g>
      {/* floating platforms + blocks */}
      {brick(320, 520, 240)}
      {brick(760, 420, 192)}
      {[608, 656].map((x) => (
        <g key={x}>
          <rect x={x} y={520} width={48} height={48} fill="#ffc531" />
          <rect x={x + 18} y={530} width={12} height={20} fill="#c97b00" />
          <rect x={x + 18} y={554} width={12} height={8} fill="#c97b00" />
        </g>
      ))}
      {/* coins */}
      {[380, 440, 500, 800, 860, 920].map((x, i) => (
        <g key={x}>
          <rect x={x} y={i < 3 ? 456 : 356} width={24} height={36} fill="#ffd23f" />
          <rect x={x + 8} y={i < 3 ? 464 : 364} width={8} height={20} fill="#e8a400" />
        </g>
      ))}
      {/* ground */}
      <rect x={0} y={760} width={SCENE_W} height={240} fill="#c8693a" />
      {Array.from({ length: 34 }).map((_, i) => (
        <path key={i} d={`M${i * 48} 760 v240`} stroke="#8a3f1c" strokeWidth={4} />
      ))}
      {[808, 856, 904, 952].map((y) => (
        <path key={y} d={`M0 ${y} H${SCENE_W}`} stroke="#8a3f1c" strokeWidth={4} />
      ))}
      <rect x={0} y={760} width={SCENE_W} height={16} fill="#43c463" />
      {/* tower pipes (original, not warp pipes) */}
      <g>
        <rect x={120} y={640} width={96} height={120} fill="#7a5cff" />
        <rect x={108} y={616} width={120} height={36} fill="#9b82ff" />
      </g>
    </g>
  );
}

export function SceneBackground({ id, u }: { id: SceneId; u: string }) {
  if (id === 'dino') return <DinoIsland u={u} />;
  if (id === 'space') return <SpaceExplorer u={u} />;
  return <PixelArcade />;
}

export function SceneThumb({ id, className }: { id: SceneId; className?: string }) {
  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <SceneBackground id={id} u={`thumb-${id}`} />
    </svg>
  );
}
