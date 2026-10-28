import { describe, expect, it } from 'vitest';
import { bundledCurriculum } from '../../data/curriculum';
import { buildStickerCatalog } from '../../data/stickers';
import { countMarks } from '../../lib/text';
import { hasArt } from '../../art/stickers';

const c = bundledCurriculum();
const words = Object.values(c.words);

describe('bundled curriculum', () => {
  it('has 20 weeks: 3 words each in weeks 1-10, 5 words each in weeks 11-20 (80 words)', () => {
    expect(c.weeks).toHaveLength(20);
    expect(words).toHaveLength(80);
    for (const w of c.weeks) expect(w.wordIds, w.id).toHaveLength(w.number <= 10 ? 3 : 5);
    const all = c.weeks.flatMap((w) => w.wordIds);
    expect(new Set(all).size).toBe(80);
    for (const id of all) expect(c.words[id]).toBeDefined();
    for (const w of c.weeks) for (const id of w.wordIds) expect(c.words[id].week, id).toBe(w.number);
  });

  it('gives every word and week its own sticker artwork', () => {
    for (const w of words) expect(hasArt(w.stickerId), w.stickerId).toBe(true);
    for (const w of c.weeks) expect(hasArt(w.rewardStickerId), w.rewardStickerId).toBe(true);
  });

  it('seeds the required words in weeks 1-3', () => {
    expect(c.weeks[0].wordIds).toEqual(['peculiar', 'reluctant', 'observe']);
    expect(c.weeks[1].wordIds).toEqual(['inevitable', 'resourceful', 'astonished']);
    expect(c.weeks[2].wordIds).toEqual(['anticipate', 'persistent', 'consequence']);
    expect(c.words.peculiar.definition).toBe('Strange or unusual');
    expect(c.words.anticipate.examples[0]).toContain('goalie');
  });

  it.each(words.map((w) => [w.id, w] as const))('%s has a complete content record', (_id, w) => {
    expect(w.text.length).toBeGreaterThan(2);
    expect(w.pronunciation).toBeTruthy();
    expect(w.definition).toBeTruthy();
    expect(w.examples.length).toBeGreaterThanOrEqual(3);
    for (const e of w.examples) expect(countMarks(e), e).toBe(1);
    expect(w.synonyms.length).toBeGreaterThanOrEqual(2);
    expect(w.antonyms.length).toBeLessThanOrEqual(1);
    expect(w.discussionPrompts).toHaveLength(2);
    expect(w.contexts).toHaveLength(3);
    expect(w.misconceptions).toHaveLength(2);
    expect(w.illustration).toBeTruthy();
    expect(w.stickerId).toBe(`stk-${w.id}`);
    expect(w.discovery?.choices.length).toBeGreaterThanOrEqual(3);
    expect(w.stories!.length).toBeGreaterThanOrEqual(3);
    for (const s of w.stories!) expect(countMarks(s.text), s.text).toBe(1);
    expect(w.detective!.length).toBeGreaterThanOrEqual(3);
    for (const d of w.detective!) {
      expect(new Set(d.options).size).toBe(d.options.length);
      if (d.passage) expect(countMarks(d.passage), d.passage).toBe(1);
    }
    expect(w.quizItems!.length).toBeGreaterThanOrEqual(4);
    for (const q of w.quizItems!) {
      expect(q.options).toHaveLength(3);
      expect(new Set(q.options).size).toBe(3);
    }
    expect(w.creativePrompts!.length).toBeGreaterThanOrEqual(2);
    expect(w.nuance!.sentences.length).toBeGreaterThanOrEqual(3);
    for (const f of w.wordFamily ?? []) expect(countMarks(f.example)).toBe(1);
  });

  it('keeps quiz-only content separate from practice content', () => {
    for (const w of words) {
      const practiceText = new Set([
        ...w.examples.slice(0, 2),
        ...w.stories!.map((s) => s.text),
        ...w.detective!.map((d) => d.passage ?? d.question),
      ]);
      for (const ex of w.examples.slice(2)) expect(practiceText.has(ex)).toBe(false);
      for (const q of w.quizItems!) expect(practiceText.has(q.prompt)).toBe(false);
    }
  });

  it('has no overlapping synonyms between words in the same week', () => {
    for (const week of c.weeks) {
      const seen = new Map<string, string>();
      for (const id of week.wordIds) {
        for (const s of c.words[id].synonyms) {
          expect(seen.get(s.toLowerCase()), `${s} in ${week.id}`).toBeUndefined();
          seen.set(s.toLowerCase(), id);
        }
      }
    }
  });

  it('builds a sticker catalog with a unique sticker per word and week', () => {
    const cat = buildStickerCatalog(c);
    expect(cat.filter((s) => s.kind === 'word')).toHaveLength(80);
    expect(cat.filter((s) => s.kind === 'week')).toHaveLength(20);
    expect(new Set(cat.map((s) => s.id)).size).toBe(cat.length);
  });
});
