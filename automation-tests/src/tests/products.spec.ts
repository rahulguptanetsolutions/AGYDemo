import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Product CRUD Operations', () => {
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        // Shared setup: Login before each test
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('admin', 'admin123');
        await page.waitForURL(/.*products/);
        productPage = new ProductPage(page);
        await productPage.navigate();
    });

    test('should create a new product', async ({ page }) => {
        const uniqueId = Date.now();
        const productName = `Test Product ${uniqueId}`;
        await productPage.createProduct(productName, 'Automated Test Desc', 99.99);

        // Wait for redirect or list refresh
        await page.waitForURL(/.*products/);

        // Verify product appears in list
        const product = await productPage.getProductByName(productName);
        await expect(product).toBeVisible({ timeout: 10000 });
        await expect(product.locator('h3')).toHaveText(productName);
    });

    test('should navigate to edit page', async ({ page }) => {
        // Ensure at least one product exists by creating one first
        const setupName = `Setup Product ${Date.now()}`;
        await productPage.createProduct(setupName, 'Setup for edit', 10.00);
        await page.waitForURL(/.*products/);

        // Click edit on the one we just created
        const product = await productPage.getProductByName(setupName);
        await product.locator('button:has-text("Edit")').click();

        await expect(page).toHaveURL(/.*\/[^\/]+$/);
        await expect(page.locator('h2')).toContainText('Edit Product');
    });

    test('should update an existing product', async ({ page }) => {
        const originalName = `Original ${Date.now()}`;
        await productPage.createProduct(originalName, 'Old Desc', 50);
        await page.waitForURL(/.*products/);

        const product = await productPage.getProductByName(originalName);
        await product.locator('button:has-text("Edit")').click();

        const updatedName = `Updated ${Date.now()}`;
        await productPage.editProduct(updatedName, 'New Desc', 75);
        await page.waitForURL(/.*products/);

        const updatedProduct = await productPage.getProductByName(updatedName);
        await expect(updatedProduct).toBeVisible();
        await expect(updatedProduct.locator('h3')).toHaveText(updatedName);
    });

    test('should show validation error for empty name', async ({ page }) => {
        await productPage.createNewButton.click();
        await productPage.nameInput.focus();
        await productPage.nameInput.blur(); // Trigger touched

        const error = await productPage.getValidationError('name');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Name is required');
        await expect(productPage.submitButton).toBeDisabled();
    });

    test('should show validation error for negative price', async ({ page }) => {
        await productPage.createNewButton.click();
        await productPage.priceInput.fill('-10');
        await productPage.priceInput.blur();

        const error = await productPage.getValidationError('price');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Valid price is required');
        await expect(productPage.submitButton).toBeDisabled();
    });
});
