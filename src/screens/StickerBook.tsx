import { useMemo, useState } from 'react';
import { StickerSvg } from '../art/stickers';
import { Button, Modal, Pill, Screen, TopBar, THEME } from '../components/ui';
import type { StickerDef } from '../data/types';
import { sortedWeeks, weekOfWord, weekProgress } from '../engine/progress';
import { stickerCatalog } from '../engine/rewards';
import { go, routes } from '../lib/router';
import { useAppState } from '../store/game';

export function StickerBook() {
  const s = useAppState();
  const catalog = useMemo(() => stickerCatalog(s), [s.curriculum]);
  const [open, setOpen] = useState<StickerDef | null>(null);
  const weeks = sortedWeeks(s);
  const ownedCount = Object.keys(s.stickers).length;
  const special = catalog.filter((c) => c.kind !== 'word');
  const achievements = Object.values(s.achievements).sort((a, b) => (a.earnedAt ?? 0) - (b.earnedAt ?? 0));

  return (
    <div className="paper-bg min-h-screen">
      <TopBar title="📒 Sticker Book" onBack={() => go(routes.home())} right={<Pill className="bg-grape text-white">{ownedCount} / {catalog.length}</Pill>} />
      <Screen className="flex flex-col gap-8">
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        {weeks.map((w) => {
          const items = catalog.filter((c) => c.kind === 'word' && w.wordIds.includes(c.sourceId));
          if (!items.length) return null;
          const unlocked = weekProgress(s, w.id).unlocked;
          return (
            <section key={w.id} aria-labelledby={`sb-${w.id}`}>
              <h2 id={`sb-${w.id}`} className={`mb-3 text-2xl font-semibold ${THEME[w.theme].text}`}>
                {THEME[w.theme].emoji} Week {w.number}: {w.title}
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {items.map((c) => (
                  <StickerTile key={c.id} def={c} owned={Boolean(s.stickers[c.id])} label={unlocked ? c.name : '???'} onOpen={() => setOpen(c)} />
                ))}
              </div>
            </section>
          );
        })}
        </div>

        <section aria-labelledby="sb-special">
          <h2 id="sb-special" className="mb-3 text-2xl font-semibold">
            🏆 Special stickers
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {special.map((c) => (
              <StickerTile key={c.id} def={c} owned={Boolean(s.stickers[c.id])} label={c.name} onOpen={() => setOpen(c)} />
            ))}
          </div>
        </section>

        {achievements.length > 0 && (
          <section aria-labelledby="sb-ach">
            <h2 id="sb-ach" className="mb-3 text-2xl font-semibold">
              🏅 Achievements
            </h2>
            <ul className="flex flex-wrap gap-3">
              {achievements.map((a) => (
                <li key={a.id} className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_4px_0_rgba(43,35,64,0.08)]">
                  <span className="text-3xl" aria-hidden>
                    🏅
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold">{a.title}</p>
                    <p className="text-sm text-ink-soft">{a.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Screen>
      <StickerDetail def={open} onClose={() => setOpen(null)} />
    </div>
  );
}

function StickerTile({ def, owned, label, onOpen }: { def: StickerDef; owned: boolean; label: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`btn-3d flex flex-col items-center gap-1 rounded-3xl p-2 ${owned ? 'bg-white' : 'bg-ink/5'}`}
      data-testid={`sticker-${def.id}`}
      data-owned={owned}
      aria-label={`${owned ? '' : 'Locked: '}${label} sticker`}
    >
      <div className="aspect-square w-full">
        <StickerSvg id={def.id} label={def.name} variant={owned ? 'sticker' : 'silhouette'} />
      </div>
      <span className={`font-display text-base font-semibold ${owned ? '' : 'text-ink-soft'}`}>{owned ? def.name : label}</span>
    </button>
  );
}

function StickerDetail({ def, onClose }: { def: StickerDef | null; onClose: () => void }) {
  const s = useAppState();
  if (!def) return <Modal open={false}>{null}</Modal>;
  const own = s.stickers[def.id];
  const word = def.kind === 'word' ? s.curriculum.words[def.sourceId] : null;
  const week = word ? weekOfWord(s, word.id) : s.curriculum.weeks.find((w) => w.id === def.sourceId);
  const unlockedWeek = week ? weekProgress(s, week.id).unlocked : false;
  const how = !own
    ? word
      ? 'Learn this word to unlock it!'
      : def.kind === 'week'
        ? 'Master every word in this week to unlock it!'
        : def.description
    : own.source === 'parent-confirmed'
      ? 'Earned before Word Quest began. Confirmed by a grown-up.'
      : own.source === 'parent-override'
        ? 'Unlocked by a grown-up.'
        : `Earned ${own.unlockedAt ? new Date(own.unlockedAt).toLocaleDateString([], { month: 'long', day: 'numeric' }) : ''}!`;

  return (
    <Modal open onClose={onClose} labelledBy="sticker-title">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="h-48 w-48">
          <StickerSvg id={def.id} label={def.name} variant={own ? 'sticker' : 'silhouette'} />
        </div>
        <h2 id="sticker-title" className="text-3xl font-bold">
          {own || unlockedWeek ? def.name : '???'}
        </h2>
        {word && (own || unlockedWeek) && <p className="text-xl">{own ? `“${word.text}” — ${word.definition}` : `Unlocked by the word “${word.text}”.`}</p>}
        {!word && <p className="text-lg text-ink-soft">{def.description}</p>}
        <p className="font-semibold text-grape">{how}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {word && week && unlockedWeek && (
            <Button
              variant="primary"
              onClick={() => {
                onClose();
                go(routes.discover(week.id, word.id));
              }}
            >
              🔍 Replay this word
            </Button>
          )}
          {week && unlockedWeek && (
            <Button
              variant="secondary"
              onClick={() => {
                onClose();
                go(routes.week(week.id));
              }}
            >
              Practice games
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
