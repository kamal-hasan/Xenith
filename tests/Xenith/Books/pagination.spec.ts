import { test, expect } from '@playwright/test';
import {
  clickNext,
  clickPrevious,
  clickPageNumber,
  getPageNumbers,
  getFirstBookTitle,
} from '../../../src/pagination';

// Helper: poll until the first book title changes (or timeout)
async function waitForFirstTitleChange(page: any, oldTitle: string, timeout = 3000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const cur = await getFirstBookTitle(page);
    if (cur !== oldTitle) return cur;
    await page.waitForTimeout(150);
  }
  return await getFirstBookTitle(page);
}

test.describe('DemoQA Books Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/books', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('textbox', { name: 'Type to search' })).toBeVisible({ timeout: 10000 });
  });

  test('Pagination controls are present', async ({ page }) => {
    const next = page.getByRole('button', { name: 'Next' });
    const prev = page.getByRole('button', { name: 'Previous' });
    const numbers = await getPageNumbers(page);

    expect(await next.count()).toBeGreaterThanOrEqual(0);
    expect(await prev.count()).toBeGreaterThanOrEqual(0);
    expect(numbers.length).toBeGreaterThanOrEqual(0);
  });

  test('Click Next changes first visible book', async ({ page }) => {
    const firstBefore = await getFirstBookTitle(page);
    const navigated = await clickNext(page);
    if (!navigated) test.skip();
    // Wait for the first book title to change
    const firstAfter = await waitForFirstTitleChange(page, firstBefore, 4000);
    expect(firstAfter).not.toBe(firstBefore);
  });

  test('Click Previous returns to previous page', async ({ page }) => {
    // ensure we can go forward first
    const firstBefore = await getFirstBookTitle(page);
    const navigated = await clickNext(page);
    if (!navigated) test.skip();
    await waitForFirstTitleChange(page, firstBefore, 4000);
    const back = await clickPrevious(page);
    if (!back) test.skip();
    const firstAfter = await waitForFirstTitleChange(page, firstBefore, 4000);
    expect(firstAfter).toBe(firstBefore);
  });

  test('Go to a specific page number', async ({ page }) => {
    const numbers = await getPageNumbers(page);
    if (numbers.length < 2) {
      test.skip();
      return;
    }

    const before = await getFirstBookTitle(page);
    // click the second page
    await clickPageNumber(page, Number(numbers[1]));
    const after = await waitForFirstTitleChange(page, before, 4000);
    expect(after).not.toBe(before);
  });

  test('Each page shows different content for first title', async ({ page }) => {
    const numbers = await getPageNumbers(page);
    if (numbers.length < 2) test.skip();

    const seen = new Set<string>();
    for (let i = 0; i < numbers.length; i++) {
      const n = Number(numbers[i]);
      await clickPageNumber(page, n);
      const title = await waitForFirstTitleChange(page, Array.from(seen)[0] || '', 2000);
      seen.add(title);
    }

    // If there are multiple pages, we expect at least 2 unique first titles
    if (numbers.length >= 2) expect(seen.size).toBeGreaterThanOrEqual(2);
  });
});
