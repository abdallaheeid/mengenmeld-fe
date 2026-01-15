import { test, expect } from '@playwright/test';

test.describe('Mengenmeldung Form', () => {
  test('should submit a new mengenmeldung', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[formcontrolname="username"]', 'admin');
    await page.fill('input[formcontrolname="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/mengenmeldungen');

    await page.goto('/mengenmeldungen/new');

    await page.selectOption('select[formcontrolname="year"]', '2025');
    await page.selectOption('select[formcontrolname="month"]', '3');
    await page.fill('input[formcontrolname="menge"]', '12.5');
    await page.selectOption('select[formcontrolname="einheit"]', 'KG');
    await page.fill('input[formcontrolname="geraeteartnummer"]', '123');
    await page.fill('input[formcontrolname="registrierungsnummer"]', '12345678');

    await page.check('input[formcontrolname="confirmed"]');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*mengenmeldungen/);
  });
});
