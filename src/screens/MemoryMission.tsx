import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { StickerSvg } from '../art/stickers';
import { Mascot } from '../components/Mascot';
import { MarkedText } from '../components/MarkedText';
import { QuestionRunner, type ItemResult } from '../components/QuestionRunner';
import { Button, Card, Screen, TopBar } from '../components/ui';
import { buildMemoryMission, completeMemoryMission, recordReview } from '../engine/review';
import { now } from '../lib/clock';
import { go, routes } from '../lib/router';
import { useSession } from '../lib/session';
import { act, useAppState } from '../store/game';

/** Short spaced-review mini-game for previously mastered words. Misses never remove anything. */
export function MemoryMission() {
  const s = useAppState();
  const complete = useSession((x) => x.complete);
  const mission = useMemo(() => buildMemoryMission(s, now()), []);
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState<ItemResult[] | null>(null);

  const refresher = (wordId: string) => {
    const w = s.curriculum.words[wordId];
    if (!w) return null;
    return (
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-3" data-testid="review-refresher">
        <div className="h-16 w-16 shrink-0">
          <StickerSvg id={w.stickerId} label={w.text} />
        </div>
        <div>
          <p className="font-display text-lg font-semibold">
            Remember: {w.text} = {w.definition.toLowerCase()}
          </p>
          <p className="text-ink-soft">
            <MarkedText text={w.examples[0] ?? ''} />
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1446] to-[#3b2a86] text-ink">
      <TopBar title="🧠 Memory Mission" onBack={() => go(routes.home())} />
      <Screen className="flex flex-col gap-5">
        {mission.questions.length === 0 ? (
          <Card className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
            <div className="text-6xl">🛰️</div>
            <h2 className="text-2xl font-bold">No missions right now</h2>
            <p className="text-lg">All your words are safe. Check back another day!</p>
            <Button onClick={() => go(routes.home())}>Home</Button>
          </Card>
        ) : results ? (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Card className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center" data-testid="mission-complete">
              <motion.div className="text-7xl" initial={{ y: 40 }} animate={{ y: -10 }} transition={{ type: 'spring', stiffness: 80 }} aria-hidden>
                🚀
              </motion.div>
              <h2 className="text-3xl font-bold text-grape">Mission complete!</h2>
              <p className="text-xl">
                You remembered {results.filter((r) => r.firstAnswer === r.question.answerIndex).length} of {results.length} words.
                {results.some((r) => r.firstAnswer !== r.question.answerIndex) && ' The tricky ones will come back soon for another try — that’s how memories get stronger!'}
              </p>
              <Button size="lg" variant="good" onClick={() => go(routes.home())} data-testid="mission-home">
                Back to base
              </Button>
            </Card>
          </motion.div>
        ) : !started ? (
          <Card className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
            <Mascot>Some words from past adventures are floating in space. Remember them to beam them home!</Mascot>
            <p className="text-xl">{mission.questions.length} quick questions.</p>
            <Button size="xl" variant="space" onClick={() => setStarted(true)} data-testid="begin-mission">
              Launch! 🚀
            </Button>
          </Card>
        ) : (
          <QuestionRunner
            questions={mission.questions}
            mode="review"
            finishLabel="Finish mission"
            refresher={(q) => refresher(q.wordId)}
            onItemDone={(r) => act((d, t) => recordReview(d, r.question.wordId, r.firstAnswer === r.question.answerIndex, t, r.question.key))}
            onFinish={(rs) => {
              act((d, t) => completeMemoryMission(d, t));
              complete();
              setResults(rs);
            }}
          />
        )}
      </Screen>
    </div>
  );
}
