import { test, expect } from '@playwright/test';
import { login } from '../../src/login';

test.beforeEach(async ({ page }) => {
	await login(page);
});

test('Login', async ({ page }) => {
	// Login is handled in the `beforeEach` hook; verify post-login UI.
	await expect(page.getByText('Merchant Portal')).toBeVisible();
});