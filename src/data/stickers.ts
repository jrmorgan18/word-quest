import type { Curriculum, StickerDef } from './types';

/** Special larger stickers awarded when a week is fully mastered. */
const WEEK_STICKERS: Omit<StickerDef, 'kind' | 'baseScale'>[] = [
  { id: 'stk-week-1', name: 'Golden Fossil', description: 'Dinosaur Discovery conquered!', sourceId: 'week-1' },
  { id: 'stk-week-2', name: 'Star Rocket', description: 'Rocket Launch conquered!', sourceId: 'week-2' },
  { id: 'stk-week-3', name: 'Power-Up Chest', description: 'Pixel Power-Up conquered!', sourceId: 'week-3' },
  { id: 'stk-week-4', name: 'Rainbow Volcano', description: 'Volcano Valley conquered!', sourceId: 'week-4' },
  { id: 'stk-week-5', name: 'Ringed Planet', description: 'Alien Planet conquered!', sourceId: 'week-5' },
  { id: 'stk-week-6', name: 'Pixel Castle', description: 'Arcade Castle conquered!', sourceId: 'week-6' },
  { id: 'stk-week-7', name: 'Fossil Skeleton', description: 'Fossil Forest conquered!', sourceId: 'week-7' },
  { id: 'stk-week-8', name: 'Orbit Station', description: 'Space Station conquered!', sourceId: 'week-8' },
  { id: 'stk-week-9', name: 'Crystal Cluster', description: 'Treasure Caverns conquered!', sourceId: 'week-9' },
  { id: 'stk-week-10', name: 'Champion Trophy', description: 'Ultimate Word Quest conquered!', sourceId: 'week-10' },
  { id: 'stk-week-11', name: 'Speedy Comet', description: 'Comet Chase conquered!', sourceId: 'week-11' },
  { id: 'stk-week-12', name: 'Boss Crown', description: 'Boss Battle Arena conquered!', sourceId: 'week-12' },
  { id: 'stk-week-13', name: 'Amber Treasure', description: 'Dino Migration conquered!', sourceId: 'week-13' },
  { id: 'stk-week-14', name: 'Star Compass', description: 'Deep Space Voyage conquered!', sourceId: 'week-14' },
  { id: 'stk-week-15', name: 'Hero Shield', description: 'Hall of Heroes conquered!', sourceId: 'week-15' },
  { id: 'stk-week-16', name: 'Lava Crystal', description: 'Lava Lands conquered!', sourceId: 'week-16' },
  { id: 'stk-week-17', name: 'Mission Badge', description: 'Mission Control conquered!', sourceId: 'week-17' },
  { id: 'stk-week-18', name: 'Friendship Castle', description: 'Friendship Fortress conquered!', sourceId: 'week-18' },
  { id: 'stk-week-19', name: 'Canyon Flag', description: 'Canyon Climb conquered!', sourceId: 'week-19' },
  { id: 'stk-week-20', name: 'Galaxy Legend Crown', description: 'Legends of the Galaxy conquered!', sourceId: 'week-20' },
];

export const ACHIEVEMENT_STICKERS: StickerDef[] = [
  { id: 'stk-ach-memory-1', kind: 'achievement', name: 'Memory Comet', description: 'Finished your first Memory Mission.', sourceId: 'memory-1', baseScale: 1 },
  { id: 'stk-ach-memory-10', kind: 'achievement', name: 'Memory Champion', description: 'Remembered 10 review words.', sourceId: 'memory-10', baseScale: 1 },
  { id: 'stk-ach-creative-3', kind: 'achievement', name: 'Idea Lightbulb', description: 'Completed 3 Creative Challenges.', sourceId: 'creative-3', baseScale: 1 },
];

/** Builds the full sticker catalog for a curriculum (custom words get generic star stickers). */
export function buildStickerCatalog(curriculum: Curriculum): StickerDef[] {
  const wordStickers: StickerDef[] = curriculum.weeks.flatMap((week) =>
    week.wordIds
      .map((id) => curriculum.words[id])
      .filter(Boolean)
      .map((w) => ({
        id: w.stickerId,
        kind: 'word' as const,
        name: w.text,
        description: w.illustration,
        sourceId: w.id,
        baseScale: 1,
      })),
  );
  const weekStickers: StickerDef[] = curriculum.weeks.map((week) => {
    const known = WEEK_STICKERS.find((s) => s.id === week.rewardStickerId);
    return {
      id: week.rewardStickerId,
      kind: 'week' as const,
      name: known?.name ?? `${week.title} Trophy`,
      description: known?.description ?? `${week.title} conquered!`,
      sourceId: week.id,
      baseScale: 1.5,
    };
  });
  return [...wordStickers, ...weekStickers, ...ACHIEVEMENT_STICKERS];
}
