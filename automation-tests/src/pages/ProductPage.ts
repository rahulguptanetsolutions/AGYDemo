import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly createNewButton: Locator;
    readonly nameInput: Locator;
    readonly descriptionInput: Locator;
    readonly priceInput: Locator;
    readonly submitButton: Locator;
    readonly productItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createNewButton = page.locator('button:has-text("Create New Product")');
        this.nameInput = page.locator('#name');
        this.descriptionInput = page.locator('#description');
        this.priceInput = page.locator('#price');
        this.submitButton = page.locator('button[type="submit"]');
        this.productItems = page.locator('.item');
    }

    async navigate() {
        await this.page.goto('/products');
    }

    async createProduct(name: string, description: string, price: number) {
        await this.createNewButton.click();
        await this.nameInput.fill(name);
        await this.descriptionInput.fill(description);
        await this.priceInput.fill(price.toString());
        await this.submitButton.click();
    }

    async editProduct(newName: string, newDescription: string, newPrice: number) {
        await this.nameInput.fill(newName);
        await this.descriptionInput.fill(newDescription);
        await this.priceInput.fill(newPrice.toString());
        await this.submitButton.click();
    }

    async getProductByName(name: string) {
        return this.productItems.filter({ hasText: name }).first();
    }

    async getValidationError(fieldId: string) {
        const group = this.page.locator(`.form-group:has(#${fieldId})`);
        return group.locator('.error');
    }
}
