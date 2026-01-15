import { test, expect } from '@playwright/test';

test.describe('Mengenmeldungen List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[formcontrolname="username"]', 'admin');
    await page.fill('input[formcontrolname="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/mengenmeldungen');
  });

  test('should display mengenmeldungen table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Meine Mengenmeldungen' })).toBeVisible();

    const table = page.locator('table');
    await expect(table).toBeVisible();

    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  test('should filter list using search input', async ({ page }) => {
    const searchInput = page.locator('#table-complete-search');

    await expect(searchInput).toBeVisible();

    await searchInput.fill('2025');

    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  test('should show status button and optional error popover', async ({ page }) => {
    const statusButtons = page.locator('tbody tr td button');

    if ((await statusButtons.count()) > 0) {
      const firstStatusButton = statusButtons.first();
      await expect(firstStatusButton).toBeVisible();

      if (!(await firstStatusButton.isDisabled())) {
        await firstStatusButton.hover();

        await expect(page.getByText('Fehlermeldung')).toBeVisible();
      }
    }
  });

  test('should navigate to new mengenmeldung form', async ({ page }) => {
    await page.click('button:has-text("Neue Mengenmeldung")');

    await expect(page).toHaveURL(/\/mengenmeldungen\/new/);
  });
});
