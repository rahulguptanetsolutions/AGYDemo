import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:5067/api';

test.describe('API Endpoint Tests', () => {

    test('POST /Auth/login should return valid token', async ({ request }) => {
        const response = await request.post(`${API_URL}/Auth/login`, {
            data: {
                username: 'admin',
                password: 'admin123'
            }
        });

        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body).toHaveProperty('token');
        expect(body.username).toBe('admin');
    });

    test('GET /products should return unauthorized without token', async ({ request }) => {
        const response = await request.get(`${API_URL}/products`);
        expect(response.status()).toBe(401);
    });

    test('GET /products should return list when authenticated', async ({ request }) => {
        // Step 1: Login to get token
        const loginResp = await request.post(`${API_URL}/Auth/login`, {
            data: { username: 'admin', password: 'admin123' }
        });
        const { token } = await loginResp.json();

        // Step 2: Request products with token
        const response = await request.get(`${API_URL}/products`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        expect(response.ok()).toBeTruthy();
        const products = await response.json();
        expect(Array.isArray(products)).toBeTruthy();
    });
});
