import type { Week } from '../data/types';
import { buildStickerCatalog } from '../data/stickers';
import { sortedWeeks } from './progress';
import type { AppState, Source } from './types';

/** Grants a sticker once. Stickers are never removed by gameplay. Mutates. */
export function awardSticker(state: AppState, stickerId: string, source: Source, now: number): boolean {
  if (state.stickers[stickerId]) return false;
  state.stickers[stickerId] = { unlockedAt: now, source };
  if (source === 'earned') state.celebrations.push({ kind: 'sticker', stickerId });
  return true;
}

export function awardAchievement(state: AppState, id: string, title: string, description: string, now: number, weekId?: string): boolean {
  if (state.achievements[id]) return false;
  state.achievements[id] = { id, title, description, earnedAt: now, weekId };
  state.celebrations.push({ kind: 'achievement', achievementId: id });
  return true;
}

export function unlockNextWeek(state: AppState, week: Week, source: 'progression' | 'parent'): void {
  const next = sortedWeeks(state).find((w) => w.number > week.number);
  if (!next) return;
  const wp = state.weekProgress[next.id];
  if (wp && !wp.unlocked) {
    wp.unlocked = true;
    wp.unlockSource = source;
  }
}

/** Achievement stickers tied to real learning activity (never to raw tapping). Mutates. */
export function checkAchievementStickers(state: AppState, now: number): void {
  if (state.stats.memoryMissions >= 1) awardSticker(state, 'stk-ach-memory-1', 'earned', now);
  if (state.stats.reviewsCorrect >= 10) awardSticker(state, 'stk-ach-memory-10', 'earned', now);
  if (state.stats.creativeDone >= 3) awardSticker(state, 'stk-ach-creative-3', 'earned', now);
}

export function stickerCatalog(state: AppState) {
  return buildStickerCatalog(state.curriculum);
}

export function ownedStickerIds(state: AppState): string[] {
  return Object.keys(state.stickers);
}
