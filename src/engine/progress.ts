import type { Week, Word } from '../data/types';
import { emptyWeekProgress, emptyWordProgress } from './seed';
import {
  PRACTICE_ACTIVITIES,
  type ActivityRecord,
  type ActivityType,
  type AppState,
  type PracticeActivity,
  type WeekProgress,
  type WordProgress,
} from './types';

export type WordStatus = 'new' | 'explored' | 'practicing' | 'learned' | 'mastered';

export function wordProgress(state: AppState, wordId: string): WordProgress {
  return state.wordProgress[wordId] ?? emptyWordProgress(wordId);
}

export function weekProgress(state: AppState, weekId: string): WeekProgress {
  return state.weekProgress[weekId] ?? emptyWeekProgress(weekId);
}

/** Ensures progress records exist (for parent-added words/weeks). Mutates. */
export function ensureProgress(state: AppState, wordId?: string, weekId?: string): void {
  if (wordId && !state.wordProgress[wordId]) state.wordProgress[wordId] = emptyWordProgress(wordId);
  if (weekId && !state.weekProgress[weekId]) state.weekProgress[weekId] = emptyWeekProgress(weekId);
}

export function weekWords(state: AppState, week: Week): Word[] {
  return week.wordIds.map((id) => state.curriculum.words[id]).filter((w): w is Word => Boolean(w));
}

export function findWeek(state: AppState, weekId: string): Week | undefined {
  return state.curriculum.weeks.find((w) => w.id === weekId);
}

export function weekOfWord(state: AppState, wordId: string): Week | undefined {
  return state.curriculum.weeks.find((w) => w.wordIds.includes(wordId));
}

export function sortedWeeks(state: AppState): Week[] {
  return [...state.curriculum.weeks].sort((a, b) => a.number - b.number);
}

export function practiceDone(p: WordProgress): Set<PracticeActivity> {
  const done = new Set<PracticeActivity>();
  for (const r of p.activityHistory) {
    if ((PRACTICE_ACTIVITIES as readonly string[]).includes(r.activity)) done.add(r.activity as PracticeActivity);
  }
  return done;
}

export function wordStatus(p: WordProgress): WordStatus {
  if (p.mastered) return 'mastered';
  if (p.learnedAt) return 'learned';
  if (practiceDone(p).size > 0) return 'practicing';
  if (p.exploredAt) return 'explored';
  return 'new';
}

export interface QuizGate {
  unlocked: boolean;
  /** Words still needing discovery. */
  unexplored: string[];
  /** wordId -> number of distinct practice activities still needed. */
  practiceNeeded: Record<string, number>;
}

export function quizGate(state: AppState, week: Week): QuizGate {
  const need = state.config.practiceActivitiesPerWord;
  const unexplored: string[] = [];
  const practiceNeeded: Record<string, number> = {};
  for (const w of weekWords(state, week)) {
    const p = wordProgress(state, w.id);
    if (!p.exploredAt && !p.mastered) unexplored.push(w.id);
    const remaining = Math.max(0, need - practiceDone(p).size);
    if (remaining > 0 && !p.mastered) practiceNeeded[w.id] = remaining;
  }
  const hasWords = week.wordIds.length > 0;
  return { unlocked: hasWords && unexplored.length === 0 && Object.keys(practiceNeeded).length === 0, unexplored, practiceNeeded };
}

export function delayedCheckAvailable(state: AppState, weekId: string, now: number): boolean {
  const wp = weekProgress(state, weekId);
  return Boolean(wp.initialPassedAt && !wp.delayedPassedAt && !wp.mastered && wp.delayedAvailableAt !== null && now >= wp.delayedAvailableAt);
}

/** The adventure the child is currently on: the lowest-numbered unlocked week that isn't mastered. */
export function currentWeek(state: AppState): Week | undefined {
  const weeks = sortedWeeks(state);
  return (
    weeks.find((w) => weekProgress(state, w.id).unlocked && !weekProgress(state, w.id).mastered) ??
    [...weeks].reverse().find((w) => weekProgress(state, w.id).unlocked)
  );
}

export type NextStep =
  | { kind: 'discover'; wordId: string }
  | { kind: 'practice'; activity: PracticeActivity }
  | { kind: 'refresher' }
  | { kind: 'quiz'; quizType: 'initial' | 'delayed' }
  | { kind: 'wait'; availableAt: number }
  | { kind: 'done' };

/** Suggests the single best next thing to do in a week (drives the big "Continue" button). */
export function nextStep(state: AppState, week: Week, now: number): NextStep {
  const wp = weekProgress(state, week.id);
  if (wp.mastered) return { kind: 'done' };
  const words = weekWords(state, week);
  const gate = quizGate(state, week);
  if (gate.unexplored.length) return { kind: 'discover', wordId: gate.unexplored[0] };
  if (!wp.initialPassedAt) {
    if (!gate.unlocked) {
      // Recommend the practice activity that the most words still need.
      const counts = new Map<PracticeActivity, number>();
      for (const w of words) {
        const done = practiceDone(wordProgress(state, w.id));
        for (const a of PRACTICE_ACTIVITIES) if (!done.has(a)) counts.set(a, (counts.get(a) ?? 0) + 1);
      }
      const best = [...PRACTICE_ACTIVITIES].sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0))[0];
      return { kind: 'practice', activity: best };
    }
    if (words.some((w) => wordProgress(state, w.id).needsRefresher)) return { kind: 'refresher' };
    return { kind: 'quiz', quizType: 'initial' };
  }
  if (delayedCheckAvailable(state, week.id, now)) {
    if (words.some((w) => wordProgress(state, w.id).needsRefresher)) return { kind: 'refresher' };
    return { kind: 'quiz', quizType: 'delayed' };
  }
  return { kind: 'wait', availableAt: wp.delayedAvailableAt ?? now };
}

/** Records discovery of a word (Activity A). Mutates. */
export function recordDiscovery(state: AppState, wordId: string, now: number): void {
  ensureProgress(state, wordId);
  const p = state.wordProgress[wordId];
  if (!p.exploredAt) p.exploredAt = now;
  p.activityHistory.push({ activity: 'discovery', at: now });
}

/** Records completion of a word's item within an activity. Mutates. */
export function recordActivity(
  state: AppState,
  wordId: string,
  activity: ActivityType,
  now: number,
  extra: Pick<ActivityRecord, 'firstTry' | 'itemKey'> = {},
): void {
  ensureProgress(state, wordId);
  const p = state.wordProgress[wordId];
  p.activityHistory.push({ activity, at: now, ...extra });
  if (extra.firstTry === false) p.struggle = Math.min(10, p.struggle + 1);
  if (extra.firstTry === true) p.struggle = Math.max(0, p.struggle - 0.25);
  if (activity === 'refresher') p.needsRefresher = false;
  // Keep history bounded so storage stays small over months of play.
  if (p.activityHistory.length > 400) p.activityHistory.splice(0, p.activityHistory.length - 400);
}

/** How many times each content item has been seen, for rotating through stories/cases. */
export function itemUseCounts(state: AppState, wordId: string, activity: ActivityType): Map<string, number> {
  const counts = new Map<string, number>();
  for (const r of wordProgress(state, wordId).activityHistory) {
    if (r.activity === activity && r.itemKey) counts.set(r.itemKey, (counts.get(r.itemKey) ?? 0) + 1);
  }
  return counts;
}

export function countMastered(state: AppState): number {
  return Object.values(state.wordProgress).filter((p) => p.mastered && state.curriculum.words[p.wordId]).length;
}

export function countLearned(state: AppState): number {
  return Object.values(state.wordProgress).filter((p) => (p.mastered || p.learnedAt) && state.curriculum.words[p.wordId]).length;
}
