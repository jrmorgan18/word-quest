import { expect, test } from '@playwright/test';
import { answerAll, answerAllCorrectly, discoverWord, dismissCelebrations, launch, START, WEEK3 } from './helpers';

test('discover → practice → quiz → reload → delayed check → Week 4 unlocks', async ({ page }) => {
  test.setTimeout(300_000);
  await launch(page);

  // 1) Explore Week 3 words via the guided Continue button.
  await page.getByTestId('continue').click();
  for (let i = 0; i < 3; i++) {
    await discoverWord(page);
    if (i < 2) await page.getByTestId('next-word').click();
  }
  await page.getByTestId('done-discovering').click();
  for (const id of WEEK3) await expect(page.getByTestId(`word-card-${id}`).getByTestId('word-status')).toContainText('Discovered');

  // Quiz is still locked until two practice games per word are done.
  await expect(page.getByTestId('start-initial-quiz')).toHaveCount(0);

  // 2) Complete two distinct activities.
  for (const activity of ['choose', 'story']) {
    await page.goto(`/#/week/week-3/play/${activity}`);
    await answerAllCorrectly(page);
    await expect(page.getByTestId('round-complete')).toBeVisible();
  }

  // 3) Pass the initial quiz.
  await page.goto('/#/week/week-3');
  await page.getByTestId('start-initial-quiz').click();
  await page.getByTestId('begin-quiz').click();
  await answerAllCorrectly(page);
  await expect(page.getByTestId('quiz-result')).toHaveAttribute('data-passed', 'true');
  await expect(page.getByTestId('quiz-score')).toHaveText('9 of 9 correct');
  await expect(page.getByTestId('celebration')).toBeVisible();
  await dismissCelebrations(page);

  // 4) Reload: progress and new stickers persist.
  await page.reload();
  await page.goto('/#/week/week-3');
  await expect(page.getByTestId('delayed-wait')).toBeVisible();
  await page.goto('/#/stickers');
  for (const id of WEEK3) await expect(page.getByTestId(`sticker-stk-${id}`)).toHaveAttribute('data-owned', 'true');

  // Delayed check is not available yet (19h later).
  await page.clock.setFixedTime(new Date(START.getTime() + 19 * 3600_000));
  await page.goto('/#/week/week-3/quiz/delayed');
  await expect(page.getByText('Not quite yet!')).toBeVisible();

  // 5) Return the next day (21h later) for the delayed check.
  await page.clock.setFixedTime(new Date(START.getTime() + 21 * 3600_000));
  await page.goto('/#/');
  await page.reload();
  await expect(page.getByTestId('continue')).toContainText('Memory Check');
  await page.getByTestId('continue').click();
  await page.getByTestId('begin-quiz').click();
  await answerAllCorrectly(page);
  await expect(page.getByTestId('quiz-result')).toHaveAttribute('data-passed', 'true');
  await dismissCelebrations(page);

  // 6) Week 4 is unlocked and becomes the current adventure.
  await page.goto('/#/map');
  await expect(page.getByTestId('map-week-3')).toHaveAttribute('data-state', 'done');
  await expect(page.getByTestId('map-week-4')).toHaveAttribute('data-state', 'current');
  await page.goto('/#/');
  await expect(page.locator('#current-adventure')).toHaveText('Volcano Valley');
  await expect(page.getByTestId('weeks-conquered')).toHaveText('3 / 10');

  // A reload keeps everything.
  await page.reload();
  await expect(page.getByTestId('weeks-conquered')).toHaveText('3 / 10');
});

test('missed quiz gives supportive feedback, a refresher, and a new variation', async ({ page }) => {
  await launch(page);
  for (const id of WEEK3) {
    await page.goto(`/#/week/week-3/discover/${id}`);
    await discoverWord(page);
  }
  for (const activity of ['choose', 'detective']) {
    await page.goto(`/#/week/week-3/play/${activity}`);
    await answerAllCorrectly(page);
  }
  await page.goto('/#/week/week-3/quiz/initial');
  await page.getByTestId('begin-quiz').click();
  // Answer every question wrong on purpose.
  await answerAll(page, 'wrong');
  await expect(page.getByTestId('quiz-result')).toHaveAttribute('data-passed', 'false');
  await expect(page.getByText('Good effort')).toBeVisible();
  await page.getByTestId('go-refresher').click();
  await answerAllCorrectly(page);
  await expect(page.getByTestId('round-complete')).toBeVisible();
  // Stickers were not taken away and nothing was awarded.
  await page.goto('/#/');
  await expect(page.getByTestId('sticker-count')).toHaveText('8 / 43');
});

test('word connections round can be completed with taps', async ({ page }) => {
  await launch(page);
  await page.goto('/#/week/week-3/play/connections');
  for (const id of WEEK3) {
    await page.locator(`[data-testid="match-word"][data-pair="${id}"]`).click();
    await page.locator(`[data-testid="match-partner"][data-pair="${id}"]`).click();
  }
  await page.getByTestId('next').click();
  for (let step = 0; step < 4; step++) {
    if (await page.getByTestId('round-complete').isVisible()) break;
    const items = page.getByTestId('sort-item');
    const n = await items.count();
    if (n > 0) {
      for (let i = 0; i < n; i++) {
        const item = items.nth(i);
        const bucket = await item.getAttribute('data-bucket');
        await item.getByTestId(`bucket-${bucket}`).click();
      }
      await expect(page.getByTestId('sort-explanation')).toBeVisible();
      await page.getByTestId('next').click();
    } else {
      await answerAllCorrectly(page);
    }
  }
  await expect(page.getByTestId('round-complete')).toBeVisible();
});
