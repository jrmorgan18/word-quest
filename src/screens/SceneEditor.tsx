import { memo, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { SceneBackground, SceneThumb, SCENE_H, SCENE_INFO, SCENE_W } from '../art/scenes';
import { StickerSvg } from '../art/stickers';
import { Button, ConfirmDialog, IconButton, Screen, TopBar } from '../components/ui';
import { stickerCatalog } from '../engine/rewards';
import { flipSticker, moveSticker, placeSticker, removePlacement, resetScene, resizeSticker, restack } from '../engine/scenes';
import { SCENE_IDS } from '../engine/seed';
import type { SceneId, StickerPlacement } from '../engine/types';
import { go, routes } from '../lib/router';
import { play } from '../lib/sound';
import { act, useAppState } from '../store/game';
import { exportSceneImage } from './sceneExport';

const BASE = 200;

export function ScenePicker() {
  const s = useAppState();
  return (
    <div className="paper-bg min-h-screen">
      <TopBar title="🎨 Decorate a world" onBack={() => go(routes.home())} />
      <Screen className="grid gap-4 sm:grid-cols-3">
        {SCENE_IDS.map((id) => (
          <button key={id} type="button" onClick={() => go(routes.decorate(id))} className="btn-3d overflow-hidden rounded-3xl bg-white text-left">
            <SceneThumb id={id} className="aspect-[16/10] w-full" />
            <div className="px-4 py-3 font-display text-xl font-semibold">
              {SCENE_INFO[id].emoji} {SCENE_INFO[id].title} <span className="text-sm text-ink-soft">({s.scenes[id].placements.length})</span>
            </div>
          </button>
        ))}
      </Screen>
    </div>
  );
}

const PlacedSticker = memo(function PlacedSticker({
  p,
  baseScale,
  label,
  selected,
  x,
  y,
  onDown,
}: {
  p: StickerPlacement;
  baseScale: number;
  label: string;
  selected: boolean;
  x: number;
  y: number;
  onDown: (e: RPointerEvent<SVGGElement>, p: StickerPlacement) => void;
}) {
  const size = BASE * p.scale * baseScale;
  const cx = x * SCENE_W;
  const cy = y * SCENE_H;
  return (
    <g
      data-testid="placed-sticker"
      data-sticker={p.stickerId}
      role="button"
      aria-label={`${label} sticker${selected ? ', selected' : ''}`}
      aria-pressed={selected}
      tabIndex={0}
      onPointerDown={(e) => onDown(e, p)}
      style={{ cursor: 'grab', outline: 'none' }}
    >
      {selected && (
        <rect data-ui="true" x={cx - size / 2 - 8} y={cy - size / 2 - 8} width={size + 16} height={size + 16} rx={24} fill="rgba(255,255,255,0.25)" stroke="#ffb300" strokeWidth={6} strokeDasharray="18 12" />
      )}
      <StickerSvg id={p.stickerId} label={label} x={cx - size / 2} y={cy - size / 2} width={size} height={size} flip={p.flip} />
    </g>
  );
});

export function SceneEditor({ sceneId }: { sceneId: SceneId }) {
  const s = useAppState();
  const scene = s.scenes[sceneId];
  const catalog = useMemo(() => stickerCatalog(s), [s.curriculum]);
  const defs = useMemo(() => new Map(catalog.map((c) => [c.id, c])), [catalog]);
  const owned = catalog.filter((c) => s.stickers[c.id]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [trayPick, setTrayPick] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ id: string; x: number; y: number; dx: number; dy: number; moved: boolean } | null>(null);
  const [ghost, setGhost] = useState<{ stickerId: string; cx: number; cy: number } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  const placements = [...scene.placements].sort((a, b) => a.layer - b.layer);
  const sel = scene.placements.find((p) => p.id === selected) ?? null;

  const toFraction = (clientX: number, clientY: number) => {
    const r = svgRef.current!.getBoundingClientRect();
    return { x: (clientX - r.left) / r.width, y: (clientY - r.top) / r.height, inside: clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom };
  };

  const place = (stickerId: string, x: number, y: number) => {
    const id = act((d, t) => placeSticker(d, sceneId, stickerId, x, y, t));
    if (id) {
      play('pop');
      setSelected(id);
    } else setToast('This world is full! Remove a sticker to add more.');
  };

  // ── Dragging placed stickers ──
  // The ref is the source of truth during a drag: pointer events can arrive faster than React
  // re-renders on a busy tablet, so reading state here could drop the sticker short of the finger.
  const dragRef = useRef<typeof drag>(null);
  const updateDrag = (d: typeof drag) => {
    dragRef.current = d;
    setDrag(d);
  };
  const onStickerDown = (e: RPointerEvent<SVGGElement>, p: StickerPlacement) => {
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    const f = toFraction(e.clientX, e.clientY);
    setSelected(p.id);
    setTrayPick(null);
    updateDrag({ id: p.id, x: p.x, y: p.y, dx: f.x - p.x, dy: f.y - p.y, moved: false });
  };
  const onCanvasMove = (e: RPointerEvent) => {
    const cur = dragRef.current;
    if (!cur) return;
    const f = toFraction(e.clientX, e.clientY);
    const x = Math.min(1, Math.max(0, f.x - cur.dx));
    const y = Math.min(1, Math.max(0, f.y - cur.dy));
    updateDrag({ ...cur, x, y, moved: cur.moved || Math.abs(x - cur.x) + Math.abs(y - cur.y) > 0.002 });
  };
  const onCanvasUp = () => {
    const cur = dragRef.current;
    if (cur?.moved) act((d, t) => moveSticker(d, sceneId, cur.id, cur.x, cur.y, t));
    updateDrag(null);
  };
  const onCanvasDown = (e: RPointerEvent) => {
    if (trayPick) {
      const f = toFraction(e.clientX, e.clientY);
      place(trayPick, f.x, f.y);
      setTrayPick(null);
    } else setSelected(null);
  };

  // ── Dragging from the tray (vertical drag; horizontal swipes still scroll the tray) ──
  const trayStart = useRef<{ id: string; x: number; y: number; dragging: boolean } | null>(null);
  const onTrayDown = (e: RPointerEvent<HTMLButtonElement>, stickerId: string) => {
    trayStart.current = { id: stickerId, x: e.clientX, y: e.clientY, dragging: false };
  };
  const onTrayMove = (e: RPointerEvent<HTMLButtonElement>) => {
    const t = trayStart.current;
    if (!t) return;
    if (!t.dragging && Math.abs(e.clientY - t.y) > 12) {
      t.dragging = true;
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    if (t.dragging) setGhost({ stickerId: t.id, cx: e.clientX, cy: e.clientY });
  };
  const onTrayUp = (e: RPointerEvent<HTMLButtonElement>) => {
    const t = trayStart.current;
    trayStart.current = null;
    setGhost(null);
    if (!t) return;
    if (t.dragging) {
      const f = toFraction(e.clientX, e.clientY);
      if (f.inside) place(t.id, f.x, f.y);
    } else {
      play('tap');
      setSelected(null);
      setTrayPick((cur) => (cur === t.id ? null : t.id));
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!sel) return;
    const step = e.shiftKey ? 0.05 : 0.01;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[e.key]) {
      e.preventDefault();
      const [dx, dy] = moves[e.key];
      act((d, t) => moveSticker(d, sceneId, sel.id, sel.x + dx, sel.y + dy, t));
    } else if (e.key === '+' || e.key === '=') act((d, t) => resizeSticker(d, sceneId, sel.id, 1.15, t));
    else if (e.key === '-') act((d, t) => resizeSticker(d, sceneId, sel.id, 1 / 1.15, t));
    else if (e.key === 'Delete' || e.key === 'Backspace') {
      act((d, t) => removePlacement(d, sceneId, sel.id, t));
      setSelected(null);
    }
  };

  const doExport = async () => {
    if (!svgRef.current) return;
    setBusy(true);
    setSelected(null);
    try {
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      const result = await exportSceneImage(svgRef.current, `${s.settings.childName}'s ${SCENE_INFO[sceneId].title}`);
      setToast(result === 'shared' ? 'Picture shared!' : 'Picture saved!');
    } catch (err) {
      console.error(err);
      setToast('Sorry, the picture could not be made on this device.');
    } finally {
      setBusy(false);
    }
  };

  const info = SCENE_INFO[sceneId];

  return (
    <div className="paper-bg min-h-screen" onKeyDown={onKey}>
      <TopBar
        title={`${info.emoji} ${info.title}`}
        onBack={() => go(routes.home())}
        right={
          <>
            <IconButton label="Save as a picture" onClick={doExport} disabled={busy} data-testid="export-scene">
              📷
            </IconButton>
            <IconButton label="Clear this world" onClick={() => setConfirmReset(true)} data-testid="reset-scene">
              🧹
            </IconButton>
          </>
        }
      />
      <Screen className="flex flex-col gap-3 lg:max-w-6xl">
        <p className="text-center text-lg text-ink-soft" aria-live="polite">
          {toast ||
            (trayPick ? '👆 Now tap anywhere in the world to place your sticker!' : sel ? 'Drag to move. Use the buttons below to change it.' : 'Tap a sticker below, then tap the world. Or drag it up into the world!')}
        </p>
        <div className="flex flex-col gap-3 landscape:lg:flex-row">
          <div className="relative w-full overflow-hidden rounded-3xl border-4 border-white shadow-[0_8px_0_rgba(43,35,64,0.1)]" style={{ touchAction: 'none' }}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
              className="block h-auto w-full select-none"
              xmlns="http://www.w3.org/2000/svg"
              data-testid="scene-canvas"
              onPointerDown={onCanvasDown}
              onPointerMove={onCanvasMove}
              onPointerUp={onCanvasUp}
              onPointerCancel={onCanvasUp}
              style={{ touchAction: 'none', cursor: trayPick ? 'copy' : 'default' }}
            >
              <SceneBackground id={sceneId} u={`scene-${sceneId}`} />
              {placements.map((p) => (
                <PlacedSticker
                  key={p.id}
                  p={p}
                  baseScale={defs.get(p.stickerId)?.baseScale ?? 1}
                  label={defs.get(p.stickerId)?.name ?? 'Sticker'}
                  selected={p.id === selected}
                  x={drag?.id === p.id ? drag.x : p.x}
                  y={drag?.id === p.id ? drag.y : p.y}
                  onDown={onStickerDown}
                />
              ))}
            </svg>
          </div>

          <div className="flex flex-col gap-3 landscape:lg:w-80 landscape:lg:shrink-0">
            {sel ? (
              <div className="grid grid-cols-3 gap-2 rounded-3xl bg-white p-3 sm:grid-cols-6 landscape:lg:grid-cols-3" role="toolbar" aria-label="Selected sticker" data-testid="sticker-toolbar">
                <ToolBtn label="Bigger" icon="➕" onClick={() => act((d, t) => resizeSticker(d, sceneId, sel.id, 1.2, t))} />
                <ToolBtn label="Smaller" icon="➖" onClick={() => act((d, t) => resizeSticker(d, sceneId, sel.id, 1 / 1.2, t))} />
                <ToolBtn label="Forward" icon="⬆️" onClick={() => act((d, t) => restack(d, sceneId, sel.id, 1, t))} />
                <ToolBtn label="Back" icon="⬇️" onClick={() => act((d, t) => restack(d, sceneId, sel.id, -1, t))} />
                <ToolBtn label="Flip" icon="↔️" onClick={() => act((d, t) => flipSticker(d, sceneId, sel.id, t))} />
                <ToolBtn
                  label="Remove"
                  icon="🗑️"
                  onClick={() => {
                    act((d, t) => removePlacement(d, sceneId, sel.id, t));
                    setSelected(null);
                  }}
                />
              </div>
            ) : trayPick ? (
              <div className="flex gap-2 rounded-3xl bg-white p-3">
                <Button className="flex-1" onClick={() => (place(trayPick, 0.5, 0.5), setTrayPick(null))} data-testid="place-center">
                  Put it in the middle
                </Button>
                <Button variant="secondary" onClick={() => setTrayPick(null)}>
                  Cancel
                </Button>
              </div>
            ) : null}

            <div className="rounded-3xl bg-white p-3">
              <h2 className="mb-2 px-1 font-display text-lg font-semibold">Your stickers ({owned.length})</h2>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar landscape:lg:grid landscape:lg:max-h-[60vh] landscape:lg:grid-cols-3 landscape:lg:overflow-y-auto" data-testid="sticker-tray">
                {owned.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    data-testid={`tray-${c.id}`}
                    aria-label={`${c.name} sticker`}
                    aria-pressed={trayPick === c.id}
                    onPointerDown={(e) => onTrayDown(e, c.id)}
                    onPointerMove={onTrayMove}
                    onPointerUp={onTrayUp}
                    onPointerCancel={() => ((trayStart.current = null), setGhost(null))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setTrayPick((cur) => (cur === c.id ? null : c.id));
                      }
                    }}
                    style={{ touchAction: 'pan-x' }}
                    className={`h-20 w-20 shrink-0 rounded-2xl p-1 ${trayPick === c.id ? 'bg-sun-light ring-4 ring-sun' : 'bg-cream'}`}
                  >
                    <StickerSvg id={c.id} label={c.name} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Screen>

      {ghost && (
        <div className="pointer-events-none fixed z-50 h-24 w-24 -translate-x-1/2 -translate-y-1/2" style={{ left: ghost.cx, top: ghost.cy }} aria-hidden>
          <StickerSvg id={ghost.stickerId} />
        </div>
      )}

      <ConfirmDialog
        open={confirmReset}
        title={`Clear ${info.title}?`}
        body="All stickers will be taken off this world. Don’t worry — you keep every sticker in your Sticker Book!"
        confirmLabel="Clear it"
        danger
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          act((d, t) => resetScene(d, sceneId, t));
          setSelected(null);
          setConfirmReset(false);
        }}
      />
    </div>
  );
}

function ToolBtn({ label, icon, onClick }: { label: string; icon: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        play('tap');
        onClick();
      }}
      className="btn-3d flex min-h-14 flex-col items-center justify-center rounded-2xl bg-cream px-2 font-display text-sm font-semibold"
      aria-label={label}
      data-testid={`tool-${label.toLowerCase()}`}
    >
      <span className="text-xl" aria-hidden>
        {icon}
      </span>
      {label}
    </button>
  );
}
