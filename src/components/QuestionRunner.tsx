import { useMemo, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import type { Question } from '../engine/types';
import { feedback } from '../lib/feedback';
import { play } from '../lib/sound';
import { plain } from '../lib/text';
import { MarkedText } from './MarkedText';
import { Button, Card, ProgressDots, SpeakButton } from './ui';

export type RunnerMode = 'practice' | 'quiz' | 'review';

export interface ItemResult {
  question: Question;
  /** First selected option index. */
  firstAnswer: number;
  firstTry: boolean;
}

interface Props {
  questions: Question[];
  mode: RunnerMode;
  /** Called when the child finishes an item (practice: after the correct answer is found). */
  onItemDone?: (r: ItemResult) => void;
  onFinish: (results: ItemResult[]) => void;
  /** Extra content shown under a wrong review answer (e.g. a refresher card). */
  refresher?: (q: Question) => ReactNode;
  finishLabel?: string;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export function QuestionRunner({ questions, mode, onItemDone, onFinish, refresher, finishLabel = 'Finish' }: Props) {
  const [index, setIndex] = useState(0);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [firstAnswer, setFirstAnswer] = useState<number | null>(null);
  const [resolved, setResolved] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [results, setResults] = useState<ItemResult[]>([]);

  const q = questions[index];
  const long = useMemo(() => q && q.options.some((o) => o.length > 28), [q]);
  if (!q) return null;
  const last = index === questions.length - 1;
  const correctPicked = resolved && (mode === 'practice' || firstAnswer === q.answerIndex);

  function choose(i: number) {
    if (resolved || wrongPicks.includes(i)) return;
    const isFirst = firstAnswer === null;
    if (isFirst) setFirstAnswer(i);
    const correct = i === q.answerIndex;
    if (correct) {
      play('correct');
      setMessage(feedback.correct());
      setResolved(true);
      const r: ItemResult = { question: q, firstAnswer: isFirst ? i : (firstAnswer as number), firstTry: isFirst };
      setResults((rs) => [...rs, r]);
      onItemDone?.(r);
      return;
    }
    play('oops');
    if (mode === 'practice') {
      setWrongPicks((w) => [...w, i]);
      setMessage(feedback.tryAgain());
    } else {
      setMessage(feedback.quizWrong());
      setResolved(true);
      const r: ItemResult = { question: q, firstAnswer: i, firstTry: false };
      setResults((rs) => [...rs, r]);
      onItemDone?.(r);
    }
  }

  function next() {
    if (last) {
      onFinish(results);
      return;
    }
    setIndex((n) => n + 1);
    setWrongPicks([]);
    setFirstAnswer(null);
    setResolved(false);
    setMessage('');
  }

  const readText = [q.passage ? plain(q.passage.replace(/\{[^}]+\}/g, q.blank ? 'blank' : '$&')) : '', q.prompt, ...q.options].filter(Boolean).join('. ');
  const dotResults = questions.map((_, i) => (i < results.length ? (mode === 'practice' ? results[i].firstTry : results[i].firstAnswer === questions[i].answerIndex) : null));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <ProgressDots total={questions.length} current={index} results={mode === 'practice' ? undefined : dotResults} />
      {/* Enter-only transition: progress never waits on an exit animation finishing. */}
      <motion.div key={q.key + index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
          <Card className="flex flex-col gap-5">
            {q.passage && (
              <p className="rounded-2xl bg-grape-light/60 p-4 text-xl leading-relaxed sm:text-2xl" data-testid="passage">
                <MarkedText text={q.passage} mode={q.blank ? 'blank' : 'highlight'} fill={q.blank && correctPicked} />
              </p>
            )}
            <div className="flex items-start gap-3">
              <h2 className="flex-1 text-2xl font-semibold leading-snug sm:text-[1.7rem]" data-testid="prompt">
                {q.prompt}
              </h2>
              <SpeakButton text={readText} label="Read the question aloud" />
            </div>
            <div className={`grid gap-3 ${long ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`} role="group" aria-label="Answer choices">
              {q.options.map((opt, i) => {
                const isWrong = wrongPicks.includes(i) || (resolved && mode !== 'practice' && firstAnswer === i && i !== q.answerIndex);
                const isRight = resolved && i === q.answerIndex;
                const state = isRight ? 'border-good bg-good-light' : isWrong ? 'border-oops/50 bg-oops-light opacity-70' : 'border-ink/10 bg-white hover:border-grape/50';
                return (
                  <motion.button
                    key={i}
                    type="button"
                    data-testid="option"
                    data-correct={i === q.answerIndex ? 'true' : undefined}
                    disabled={resolved || wrongPicks.includes(i)}
                    aria-pressed={firstAnswer === i}
                    onClick={() => choose(i)}
                    animate={isWrong && mode === 'practice' ? { x: [0, -8, 8, -4, 0] } : isRight ? { scale: [1, 1.04, 1] } : {}}
                    transition={{ duration: 0.35 }}
                    className={`btn-3d flex min-h-16 items-center gap-3 rounded-2xl border-4 px-4 py-3 text-left font-body text-lg font-semibold sm:text-xl ${state}`}
                  >
                    <span aria-hidden className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-base ${isRight ? 'bg-good text-white' : 'bg-grape-light text-grape'}`}>
                      {isRight ? '✓' : isWrong ? '✗' : LETTERS[i]}
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                );
              })}
            </div>
            <div aria-live="polite" className="min-h-0">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl p-4 ${correctPicked ? 'bg-good-light' : 'bg-oops-light'}`}
                  data-testid="feedback"
                >
                  <p className={`font-display text-xl font-semibold ${correctPicked ? 'text-good' : 'text-oops'}`}>{message}</p>
                  {(resolved || wrongPicks.length > 0) && <p className="mt-1 text-lg">{resolved ? q.explanation : 'Hint: think about what the word means, then read each choice again.'}</p>}
                  {resolved && !correctPicked && refresher?.(q)}
                </motion.div>
              )}
            </div>
            {resolved && (
              <div className="flex justify-end">
                <Button size="lg" variant={last ? 'good' : 'primary'} onClick={next} data-testid="next">
                  {last ? finishLabel : 'Next →'}
                </Button>
              </div>
            )}
          </Card>
      </motion.div>
    </div>
  );
}
