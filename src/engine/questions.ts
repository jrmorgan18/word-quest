/**
 * Data-driven question generators. Every generator builds options with the correct answer first,
 * then `finalize` de-duplicates and shuffles them. Each question carries a stable `key` so quiz
 * variations can avoid repeating content.
 *
 * Content pools are deliberately separated:
 *   - Practice activities use: definition+misconceptions (choose), stories, detective cases,
 *     nuance/synonym/antonym sorting (connections), discovery card examples [0..1].
 *   - Quizzes use: application items, contexts (situations), examples [2..], synonym/antonym and
 *     definition→word questions. None of these appear verbatim in practice activities.
 */
import type { Curriculum, Word } from '../data/types';
import { shuffle, type Rng } from '../lib/random';
import { autoMark, countMarks, lowerFirst } from '../lib/text';
import type { Question, QuestionFormat } from './types';

export interface GenContext {
  curriculum: Curriculum;
  rng: Rng;
  /** Words to prefer as distractors (usually the other words in the same week). */
  siblings: Word[];
  /** Wider pool for when siblings run out (e.g. other mastered words). */
  pool?: Word[];
}

function norm(s: string): string {
  return s.trim().toLowerCase();
}

/** Removes duplicate options (keeping the first/correct one) and shuffles. Returns null if unusable. */
export function finalize(
  base: Omit<Question, 'answerIndex' | 'options'> & { options: string[] },
  rng: Rng,
): Question | null {
  const seen = new Set<string>();
  const opts: string[] = [];
  for (const o of base.options) {
    if (!o || seen.has(norm(o))) continue;
    seen.add(norm(o));
    opts.push(o);
  }
  if (opts.length < 2) return null;
  const correct = opts[0];
  const shuffled = shuffle(opts, rng);
  return { ...base, options: shuffled, answerIndex: shuffled.indexOf(correct) };
}

/** Picks up to n other words as distractors, siblings first, then the wider pool. */
export function distractorWords(word: Word, n: number, ctx: GenContext): Word[] {
  const out: Word[] = [];
  const used = new Set([norm(word.text)]);
  const add = (list: Word[]) => {
    for (const w of shuffle(list, ctx.rng)) {
      if (out.length >= n) return;
      if (used.has(norm(w.text))) continue;
      used.add(norm(w.text));
      out.push(w);
    }
  };
  add(ctx.siblings.filter((w) => w.id !== word.id));
  if (out.length < n && ctx.pool) add(ctx.pool.filter((w) => w.id !== word.id));
  if (out.length < n) add(Object.values(ctx.curriculum.words).filter((w) => w.id !== word.id));
  return out;
}

function wordOptions(word: Word, ctx: GenContext, n = 2): string[] {
  return [word.text, ...distractorWords(word, n, ctx).map((w) => w.text)];
}

function means(word: Word): string {
  return `"${word.text}" means ${lowerFirst(word.definition)}.`;
}

// ───────────────────────────── Practice-activity generators ─────────────────────────────

/** Activity B: Choose the Meaning. */
export function meaningQuestion(word: Word, ctx: GenContext): Question | null {
  const wrong = [...word.misconceptions];
  if (wrong.length < 2) {
    for (const w of distractorWords(word, 4, ctx)) if (wrong.length < 2) wrong.push(w.definition);
  }
  return finalize(
    {
      key: `${word.id}:meaning`,
      wordId: word.id,
      format: 'meaning',
      prompt: `What does "${word.text}" mean?`,
      options: [word.definition, ...wrong.slice(0, 2)],
      explanation: `${means(word)} Example: ${word.examples[0] ?? ''}`.trim(),
    },
    ctx.rng,
  );
}

/** Activity C: Complete the Story. Falls back to discovery examples for parent-added words. */
export function storyQuestions(word: Word, ctx: GenContext): Question[] {
  const stories = word.stories?.length
    ? word.stories.map((s, i) => ({ text: s.text, key: `${word.id}:story:${i}` }))
    : word.examples.slice(0, 2).map((t, i) => ({ text: autoMark(t, word.text), key: `${word.id}:story-ex:${i}` }));
  return stories
    .filter((s) => countMarks(s.text) === 1)
    .map((s) =>
      finalize(
        {
          key: s.key,
          wordId: word.id,
          format: 'story',
          prompt: 'Which word completes the story?',
          passage: s.text,
          blank: true,
          options: wordOptions(word, ctx),
          explanation: means(word),
        },
        ctx.rng,
      ),
    )
    .filter((q): q is Question => q !== null);
}

/** Activity D: Word Detective. Falls back to meaning-from-context for parent-added words. */
export function detectiveQuestions(word: Word, ctx: GenContext): Question[] {
  if (word.detective?.length) {
    return word.detective
      .map((d, i) =>
        finalize(
          {
            key: `${word.id}:detective:${i}`,
            wordId: word.id,
            format: d.kind === 'usage' ? 'usage' : 'detective',
            prompt: d.question,
            passage: d.passage,
            options: d.options,
            explanation: d.explanation,
          },
          ctx.rng,
        ),
      )
      .filter((q): q is Question => q !== null);
  }
  const ex = word.examples[1] ?? word.examples[0];
  const q = ex
    ? finalize(
        {
          key: `${word.id}:detective-ex`,
          wordId: word.id,
          format: 'detective',
          prompt: `Use the clues. What does "${word.text}" mean here?`,
          passage: autoMark(ex, word.text),
          options: [word.definition, ...word.misconceptions.slice(0, 2), ...distractorWords(word, 2, ctx).map((w) => w.definition)].slice(0, 3),
          explanation: means(word),
        },
        ctx.rng,
      )
    : null;
  return q ? [q] : [];
}

// ───────────────────────────── Quiz / review generators ─────────────────────────────

export function whichWordQuestion(word: Word, ctx: GenContext): Question | null {
  return finalize(
    {
      key: `${word.id}:which-word`,
      wordId: word.id,
      format: 'which-word',
      prompt: `Which word means "${lowerFirst(word.definition)}"?`,
      options: wordOptions(word, ctx),
      explanation: means(word),
    },
    ctx.rng,
  );
}

/** Fill-in-the-blank using examples that are NOT on the discovery card (index 2+). */
export function exampleClozeQuestions(word: Word, ctx: GenContext, fromIndex = 2): Question[] {
  return word.examples
    .map((t, i) => ({ t: autoMark(t, word.text), i }))
    .filter(({ t, i }) => i >= fromIndex && countMarks(t) === 1)
    .map(({ t, i }) =>
      finalize(
        {
          key: `${word.id}:cloze:${i}`,
          wordId: word.id,
          format: 'cloze',
          prompt: 'Which word fits in the blank? (The ending might change a little.)',
          passage: t,
          blank: true,
          options: wordOptions(word, ctx),
          explanation: means(word),
        },
        ctx.rng,
      ),
    )
    .filter((q): q is Question => q !== null);
}

export function synonymQuestions(word: Word, ctx: GenContext): Question[] {
  const forbidden = new Set([...word.synonyms, word.text].map(norm));
  const pickDistractors = (): string[] => {
    const out: string[] = [];
    // Other words' synonyms first, then other vocabulary words themselves.
    for (const w of distractorWords(word, 6, ctx)) {
      const cand = shuffle(w.synonyms, ctx.rng).find((s) => !forbidden.has(norm(s)) && !out.map(norm).includes(norm(s)));
      if (cand && out.length < 2) out.push(cand);
    }
    for (const a of word.antonyms) if (out.length < 2 && !forbidden.has(norm(a))) out.push(a);
    return out;
  };
  return word.synonyms
    .map((syn, i) =>
      finalize(
        {
          key: `${word.id}:synonym:${i}`,
          wordId: word.id,
          format: 'synonym',
          prompt: `Which word means almost the SAME as "${word.text}"?`,
          options: [syn, ...pickDistractors()],
          explanation: `"${syn}" is a synonym of "${word.text}". ${means(word)}`,
        },
        ctx.rng,
      ),
    )
    .filter((q): q is Question => q !== null);
}

export function antonymQuestion(word: Word, ctx: GenContext): Question | null {
  if (!word.antonyms.length) return null;
  const ant = word.antonyms[0];
  const forbidden = new Set([...word.antonyms, word.text].map(norm));
  const distractors: string[] = [];
  // Using the word's own synonym as a distractor checks real understanding of the meaning.
  if (word.synonyms[0] && !forbidden.has(norm(word.synonyms[0]))) distractors.push(word.synonyms[0]);
  for (const w of distractorWords(word, 4, ctx)) {
    const cand = w.synonyms.find((s) => !forbidden.has(norm(s)) && !distractors.map(norm).includes(norm(s)));
    if (cand && distractors.length < 2) distractors.push(cand);
  }
  return finalize(
    {
      key: `${word.id}:antonym`,
      wordId: word.id,
      format: 'antonym',
      prompt: `Which word means the OPPOSITE of "${word.text}"?`,
      options: [ant, ...distractors],
      explanation: `"${ant}" is the opposite of "${word.text}". ${means(word)}`,
    },
    ctx.rng,
  );
}

/** "Which situation shows someone being X?" using this word's contexts vs. siblings' contexts. */
export function situationQuestions(word: Word, ctx: GenContext): Question[] {
  const others = distractorWords(word, 4, ctx).filter((w) => w.contexts.length);
  return word.contexts
    .map((c, i) => {
      const wrong = others.slice(0, 2).map((w) => w.contexts[(i + w.contexts.length) % w.contexts.length]);
      return finalize(
        {
          key: `${word.id}:situation:${i}`,
          wordId: word.id,
          format: 'situation',
          prompt: `Which situation is the best example of "${word.text}"?`,
          options: [c, ...wrong],
          explanation: `${means(word)} That fits: ${c}`,
        },
        ctx.rng,
      );
    })
    .filter((q): q is Question => q !== null);
}

export function applicationQuestions(word: Word, ctx: GenContext): Question[] {
  return (word.quizItems ?? [])
    .map((item, i) =>
      finalize(
        {
          key: `${word.id}:application:${i}`,
          wordId: word.id,
          format: 'application',
          prompt: item.prompt,
          options: item.options,
          explanation: item.explanation,
        },
        ctx.rng,
      ),
    )
    .filter((q): q is Question => q !== null);
}

/** All quiz-eligible questions for a word, grouped by format. */
export function quizCandidates(word: Word, ctx: GenContext): Partial<Record<QuestionFormat, Question[]>> {
  const ww = whichWordQuestion(word, ctx);
  const ant = antonymQuestion(word, ctx);
  return {
    application: applicationQuestions(word, ctx),
    situation: situationQuestions(word, ctx),
    cloze: exampleClozeQuestions(word, ctx),
    synonym: synonymQuestions(word, ctx),
    antonym: ant ? [ant] : [],
    'which-word': ww ? [ww] : [],
  };
}

/** Short review questions for Memory Mission (any example allowed; wider distractor pool). */
export function reviewCandidates(word: Word, ctx: GenContext): Question[] {
  const ww = whichWordQuestion(word, ctx);
  const m = meaningQuestion(word, ctx);
  return [
    ...(ww ? [ww] : []),
    ...(m ? [m] : []),
    ...exampleClozeQuestions(word, ctx, 0),
    ...synonymQuestions(word, ctx),
    ...situationQuestions(word, ctx),
  ].map((q) => ({ ...q, key: `review:${q.key}` }));
}
