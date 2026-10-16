import type { Curriculum, Theme } from '../data/types';

export const SCHEMA_VERSION = 1;

export type ActivityType = 'discovery' | 'choose' | 'story' | 'detective' | 'connections' | 'creative' | 'refresher';

/** Activities that count toward unlocking the weekly quiz. Creative challenges are a bonus. */
export const PRACTICE_ACTIVITIES = ['choose', 'story', 'detective', 'connections'] as const;
export type PracticeActivity = (typeof PRACTICE_ACTIVITIES)[number];

export type QuizType = 'initial' | 'delayed';
export type Source = 'earned' | 'parent-confirmed' | 'parent-override';

export interface ActivityRecord {
  activity: ActivityType;
  at: number;
  /** Was the item answered correctly on the first try? (Undefined for participation activities.) */
  firstTry?: boolean;
  /** Stable id of the content item, used to rotate through stories/detective cases. */
  itemKey?: string;
}

export interface ReviewEvent {
  at: number;
  correct: boolean;
}

export interface ReviewState {
  /** Index into config.reviewIntervalsDays for the NEXT interval after a successful review. */
  stage: number;
  dueAt: number;
  lastReviewedAt: number | null;
  lapses: number;
  history: ReviewEvent[];
}

export interface WordProgress {
  wordId: string;
  exploredAt: number | null;
  activityHistory: ActivityRecord[];
  /** Passed the initial weekly quiz. */
  learnedAt: number | null;
  /** Passed the delayed mastery check (or confirmed by a parent). */
  masteredAt: number | null;
  /** True once mastered, even when the date is unknown (historical, parent-confirmed). */
  mastered: boolean;
  masterySource: Source | null;
  review: ReviewState | null;
  /** Adaptive weight: grows with misses, shrinks with correct answers. */
  struggle: number;
  /** Set after a missed quiz; cleared by the Quick Refresher. */
  needsRefresher: boolean;
}

export type QuestionFormat =
  | 'meaning'
  | 'which-word'
  | 'cloze'
  | 'synonym'
  | 'antonym'
  | 'situation'
  | 'application'
  | 'usage'
  | 'detective'
  | 'story'
  | 'family';

export interface Question {
  /** Stable content key, used to avoid repeating questions across quiz variations. */
  key: string;
  wordId: string;
  format: QuestionFormat;
  prompt: string;
  /** Optional passage; braces mark the vocabulary word (turned into a blank when `blank` is true). */
  passage?: string;
  blank?: boolean;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  quizType: QuizType;
  weekId: string;
  startedAt: number;
  completedAt: number;
  questions: Question[];
  answers: number[];
  correctness: boolean[];
  score: number;
  total: number;
  perWord: Record<string, { correct: number; total: number }>;
  passed: boolean;
  /** Set when a parent resets quiz progress; kept for history but ignored for progression. */
  voided?: boolean;
}

export interface WeekProgress {
  weekId: string;
  unlocked: boolean;
  unlockSource: 'initial' | 'progression' | 'parent' | 'historical' | null;
  initialPassedAt: number | null;
  delayedAvailableAt: number | null;
  delayedPassedAt: number | null;
  /** True once the week is fully mastered. */
  mastered: boolean;
  masteredAt: number | null;
  completionSource: Source | null;
  /** Free-text note for historical completions. */
  note?: string;
}

export interface StickerOwnership {
  unlockedAt: number | null;
  source: Source;
}

export type SceneId = Theme;

export interface StickerPlacement {
  id: string;
  stickerId: string;
  /** Center position as a fraction (0–1) of scene width/height. */
  x: number;
  y: number;
  scale: number;
  /** Higher numbers draw on top. */
  layer: number;
  flip?: boolean;
}

export interface SceneState {
  id: SceneId;
  placements: StickerPlacement[];
  updatedAt: number | null;
}

export interface Settings {
  childName: string;
  soundOn: boolean;
  speechOn: boolean;
  speechRate: number;
  motion: 'system' | 'reduced' | 'full';
}

export interface MasteryConfig {
  practiceActivitiesPerWord: number;
  initial: { questionsPerWord: number; passTotal: number; perWordMin: number };
  delayed: { questionsPerWord: number; passTotal: number; perWordMin: number; delayHours: number };
  reviewIntervalsDays: number[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedAt: number | null;
  weekId?: string;
}

export type Celebration =
  | { kind: 'sticker'; stickerId: string }
  | { kind: 'achievement'; achievementId: string }
  | { kind: 'week-mastered'; weekId: string };

export interface Stats {
  reviewsDone: number;
  reviewsCorrect: number;
  memoryMissions: number;
  creativeDone: number;
}

export interface AppState {
  schemaVersion: number;
  createdAt: number;
  curriculum: Curriculum;
  wordProgress: Record<string, WordProgress>;
  weekProgress: Record<string, WeekProgress>;
  quizAttempts: QuizAttempt[];
  stickers: Record<string, StickerOwnership>;
  achievements: Record<string, Achievement>;
  scenes: Record<SceneId, SceneState>;
  settings: Settings;
  config: MasteryConfig;
  stats: Stats;
  celebrations: Celebration[];
}
