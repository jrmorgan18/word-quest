# Word Quest — Brooks's Vocabulary Adventure

A tablet-friendly vocabulary game for a strong first-grade reader. Brooks explores three new words each week through six activity types, takes a weekly quiz and a next-day Memory Check, earns original stickers, and decorates Dinosaur Island, Space Explorer, and Pixel Arcade scenes.

The app is a static web app/PWA. There's no backend, no accounts, no ads, and no external AI or paid services.

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173 (add --host to open it from a tablet on your Wi-Fi)
npm test             # 72 unit tests (Vitest)
npx playwright install chromium webkit   # one-time
npm run test:e2e     # 14 browser tests: Android tablet (Chromium) + iPad (WebKit)
npm run build        # static site in dist/
npm run preview      # serve dist/ locally
```

## Deploying

`npm run build` produces a fully static `dist/` folder that uses relative paths and hash routing. You can upload it to any static host (Netlify drop, GitHub Pages, Cloudflare Pages, a NAS) with no server configuration.

HTTPS is required for offline/PWA install (localhost is exempt).

**On the iPad:** open the site in Safari → Share → **Add to Home Screen**. After the first load, the game works offline.

## How the learning loop works

1. **Discover**: each word has a discovery card with a mystery clue, a meaning reveal, a second example in a different setting, a thinking question about the illustration, a word family, and a discussion prompt.
2. **Practice**: Choose the Meaning, Complete the Story, Word Detective (meaning from context, correct usage, what a character meant), Word Connections (synonym matching, "persistent vs. stubborn" nuance sorting, same/opposite sorting, word families), and Creative Challenge (self-confirmed, never graded).
3. **Weekly quiz** unlocks after all 3 words are discovered and each word has 2 *different* practice games (Creative is a bonus and doesn't count).
   - 9 questions, 3 per word, mixed formats, at least one application question per word.
   - Answer positions are randomized.
   - Pass: ≥8/9 and ≥2/3 per word. This awards the 3 word stickers and a weekly achievement.
4. **Memory Check** opens 20 hours later: 6 new questions, 2 per word. Pass: ≥5/6 and ≥1 per word. This masters the week, awards the giant week sticker, and unlocks the next week.
5. **Missed quiz**: supportive feedback per word, a targeted Quick Refresher for only the missed words, and a fresh question variation next time. Nothing is ever taken away.
6. **Spaced review (Memory Mission)**: mastered words come back after 1 → 3 → 7 → 14 → 30 days.
   - A miss shows a refresher, steps the word back, and makes it due tomorrow.
   - Words with more misses are prioritized.
   - Mastery and stickers are never removed.

Quiz content (application scenarios, situations, later example sentences, synonym/antonym and definition questions) is kept **separate** from practice content, and quiz retakes prefer never-seen questions. All thresholds and intervals are configurable defaults in the parent dashboard, not research-mandated cutoffs.

Sessions are designed to be short. After about 4 activities or a quiz, Home suggests a natural stopping point. There are no timers, streaks, or leaderboards.

## Grown-ups dashboard

Tap **🔒 Grown-ups** and answer a multiplication question. This is a simple gate to keep little fingers out, **not** security.

- **Overview**: current week, words due for review, words needing attention, Memory Check timing, and storage status.
- **Weeks & Words**: per-word status, practice done, struggle score, review date, and every quiz attempt with per-word scores. From here you can:
  - mark a word or week complete
  - unlock or relock weeks
  - open a Memory Check now
  - reset a week's quizzes (history is kept and marked "reset"; stickers are kept)
- **Curriculum**:
  - edit any word's definition, examples, synonyms, prompts, etc.
  - add or replace words
  - add weeks beyond 10
  - Edited words are flagged and protected from future built-in content updates; learning history is never touched.
- **Settings**: name, sound, read-aloud and speed, animations (follow device / calm / full), mastery thresholds, and review intervals.
- **Backup**: export progress + curriculum (or curriculum only) as JSON, import with confirmation, and reset everything (double confirmation).

## Persistence and backups

- All state is one versioned JSON document in **IndexedDB** (falls back to `localStorage` if IndexedDB is unavailable). Saves are debounced and flushed when the tab is hidden or closed.
- **Progress is stored per browser, per device.** Two tablets do **not** sync. To move progress, use Backup → *Export* on one device and *Import* on the other.
- Safari can evict data for websites that haven't been used for a while. Installing to the Home Screen avoids this, and the dashboard can request persistent storage. Exporting a backup occasionally is still wise.
- **Schema migrations** (`src/engine/migrations.ts`): saved documents carry `schemaVersion` and are upgraded step by step on load or import, then normalized.
- **Curriculum migrations**: when `CURRICULUM_VERSION` is bumped, new words and weeks are merged in and unedited words are refreshed. Parent-edited words, week word lists, and all progress are preserved.

## Historical progress (Weeks 1–2)

On first launch, Weeks 1 and 2 are marked complete with source **parent-confirmed**:

- No quiz scores or dates are invented (`masteredAt: null`, no attempts).
- Their 6 word stickers and 2 weekly stickers are granted.
- Their words enter spaced review gently, two per day starting the next day.
- Week 3 (Anticipate, Persistent, Consequence) is unlocked and ready.

## Project structure

```
src/data/          Curriculum as typed data: 30 fully authored words, 10 weeks, sticker catalog
src/engine/        Pure game logic (no React): progress, question generators, quiz building and
                   grading, review scheduling, rewards, scenes, parent overrides, migrations, backups
src/engine/__tests__/  Unit tests
src/persistence/   IndexedDB storage
src/store/         Zustand store; every change runs an engine function on an Immer draft, then saves
src/art/           Original SVG art: character primitives, 43 stickers, 3 scene backgrounds
src/components/    UI kit, QuestionRunner (shared by practice/quiz/review), celebrations
src/screens/       Home, Map, Week, Discovery, activities, Quiz, Memory Mission, Sticker Book,
                   Scene editor, parent dashboard
tests/e2e/         Playwright tests (controllable clock via page.clock)
```

**Adding an activity:**

1. Add a builder in `engine/activities.ts` and an entry in `ACTIVITIES`.
2. Add a screen and a route in `App.tsx`.
3. If it should count toward the quiz gate, add it to `PRACTICE_ACTIVITIES`.

Most question-style activities can reuse `QuestionRunner` as-is.

## Testing notes

- Unit tests pass an explicit `now` to engine functions.
- Browser tests use Playwright's `page.clock` to jump 19h and 21h ahead, checking that the Memory Check is closed and then open, without waiting a real day.
- The e2e suite covers:
  - historical launch state
  - discovering words
  - practice activities
  - passing and failing the quiz
  - the delayed check unlocking Week 4
  - drag-and-drop and tap-to-place decorating
  - reload persistence
  - the parent gate and week unlocking
  - no horizontal overflow at tablet sizes

## Known limitations

- **Read-aloud** uses the device's built-in speech voices. Quality varies by device, and the buttons dim if speech isn't available.
- **Creative Challenge** answers are self-confirmed and not saved; the game never pretends to grade them.
- **Parent-added words** get a generic star sticker and template-generated questions. They don't get hand-written stories or detective cases unless you author them in the data files.
- **Exported scene pictures** may render sticker text (e.g. "PLEASE?") in a fallback font, because browsers don't load web fonts inside SVG images.
- **Font weight**: Playwright's Windows WebKit build renders the variable Fredoka font at a light weight. Chromium renders it correctly, but it hasn't been verified on a physical iPad.
- **Real devices**: the app hasn't been tested on a physical iPad or Android tablet; touch was tested with Playwright device emulation.
