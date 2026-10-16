import type { Word } from '../data/types';
import { DAY } from '../lib/clock';
import { createRng, shuffle } from '../lib/random';
import { weekOfWord, weekWords } from './progress';
import { reviewCandidates } from './questions';
import { checkAchievementStickers } from './rewards';
import type { AppState, Question, WordProgress } from './types';

/**
 * Lightweight spaced review.
 *  - After mastery, a word is due after intervals[0] days (default 1, 3, 7, 14, 30).
 *  - Correct recall moves to the next (longer) interval.
 *  - A miss shows a refresher, steps back two stages, and makes the word due again tomorrow.
 *  - Misses NEVER remove mastery, stickers, or block progress.
 */
export function intervalDays(state: AppState, stage: number): number {
  const iv = state.config.reviewIntervalsDays.length ? state.config.reviewIntervalsDays : [1, 3, 7, 14, 30];
  return iv[Math.min(Math.max(stage, 0), iv.length - 1)];
}

/** Higher = review sooner. Overdue words and words Brooks has struggled with come first. */
export function reviewPriority(p: WordProgress, now: number): number {
  if (!p.review) return -Infinity;
  const overdueDays = (now - p.review.dueAt) / DAY;
  return overdueDays + p.struggle * 1.5 + p.review.lapses;
}

export function dueReviewWordIds(state: AppState, now: number): string[] {
  return Object.values(state.wordProgress)
    .filter((p) => p.mastered && p.review && p.review.dueAt <= now && state.curriculum.words[p.wordId])
    .sort((a, b) => reviewPriority(b, now) - reviewPriority(a, now))
    .map((p) => p.wordId);
}

export function nextReviewAt(state: AppState): number | null {
  const times = Object.values(state.wordProgress)
    .filter((p) => p.mastered && p.review && state.curriculum.words[p.wordId])
    .map((p) => p.review!.dueAt);
  return times.length ? Math.min(...times) : null;
}

export const MEMORY_MISSION_MAX = 5;

export interface MemoryMission {
  questions: Question[];
}

export function buildMemoryMission(state: AppState, now: number, seed?: number): MemoryMission {
  const rng = createRng(seed);
  const ids = dueReviewWordIds(state, now).slice(0, MEMORY_MISSION_MAX);
  const questions: Question[] = [];
  for (const id of ids) {
    const word = state.curriculum.words[id];
    const week = weekOfWord(state, id);
    const siblings: Word[] = week ? weekWords(state, week) : [];
    const pool = Object.values(state.curriculum.words).filter((w) => state.wordProgress[w.id]?.mastered);
    const cands = reviewCandidates(word, { curriculum: state.curriculum, rng, siblings, pool });
    // Rotate formats: avoid repeating the last reviewed question for this word.
    const lastKeys = new Set(state.wordProgress[id].activityHistory.filter((r) => r.activity === 'refresher' || r.itemKey?.startsWith('review:')).slice(-3).map((r) => r.itemKey));
    const fresh = cands.filter((q) => !lastKeys.has(q.key));
    const q = shuffle(fresh.length ? fresh : cands, rng)[0];
    if (q) questions.push(q);
  }
  return { questions: shuffle(questions, rng) };
}

/** Records one review answer. Mutates. */
export function recordReview(state: AppState, wordId: string, correct: boolean, now: number, itemKey?: string): void {
  const p = state.wordProgress[wordId];
  if (!p || !p.review) return;
  const r = p.review;
  r.history.push({ at: now, correct });
  r.lastReviewedAt = now;
  p.activityHistory.push({ activity: 'refresher', at: now, firstTry: correct, itemKey });
  state.stats.reviewsDone++;
  if (correct) {
    state.stats.reviewsCorrect++;
    r.dueAt = now + intervalDays(state, r.stage) * DAY;
    r.stage = Math.min(r.stage + 1, state.config.reviewIntervalsDays.length - 1);
    p.struggle = Math.max(0, p.struggle - 1);
  } else {
    r.lapses++;
    r.stage = Math.max(0, r.stage - 2);
    r.dueAt = now + 1 * DAY;
    p.struggle = Math.min(10, p.struggle + 1);
  }
}

export function completeMemoryMission(state: AppState, now: number): void {
  state.stats.memoryMissions++;
  checkAchievementStickers(state, now);
}
