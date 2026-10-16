import { useMemo, useState } from 'react';
import { Mascot } from '../components/Mascot';
import { QuestionRunner, type ItemResult } from '../components/QuestionRunner';
import { describeNextStep } from '../components/nextStep';
import { Button, Card, Screen, TopBar } from '../components/ui';
import { activityInfo, buildQuestionRound, buildRefresher } from '../engine/activities';
import { findWeek, nextStep, recordActivity } from '../engine/progress';
import { now } from '../lib/clock';
import { go, routes } from '../lib/router';
import { useSession } from '../lib/session';
import { act, useAppState } from '../store/game';
import { NotFound } from './NotFound';

type Kind = 'choose' | 'story' | 'detective' | 'refresher';

const INTRO: Record<Kind, string> = {
  choose: 'Pick the meaning that fits each word. Read every choice!',
  story: 'Each story is missing a word. Which word makes it make sense?',
  detective: 'Be a word detective! Use the clues around the word to crack each case.',
  refresher: 'A quick warm-up for the words that were tricky. You’ve got this!',
};

export function PracticeScreen({ weekId, kind }: { weekId: string; kind: Kind }) {
  const s = useAppState();
  const week = findWeek(s, weekId);
  const complete = useSession((x) => x.complete);
  const [round, setRound] = useState(0);
  const [done, setDone] = useState<ItemResult[] | null>(null);

  // Build once per round; the state used here is a snapshot so answers don't reshuffle the round.
  const questions = useMemo(() => {
    if (!week) return [];
    return kind === 'refresher' ? buildRefresher(s, week) : buildQuestionRound(s, week, kind);
  }, [weekId, kind, round]);

  if (!week) return <NotFound />;
  const info = kind === 'refresher' ? { title: 'Quick Refresher', icon: '✨' } : activityInfo(kind)!;

  if (done) {
    const firstTry = done.filter((r) => r.firstTry).length;
    const step = nextStep(s, week, now());
    const ns = describeNextStep(s, week, step);
    return (
      <div className="paper-bg min-h-screen">
        <TopBar title={`${info.icon} ${info.title}`} theme={week.theme} onBack={() => go(routes.week(week.id))} />
        <Screen>
          <Card className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center" data-testid="round-complete">
            <div className="text-6xl" aria-hidden>
              🌟
            </div>
            <h2 className="text-3xl font-bold text-grape">Round complete!</h2>
            <p className="text-xl">
              You practiced {done.length} {done.length === 1 ? 'word' : 'words'}
              {firstTry === done.length ? ' and got every one on the first try!' : '. Every mistake helps your brain learn!'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="secondary" onClick={() => go(routes.week(week.id))}>
                Back to {week.title}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setDone(null);
                  setRound((r) => r + 1);
                }}
              >
                Play again
              </Button>
              {ns.route && step.kind !== 'done' && (
                <Button size="lg" variant={week.theme} icon={ns.icon} onClick={() => go(ns.route!)} data-testid="next-step">
                  {ns.label}
                </Button>
              )}
            </div>
          </Card>
        </Screen>
      </div>
    );
  }

  return (
    <div className="paper-bg min-h-screen">
      <TopBar title={`${info.icon} ${info.title}`} theme={week.theme} onBack={() => go(routes.week(week.id))} />
      <Screen className="flex flex-col gap-4">
        <Mascot>{INTRO[kind]}</Mascot>
        {questions.length === 0 ? (
          <Card className="text-center text-xl">
            Nothing to practice here right now.{' '}
            <Button variant="secondary" onClick={() => go(routes.week(week.id))}>
              Back
            </Button>
          </Card>
        ) : (
          <QuestionRunner
            key={round}
            questions={questions}
            mode="practice"
            onItemDone={(r) =>
              act((d, t) => recordActivity(d, r.question.wordId, kind === 'refresher' ? 'refresher' : kind, t, { firstTry: r.firstTry, itemKey: r.question.key }))
            }
            onFinish={(results) => {
              complete();
              setDone(results);
            }}
          />
        )}
      </Screen>
    </div>
  );
}
