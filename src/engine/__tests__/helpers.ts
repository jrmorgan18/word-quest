import { DAY, HOUR } from '../../lib/clock';
import { recordActivity, recordDiscovery, findWeek } from '../progress';
import { applyQuizResult, buildQuiz } from '../quiz';
import { createInitialState } from '../seed';
import type { AppState } from '../types';

export const T0 = Date.UTC(2026, 9, 16, 15, 0, 0);
export { DAY, HOUR };

export function freshState(): AppState {
  return createInitialState(T0);
}

/** Explore all words in a week and complete two practice activities for each. */
export function practiceWeek(s: AppState, weekId: string, at = T0): void {
  const week = findWeek(s, weekId)!;
  for (const id of week.wordIds) {
    recordDiscovery(s, id, at);
    recordActivity(s, id, 'choose', at, { firstTry: true });
    recordActivity(s, id, 'story', at, { firstTry: true });
  }
}

export function passQuiz(s: AppState, weekId: string, type: 'initial' | 'delayed', at: number, seed = 1) {
  const quiz = buildQuiz(s, findWeek(s, weekId)!, type, at, seed);
  return applyQuizResult(s, quiz, quiz.questions.map((q) => q.answerIndex), at);
}
