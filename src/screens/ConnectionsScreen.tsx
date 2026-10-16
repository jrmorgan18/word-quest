import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Mascot } from '../components/Mascot';
import { QuestionRunner } from '../components/QuestionRunner';
import { Button, Card, ProgressDots, Screen, SpeakButton, TopBar } from '../components/ui';
import { buildConnections, type MatchStep, type SortStep } from '../engine/activities';
import { findWeek, recordActivity } from '../engine/progress';
import { feedback } from '../lib/feedback';
import { shuffle, createRng } from '../lib/random';
import { go, routes } from '../lib/router';
import { useSession } from '../lib/session';
import { play } from '../lib/sound';
import { act, useAppState } from '../store/game';
import { NotFound } from './NotFound';

const PAIR_COLORS = ['bg-[#ffe3a3] border-[#e8b100]', 'bg-[#c9f2d6] border-[#23935e]', 'bg-[#d9d6ff] border-[#4b3fc7]', 'bg-[#ffd6e4] border-[#d93a6a]'];

export function ConnectionsScreen({ weekId }: { weekId: string }) {
  const s = useAppState();
  const week = findWeek(s, weekId);
  const complete = useSession((x) => x.complete);
  const [round, setRound] = useState(0);
  const conn = useMemo(() => (week ? buildConnections(s, week) : null), [weekId, round]);
  const [stepIdx, setStepIdx] = useState(0);
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState(false);

  if (!week || !conn) return <NotFound />;
  const step = conn.steps[stepIdx];

  const nextStep = () => {
    if (stepIdx < conn.steps.length - 1) {
      setStepIdx((i) => i + 1);
      return;
    }
    act((d, t) => {
      for (const id of conn.wordIds) recordActivity(d, id, 'connections', t, { firstTry: !missed.has(id), itemKey: id === (conn.steps.find((x) => x.kind === 'sort') as SortStep | undefined)?.wordId ? `${id}:nuance` : undefined });
    });
    complete();
    setFinished(true);
  };
  const miss = (wordId: string) => setMissed((m) => new Set(m).add(wordId));

  return (
    <div className="paper-bg min-h-screen">
      <TopBar title="🧩 Word Connections" theme={week.theme} onBack={() => go(routes.week(week.id))} />
      <Screen className="flex flex-col gap-4">
        {finished ? (
          <Card className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center" data-testid="round-complete">
            <div className="text-6xl" aria-hidden>
              🧩
            </div>
            <h2 className="text-3xl font-bold text-grape">Connections complete!</h2>
            <p className="text-xl">You found how words connect, and how similar words are different. That’s deep thinking!</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setFinished(false);
                  setStepIdx(0);
                  setMissed(new Set());
                  setRound((r) => r + 1);
                }}
              >
                Play again
              </Button>
              <Button size="lg" variant={week.theme} onClick={() => go(routes.week(week.id))}>
                Back to {week.title}
              </Button>
            </div>
          </Card>
        ) : !step ? (
          <Card className="text-center text-xl">This week doesn’t have enough words for connections yet.</Card>
        ) : (
          <>
            <ProgressDots total={conn.steps.length} current={stepIdx} />
            {step.kind === 'match' && <MatchGame key={`m${stepIdx}-${round}`} step={step} onMiss={miss} onDone={nextStep} />}
            {step.kind === 'sort' && <SortGame key={`s${stepIdx}-${round}`} step={step} onMiss={() => miss(step.wordId)} onDone={nextStep} />}
            {step.kind === 'choice' && (
              <>
                <Mascot>{step.title}: words in the same family share a root but do different jobs in a sentence.</Mascot>
                <QuestionRunner key={`c${stepIdx}-${round}`} questions={[step.question]} mode="practice" onItemDone={(r) => !r.firstTry && miss(r.question.wordId)} onFinish={nextStep} finishLabel="Next →" />
              </>
            )}
          </>
        )}
      </Screen>
    </div>
  );
}

function MatchGame({ step, onMiss, onDone }: { step: MatchStep; onMiss: (wordId: string) => void; onDone: () => void }) {
  const partners = useMemo(() => shuffle(step.pairs, createRng()), [step]);
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [msg, setMsg] = useState('Tap a word, then tap the word that means almost the same.');
  const allDone = matched.length === step.pairs.length;

  const pickPartner = (wordId: string) => {
    if (!selected || matched.includes(wordId)) return;
    if (selected === wordId) {
      play('correct');
      setMatched((m) => [...m, wordId]);
      setSelected(null);
      setMsg(feedback.correct());
    } else {
      play('oops');
      onMiss(selected);
      setWrong(wordId);
      setMsg(feedback.tryAgain());
      setTimeout(() => setWrong(null), 450);
    }
  };

  const colorFor = (id: string) => PAIR_COLORS[matched.indexOf(id) % PAIR_COLORS.length];

  return (
    <Card className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{step.title}</h2>
      <p className="text-lg text-ink-soft" aria-live="polite">
        {msg}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          {step.pairs.map((p) => {
            const isMatched = matched.includes(p.wordId);
            return (
              <button
                key={p.wordId}
                type="button"
                data-testid="match-word"
                data-pair={p.wordId}
                disabled={isMatched}
                aria-pressed={selected === p.wordId}
                onClick={() => {
                  play('tap');
                  setSelected(p.wordId);
                }}
                className={`btn-3d min-h-16 rounded-2xl border-4 px-4 font-display text-2xl font-semibold ${isMatched ? colorFor(p.wordId) : selected === p.wordId ? 'border-grape bg-grape-light' : 'border-ink/10 bg-white'}`}
              >
                {p.word}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3">
          {partners.map((p) => {
            const isMatched = matched.includes(p.wordId);
            return (
              <motion.button
                key={p.wordId}
                type="button"
                data-testid="match-partner"
                data-pair={p.wordId}
                disabled={isMatched || !selected}
                onClick={() => pickPartner(p.wordId)}
                animate={wrong === p.wordId ? { x: [0, -8, 8, -4, 0] } : {}}
                className={`btn-3d min-h-16 rounded-2xl border-4 px-4 text-xl font-bold ${isMatched ? colorFor(p.wordId) : 'border-dashed border-ink/20 bg-white'}`}
              >
                {p.partner}
              </motion.button>
            );
          })}
        </div>
      </div>
      {allDone && (
        <div className="flex justify-end">
          <Button size="lg" onClick={onDone} data-testid="next">
            Next →
          </Button>
        </div>
      )}
    </Card>
  );
}

function SortGame({ step, onMiss, onDone }: { step: SortStep; onMiss: () => void; onDone: () => void }) {
  const [placed, setPlaced] = useState<Record<number, boolean>>({});
  const [shake, setShake] = useState<number | null>(null);
  const [msg, setMsg] = useState('');
  const allDone = step.items.every((_, i) => placed[i]);

  const choose = (i: number, bucket: 0 | 1) => {
    if (placed[i]) return;
    if (step.items[i].bucket === bucket) {
      play('correct');
      setPlaced((p) => ({ ...p, [i]: true }));
      setMsg(feedback.correct());
    } else {
      play('oops');
      onMiss();
      setShake(i);
      setMsg(feedback.tryAgain());
      setTimeout(() => setShake(null), 450);
    }
  };

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <h2 className="flex-1 text-2xl font-semibold">{step.title}</h2>
        <SpeakButton text={step.intro} />
      </div>
      <p className="rounded-2xl bg-sun-light p-3 text-lg">{step.intro}</p>
      <p className="text-lg text-ink-soft" aria-live="polite">
        {msg || 'Which one fits each card?'}
      </p>
      <ul className="flex flex-col gap-3">
        {step.items.map((it, i) => (
          <motion.li
            key={i}
            animate={shake === i ? { x: [0, -8, 8, -4, 0] } : {}}
            className={`flex flex-col gap-3 rounded-2xl border-4 p-3 sm:flex-row sm:items-center ${placed[i] ? 'border-good bg-good-light' : 'border-ink/10 bg-white'}`}
            data-testid="sort-item"
            data-bucket={it.bucket}
          >
            <p className="flex-1 text-xl">{it.text}</p>
            {placed[i] ? (
              <span className="font-display text-xl font-semibold text-good">✓ {step.buckets[it.bucket]}</span>
            ) : (
              <div className="flex gap-2">
                {step.buckets.map((b, bi) => (
                  <Button key={b} variant={bi === 0 ? 'primary' : 'sun'} onClick={() => choose(i, bi as 0 | 1)} data-testid={`bucket-${bi}`} sfx={false}>
                    {b}
                  </Button>
                ))}
              </div>
            )}
          </motion.li>
        ))}
      </ul>
      {allDone && (
        <>
          <p className="rounded-2xl bg-grape-light p-4 text-lg" data-testid="sort-explanation">
            💡 {step.explanation}
          </p>
          <div className="flex justify-end">
            <Button size="lg" onClick={onDone} data-testid="next">
              Next →
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
