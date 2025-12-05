import { Page, expect } from '@playwright/test';

export type Credentials = {
 	email?: string;
 	password?: string;
};

export async function login(page: Page, creds: Credentials = {}) {
 	const email = process.env.TEST_EMAIL || creds.email || 'admin@dana.id';
 	const password = process.env.TEST_PASSWORD || creds.password || '!Password01';

 	await page.goto('https://gateway-mp-sit.dana.id/cms/');
 	await expect(page.getByRole('button', { name: 'LOGIN' })).toBeVisible();

 	await page.getByRole('textbox', { name: 'Email' }).fill(email);
 	await page.getByRole('textbox', { name: 'Email' }).press('Tab');
 	await page.getByRole('textbox', { name: 'Password' }).fill(password);
 	await page.getByRole('button', { name: 'LOGIN' }).click();

 	// Ensure we've reached the post-login page
 	await expect(page.getByText('Merchant Portal')).toBeVisible();
}
