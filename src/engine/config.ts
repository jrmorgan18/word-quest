import type { MasteryConfig, Settings } from './types';

/**
 * Default thresholds. These are product-design choices (not research-mandated cutoffs) and the
 * parent can change them in the dashboard.
 */
export const DEFAULT_CONFIG: MasteryConfig = {
  practiceActivitiesPerWord: 2,
  initial: { questionsPerWord: 3, passTotal: 8, perWordMin: 2 },
  delayed: { questionsPerWord: 2, passTotal: 5, perWordMin: 1, delayHours: 20 },
  reviewIntervalsDays: [1, 3, 7, 14, 30],
};

export const DEFAULT_SETTINGS: Settings = {
  childName: 'Brooks',
  soundOn: true,
  speechOn: true,
  speechRate: 0.9,
  motion: 'system',
  parentPinHash: null,
};
