/**
 * Curriculum content types.
 *
 * Text conventions used throughout the curriculum data:
 *  - In example sentences, stories and detective sentences the vocabulary word is wrapped in
 *    braces, e.g. "The goalie {anticipated} where the ball would go." The braces mark the exact
 *    form used so the UI can highlight it or turn it into a blank.
 *  - For every multiple-choice item, the FIRST option is the correct answer. Options are
 *    shuffled at runtime, so authors never need to think about answer positions.
 */

export type Theme = 'dino' | 'space' | 'arcade';
export type StoryContext = Theme | 'school' | 'sports' | 'everyday';
export type PartOfSpeech = 'verb' | 'adjective' | 'noun' | 'adverb';

export interface WordFamilyMember {
  form: string;
  partOfSpeech: PartOfSpeech;
  /** Example using the family member, with the form in braces. */
  example: string;
}

/** Discovery-card thinking question (Activity A). */
export interface DiscoveryQuestion {
  /** Short caption describing what the illustration shows. */
  scene: string;
  question: string;
  /** First choice is correct. */
  choices: string[];
  explanation: string;
}

/** A short story with the vocabulary word in braces; the braces become the blank (Activity C). */
export interface StoryItem {
  context: StoryContext;
  text: string;
}

export type DetectiveKind = 'meaning' | 'usage' | 'character';

/** Word Detective item (Activity D): infer meaning from context. */
export interface DetectiveItem {
  kind: DetectiveKind;
  /** Optional passage shown above the question; vocabulary word in braces. */
  passage?: string;
  question: string;
  /** First option is correct. */
  options: string[];
  explanation: string;
}

/** Quiz-only application question. Never shown in practice activities. */
export interface ApplicationItem {
  prompt: string;
  /** First option is correct. */
  options: string[];
  explanation: string;
}

/** "Persistent vs. stubborn" style comparison (Activity E). */
export interface NuanceItem {
  versus: string;
  versusDefinition: string;
  explanation: string;
  /** Each sentence fits either the vocabulary word or the comparison word. */
  sentences: { text: string; answer: 'word' | 'versus' }[];
}

export interface Word {
  id: string;
  week: number;
  text: string;
  pronunciation: string;
  partOfSpeech: PartOfSpeech;
  definition: string;
  /** At least three. [0] and [1] appear on the discovery card; the rest are reserved for quizzes. */
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  discussionPrompts: string[];
  /** Three short situations that show the word in action (used for "which situation" questions). */
  contexts: string[];
  /** Plausible wrong meanings, used as distractors for "what does it mean" questions. */
  misconceptions: string[];
  wordFamily?: WordFamilyMember[];
  illustration: string;
  stickerId: string;
  discovery?: DiscoveryQuestion;
  stories?: StoryItem[];
  detective?: DetectiveItem[];
  quizItems?: ApplicationItem[];
  creativePrompts?: string[];
  nuance?: NuanceItem;
  /** Set when a parent has edited this word; bundled curriculum updates won't overwrite it. */
  customized?: boolean;
  /** Set for parent-added words. */
  custom?: boolean;
}

export interface Week {
  id: string;
  number: number;
  title: string;
  theme: Theme;
  tagline: string;
  wordIds: string[];
  /** Special larger sticker awarded when the week is fully mastered. */
  rewardStickerId: string;
  custom?: boolean;
}

export type StickerKind = 'word' | 'week' | 'achievement';

export interface StickerDef {
  id: string;
  kind: StickerKind;
  name: string;
  description: string;
  /** Word id or week id or achievement id that unlocks it. */
  sourceId: string;
  /** Default size multiplier when placed in a scene. Weekly stickers are bigger. */
  baseScale: number;
}

export interface Curriculum {
  version: number;
  words: Record<string, Word>;
  weeks: Week[];
}
