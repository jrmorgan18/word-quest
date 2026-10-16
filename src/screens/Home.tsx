import { useMemo } from 'react';
import { motion } from 'motion/react';
import { SceneThumb, SCENE_INFO } from '../art/scenes';
import { StickerSvg } from '../art/stickers';
import { Mascot } from '../components/Mascot';
import { describeNextStep, whenText } from '../components/nextStep';
import { Button, Card, IconButton, Pill, Screen, SoundToggle, THEME } from '../components/ui';
import { countLearned, currentWeek, nextStep, sortedWeeks, weekProgress, weekWords, wordProgress, wordStatus, type WordStatus } from '../engine/progress';
import { dueReviewWordIds } from '../engine/review';
import { stickerCatalog } from '../engine/rewards';
import { SCENE_IDS } from '../engine/seed';
import { now } from '../lib/clock';
import { go, routes } from '../lib/router';
import { atStoppingPoint, useSession } from '../lib/session';
import { useAppState } from '../store/game';

export const STATUS_UI: Record<WordStatus, { icon: string; label: string; cls: string }> = {
  new: { icon: '✨', label: 'New', cls: 'bg-sun-light text-ink' },
  explored: { icon: '🔍', label: 'Discovered', cls: 'bg-grape-light text-grape-dark' },
  practicing: { icon: '💪', label: 'Practicing', cls: 'bg-[#e0f0ff] text-[#1f5fa8]' },
  learned: { icon: '⭐', label: 'Learned', cls: 'bg-good-light text-good' },
  mastered: { icon: '🏆', label: 'Mastered', cls: 'bg-good text-white' },
};

export function Home() {
  const s = useAppState();
  const session = useSession();
  const t = now();
  const week = currentWeek(s);
  const weeks = sortedWeeks(s);
  const conquered = weeks.filter((w) => weekProgress(s, w.id).mastered).length;
  const totalWords = weeks.reduce((n, w) => n + w.wordIds.length, 0);
  const learned = countLearned(s);
  const due = dueReviewWordIds(s, t);
  const catalog = useMemo(() => stickerCatalog(s), [s.curriculum]);
  const owned = Object.entries(s.stickers)
    .sort((a, b) => (b[1].unlockedAt ?? 0) - (a[1].unlockedAt ?? 0))
    .map(([id]) => catalog.find((c) => c.id === id))
    .filter(Boolean)
    .slice(0, 6);

  const step = week ? nextStep(s, week, t) : null;
  const ns = week && step ? describeNextStep(s, week, step) : null;
  const th = week ? THEME[week.theme] : THEME.dino;
  const stop = atStoppingPoint(session);

  return (
    <div className="paper-bg min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center gap-3 px-4 pt-4 sm:px-6">
        <div className="flex-1">
          <p className="font-display text-lg text-ink-soft">Hi, {s.settings.childName}!</p>
          <h1 className="font-display text-4xl font-bold text-grape sm:text-5xl">
            Word Quest<span className="ml-2 align-middle text-3xl">🗺️</span>
          </h1>
        </div>
        <SoundToggle />
        <IconButton label="Grown-ups area" onClick={() => go(routes.parent())} className="text-base font-display font-semibold">
          🔒<span className="ml-1 hidden sm:inline">Grown-ups</span>
        </IconButton>
      </header>

      <Screen className="mt-4 flex flex-col gap-5">
        {stop && (
          <Card className="flex flex-col items-start gap-3 border-4 border-good/30 bg-good-light sm:flex-row sm:items-center" data-testid="stopping-point">
            <span className="text-5xl" aria-hidden>
              🌟
            </span>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-good">Great adventuring today!</h2>
              <p className="text-lg">Your brain grows while you rest. This is a perfect place to stop — come back tomorrow for more!</p>
            </div>
            <Button variant="secondary" onClick={() => session.dismissStop()}>
              Keep playing
            </Button>
          </Card>
        )}

        {week && ns && (
          <motion.section initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} aria-labelledby="current-adventure">
            <div className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${th.grad} p-5 shadow-[0_8px_0_rgba(43,35,64,0.08)] sm:p-7`}>
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div className="flex-1">
                  <Pill className={`${th.bg} text-white`}>
                    {th.emoji} Week {week.number} · Current adventure
                  </Pill>
                  <h2 id="current-adventure" className={`mt-2 text-4xl font-bold ${th.text}`}>
                    {week.title}
                  </h2>
                  <p className="text-lg text-ink-soft">{week.tagline}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="This week's words">
                    {weekWords(s, week).map((w) => {
                      const st = STATUS_UI[wordStatus(wordProgress(s, w.id))];
                      return (
                        <li key={w.id}>
                          <button
                            type="button"
                            onClick={() => go(routes.discover(week.id, w.id))}
                            className="btn-3d flex min-h-12 items-center gap-2 rounded-2xl bg-white px-4 font-display text-xl font-semibold"
                          >
                            {w.text}
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${st.cls}`}>
                              {st.icon} {st.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex flex-col items-stretch gap-3 md:w-80">
                  <Mascot>{ns.detail}</Mascot>
                  {ns.route ? (
                    <Button size="xl" variant={week.theme} icon={ns.icon} onClick={() => go(ns.route!)} data-testid="continue">
                      {ns.label}
                    </Button>
                  ) : (
                    <div className="rounded-3xl bg-white/80 p-4 text-center font-display text-xl font-semibold" data-testid="continue-wait">
                      {ns.icon} {ns.label}
                    </div>
                  )}
                  <Button variant="secondary" onClick={() => go(routes.week(week.id))}>
                    Open {week.title}
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        <section className="grid gap-5 md:grid-cols-2" aria-label="Challenges">
          <Card className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">🧠 Memory Mission</h2>
            {due.length ? (
              <>
                <p className="text-lg">
                  {due.length === 1 ? '1 old word wants' : `${Math.min(due.length, 5)} old words want`} to be remembered. Quick and fun!
                </p>
                <Button variant="space" size="lg" onClick={() => go(routes.memory())} data-testid="memory-mission">
                  Start Memory Mission
                </Button>
              </>
            ) : (
              <p className="text-lg text-ink-soft">All your words are safe and sound. New missions appear {nextReviewText(s, t)}.</p>
            )}
          </Card>
          <Card className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">🏅 Your progress</h2>
            <div>
              <div className="flex justify-between font-display text-lg">
                <span>Weeks conquered</span>
                <span data-testid="weeks-conquered">
                  {conquered} / {weeks.length}
                </span>
              </div>
              <Meter value={conquered} max={weeks.length} color="bg-good" />
            </div>
            <div>
              <div className="flex justify-between font-display text-lg">
                <span>Words learned</span>
                <span data-testid="words-learned">
                  {learned} / {totalWords}
                </span>
              </div>
              <Meter value={learned} max={totalWords} color="bg-sun" />
            </div>
            <Button variant="secondary" onClick={() => go(routes.map())} icon="🗺️">
              Adventure Map
            </Button>
          </Card>
        </section>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="flex-1 text-2xl font-semibold">🌟 Sticker collection</h2>
            <Pill className="bg-grape-light text-grape" data-testid="sticker-count">
              {Object.keys(s.stickers).length} / {catalog.length}
            </Pill>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {owned.map((d) => (
              <div key={d!.id} className="h-24 w-24 shrink-0" title={d!.name}>
                <StickerSvg id={d!.id} label={d!.name} title={d!.name} />
              </div>
            ))}
          </div>
          <Button variant="primary" size="lg" onClick={() => go(routes.stickers())} icon="📒">
            Open Sticker Book
          </Button>
        </Card>

        <section aria-labelledby="worlds-title">
          <h2 id="worlds-title" className="mb-3 text-2xl font-semibold">
            🎨 Decorate your worlds
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SCENE_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => go(routes.decorate(id))}
                className="btn-3d overflow-hidden rounded-3xl bg-white text-left"
                data-testid={`world-${id}`}
              >
                <SceneThumb id={id} className="aspect-[16/10] w-full" />
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-display text-xl font-semibold">
                    {SCENE_INFO[id].emoji} {SCENE_INFO[id].title}
                  </span>
                  <span className="text-sm font-bold text-ink-soft">{s.scenes[id].placements.length} stickers</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </Screen>
    </div>
  );
}

function nextReviewText(s: ReturnType<typeof useAppState>, t: number): string {
  const times = Object.values(s.wordProgress)
    .filter((p) => p.review)
    .map((p) => p.review!.dueAt);
  if (!times.length) return 'after you master your next week';
  return whenText(Math.min(...times), t);
}

export function Meter({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mt-1 h-5 overflow-hidden rounded-full bg-ink/10" role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      <motion.div className={`h-full rounded-full ${color}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
    </div>
  );
}
