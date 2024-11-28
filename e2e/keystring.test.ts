import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.locator('#keystring').pressSequentially('Sphinx of black quartz, judge my vow');
	await page.locator('#decoded').clear();
	await page.locator('#encoded').clear();
});

test('encoding works', async ({ page }) => {
	await page.locator('#decoded').pressSequentially('hellocatherine');
	await page.locator('#submitButton').click();

	const result = await page.locator('#encoded').inputValue();
	expect(result).toBe('[3,24,10,10,7,12,11,18,3,24,17,4,5,24]');
});

test('decoding works', async ({ page }) => {
	await page.locator('#encoded').pressSequentially('[3,24,10,10,7,12,11,18,3,24,17,4,5,24]');
	await page.locator('#submitButton').click();

	const result = await page.locator('#decoded').inputValue();
	expect(result).toBe('hellocatherine');
});

test('encoding empty string', async ({ page }) => {
	await page.locator('#decoded').pressSequentially('');
	await page.locator('#submitButton').click();

	const result = await page.locator('#encoded').inputValue();
	expect(result).toBe('');
});

test('decoding empty string', async ({ page }) => {
	await page.locator('#encoded').pressSequentially('');
	await page.locator('#submitButton').click();

	const result = await page.locator('#decoded').inputValue();
	expect(result).toBe('');
});
