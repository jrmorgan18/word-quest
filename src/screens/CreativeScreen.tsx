import { useState } from 'react';
import { motion } from 'motion/react';
import { StickerSvg } from '../art/stickers';
import { Mascot } from '../components/Mascot';
import { Button, Card, Screen, SpeakButton, TopBar, THEME } from '../components/ui';
import { creativePrompts } from '../engine/activities';
import { findWeek, itemUseCounts, recordActivity, weekWords } from '../engine/progress';
import { checkAchievementStickers } from '../engine/rewards';
import { go, routes } from '../lib/router';
import { useSession } from '../lib/session';
import { play } from '../lib/sound';
import { act, useAppState } from '../store/game';
import { NotFound } from './NotFound';

/**
 * Activity F: open-ended prompts. Completion is self-confirmed participation; the game never
 * pretends to grade the quality of the answer. Typed notes are optional and are not saved.
 */
export function CreativeScreen({ weekId }: { weekId: string }) {
  const s = useAppState();
  const week = findWeek(s, weekId);
  const complete = useSession((x) => x.complete);
  const [wordId, setWordId] = useState<string | null>(null);
  const [promptIdx, setPromptIdx] = useState(0);
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);
  if (!week) return <NotFound />;
  const words = weekWords(s, week);
  const word = wordId ? s.curriculum.words[wordId] : null;
  const prompts = word ? creativePrompts(word) : [];
  const prompt = prompts[promptIdx % Math.max(1, prompts.length)];

  const pickWord = (id: string) => {
    const w = s.curriculum.words[id];
    const counts = itemUseCounts(s, id, 'creative');
    const ps = creativePrompts(w);
    // Start with the least-used prompt so repeat visits feel fresh.
    const idx = ps.map((_, i) => i).sort((a, b) => (counts.get(`${id}:creative:${a}`) ?? 0) - (counts.get(`${id}:creative:${b}`) ?? 0))[0] ?? 0;
    setWordId(id);
    setPromptIdx(idx);
    setNote('');
    setDone(false);
  };

  return (
    <div className="paper-bg min-h-screen">
      <TopBar title="💡 Creative Challenge" theme={week.theme} onBack={() => (word ? setWordId(null) : go(routes.week(week.id)))} />
      <Screen className="flex flex-col gap-5">
        {!word ? (
          <>
            <Mascot>Pick a word for your challenge. There are no wrong answers — just big ideas!</Mascot>
            <div className="grid gap-4 sm:grid-cols-3">
              {words.map((w) => (
                <button key={w.id} type="button" onClick={() => pickWord(w.id)} className="btn-3d flex flex-col items-center gap-2 rounded-3xl bg-white p-5" data-testid={`creative-word-${w.id}`}>
                  <div className="h-24 w-24">
                    <StickerSvg id={w.stickerId} label={w.text} variant="plain" />
                  </div>
                  <span className="font-display text-2xl font-semibold">{w.text}</span>
                </button>
              ))}
            </div>
          </>
        ) : done ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Card className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center" data-testid="creative-done">
              <div className="text-6xl" aria-hidden>
                💡
              </div>
              <h2 className="text-3xl font-bold text-grape">What a creative thinker!</h2>
              <p className="text-xl">Using “{word.text}” in your own ideas helps it stick in your brain.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="secondary" onClick={() => setWordId(null)}>
                  Another challenge
                </Button>
                <Button size="lg" variant={week.theme} onClick={() => go(routes.week(week.id))}>
                  Back to {week.title}
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <Card className={`mx-auto flex w-full max-w-3xl flex-col gap-5 bg-gradient-to-br ${THEME[week.theme].grad}`}>
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 shrink-0">
                <StickerSvg id={word.stickerId} label={word.text} variant="plain" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{word.text}</h2>
                <p className="text-lg text-ink-soft">{word.definition}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-3xl bg-white p-5">
              <p className="flex-1 font-display text-2xl font-semibold leading-snug sm:text-3xl" data-testid="creative-prompt">
                {prompt}
              </p>
              <SpeakButton text={prompt} />
            </div>
            <ol className="grid gap-3 sm:grid-cols-3">
              <li className="rounded-2xl bg-white/80 p-3 text-lg">🤔 Think about your idea.</li>
              <li className="rounded-2xl bg-white/80 p-3 text-lg">🗣️ Say it out loud to a grown-up (or a stuffed animal!).</li>
              <li className="rounded-2xl bg-white/80 p-3 text-lg">✏️ If you want, write it below.</li>
            </ol>
            <label className="flex flex-col gap-1">
              <span className="font-display text-lg font-semibold">My idea (optional — this isn’t saved)</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="rounded-2xl border-4 border-ink/10 bg-white p-3 text-lg focus:border-grape focus:outline-none" />
            </label>
            <div className="flex flex-wrap justify-between gap-3">
              {prompts.length > 1 && (
                <Button variant="secondary" onClick={() => setPromptIdx((i) => i + 1)}>
                  🔄 Different idea
                </Button>
              )}
              <Button
                size="lg"
                variant="good"
                data-testid="creative-complete"
                onClick={() => {
                  play('reward');
                  act((d, t) => {
                    recordActivity(d, word.id, 'creative', t, { itemKey: `${word.id}:creative:${promptIdx % prompts.length}` });
                    d.stats.creativeDone++;
                    checkAchievementStickers(d, t);
                  });
                  complete();
                  setDone(true);
                }}
              >
                I shared my idea! ✓
              </Button>
            </div>
          </Card>
        )}
      </Screen>
    </div>
  );
}
