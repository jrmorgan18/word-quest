import { useEffect, useRef, useState } from 'react';
import { PipArt } from '../components/Mascot';
import { Screen, TopBar } from '../components/ui';
import { currentWeek, sortedWeeks, weekProgress } from '../engine/progress';
import { go, routes } from '../lib/router';
import { useAppState } from '../store/game';
import type { Theme } from '../data/types';

const THEME_FILL: Record<Theme, { node: string; band: string; icon: string }> = {
  dino: { node: '#23935e', band: '#dcf6e6', icon: '🦖' },
  space: { node: '#4b3fc7', band: '#e4e2ff', icon: '🪐' },
  arcade: { node: '#d93a41', band: '#ffe3e3', icon: '👾' },
};

const XS = [230, 500, 770, 500];
const STEP = 170;

export function MapScreen() {
  const s = useAppState();
  const weeks = sortedWeeks(s);
  const cur = currentWeek(s);
  const [msg, setMsg] = useState('');
  const curRef = useRef<SVGGElement>(null);
  const H = 140 + weeks.length * STEP;
  const pts = weeks.map((_, i) => [XS[i % XS.length], 110 + i * STEP] as const);

  useEffect(() => {
    curRef.current?.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
  }, []);

  let d = `M${pts[0]?.[0] ?? 0} ${pts[0]?.[1] ?? 0}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    d += ` C${x0} ${y0 + STEP * 0.55} ${x1} ${y1 - STEP * 0.55} ${x1} ${y1}`;
  }

  return (
    <div className="paper-bg min-h-screen">
      <TopBar title="Adventure Map 🗺️" onBack={() => go(routes.home())} />
      <Screen>
        <p className="mb-2 text-center text-lg text-ink-soft" aria-live="polite">
          {msg || 'Tap a world to visit it. Conquered worlds have a golden flag!'}
        </p>
        <div className="mx-auto max-w-2xl">
          <svg viewBox={`0 0 1000 ${H}`} className="w-full" role="list" aria-label="Weeks">
            <defs>
              <clipPath id="map-bands">
                <rect x={20} y={110 - STEP / 2} width={960} height={weeks.length * STEP} rx={40} />
              </clipPath>
            </defs>
            <g clipPath="url(#map-bands)">
              {weeks.map((w, i) => (
                <rect key={w.id} x={20} y={110 + i * STEP - STEP / 2} width={960} height={STEP} fill={THEME_FILL[w.theme].band} opacity={0.6} />
              ))}
            </g>
            <path d={d} stroke="#c9b9a0" strokeWidth={30} fill="none" strokeLinecap="round" />
            <path d={d} stroke="#fff" strokeWidth={6} strokeDasharray="4 22" fill="none" strokeLinecap="round" />
            {weeks.map((w, i) => {
              const [x, y] = pts[i];
              const wp = weekProgress(s, w.id);
              const done = wp.mastered;
              const isCur = cur?.id === w.id && !done;
              const locked = !wp.unlocked;
              const fill = locked ? '#b9b3c9' : THEME_FILL[w.theme].node;
              const labelRight = x < 500 || (x === 500 && i % 4 === 1);
              const tx = labelRight ? x + 90 : x - 90;
              return (
                <g
                  key={w.id}
                  ref={isCur ? curRef : undefined}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`Week ${w.number}: ${w.title}. ${done ? 'Conquered' : locked ? 'Locked' : isCur ? 'Current adventure' : 'Open'}`}
                  data-testid={`map-week-${w.number}`}
                  data-state={done ? 'done' : locked ? 'locked' : isCur ? 'current' : 'open'}
                  style={{ cursor: 'pointer', outline: 'none' }}
                  onClick={() => (locked ? setMsg(`Week ${w.number} is locked. Finish the week before it to unlock!`) : go(routes.week(w.id)))}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (locked ? setMsg(`Week ${w.number} is locked.`) : go(routes.week(w.id)))}
                >
                  {isCur && <circle cx={x} cy={y} r={84} fill="none" stroke="#ffc531" strokeWidth={10} strokeDasharray="18 12" className="animate-gentle-pulse" style={{ transformOrigin: `${x}px ${y}px` }} />}
                  <circle cx={x} cy={y + 8} r={64} fill="#2b2340" opacity={0.18} />
                  <circle cx={x} cy={y} r={64} fill={fill} stroke="#fff" strokeWidth={8} />
                  <text x={x} y={y + 18} textAnchor="middle" fontSize={54} aria-hidden>
                    {locked ? '🔒' : THEME_FILL[w.theme].icon}
                  </text>
                  {done && (
                    <g aria-hidden>
                      <rect x={x + 30} y={y - 92} width={6} height={56} fill="#6b5a4e" />
                      <path d={`M${x + 36} ${y - 90} h44 l-10 13 l10 13 h-44Z`} fill="#ffc531" stroke="#c99400" strokeWidth={3} />
                      <circle cx={x - 46} cy={y - 46} r={22} fill="#1d8f4e" stroke="#fff" strokeWidth={5} />
                      <path d={`M${x - 56} ${y - 46} l7 8 l14 -16`} stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />
                    </g>
                  )}
                  <text x={tx} y={y - 8} textAnchor={labelRight ? 'start' : 'end'} fontFamily="Fredoka Variable, sans-serif" fontSize={30} fontWeight={600} fill="#5c5470">
                    Week {w.number}
                  </text>
                  <text x={tx} y={y + 30} textAnchor={labelRight ? 'start' : 'end'} fontFamily="Fredoka Variable, sans-serif" fontSize={38} fontWeight={700} fill={locked ? '#8d86a0' : '#2b2340'}>
                    {w.title}
                  </text>
                  {isCur && (
                    <foreignObject x={labelRight ? x - 150 : x + 70} y={y - 60} width={90} height={90} aria-hidden>
                      <PipArt className="h-full w-full" />
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </Screen>
    </div>
  );
}
