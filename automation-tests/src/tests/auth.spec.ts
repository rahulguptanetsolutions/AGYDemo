import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Flow', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        await loginPage.login('admin', 'admin123');
        await page.waitForURL(/.*products/);
        // Expect redirection to products page
        await expect(page).toHaveURL(/.*products/);
        await expect(page.locator('h2')).toHaveText('Product List');
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await loginPage.login('wrong', 'wrong');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
    });
});
