import { Page } from '@playwright/test';
import { getVisibleBooks } from './search';

/**
 * Clicks the "Next" pagination control.
 * Returns true if navigation happened, false if there was no next page.
 */
export async function clickNext(page: Page): Promise<boolean> {
  // Prefer clicking numeric page if available
  const pages = await getPageNumbers(page);
  if (pages.length > 1) {
    // click the second shown page number (likely page 2)
    await clickPageNumber(page, Number(pages[1]));
    return true;
  }

  const next = page.getByRole('button', { name: 'Next' });
  if (await next.count() > 0 && (await next.isEnabled())) {
    await next.click();
    return true;
  }

  // fallback: try to find any button with text Next that's enabled
  const alt = page.locator('button:has-text("Next")');
  if (await alt.count() > 0 && (await alt.isEnabled())) {
    await alt.first().click();
    return true;
  }

  return false;
}

/**
 * Clicks the "Previous" pagination control.
 * Returns true if navigation happened, false otherwise.
 */
export async function clickPrevious(page: Page): Promise<boolean> {
  const pages = await getPageNumbers(page);
  if (pages.length > 1) {
    // try to go to the first page if not already
    await clickPageNumber(page, Number(pages[0]));
    return true;
  }

  const prev = page.getByRole('button', { name: 'Previous' });
  if (await prev.count() > 0 && (await prev.isEnabled())) {
    await prev.click();
    return true;
  }

  const alt = page.locator('button:has-text("Previous")');
  if (await alt.count() > 0 && (await alt.isEnabled())) {
    await alt.first().click();
    return true;
  }

  return false;
}

/** Click a numeric page link (1-based). */
export async function clickPageNumber(page: Page, n: number): Promise<void> {
  const link = page.getByRole('link', { name: String(n) });
  if (await link.count() > 0) {
    await link.first().click();
    return;
  }

  // Fallback: click any element that exactly matches the page number text
  const alt = page.locator(`text="${n}"`);
  if (await alt.count() > 0) {
    await alt.first().click();
  }
}

/** Returns the visible pagination page numbers as strings. */
export async function getPageNumbers(page: Page): Promise<string[]> {
  const links = page.getByRole('link', { name: /^(?:\d+)$/ });
  try {
    const contents = await links.allTextContents();
    return contents.map((t) => t.trim()).filter((t) => /^\d+$/.test(t));
  } catch {
    // fallback: try to query any numeric text in pagination
    try {
      const els = await page.locator('.-pagination li').allTextContents();
      return els.map((t) => t.trim()).filter((t) => /^\d+$/.test(t));
    } catch {
      return [];
    }
  }
}

/** Returns the first visible book title on the page (or empty string). */
export async function getFirstBookTitle(page: Page): Promise<string> {
  const books = await getVisibleBooks(page);
  return books.length > 0 ? books[0] : '';
}
