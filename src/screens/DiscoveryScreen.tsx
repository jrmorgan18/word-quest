import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { StickerSvg } from '../art/stickers';
import { Confetti } from '../components/Confetti';
import { MarkedText } from '../components/MarkedText';
import { QuestionRunner } from '../components/QuestionRunner';
import { Button, Card, Pill, Screen, SpeakButton, TopBar, THEME } from '../components/ui';
import { finalize, meaningQuestion } from '../engine/questions';
import { findWeek, recordDiscovery, weekWords, wordProgress } from '../engine/progress';
import type { Question } from '../engine/types';
import { createRng } from '../lib/random';
import { go, routes } from '../lib/router';
import { useSession } from '../lib/session';
import { play } from '../lib/sound';
import { act, useAppState } from '../store/game';
import { NotFound } from './NotFound';

export function DiscoveryScreen({ weekId, wordId }: { weekId: string; wordId: string }) {
  const s = useAppState();
  const week = findWeek(s, weekId);
  const word = s.curriculum.words[wordId];
  const [step, setStep] = useState(0);
  const recorded = useRef(false);
  const complete = useSession((x) => x.complete);

  useEffect(() => {
    setStep(0);
    recorded.current = false;
  }, [wordId]);

  const thinkQ: Question | null = useMemo(() => {
    if (!word || !week) return null;
    const rng = createRng();
    if (word.discovery) {
      return finalize(
        {
          key: `${word.id}:discovery`,
          wordId: word.id,
          format: 'meaning',
          prompt: word.discovery.question,
          options: word.discovery.choices,
          explanation: word.discovery.explanation,
        },
        rng,
      );
    }
    return meaningQuestion(word, { curriculum: s.curriculum, rng, siblings: weekWords(s, week) });
  }, [word, week]);

  useEffect(() => {
    if (step === 3 && !recorded.current && word) {
      recorded.current = true;
      const first = !wordProgress(s, word.id).exploredAt;
      act((d, t) => recordDiscovery(d, word.id, t));
      if (first) complete();
      play('reward');
    }
  }, [step]);

  if (!week || !word) return <NotFound />;
  const th = THEME[week.theme];
  const nextWord = weekWords(s, week).find((w) => w.id !== word.id && !wordProgress(s, w.id).exploredAt && !wordProgress(s, w.id).mastered);
  const pron = `${word.text}. ${word.pronunciation.replace(/-/g, ' ')}. ${word.text}.`;

  return (
    <div className="paper-bg min-h-screen">
      <TopBar title="Word Discovery 🔍" theme={week.theme} onBack={() => go(routes.week(week.id))} />
      <Screen>
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {/* The word itself, always visible */}
          <Card className={`flex flex-col items-center gap-2 bg-gradient-to-br ${th.grad} text-center`}>
            <Pill className={`${th.bg} text-white`}>{step === 0 ? 'Mystery word!' : word.partOfSpeech}</Pill>
            <div className="flex items-center gap-4">
              <h2 className="text-5xl font-bold tracking-wide sm:text-7xl" data-testid="discovery-word">
                {word.text}
              </h2>
              <SpeakButton text={pron} label={`Hear how to say ${word.text}`} size="lg" />
            </div>
            <p className="font-display text-2xl text-ink-soft">{word.pronunciation}</p>
          </Card>

            {step === 0 && (
              <motion.div key="clue" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="flex flex-col gap-4 md:flex-row md:items-center">
                  <figure className={`mx-auto w-56 shrink-0 rounded-3xl ${th.light} p-3 sm:w-64`}>
                    <motion.div initial={{ scale: 0.8, rotate: -6 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
                      <StickerSvg id={word.stickerId} label={word.text} variant="plain" title={word.illustration} />
                    </motion.div>
                    {word.discovery && <figcaption className="mt-1 text-center text-sm font-semibold text-ink-soft">{word.discovery.scene}</figcaption>}
                  </figure>
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="font-display text-xl font-semibold text-grape">🔎 Clue #1</h3>
                    <div className="flex items-start gap-3">
                      <p className="flex-1 text-2xl leading-relaxed">
                        <MarkedText text={word.examples[0] ?? ''} />
                      </p>
                      <SpeakButton text={word.examples[0] ?? ''} />
                    </div>
                    <p className="text-lg text-ink-soft">What do you think “{word.text}” means? Make a guess in your head!</p>
                    <Button size="xl" variant={week.theme} onClick={() => (play('whoosh'), setStep(1))} data-testid="reveal-meaning">
                      ✨ Reveal the meaning!
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="meaning" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 0.45 }}>
                <Card className="flex flex-col gap-5">
                  <div className="rounded-3xl bg-sun-light p-5">
                    <h3 className="font-display text-lg font-semibold text-ink-soft">“{word.text}” means…</h3>
                    <div className="flex items-start gap-3">
                      <p className="flex-1 font-display text-3xl font-semibold leading-snug sm:text-4xl" data-testid="definition">
                        {word.definition}
                      </p>
                      <SpeakButton text={`${word.text} means ${word.definition}`} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {word.examples.slice(0, 2).map((ex, i) => (
                      <div key={i} className="rounded-2xl bg-grape-light/50 p-4">
                        <h4 className="font-display font-semibold text-grape">{i === 0 ? '🔎 Clue #1' : '🌍 Somewhere else…'}</h4>
                        <div className="flex items-start gap-2">
                          <p className="flex-1 text-xl">
                            <MarkedText text={ex} />
                          </p>
                          <SpeakButton text={ex} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button size="lg" onClick={() => setStep(thinkQ ? 2 : 3)} data-testid="think-next">
                    🤔 Let’s think about it
                  </Button>
                </Card>
              </motion.div>
            )}

            {step === 2 && thinkQ && (
              <motion.div key="think" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-4 flex justify-center">
                  <div className={`w-40 rounded-3xl ${th.light} p-2`}>
                    <StickerSvg id={word.stickerId} label={word.text} variant="plain" />
                  </div>
                </div>
                <QuestionRunner questions={[thinkQ]} mode="practice" onFinish={() => setStep(3)} finishLabel="I discovered it!" />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="done" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Confetti pieces={18} />
                <Card className="flex flex-col items-center gap-4 text-center" data-testid="discovered">
                  <div className="text-6xl" aria-hidden>
                    🎉
                  </div>
                  <h3 className="text-3xl font-bold text-grape">You discovered a new word!</h3>
                  <p className="text-xl">
                    <strong>{word.text}</strong>: {word.definition}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {word.synonyms.map((x) => (
                      <Pill key={x} className="bg-good-light text-good">
                        ≈ {x}
                      </Pill>
                    ))}
                    {word.antonyms.map((x) => (
                      <Pill key={x} className="bg-oops-light text-oops">
                        ↔ {x}
                      </Pill>
                    ))}
                  </div>
                  {word.wordFamily?.length ? (
                    <div className="w-full rounded-2xl bg-grape-light/50 p-4 text-left">
                      <h4 className="font-display text-lg font-semibold text-grape">👪 Word family</h4>
                      <ul className="mt-1 flex flex-col gap-1 text-lg">
                        {word.wordFamily.map((f) => (
                          <li key={f.form}>
                            <strong>{f.form}</strong> <span className="text-ink-soft">({f.partOfSpeech})</span> — <MarkedText text={f.example} mode="plain" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {word.discussionPrompts[0] && (
                    <div className="w-full rounded-2xl bg-sun-light p-4 text-left">
                      <h4 className="font-display text-lg font-semibold">💬 Talk about it with a grown-up</h4>
                      <div className="flex items-start gap-2">
                        <p className="flex-1 text-lg">{word.discussionPrompts[0]}</p>
                        <SpeakButton text={word.discussionPrompts[0]} />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button variant="secondary" onClick={() => go(routes.week(week.id))}>
                      Back to {week.title}
                    </Button>
                    {nextWord ? (
                      <Button size="lg" variant={week.theme} onClick={() => go(routes.discover(week.id, nextWord.id))} data-testid="next-word">
                        Next word: {nextWord.text} →
                      </Button>
                    ) : (
                      <Button size="lg" variant="good" onClick={() => go(routes.week(week.id))} data-testid="done-discovering">
                        Let’s practice! →
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
        </div>
      </Screen>
    </div>
  );
}
