import { expect, test } from '@playwright/test';
import { launch } from './helpers';

test('decorate a scene with tap-to-place and drag, then reload', async ({ page }) => {
  await launch(page);
  await page.getByTestId('world-dino').click();
  const canvas = page.getByTestId('scene-canvas');
  await expect(canvas).toBeVisible();

  // Tap a sticker in the tray, then tap the scene.
  await page.getByTestId('tray-stk-peculiar').tap();
  const box = (await canvas.boundingBox())!;
  await page.touchscreen.tap(box.x + box.width * 0.3, box.y + box.height * 0.6);
  await expect(page.getByTestId('placed-sticker')).toHaveCount(1);

  // Accessible alternative: select and put it in the middle.
  await page.getByTestId('tray-stk-astonished').tap();
  await page.getByTestId('place-center').click();
  await expect(page.getByTestId('placed-sticker')).toHaveCount(2);

  // Resize and send backward via the toolbar.
  await page.getByTestId('tool-bigger').click();
  await page.getByTestId('tool-back').click();

  // Drag the first sticker to a new spot.
  const first = page.locator('[data-sticker="stk-peculiar"]');
  const fb = (await first.boundingBox())!;
  await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3, { steps: 8 });
  await page.mouse.up();
  const moved = (await first.boundingBox())!;
  // The sticker's center follows the finger to ~80% across the scene.
  expect(moved.x + moved.width / 2).toBeGreaterThan(box.x + box.width * 0.75);
  expect(moved.x + moved.width / 2).toBeLessThan(box.x + box.width * 0.85);

  // The page itself must not have scrolled during the drag.
  expect(await page.evaluate(() => window.scrollX)).toBe(0);

  await page.waitForTimeout(600); // allow debounced save
  await page.reload();
  await expect(page.getByTestId('placed-sticker')).toHaveCount(2);
  const afterReload = (await page.locator('[data-sticker="stk-peculiar"]').boundingBox())!;
  expect(Math.abs(afterReload.x + afterReload.width / 2 - (moved.x + moved.width / 2))).toBeLessThan(4);

  // Removing a sticker keeps it in the collection.
  await page.locator('[data-sticker="stk-astonished"]').click();
  await page.getByTestId('tool-remove').click();
  await expect(page.getByTestId('placed-sticker')).toHaveCount(1);
  await expect(page.getByTestId('tray-stk-astonished')).toBeVisible();

  // Reset requires confirmation.
  await page.getByTestId('reset-scene').click();
  await page.getByRole('button', { name: 'Clear it' }).click();
  await expect(page.getByTestId('placed-sticker')).toHaveCount(0);
});

test('parent gate, unlock a week, and skip the waiting period', async ({ page }) => {
  await launch(page);
  await page.goto('/#/parent');
  const label = await page.locator('label[for="gate-answer"]').textContent();
  const [, a, b] = label!.match(/(\d+) × (\d+)/)!;
  await page.getByTestId('gate-answer').fill(String(Number(a) * Number(b)));
  await page.getByTestId('gate-submit').click();
  await expect(page.getByText('Grown-ups Dashboard')).toBeVisible();

  await page.getByTestId('tab-weeks').click();
  await page.getByTestId('expand-week-6').click();
  await page.getByTestId('unlock-week-6').click();
  await page.goto('/#/map');
  await expect(page.getByTestId('map-week-6')).toHaveAttribute('data-state', 'open');
});

test('grown-ups PIN: set, require, pause after wrong guesses, and reset via forgot-PIN', async ({ page }) => {
  await launch(page);
  const solveMath = async () => {
    const label = await page.getByTestId('gate-label').textContent();
    const [, a, b] = label!.match(/(\d+) × (\d+)/)!;
    expect(Number(a)).toBeGreaterThan(9); // no longer single-digit
    await page.getByTestId('gate-answer').fill(String(Number(a) * Number(b)));
    await page.getByTestId('gate-submit').click();
  };

  // Without a PIN: harder math question, and a reminder to set a PIN.
  await page.goto('/#/parent');
  await solveMath();
  await expect(page.getByTestId('pin-reminder')).toBeVisible();

  // Set a PIN.
  await page.getByTestId('tab-settings').click();
  await page.getByTestId('pin-new').fill('482915');
  await page.getByTestId('pin-repeat').fill('482916');
  await page.getByTestId('pin-save').click();
  await expect(page.getByTestId('pin-msg')).toContainText('don’t match');
  await page.getByTestId('pin-repeat').fill('482915');
  await page.getByTestId('pin-save').click();
  await expect(page.getByTestId('pin-msg')).toContainText('PIN saved');

  // After reload the gate asks for the PIN; three wrong tries cause a pause.
  await page.waitForTimeout(600);
  await page.reload();
  await expect(page.getByTestId('gate-label')).toHaveText('Enter the grown-ups PIN');
  for (const guess of ['1111', '2222', '3333']) {
    await page.getByTestId('gate-answer').fill(guess);
    await page.getByTestId('gate-submit').click();
  }
  await expect(page.getByTestId('gate-error')).toContainText('wait 30 seconds');
  await expect(page.getByTestId('gate-answer')).toBeDisabled();

  // The correct PIN works once the pause ends.
  await page.clock.setFixedTime(new Date(Date.now() + 31_000));
  await page.reload();
  await page.getByTestId('gate-answer').fill('482915');
  await page.getByTestId('gate-submit').click();
  await expect(page.getByText('Grown-ups Dashboard')).toBeVisible();
  await expect(page.getByTestId('pin-reminder')).toHaveCount(0);

  // Forgot PIN: the harder reset problem removes the PIN.
  await page.reload();
  await page.getByTestId('forgot-pin').click();
  const label = await page.getByTestId('gate-label').textContent();
  expect(Number(label!.match(/(\d+) ×/)![1])).toBeGreaterThan(99);
  await solveMath();
  await expect(page.getByTestId('pin-reminder')).toBeVisible();
});
