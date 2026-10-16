import { StickerSvg } from '../art/stickers';
import { Mascot } from '../components/Mascot';
import { describeNextStep, whenText } from '../components/nextStep';
import { Button, Card, Pill, Screen, TopBar, THEME } from '../components/ui';
import { ACTIVITIES } from '../engine/activities';
import { delayedCheckAvailable, findWeek, nextStep, practiceDone, quizGate, weekProgress, weekWords, wordProgress, wordStatus } from '../engine/progress';
import { latestAttempt } from '../engine/quiz';
import { PRACTICE_ACTIVITIES, type PracticeActivity } from '../engine/types';
import { now } from '../lib/clock';
import { go, routes } from '../lib/router';
import { useAppState } from '../store/game';
import { STATUS_UI } from './Home';
import { NotFound } from './NotFound';

export function WeekScreen({ weekId }: { weekId: string }) {
  const s = useAppState();
  const week = findWeek(s, weekId);
  if (!week) return <NotFound />;
  const t = now();
  const wp = weekProgress(s, week.id);
  const th = THEME[week.theme];
  const words = weekWords(s, week);

  if (!wp.unlocked) {
    return (
      <div className="paper-bg min-h-screen">
        <TopBar title={`Week ${week.number}`} onBack={() => go(routes.map())} />
        <Screen className="flex flex-col items-center gap-4 pt-10 text-center">
          <span className="text-7xl" aria-hidden>
            🔒
          </span>
          <h2 className="text-3xl font-bold">{week.title} is locked</h2>
          <p className="text-xl text-ink-soft">Finish the week before it to unlock this adventure!</p>
          <Button onClick={() => go(routes.map())}>Back to the map</Button>
        </Screen>
      </div>
    );
  }

  const gate = quizGate(s, week);
  const step = nextStep(s, week, t);
  const ns = describeNextStep(s, week, step);
  const initialAttempt = latestAttempt(s, week.id, 'initial');
  const delayedAttempt = latestAttempt(s, week.id, 'delayed');
  const delayedReady = delayedCheckAvailable(s, week.id, t);
  const historical = wp.completionSource === 'parent-confirmed';

  const activityCount = (a: PracticeActivity | 'creative') =>
    words.filter((w) => wordProgress(s, w.id).activityHistory.some((r) => r.activity === a)).length;

  return (
    <div className="paper-bg min-h-screen">
      <TopBar title={`Week ${week.number} · ${week.title}`} theme={week.theme} onBack={() => go(routes.home())} />
      <Screen className="flex flex-col gap-6">
        <section className={`rounded-[2rem] bg-gradient-to-br ${th.grad} p-5 sm:p-7`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <Pill className={`${th.bg} text-white`}>
                {th.emoji} {th.name}
              </Pill>
              <p className="mt-2 text-xl">{week.tagline}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-20 w-20 shrink-0">
                  <StickerSvg id={week.rewardStickerId} variant={s.stickers[week.rewardStickerId] ? 'sticker' : 'silhouette'} />
                </div>
                <p className="font-display text-lg font-semibold text-ink-soft">
                  {s.stickers[week.rewardStickerId] ? 'Week reward earned!' : 'Conquer this week to win a giant special sticker!'}
                </p>
              </div>
              {wp.mastered && (
                <p className="mt-2 font-display text-2xl font-semibold text-good" data-testid="week-conquered">
                  🏆 Conquered! {historical ? 'You learned these words before Word Quest began.' : 'Replay anything you like.'}
                </p>
              )}
            </div>
            {!wp.mastered && (
              <div className="flex flex-col gap-3 md:w-80">
                <Mascot>{ns.detail}</Mascot>
                {ns.route ? (
                  <Button size="lg" variant={week.theme} icon={ns.icon} onClick={() => go(ns.route!)} data-testid="week-continue">
                    {ns.label}
                  </Button>
                ) : (
                  <p className="rounded-2xl bg-white/80 p-3 text-center font-display text-lg font-semibold">
                    {ns.icon} {ns.label}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="words-title">
          <h2 id="words-title" className="mb-3 text-2xl font-semibold">
            This week’s words
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {words.map((w) => {
              const p = wordProgress(s, w.id);
              const st = STATUS_UI[wordStatus(p)];
              const done = practiceDone(p);
              const owned = Boolean(s.stickers[w.stickerId]);
              return (
                <Card key={w.id} className="flex flex-col gap-3" data-testid={`word-card-${w.id}`}>
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-2xl font-bold lg:text-3xl">{w.text}</h3>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-sm font-bold ${st.cls}`} data-testid="word-status">
                        {st.icon} {st.label}
                      </span>
                    </div>
                    <div className="h-16 w-16 shrink-0">
                      <StickerSvg id={w.stickerId} label={w.text} variant={owned ? 'sticker' : 'silhouette'} />
                    </div>
                  </div>
                  {p.exploredAt || p.mastered ? <p className="text-ink-soft">{w.definition}</p> : <p className="text-ink-soft">Tap Discover to meet this word!</p>}
                  {!p.mastered && (
                    <div className="flex gap-1" aria-label={`${done.size} of 4 practice games done`}>
                      {PRACTICE_ACTIVITIES.map((a) => (
                        <span key={a} title={a} className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${done.has(a) ? 'bg-good-light' : 'bg-ink/5 grayscale opacity-50'}`}>
                          {ACTIVITIES.find((x) => x.id === a)?.icon}
                        </span>
                      ))}
                    </div>
                  )}
                  <Button variant={p.exploredAt || p.mastered ? 'secondary' : week.theme} onClick={() => go(routes.discover(week.id, w.id))} icon="🔍">
                    {p.exploredAt || p.mastered ? 'Look again' : 'Discover'}
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="games-title">
          <h2 id="games-title" className="mb-3 text-2xl font-semibold">
            Practice games
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {ACTIVITIES.filter((a) => a.id !== 'discovery').map((a) => {
              const n = activityCount(a.id as PracticeActivity | 'creative');
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => go(routes.play(week.id, a.id))}
                  className="btn-3d flex min-h-36 flex-col items-start gap-1 rounded-3xl bg-white p-4 text-left"
                  data-testid={`activity-${a.id}`}
                >
                  <span className="text-4xl" aria-hidden>
                    {a.icon}
                  </span>
                  <span className="font-display text-xl font-semibold leading-tight">{a.title}</span>
                  <span className="text-sm text-ink-soft">{a.blurb}</span>
                  <span className="mt-auto text-sm font-bold text-grape">
                    {n > 0 ? `✓ ${n}/${words.length} words` : a.countsForQuiz ? 'Not played yet' : 'Bonus!'}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {!historical && (
          <section className="grid gap-4 md:grid-cols-2" aria-label="Quizzes">
            <Card className="flex flex-col gap-3" data-testid="quiz-card">
              <h2 className="text-2xl font-semibold">🏁 Weekly Quiz</h2>
              {wp.initialPassedAt ? (
                <p className="text-lg text-good">
                  ⭐ Passed! {initialAttempt?.passed ? `${initialAttempt.score} of ${initialAttempt.total} correct.` : ''}
                </p>
              ) : gate.unlocked ? (
                <>
                  <p className="text-lg">You’re ready! 9 questions. Take your time — there’s no timer.</p>
                  {initialAttempt && !initialAttempt.passed && <p className="text-ink-soft">Last try: {initialAttempt.score} of {initialAttempt.total}. A new set of questions is waiting!</p>}
                  <Button size="lg" variant="good" onClick={() => go(routes.quiz(week.id, 'initial'))} data-testid="start-initial-quiz">
                    Start the quiz
                  </Button>
                </>
              ) : (
                <ul className="flex flex-col gap-2 text-lg" aria-label="Quiz checklist">
                  <li>{gate.unexplored.length ? '⬜' : '✅'} Discover all {words.length} words</li>
                  {words.map((w) => {
                    const need = gate.practiceNeeded[w.id] ?? 0;
                    return (
                      <li key={w.id}>
                        {need ? '⬜' : '✅'} Play {s.config.practiceActivitiesPerWord} different games with “{w.text}”
                        {need ? ` (${s.config.practiceActivitiesPerWord - need}/${s.config.practiceActivitiesPerWord})` : ''}
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
            <Card className="flex flex-col gap-3" data-testid="delayed-card">
              <h2 className="text-2xl font-semibold">🧠 Memory Check</h2>
              {wp.delayedPassedAt ? (
                <p className="text-lg text-good">🏆 Passed! These words are mastered.</p>
              ) : !wp.initialPassedAt ? (
                <p className="text-lg text-ink-soft">After you pass the Weekly Quiz, come back the next day for a short Memory Check. Sleeping helps your brain keep new words!</p>
              ) : delayedReady ? (
                <>
                  <p className="text-lg">Ready! Six quick questions to lock in your words.</p>
                  {delayedAttempt && !delayedAttempt.passed && <p className="text-ink-soft">Last try: {delayedAttempt.score} of {delayedAttempt.total}.</p>}
                  <Button size="lg" variant="space" onClick={() => go(routes.quiz(week.id, 'delayed'))} data-testid="start-delayed-quiz">
                    Start Memory Check
                  </Button>
                </>
              ) : (
                <p className="text-lg" data-testid="delayed-wait">
                  🌙 Opens {whenText(wp.delayedAvailableAt ?? t, t)}. Until then, try a Creative Challenge or decorate a world!
                </p>
              )}
            </Card>
          </section>
        )}
      </Screen>
    </div>
  );
}
