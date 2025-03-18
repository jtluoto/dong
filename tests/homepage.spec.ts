import { test, expect } from '@playwright/test';
import { fail } from 'assert';

// Mock API response
const mockExchangeRateResponse = {
  date: "2023-06-10",
  eur: {
    vnd: 25000 // Fixed exchange rate for testing
  }
};

test.beforeEach(async ({ page }) => {
  // Mock the currency API response
  await page.route('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025-03-16/v1/currencies/eur.json', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockExchangeRateResponse)
    });
  });
});

test('homepage has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Euro Dong/);
});

test('converts Dong to Euro correctly', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');
  
  // Input a value in Dongs - let's use 100000 VND
  await page.locator('#currency-input').fill('100000');
  
  // Click the convert button
  await page.locator('#convert-button').click();
  
  // Wait for conversion to complete
  await page.waitForSelector('#result');
  
  // Get the result and verify (using our mocked exchange rate)
  const resultText = await page.locator('#result').textContent() || '';
  
  // Extract the numeric value from the result
  const match = resultText.match(/[\d.]+/);
  expect(match).not.toBeNull();
  const euroValue = parseFloat(match?.[0] || '0');
  
  // With our mocked rate of 25000, 100000 VND should be 4 EUR
  expect(euroValue).toBeCloseTo(4, 1);
  
  // Verify format/display of the result
  expect(resultText).toMatch(/€|EUR|Euro/);
});

test('converts Euro to Dong correctly', async ({ page }) => {
  await page.goto('/');
  
  // Toggle to Euro to Dong conversion mode if needed
  await page.locator('#eur-to-vnd-button').click();
  
  // Input a value in Euros
  await page.locator('#currency-input').fill('10');
  
  // Click the convert button
  await page.locator('#convert-button').click();
  
  // Wait for conversion to complete
  await page.waitForSelector('#result');
  
  // Get the result
  const resultText = await page.locator('#result').textContent() || '';
  
  // Extract the numeric value
  const match = resultText.match(/[\d,]+/);
  expect(match).not.toBeNull();
  const dongValue = parseFloat((match?.[0] || '0').replace(/,/g, ''));
  
  // With our mocked rate of 25000, 10 EUR should be 250000 VND
  expect(dongValue).toBe(250000);
  
  // Verify format of the result
  expect(resultText).toMatch(/VND|Dong|₫/);
});
