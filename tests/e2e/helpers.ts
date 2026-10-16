import { expect, type Page } from '@playwright/test';

export const START = new Date('2026-10-16T15:00:00');

/** Fresh game at a controlled time. Each Playwright test gets an empty browser profile. */
export async function launch(page: Page, at: Date = START) {
  await page.clock.setFixedTime(at);
  await page.goto('/');
  await expect(page.getByText('Word Quest').first()).toBeVisible();
}

export async function dismissCelebrations(page: Page) {
  for (let i = 0; i < 10; i++) {
    const ok = page.getByTestId('celebration-ok');
    if (!(await ok.isVisible().catch(() => false))) {
      await page.waitForTimeout(300);
      if (!(await ok.isVisible().catch(() => false))) return;
    }
    await ok.click();
    await page.waitForTimeout(250);
  }
}

/**
 * Answers every question in a QuestionRunner (correctly by default) until it finishes.
 * Driven by the progress bar so exit animations can't confuse it.
 */
export async function answerAll(page: Page, pick: 'correct' | 'wrong' = 'correct'): Promise<string[]> {
  const bar = page.getByRole('progressbar').last();
  await bar.waitFor({ state: 'visible' });
  const total = Number(await bar.getAttribute('aria-valuemax'));
  const prompts: string[] = [];
  for (let i = 1; i <= total; i++) {
    await expect(bar).toHaveAttribute('aria-valuenow', String(i));
    prompts.push((await page.getByTestId('prompt').last().textContent()) ?? '');
    const sel = pick === 'correct' ? '[data-correct="true"]' : ':not([data-correct])';
    await page.locator(`button[data-testid="option"]${sel}:not([disabled])`).first().click();
    await page.getByTestId('next').click();
  }
  return prompts;
}

export const answerAllCorrectly = (page: Page) => answerAll(page, 'correct');

export async function discoverWord(page: Page) {
  await page.getByTestId('reveal-meaning').click();
  await expect(page.getByTestId('definition')).toBeVisible();
  await page.getByTestId('think-next').click();
  await answerAllCorrectly(page);
  await expect(page.getByTestId('discovered')).toBeVisible();
}

export const WEEK3 = ['anticipate', 'persistent', 'consequence'];
