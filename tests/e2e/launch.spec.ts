import { expect, test } from '@playwright/test';
import { launch } from './helpers';

test('first launch shows historical progress and Week 3 as the current adventure', async ({ page }) => {
  await launch(page);
  await expect(page.getByTestId('weeks-conquered')).toHaveText('2 / 10');
  await expect(page.getByTestId('words-learned')).toHaveText('6 / 30');
  await expect(page.getByTestId('sticker-count')).toHaveText('8 / 43');
  await expect(page.locator('#current-adventure')).toHaveText('Pixel Power-Up');
  for (const w of ['Anticipate', 'Persistent', 'Consequence']) await expect(page.getByRole('button', { name: new RegExp(w) }).first()).toBeVisible();

  // Adventure map: weeks 1–2 conquered, 3 current, 4+ locked.
  await page.getByRole('button', { name: /Adventure Map/ }).click();
  await expect(page.getByTestId('map-week-1')).toHaveAttribute('data-state', 'done');
  await expect(page.getByTestId('map-week-2')).toHaveAttribute('data-state', 'done');
  await expect(page.getByTestId('map-week-3')).toHaveAttribute('data-state', 'current');
  await expect(page.getByTestId('map-week-4')).toHaveAttribute('data-state', 'locked');
  await expect(page.getByTestId('map-week-10')).toHaveAttribute('data-state', 'locked');

  // Completed weeks can be revisited.
  await page.getByTestId('map-week-1').click();
  await expect(page.getByTestId('week-conquered')).toBeVisible();

  // Sticker book: six historical word stickers + two weekly rewards are owned.
  await page.goto('/#/stickers');
  for (const id of ['peculiar', 'reluctant', 'observe', 'inevitable', 'resourceful', 'astonished']) {
    await expect(page.getByTestId(`sticker-stk-${id}`)).toHaveAttribute('data-owned', 'true');
  }
  await expect(page.getByTestId('sticker-stk-week-1')).toHaveAttribute('data-owned', 'true');
  await expect(page.getByTestId('sticker-stk-anticipate')).toHaveAttribute('data-owned', 'false');
});

test('layout fits the tablet viewport without horizontal overflow', async ({ page }) => {
  await launch(page);
  for (const route of ['', 'map', 'week/week-3', 'stickers', 'decorate/space', 'week/week-3/discover/anticipate']) {
    await page.goto(`/#/${route}`);
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, route).toBeLessThanOrEqual(1);
  }
  // Primary touch targets are at least 48px tall.
  await page.goto('/#/week/week-3');
  const box = await page.getByTestId('activity-choose').boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(48);
});
