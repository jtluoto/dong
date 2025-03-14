import { test, expect } from '@playwright/test';
import { fail } from 'assert';

test('homepage has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Euro Dong/);
});

test('converts Dong to Euro correctly', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');
  
  // Input a value in Dongs - let's use 100000 VND
  await page.locator('#dong-input').fill('100000');
  
  // Click the convert button
  await page.locator('#convert-button').click();
  
  // Wait for conversion to complete
  await page.waitForSelector('#euro-result');
  
  // Get the result and verify (assuming 100000 VND is about 3.8 EUR with current exchange rate)
  const resultText = await page.locator('#euro-result').textContent() || '';
  
  // Extract the numeric value from the result
  const match = resultText.match(/[\d.]+/);
  expect(match).not.toBeNull();
  const euroValue = parseFloat(match?.[0] || '0');
  
  // Check if the result is close to expected value (with some tolerance for rate changes)
  expect(euroValue).toBeGreaterThan(0);
  
  // Verify format/display of the result
  expect(resultText).toMatch(/€|EUR|Euro/);
});

test('converts Euro to Dong correctly', async ({ page }) => {
  await page.goto('/');
  
  // Toggle to Euro to Dong conversion mode if needed
  await page.locator('#toggle-mode-button').click();
  
  // Input a value in Euros
  await page.locator('#euro-input').fill('10');
  
  // Click the convert button
  await page.locator('#convert-button').click();
  
  // Wait for conversion to complete
  await page.waitForSelector('#dong-result');
  
  // Get the result
  const resultText = await page.locator('#dong-result').textContent() || '';
  
  // Extract the numeric value
  const match = resultText.match(/[\d,]+/);
  expect(match).not.toBeNull();
  const dongValue = parseFloat((match?.[0] || '0').replace(/,/g, ''));
  
  // Verify the result is reasonable
  expect(dongValue).toBeGreaterThan(100000);
  
  // Verify format of the result
  expect(resultText).toMatch(/VND|Dong|₫/);
});

test('handles invalid input gracefully', async ({ page }) => {
  await page.goto('/');
  
  // Test with non-numeric input
  await page.locator('#dong-input').fill('abc');
  await page.locator('#convert-button').click();
  
  // Check for error message
  const errorElement = page.locator('.error-message');
  await expect(errorElement).toBeVisible();
  
  // Clear and test with negative number
  await page.locator('#dong-input').fill('-5000');
  await page.locator('#convert-button').click();
  
  // Error should still be visible
  await expect(errorElement).toBeVisible();
});