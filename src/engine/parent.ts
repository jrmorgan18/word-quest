/**
 * Parent overrides and curriculum management. All functions mutate the given (draft) state.
 * Curriculum edits never delete learning history: progress is keyed by word id and kept even if a
 * word is replaced in its week.
 */
import type { Theme, Week, Word } from '../data/types';
import { slugify } from '../lib/text';
import { ensureProgress, findWeek, sortedWeeks } from './progress';
import { markWordMastered } from './quiz';
import { awardSticker, unlockNextWeek } from './rewards';
import type { AppState, MasteryConfig } from './types';

export function parentMarkWordMastered(state: AppState, wordId: string, now: number): void {
  ensureProgress(state, wordId);
  markWordMastered(state, wordId, 'parent-override', now);
}

export function parentMarkWeekComplete(state: AppState, weekId: string, now: number): void {
  const week = findWeek(state, weekId);
  if (!week) return;
  ensureProgress(state, undefined, weekId);
  const wp = state.weekProgress[weekId];
  for (const id of week.wordIds) parentMarkWordMastered(state, id, now);
  wp.unlocked = true;
  wp.unlockSource ??= 'parent';
  if (!wp.mastered) {
    wp.mastered = true;
    wp.masteredAt = now;
    wp.completionSource = 'parent-override';
  }
  awardSticker(state, week.rewardStickerId, 'parent-override', now);
  unlockNextWeek(state, week, 'parent');
}

export function parentSetWeekLocked(state: AppState, weekId: string, locked: boolean): void {
  ensureProgress(state, undefined, weekId);
  const wp = state.weekProgress[weekId];
  wp.unlocked = !locked;
  wp.unlockSource = locked ? null : 'parent';
}

/** Lets the delayed check start immediately. */
export function parentSkipWait(state: AppState, weekId: string, now: number): void {
  const wp = state.weekProgress[weekId];
  if (wp?.initialPassedAt && !wp.delayedPassedAt) wp.delayedAvailableAt = now;
}

/**
 * Resets a week's quiz progress so the quizzes can be taken again. Past attempts stay in history
 * (marked voided), and stickers are kept — earned rewards are never taken away.
 */
export function parentResetQuizProgress(state: AppState, weekId: string): void {
  const week = findWeek(state, weekId);
  const wp = state.weekProgress[weekId];
  if (!week || !wp) return;
  for (const a of state.quizAttempts) if (a.weekId === weekId) a.voided = true;
  wp.initialPassedAt = null;
  wp.delayedAvailableAt = null;
  wp.delayedPassedAt = null;
  wp.mastered = false;
  wp.masteredAt = null;
  wp.completionSource = null;
  for (const id of week.wordIds) {
    const p = state.wordProgress[id];
    if (!p) continue;
    p.learnedAt = null;
    p.masteredAt = null;
    p.mastered = false;
    p.masterySource = null;
    p.review = null;
    p.needsRefresher = false;
  }
}

export function parentUpdateConfig(state: AppState, config: MasteryConfig): void {
  const c = structuredClone(config);
  c.reviewIntervalsDays = c.reviewIntervalsDays.filter((d) => Number.isFinite(d) && d > 0);
  if (!c.reviewIntervalsDays.length) c.reviewIntervalsDays = [1, 3, 7, 14, 30];
  c.initial.passTotal = clamp(c.initial.passTotal, 1, c.initial.questionsPerWord * 3);
  c.delayed.passTotal = clamp(c.delayed.passTotal, 1, c.delayed.questionsPerWord * 3);
  c.initial.perWordMin = clamp(c.initial.perWordMin, 0, c.initial.questionsPerWord);
  c.delayed.perWordMin = clamp(c.delayed.perWordMin, 0, c.delayed.questionsPerWord);
  c.delayed.delayHours = clamp(c.delayed.delayHours, 0, 24 * 14);
  c.practiceActivitiesPerWord = clamp(c.practiceActivitiesPerWord, 0, 4);
  state.config = c;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, Math.round(Number(n) || 0)));
}

// ───────────────────────────── Curriculum editing ─────────────────────────────

export type WordEdit = Partial<
  Pick<
    Word,
    | 'text'
    | 'pronunciation'
    | 'partOfSpeech'
    | 'definition'
    | 'examples'
    | 'synonyms'
    | 'antonyms'
    | 'discussionPrompts'
    | 'contexts'
    | 'misconceptions'
    | 'creativePrompts'
    | 'illustration'
  >
>;

export function parentUpdateWord(state: AppState, wordId: string, edit: WordEdit): void {
  const w = state.curriculum.words[wordId];
  if (!w) return;
  Object.assign(w, cleanEdit(edit));
  w.customized = true;
}

function cleanEdit(edit: WordEdit): WordEdit {
  const out: WordEdit = { ...edit };
  for (const k of ['examples', 'synonyms', 'antonyms', 'discussionPrompts', 'contexts', 'misconceptions', 'creativePrompts'] as const) {
    if (out[k]) out[k] = out[k]!.map((s) => s.trim()).filter(Boolean);
  }
  return out;
}

export interface NewWordInput {
  text: string;
  definition: string;
  pronunciation?: string;
  partOfSpeech?: Word['partOfSpeech'];
  examples: string[];
  synonyms?: string[];
  antonyms?: string[];
  misconceptions?: string[];
  contexts?: string[];
  discussionPrompts?: string[];
  creativePrompts?: string[];
}

function uniqueWordId(state: AppState, text: string): string {
  const base = slugify(text) || 'word';
  let id = base;
  let n = 2;
  while (state.curriculum.words[id]) id = `${base}-${n++}`;
  return id;
}

function makeWord(state: AppState, weekNumber: number, input: NewWordInput): Word {
  const id = uniqueWordId(state, input.text);
  const clean = (a?: string[]) => (a ?? []).map((s) => s.trim()).filter(Boolean);
  const text = input.text.trim();
  return {
    id,
    week: weekNumber,
    text: text.charAt(0).toUpperCase() + text.slice(1),
    pronunciation: input.pronunciation?.trim() || text.toLowerCase(),
    partOfSpeech: input.partOfSpeech ?? 'adjective',
    definition: input.definition.trim(),
    examples: clean(input.examples),
    synonyms: clean(input.synonyms),
    antonyms: clean(input.antonyms),
    discussionPrompts: clean(input.discussionPrompts),
    contexts: clean(input.contexts),
    misconceptions: clean(input.misconceptions),
    creativePrompts: clean(input.creativePrompts),
    illustration: `A bright star badge for "${text}".`,
    stickerId: `stk-custom-${id}`,
    custom: true,
    customized: true,
  };
}

export function parentAddWord(state: AppState, weekId: string, input: NewWordInput): string | null {
  const week = findWeek(state, weekId);
  if (!week || !input.text.trim() || !input.definition.trim()) return null;
  const word = makeWord(state, week.number, input);
  state.curriculum.words[word.id] = word;
  week.wordIds.push(word.id);
  ensureProgress(state, word.id);
  return word.id;
}

/** Replaces a word in a week. The old word's progress and stickers remain in history. */
export function parentReplaceWord(state: AppState, weekId: string, oldWordId: string, input: NewWordInput): string | null {
  const week = findWeek(state, weekId);
  if (!week || !week.wordIds.includes(oldWordId)) return null;
  const oldIndex = week.wordIds.indexOf(oldWordId);
  const newId = parentAddWord(state, weekId, input);
  if (!newId) return null;
  // Put the new word in the old word's position.
  week.wordIds = week.wordIds.filter((id) => id !== newId);
  week.wordIds[oldIndex] = newId;
  return newId;
}

export function parentAddWeek(state: AppState, title: string, theme: Theme): string {
  const number = Math.max(0, ...state.curriculum.weeks.map((w) => w.number)) + 1;
  let id = `week-${number}`;
  while (findWeek(state, id)) id = `${id}-x`;
  const week: Week = {
    id,
    number,
    title: title.trim() || `Week ${number}`,
    theme,
    tagline: 'A brand-new adventure!',
    wordIds: [],
    rewardStickerId: `stk-${id}`,
    custom: true,
  };
  state.curriculum.weeks.push(week);
  ensureProgress(state, undefined, id);
  // Unlock right away if the previous week is already mastered.
  const prev = sortedWeeks(state).filter((w) => w.number < number).pop();
  if (prev && state.weekProgress[prev.id]?.mastered) {
    state.weekProgress[id].unlocked = true;
    state.weekProgress[id].unlockSource = 'progression';
  }
  return id;
}

export function parentUpdateWeek(state: AppState, weekId: string, patch: Partial<Pick<Week, 'title' | 'theme' | 'tagline'>>): void {
  const week = findWeek(state, weekId);
  if (week) Object.assign(week, patch);
}
