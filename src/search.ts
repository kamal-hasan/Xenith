import { Page, expect } from '@playwright/test';

export type SearchOptions = {
  keyword?: string;
  waitForResults?: boolean;
};

/**
 * Performs a search on the DemoQA Books page using the search textbox.
 * @param page - Playwright Page object
 * @param keyword - Search keyword (optional)
 * @param waitForResults - Wait for results to load (default: true)
 */
export async function searchBooks(
  page: Page,
  keyword: string,
  waitForResults: boolean = true
) {
  const searchBox = page.getByRole('textbox', { name: 'Type to search' });

  // Click and fill the search box
  await searchBox.click();
  await searchBox.fill(keyword);

  // Click the search button
  const searchButton = page.locator('#basic-addon2 > span > svg');
  await searchButton.click();

  // Optionally wait for results to render (either a result appears or a "No rows found" message)
  if (waitForResults) {
    try {
      await page.getByRole('link', { name: /.*/ }).first().waitFor({ state: 'visible', timeout: 3000 });
    } catch {
      // If no link appears, wait for the "No rows found" indicator (if present)
      try {
        await page.getByText('No rows found').waitFor({ state: 'visible', timeout: 3000 });
      } catch {
        // swallow timeout — result may not be immediate
      }
    }
  }
}

/**
 * Clears the search box and displays all books.
 * @param page - Playwright Page object
 */
export async function clearSearch(page: Page) {
  const searchBox = page.getByRole('textbox', { name: 'Type to search' });
  await searchBox.click();
  await searchBox.clear();

  const searchButton = page.locator('#basic-addon2 > span > svg');
  await searchButton.click();

  // Wait for either results or "No rows found" to appear
  try {
    await page.getByRole('link', { name: /.*/ }).first().waitFor({ state: 'visible', timeout: 3000 });
  } catch {
    try {
      await page.getByText('No rows found').waitFor({ state: 'visible', timeout: 3000 });
    } catch {
      // ignore
    }
  }
}

/**
 * Gets all visible book titles from the search results.
 * @param page - Playwright Page object
 * @returns Array of book titles
 */
export async function getVisibleBooks(page: Page): Promise<string[]> {
  try {
    const titles = await page.getByRole('link', { name: /.*/ }).allTextContents();
    return titles.map((t) => t.trim()).filter((t) => t.length > 0);
  } catch {
    // fallback: try to read anchor texts directly via locator
    try {
      const titles = await page.locator('a').allTextContents();
      return titles.map((t) => t.trim()).filter((t) => t.length > 0);
    } catch {
      return [];
    }
  }
}

/**
 * Checks if a book with the given title is visible in search results.
 * @param page - Playwright Page object
 * @param bookTitle - Title to search for
 * @returns true if book is visible, false otherwise
 */
export async function isBookVisible(
  page: Page,
  bookTitle: string
): Promise<boolean> {
  const books = await getVisibleBooks(page);
  return books.some((title) =>
    title.toLowerCase().includes(bookTitle.toLowerCase())
  );
}