/**
 * Practice-activity round builders. Each activity is described by a registry entry so new
 * activities can be added without touching screens that list or route to them.
 */
import type { Week, Word } from '../data/types';
import { createRng, shuffle, type Rng } from '../lib/random';
import { itemUseCounts, weekWords } from './progress';
import { detectiveQuestions, finalize, meaningQuestion, storyQuestions, type GenContext } from './questions';
import type { ActivityType, AppState, PracticeActivity, Question } from './types';

export interface ActivityInfo {
  id: PracticeActivity | 'creative' | 'discovery';
  title: string;
  blurb: string;
  icon: string;
  countsForQuiz: boolean;
}

export const ACTIVITIES: ActivityInfo[] = [
  { id: 'discovery', title: 'Word Discovery', blurb: 'Meet each new word', icon: '🔍', countsForQuiz: false },
  { id: 'choose', title: 'Choose the Meaning', blurb: 'Pick what the word means', icon: '🎯', countsForQuiz: true },
  { id: 'story', title: 'Complete the Story', blurb: 'Fill in the missing word', icon: '📖', countsForQuiz: true },
  { id: 'detective', title: 'Word Detective', blurb: 'Use clues to crack the case', icon: '🕵️', countsForQuiz: true },
  { id: 'connections', title: 'Word Connections', blurb: 'Match, sort, and compare', icon: '🧩', countsForQuiz: true },
  { id: 'creative', title: 'Creative Challenge', blurb: 'Imagine and tell a story', icon: '💡', countsForQuiz: false },
];

export function activityInfo(id: string): ActivityInfo | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}

/** Picks the least-used item so repeated play rotates through all stories/cases. */
function leastUsed(qs: Question[], counts: Map<string, number>, rng: Rng): Question | undefined {
  const sh = shuffle(qs, rng);
  return sh.sort((a, b) => (counts.get(a.key) ?? 0) - (counts.get(b.key) ?? 0))[0];
}

function ctxFor(state: AppState, week: Week, rng: Rng): GenContext {
  return { curriculum: state.curriculum, rng, siblings: weekWords(state, week) };
}

/** One question per word for Choose / Story / Detective rounds (or only `wordIds` if given). */
export function buildQuestionRound(
  state: AppState,
  week: Week,
  activity: 'choose' | 'story' | 'detective',
  seed?: number,
  wordIds?: string[],
): Question[] {
  const rng = createRng(seed);
  const ctx = ctxFor(state, week, rng);
  const words = weekWords(state, week).filter((w) => !wordIds || wordIds.includes(w.id));
  const out: Question[] = [];
  for (const w of words) {
    const counts = itemUseCounts(state, w.id, activity);
    let q: Question | null | undefined;
    if (activity === 'choose') q = meaningQuestion(w, ctx);
    else if (activity === 'story') q = leastUsed(storyQuestions(w, ctx), counts, rng);
    else q = leastUsed(detectiveQuestions(w, ctx), counts, rng);
    if (q) out.push(q);
  }
  return shuffle(out, rng);
}

/** Quick Refresher after a missed quiz: two short practice items for each word that needs it. */
export function buildRefresher(state: AppState, week: Week, seed?: number): Question[] {
  const rng = createRng(seed);
  const ctx = ctxFor(state, week, rng);
  const words = weekWords(state, week).filter((w) => state.wordProgress[w.id]?.needsRefresher);
  const out: Question[] = [];
  for (const w of words) {
    const m = meaningQuestion(w, ctx);
    if (m) out.push(m);
    const extra = leastUsed([...storyQuestions(w, ctx), ...detectiveQuestions(w, ctx)], itemUseCounts(state, w.id, 'refresher'), rng);
    if (extra) out.push(extra);
  }
  return out;
}

// ───────────────────────────── Word Connections ─────────────────────────────

export interface MatchStep {
  kind: 'match';
  title: string;
  pairs: { wordId: string; word: string; partner: string }[];
}
export interface SortStep {
  kind: 'sort';
  title: string;
  wordId: string;
  intro: string;
  buckets: [string, string];
  /** bucket index 0 or 1 */
  items: { text: string; bucket: 0 | 1 }[];
  explanation: string;
}
export interface ChoiceStep {
  kind: 'choice';
  title: string;
  question: Question;
}
export type ConnectionStep = MatchStep | SortStep | ChoiceStep;

export interface ConnectionsRound {
  steps: ConnectionStep[];
  wordIds: string[];
}

export function buildConnections(state: AppState, week: Week, seed?: number): ConnectionsRound {
  const rng = createRng(seed);
  const words = weekWords(state, week);
  const steps: ConnectionStep[] = [];

  // 1) Synonym matching across all words in the week.
  const pairs = words
    .filter((w) => w.synonyms.length)
    .map((w) => ({ wordId: w.id, word: w.text, partner: shuffle(w.synonyms, rng)[0] }));
  if (pairs.length >= 2) steps.push({ kind: 'match', title: 'Match each word to a word that means almost the same', pairs });

  // 2) Nuance sort ("persistent vs. stubborn"), rotating to the least-practiced word.
  const used = (w: Word) => itemUseCounts(state, w.id, 'connections').get(`${w.id}:nuance`) ?? 0;
  const nuanceWords = shuffle(words.filter((w) => w.nuance), rng).sort((a, b) => used(a) - used(b));
  const nw = nuanceWords[0];
  if (nw?.nuance) {
    steps.push({
      kind: 'sort',
      title: `${nw.text} or ${nw.nuance.versus}?`,
      wordId: nw.id,
      intro: `${nw.text}: ${nw.definition}. ${capital(nw.nuance.versus)}: ${nw.nuance.versusDefinition}.`,
      buckets: [nw.text, capital(nw.nuance.versus)],
      items: shuffle(nw.nuance.sentences.map((s) => ({ text: s.text, bucket: s.answer === 'word' ? 0 : 1 }) as const), rng),
      explanation: nw.nuance.explanation,
    });
  }

  // 3) Same-or-opposite sort for another word, or a word-family question.
  const others = shuffle(words.filter((w) => w.id !== nw?.id), rng);
  const so = others.find((w) => w.antonyms.length && w.synonyms.length);
  if (so) {
    steps.push({
      kind: 'sort',
      title: `Same or opposite of "${so.text}"?`,
      wordId: so.id,
      intro: `${so.text}: ${so.definition}.`,
      buckets: ['Same', 'Opposite'],
      items: shuffle([...so.synonyms.map((t) => ({ text: t, bucket: 0 as const })), ...so.antonyms.map((t) => ({ text: t, bucket: 1 as const }))], rng),
      explanation: `${capital(so.synonyms.join(' and '))} mean almost the same as "${so.text}". ${capital(so.antonyms.join(', '))} ${so.antonyms.length > 1 ? 'are' : 'is'} the opposite.`,
    });
  }
  const fam = [...others, ...words].find((w) => w.wordFamily?.length && w.id !== so?.id);
  if (fam?.wordFamily) {
    const member = shuffle(fam.wordFamily, rng)[0];
    const sentence = member.example;
    const q = finalize(
      {
        key: `${fam.id}:family:${member.form}`,
        wordId: fam.id,
        format: 'family',
        prompt: `Word family! Which form of "${fam.text}" fits?`,
        passage: sentence,
        blank: true,
        options: [member.form, fam.text.toLowerCase(), ...fam.wordFamily.filter((m) => m.form !== member.form).map((m) => m.form)].slice(0, 3),
        explanation: `"${member.form}" is part of the "${fam.text}" word family. ${capital(fam.text)} means ${fam.definition.toLowerCase()}.`,
      },
      rng,
    );
    if (q) steps.push({ kind: 'choice', title: 'Word Family', question: q });
  }
  return { steps, wordIds: words.map((w) => w.id) };
}

function capital(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function creativePrompts(word: Word): string[] {
  if (word.creativePrompts?.length) return word.creativePrompts;
  return [`Tell a story that uses the word "${word.text}".`, `When might someone feel or be ${word.text.toLowerCase()}? Explain.`];
}

export type { ActivityType };
