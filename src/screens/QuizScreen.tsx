import { useState } from 'react';
import { motion } from 'motion/react';
import { Confetti } from '../components/Confetti';
import { Mascot } from '../components/Mascot';
import { QuestionRunner } from '../components/QuestionRunner';
import { whenText } from '../components/nextStep';
import { Button, Card, Screen, TopBar } from '../components/ui';
import { delayedCheckAvailable, findWeek, quizGate, weekProgress } from '../engine/progress';
import { applyQuizResult, buildQuiz, requiredTotal, type BuiltQuiz } from '../engine/quiz';
import type { QuizAttempt, QuizType } from '../engine/types';
import { now } from '../lib/clock';
import { go, routes } from '../lib/router';
import { useSession } from '../lib/session';
import { act, useAppState } from '../store/game';
import { NotFound } from './NotFound';

export function QuizScreen({ weekId, quizType }: { weekId: string; quizType: QuizType }) {
  const s = useAppState();
  const week = findWeek(s, weekId);
  const complete = useSession((x) => x.complete);
  const [quiz, setQuiz] = useState<BuiltQuiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  if (!week) return <NotFound />;
  const wp = weekProgress(s, week.id);
  const title = quizType === 'initial' ? '🏁 Weekly Quiz' : '🧠 Memory Check';
  const back = () => go(routes.week(week.id));

  // Availability guard (only before starting; once started, let him finish).
  if (!quiz && !attempt) {
    const available = quizType === 'initial' ? quizGate(s, week).unlocked && !wp.initialPassedAt : delayedCheckAvailable(s, week.id, now());
    const total = week.wordIds.length * (quizType === 'initial' ? s.config.initial.questionsPerWord : s.config.delayed.questionsPerWord);
    return (
      <div className="paper-bg min-h-screen">
        <TopBar title={title} theme={week.theme} onBack={back} />
        <Screen>
          <Card className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            {available ? (
              <>
                <div className="text-6xl" aria-hidden>
                  {quizType === 'initial' ? '🏁' : '🧠'}
                </div>
                <h2 className="text-3xl font-bold">{quizType === 'initial' ? `${week.title} Quiz` : 'Memory Check'}</h2>
                <p className="text-xl">
                  {total} questions about {week.wordIds.map((id) => s.curriculum.words[id]?.text).join(', ')}.
                </p>
                <ul className="text-left text-lg">
                  <li>⏳ No timer — take your time.</li>
                  <li>🔈 Tap the speaker to hear any question.</li>
                  <li>💡 You’ll see the answer after each question.</li>
                </ul>
                <Button size="xl" variant="good" onClick={() => setQuiz(buildQuiz(s, week, quizType, now()))} data-testid="begin-quiz">
                  I’m ready!
                </Button>
              </>
            ) : (
              <>
                <div className="text-6xl" aria-hidden>
                  🌙
                </div>
                <h2 className="text-3xl font-bold">Not quite yet!</h2>
                <p className="text-xl">
                  {quizType === 'delayed' && wp.delayedAvailableAt && !wp.delayedPassedAt
                    ? `The Memory Check opens ${whenText(wp.delayedAvailableAt)}.`
                    : quizType === 'initial' && wp.initialPassedAt
                      ? 'You already passed this quiz!'
                      : 'Finish exploring and practicing the words first.'}
                </p>
                <Button size="lg" onClick={back}>
                  Back to {week.title}
                </Button>
              </>
            )}
          </Card>
        </Screen>
      </div>
    );
  }

  if (attempt) return <QuizResult attempt={attempt} weekId={week.id} onRetry={() => (setAttempt(null), setQuiz(null))} />;

  return (
    <div className="paper-bg min-h-screen">
      <TopBar title={title} theme={week.theme} onBack={back} />
      <Screen>
        <QuestionRunner
          questions={quiz!.questions}
          mode="quiz"
          finishLabel="See my results"
          onFinish={(results) => {
            const answers = quiz!.questions.map((q) => results.find((r) => r.question.key === q.key)?.firstAnswer ?? -1);
            const a = act((d, t) => applyQuizResult(d, quiz!, answers, t));
            complete({ quiz: true });
            setAttempt(a);
          }}
        />
      </Screen>
    </div>
  );
}

function QuizResult({ attempt, weekId, onRetry }: { attempt: QuizAttempt; weekId: string; onRetry: () => void }) {
  const s = useAppState();
  const week = findWeek(s, weekId)!;
  const wp = weekProgress(s, weekId);
  const missed = Object.entries(attempt.perWord).filter(([, v]) => v.correct < v.total);
  const need = requiredTotal(s, attempt.quizType, attempt.total, Object.keys(attempt.perWord).length);

  return (
    <div className="paper-bg min-h-screen">
      {attempt.passed && <Confetti />}
      <TopBar title={attempt.quizType === 'initial' ? '🏁 Quiz results' : '🧠 Memory Check results'} theme={week.theme} onBack={() => go(routes.week(weekId))} />
      <Screen>
        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Card className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center" data-testid="quiz-result" data-passed={attempt.passed}>
            <div className="text-7xl" aria-hidden>
              {attempt.passed ? '🏆' : '🌱'}
            </div>
            <h2 className="text-3xl font-bold text-grape">
              {attempt.passed ? (attempt.quizType === 'initial' ? 'You passed the quiz!' : 'Words mastered!') : 'Good effort — you’re growing!'}
            </h2>
            <p className="font-display text-2xl" data-testid="quiz-score">
              {attempt.score} of {attempt.total} correct
            </p>
            <ul className="w-full max-w-md text-left text-lg">
              {Object.entries(attempt.perWord).map(([id, v]) => (
                <li key={id} className="flex items-center justify-between border-b border-ink/10 py-2">
                  <span className="font-display text-xl font-semibold">{s.curriculum.words[id]?.text}</span>
                  <span aria-label={`${v.correct} of ${v.total}`}>
                    {'⭐'.repeat(v.correct)}
                    <span className="opacity-30">{'☆'.repeat(v.total - v.correct)}</span>
                  </span>
                </li>
              ))}
            </ul>

            {attempt.passed ? (
              attempt.quizType === 'initial' ? (
                <Mascot>
                  Your word stickers are unlocked! Come back {whenText(wp.delayedAvailableAt ?? now())} for a short Memory Check. Sleep helps your brain keep words!
                </Mascot>
              ) : (
                <Mascot>You conquered {week.title}! A new adventure is waiting on the map.</Mascot>
              )
            ) : (
              <>
                <p className="text-lg">
                  To pass, you need {need} correct and at least {attempt.quizType === 'initial' ? s.config.initial.perWordMin : s.config.delayed.perWordMin} for each word. Let’s investigate the tricky
                  {missed.length === 1 ? ' word' : ' words'} again:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {missed.map(([id]) => (
                    <Button key={id} variant="secondary" onClick={() => go(routes.discover(weekId, id))}>
                      🔍 {s.curriculum.words[id]?.text}
                    </Button>
                  ))}
                </div>
              </>
            )}

            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {attempt.passed ? (
                <>
                  <Button variant="secondary" onClick={() => go(routes.stickers())}>
                    See my stickers
                  </Button>
                  <Button size="lg" variant="good" onClick={() => go(attempt.quizType === 'delayed' ? routes.map() : routes.home())} data-testid="result-continue">
                    {attempt.quizType === 'delayed' ? 'To the map! 🗺️' : 'Home'}
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" variant={week.theme} onClick={() => go(routes.play(weekId, 'refresher'))} data-testid="go-refresher">
                    ✨ Quick Refresher
                  </Button>
                  <Button variant="secondary" onClick={onRetry} data-testid="retry-quiz">
                    Try a new quiz later
                  </Button>
                </>
              )}
            </div>
          </Card>
        </motion.div>
      </Screen>
    </div>
  );
}
