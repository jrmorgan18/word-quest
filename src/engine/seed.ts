import { bundledCurriculum } from '../data/curriculum';
import { DAY } from '../lib/clock';
import { DEFAULT_CONFIG, DEFAULT_SETTINGS } from './config';
import { SCHEMA_VERSION, type AppState, type SceneId, type WeekProgress, type WordProgress } from './types';

export function emptyWordProgress(wordId: string): WordProgress {
  return {
    wordId,
    exploredAt: null,
    activityHistory: [],
    learnedAt: null,
    masteredAt: null,
    mastered: false,
    masterySource: null,
    review: null,
    struggle: 0,
    needsRefresher: false,
  };
}

export function emptyWeekProgress(weekId: string): WeekProgress {
  return {
    weekId,
    unlocked: false,
    unlockSource: null,
    initialPassedAt: null,
    delayedAvailableAt: null,
    delayedPassedAt: null,
    mastered: false,
    masteredAt: null,
    completionSource: null,
  };
}

export const SCENE_IDS: SceneId[] = ['dino', 'space', 'arcade'];

/** Week numbers that were completed before the app existed (parent-confirmed). */
export const HISTORICAL_WEEKS = [1, 2];
export const FIRST_PLAYABLE_WEEK = 3;

/**
 * Creates the first-launch state:
 *  - Weeks 1 and 2 are marked mastered with source "parent-confirmed". No quiz attempts or dates
 *    are invented: masteredAt stays null.
 *  - Their six word stickers and two weekly stickers are granted.
 *  - Their words get spaced-review schedules starting from first launch, staggered so only a
 *    couple show up per day.
 *  - Week 3 is unlocked and ready to play.
 */
export function createInitialState(now: number): AppState {
  const curriculum = bundledCurriculum();
  const state: AppState = {
    schemaVersion: SCHEMA_VERSION,
    createdAt: now,
    curriculum,
    wordProgress: {},
    weekProgress: {},
    quizAttempts: [],
    stickers: {},
    achievements: {},
    scenes: {
      dino: { id: 'dino', placements: [], updatedAt: null },
      space: { id: 'space', placements: [], updatedAt: null },
      arcade: { id: 'arcade', placements: [], updatedAt: null },
    },
    settings: { ...DEFAULT_SETTINGS },
    config: structuredClone(DEFAULT_CONFIG),
    stats: { reviewsDone: 0, reviewsCorrect: 0, memoryMissions: 0, creativeDone: 0 },
    celebrations: [],
  };

  for (const id of Object.keys(curriculum.words)) state.wordProgress[id] = emptyWordProgress(id);

  let stagger = 0;
  for (const week of curriculum.weeks) {
    const wp = emptyWeekProgress(week.id);
    if (HISTORICAL_WEEKS.includes(week.number)) {
      wp.unlocked = true;
      wp.unlockSource = 'historical';
      wp.mastered = true;
      wp.completionSource = 'parent-confirmed';
      wp.note = 'Learned and mastered before Word Quest. Confirmed by a parent.';
      state.stickers[week.rewardStickerId] = { unlockedAt: null, source: 'parent-confirmed' };
      for (const wordId of week.wordIds) {
        const p = state.wordProgress[wordId];
        p.mastered = true;
        p.masterySource = 'parent-confirmed';
        p.review = {
          stage: 1,
          // Two words become due per day, starting the day after first launch.
          dueAt: now + (1 + Math.floor(stagger / 2)) * DAY,
          lastReviewedAt: null,
          lapses: 0,
          history: [],
        };
        stagger++;
        state.stickers[curriculum.words[wordId].stickerId] = { unlockedAt: null, source: 'parent-confirmed' };
      }
    } else if (week.number === FIRST_PLAYABLE_WEEK) {
      wp.unlocked = true;
      wp.unlockSource = 'initial';
    }
    state.weekProgress[week.id] = wp;
  }
  return state;
}
