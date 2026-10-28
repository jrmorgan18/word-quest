import type { Curriculum, Word } from './types';
import { WEEKS } from './weeks';
import { WORDS_01_03 } from './words/weeks01-03';
import { WORDS_04_06 } from './words/weeks04-06';
import { WORDS_07_10 } from './words/weeks07-10';
import { WORDS_11_15 } from './words/weeks11-15';
import { WORDS_16_20 } from './words/weeks16-20';

/**
 * Bump this whenever the bundled curriculum content changes. On launch, saved curricula with a
 * lower version are merged with the bundled one (see engine/migrations.ts) without
 * touching learning history or parent-customized words.
 */
export const CURRICULUM_VERSION = 2;

const ALL_WORDS: Word[] = [...WORDS_01_03, ...WORDS_04_06, ...WORDS_07_10, ...WORDS_11_15, ...WORDS_16_20];

export function bundledCurriculum(): Curriculum {
  const words: Record<string, Word> = {};
  for (const w of ALL_WORDS) words[w.id] = structuredClone(w);
  return { version: CURRICULUM_VERSION, words, weeks: structuredClone(WEEKS) };
}
