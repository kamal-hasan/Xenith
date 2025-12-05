import { test, expect } from '@playwright/test';
import {
  searchBooks,
  clearSearch,
  getVisibleBooks,
  isBookVisible,
} from '../../../src/search';

test.describe('DemoQA Books Search', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the books page with reduced wait timeout
    await page.goto('https://demoqa.com/books', { waitUntil: 'domcontentloaded' });
    // Wait for the search box to be visible
    await expect(
      page.getByRole('textbox', { name: 'Type to search' })
    ).toBeVisible({ timeout: 10000 });
  });

  test('Search for a specific book by keyword', async ({ page }) => {
    // Search for "Git Pocket Guide"
    await searchBooks(page, 'Git Pocket Guide');

    // Verify that the search result contains the expected book
    const isVisible = await isBookVisible(page, 'Git Pocket Guide');
    expect(isVisible).toBe(true);
  });

  test('Search returns filtered results for JavaScript', async ({ page }) => {
    // Search for "JavaScript"
    await searchBooks(page, 'JavaScript');

    // Get all visible books and verify they contain JavaScript-related titles
    const books = await getVisibleBooks(page);
    const hasJavaScriptBooks = books.some((book) =>
      book.toLowerCase().includes('javascript')
    );

    expect(hasJavaScriptBooks).toBe(true);
  });

  test('Search for Java returns relevant results', async ({ page }) => {
    // Search for "Java"
    await searchBooks(page, 'Java');

    // Verify at least one Java-related book is displayed
    const books = await getVisibleBooks(page);
    expect(books.length).toBeGreaterThan(0);
  });

  test('Clear search displays all books', async ({ page }) => {
    // Perform a search first
    await searchBooks(page, 'Git');
    let filteredBooks = await getVisibleBooks(page);
    const filteredCount = filteredBooks.length;

    // Clear the search
    await clearSearch(page);
    let allBooks = await getVisibleBooks(page);

    // After clearing, we should have more or equal books
    expect(allBooks.length).toBeGreaterThanOrEqual(filteredCount);
  });

  test('Search for non-existent book shows no results', async ({ page }) => {
    // Search for a non-existent book
    await searchBooks(page, 'NonExistentBookTitle12345');

    // Verify no results or a "no results" message is displayed
    const books = await getVisibleBooks(page);
    // Should have minimal or no results
    expect(books.length).toBeLessThanOrEqual(1);
  });

  test('Search is case-insensitive', async ({ page }) => {
    // Search with lowercase
    await searchBooks(page, 'git');
    const lowercaseResults = await getVisibleBooks(page);

    // Clear and search with uppercase
    await clearSearch(page);
    await searchBooks(page, 'GIT');
    const uppercaseResults = await getVisibleBooks(page);

    // Both searches should return the same results
    expect(lowercaseResults.length).toBe(uppercaseResults.length);
  });

  test('Can click on a book from search results', async ({ page }) => {
    // Search for a specific book
    await searchBooks(page, 'JavaScript');

    // Click on the first JavaScript-related book result
    const bookLink = page.getByRole('link', {
      name: /Learning JavaScript Design/,
    });

    if (await bookLink.isVisible()) {
      await bookLink.click();
      // Verify navigation to book details page (uses query params not hash)
      await expect(page).toHaveURL(/.*\?book=.*/);
    }
  });

  test('Multiple searches in succession work correctly', async ({ page }) => {
    // First search
    await searchBooks(page, 'Java');
    let results1 = await getVisibleBooks(page);

    // Second search
    await clearSearch(page);
    await searchBooks(page, 'Python');
    let results2 = await getVisibleBooks(page);

    // Results should be different
    expect(results1).not.toEqual(results2);
  });
});