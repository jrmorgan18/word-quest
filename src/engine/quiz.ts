import type { Week, Word } from '../data/types';
import { DAY, HOUR } from '../lib/clock';
import { createRng, shuffle, uid, type Rng } from '../lib/random';
import { findWeek, weekProgress, weekWords } from './progress';
import { quizCandidates, type GenContext } from './questions';
import { awardSticker, awardAchievement, unlockNextWeek } from './rewards';
import type { AppState, Question, QuestionFormat, QuizAttempt, QuizType } from './types';

const SECONDARY_FORMATS: Record<QuizType, QuestionFormat[]> = {
  initial: ['which-word', 'cloze', 'synonym', 'antonym', 'situation'],
  delayed: ['situation', 'cloze', 'synonym', 'antonym', 'which-word'],
};

/** Keys of every question already asked in this week's quizzes (any attempt). */
export function usedQuizKeys(state: AppState, weekId: string): Map<string, number> {
  const used = new Map<string, number>();
  for (const a of state.quizAttempts) {
    if (a.weekId !== weekId) continue;
    for (const q of a.questions) used.set(q.key, Math.max(used.get(q.key) ?? 0, a.completedAt));
  }
  return used;
}

/** Prefer never-used questions; otherwise the one used longest ago. */
function choose(cands: Question[], used: Map<string, number>, taken: Set<string>, rng: Rng): Question | undefined {
  const avail = shuffle(cands, rng).filter((q) => !taken.has(q.key));
  if (!avail.length) return undefined;
  const fresh = avail.filter((q) => !used.has(q.key));
  if (fresh.length) return fresh[0];
  return avail.sort((a, b) => (used.get(a.key) ?? 0) - (used.get(b.key) ?? 0))[0];
}

function questionsForWord(word: Word, quizType: QuizType, perWord: number, ctx: GenContext, used: Map<string, number>): Question[] {
  const cands = quizCandidates(word, ctx);
  const taken = new Set<string>();
  const out: Question[] = [];
  const push = (q: Question | undefined) => {
    if (q && out.length < perWord) {
      out.push(q);
      taken.add(q.key);
    }
  };

  // 1) At least one context/application question per word.
  push(choose(cands.application ?? [], used, taken, ctx.rng) ?? choose(cands.situation ?? [], used, taken, ctx.rng));

  // 2) Fill the rest with *different* formats, preferring unused content.
  const formatsUsed = new Set(out.map((q) => q.format));
  const order = shuffle(SECONDARY_FORMATS[quizType], ctx.rng).sort((a, b) => {
    const aFresh = (cands[a] ?? []).some((q) => !used.has(q.key)) ? 0 : 1;
    const bFresh = (cands[b] ?? []).some((q) => !used.has(q.key)) ? 0 : 1;
    return aFresh - bFresh;
  });
  for (const f of order) {
    if (out.length >= perWord) break;
    if (formatsUsed.has(f)) continue;
    const q = choose(cands[f] ?? [], used, taken, ctx.rng);
    if (q) {
      push(q);
      formatsUsed.add(f);
    }
  }
  // 3) If formats ran out (sparse parent-added words), allow repeats of a format.
  for (const f of [...order, 'application' as QuestionFormat]) {
    while (out.length < perWord) {
      const q = choose(cands[f] ?? [], used, taken, ctx.rng);
      if (!q) break;
      push(q);
    }
  }
  return out;
}

/** Avoids the same word appearing twice in a row where possible. */
function interleave(questions: Question[], rng: Rng): Question[] {
  let best = shuffle(questions, rng);
  const adj = (qs: Question[]) => qs.reduce((n, q, i) => n + (i > 0 && qs[i - 1].wordId === q.wordId ? 1 : 0), 0);
  for (let i = 0; i < 30 && adj(best) > 0; i++) {
    const cand = shuffle(questions, rng);
    if (adj(cand) < adj(best)) best = cand;
  }
  return best;
}

export interface BuiltQuiz {
  quizType: QuizType;
  weekId: string;
  questions: Question[];
  startedAt: number;
}

export function buildQuiz(state: AppState, week: Week, quizType: QuizType, now: number, seed?: number): BuiltQuiz {
  const rng = createRng(seed);
  const words = weekWords(state, week);
  const perWord = quizType === 'initial' ? state.config.initial.questionsPerWord : state.config.delayed.questionsPerWord;
  const used = usedQuizKeys(state, week.id);
  const ctx: GenContext = { curriculum: state.curriculum, rng, siblings: words };
  const questions = words.flatMap((w) => questionsForWord(w, quizType, perWord, ctx, used));
  return { quizType, weekId: week.id, questions: interleave(questions, rng), startedAt: now };
}

/** Scales the configured pass mark when a week has more or fewer than three words. */
export function requiredTotal(state: AppState, quizType: QuizType, totalQuestions: number, wordCount: number): number {
  const cfg = quizType === 'initial' ? state.config.initial : state.config.delayed;
  const designed = cfg.questionsPerWord * 3;
  if (wordCount === 3 && totalQuestions === designed) return Math.min(cfg.passTotal, totalQuestions);
  return Math.min(totalQuestions, Math.ceil((totalQuestions * cfg.passTotal) / designed));
}

export interface GradeResult {
  score: number;
  total: number;
  correctness: boolean[];
  perWord: Record<string, { correct: number; total: number }>;
  passed: boolean;
  missedWordIds: string[];
}

export function gradeQuiz(state: AppState, quiz: BuiltQuiz, answers: number[]): GradeResult {
  const cfg = quiz.quizType === 'initial' ? state.config.initial : state.config.delayed;
  const correctness = quiz.questions.map((q, i) => answers[i] === q.answerIndex);
  const perWord: Record<string, { correct: number; total: number }> = {};
  quiz.questions.forEach((q, i) => {
    perWord[q.wordId] ??= { correct: 0, total: 0 };
    perWord[q.wordId].total++;
    if (correctness[i]) perWord[q.wordId].correct++;
  });
  const score = correctness.filter(Boolean).length;
  const total = quiz.questions.length;
  const wordIds = Object.keys(perWord);
  const perWordOk = wordIds.every((id) => perWord[id].correct >= Math.min(cfg.perWordMin, perWord[id].total));
  const passed = total > 0 && score >= requiredTotal(state, quiz.quizType, total, wordIds.length) && perWordOk;
  const missedWordIds = wordIds.filter((id) => perWord[id].correct < perWord[id].total);
  return { score, total, correctness, perWord, passed, missedWordIds };
}

/**
 * Records a completed quiz and applies its consequences. Mutates state.
 *  - Initial pass: words become "learned", word stickers + weekly achievement are awarded, and the
 *    delayed check is scheduled.
 *  - Delayed pass: words become mastered, review schedules start, the weekly mega-sticker is
 *    awarded, and the next week unlocks.
 *  - Not passed: missed words get a Quick Refresher flag. Nothing is taken away.
 */
export function applyQuizResult(state: AppState, quiz: BuiltQuiz, answers: number[], now: number): QuizAttempt {
  const g = gradeQuiz(state, quiz, answers);
  const attempt: QuizAttempt = {
    id: uid('quiz'),
    quizType: quiz.quizType,
    weekId: quiz.weekId,
    startedAt: quiz.startedAt,
    completedAt: now,
    questions: quiz.questions,
    answers,
    correctness: g.correctness,
    score: g.score,
    total: g.total,
    perWord: g.perWord,
    passed: g.passed,
  };
  state.quizAttempts.push(attempt);

  const week = findWeek(state, quiz.weekId);
  const wp = state.weekProgress[quiz.weekId];
  if (!week || !wp) return attempt;

  // Adaptive weights: misses raise struggle, correct answers lower it.
  quiz.questions.forEach((q, i) => {
    const p = state.wordProgress[q.wordId];
    if (!p) return;
    p.struggle = g.correctness[i] ? Math.max(0, p.struggle - 0.5) : Math.min(10, p.struggle + 1);
  });

  if (!g.passed) {
    for (const id of g.missedWordIds) if (state.wordProgress[id]) state.wordProgress[id].needsRefresher = true;
    return attempt;
  }

  for (const id of week.wordIds) if (state.wordProgress[id]) state.wordProgress[id].needsRefresher = false;

  if (quiz.quizType === 'initial') {
    wp.initialPassedAt = now;
    wp.delayedAvailableAt = now + state.config.delayed.delayHours * HOUR;
    for (const id of week.wordIds) {
      const p = state.wordProgress[id];
      const w = state.curriculum.words[id];
      if (!p || !w) continue;
      p.learnedAt ??= now;
      awardSticker(state, w.stickerId, 'earned', now);
    }
    awardAchievement(state, `quiz-${week.id}`, `${week.title} Quiz Champion`, `Passed the Week ${week.number} quiz!`, now, week.id);
  } else {
    wp.delayedPassedAt = now;
    wp.mastered = true;
    wp.masteredAt = now;
    wp.completionSource = 'earned';
    for (const id of week.wordIds) markWordMastered(state, id, 'earned', now);
    awardSticker(state, week.rewardStickerId, 'earned', now);
    state.celebrations.push({ kind: 'week-mastered', weekId: week.id });
    unlockNextWeek(state, week, 'progression');
  }
  return attempt;
}

export function markWordMastered(state: AppState, wordId: string, source: 'earned' | 'parent-override', now: number): void {
  const p = state.wordProgress[wordId];
  const w = state.curriculum.words[wordId];
  if (!p || !w) return;
  p.learnedAt ??= now;
  if (!p.mastered) {
    p.mastered = true;
    p.masteredAt = now;
    p.masterySource = source;
  }
  p.needsRefresher = false;
  p.review ??= {
    stage: 1,
    dueAt: now + (state.config.reviewIntervalsDays[0] ?? 1) * DAY,
    lastReviewedAt: null,
    lapses: 0,
    history: [],
  };
  awardSticker(state, w.stickerId, source, now);
}

export function latestAttempt(state: AppState, weekId: string, quizType?: QuizType): QuizAttempt | undefined {
  return [...state.quizAttempts].reverse().find((a) => a.weekId === weekId && !a.voided && (!quizType || a.quizType === quizType));
}

export function weekAttempts(state: AppState, weekId: string): QuizAttempt[] {
  return state.quizAttempts.filter((a) => a.weekId === weekId);
}

export { weekProgress };
