import { test, expect } from '@playwright/test';
import { BasePage } from '../lib/pages/base.pages';

test.beforeEach(async ({page}) => { 
  const title = "Practice Software Testing";
  await page.goto('/');
  expect(page).toHaveTitle(title);
});

[
  { name: 'handtools', expected: 'Hand Tools' },
  { name: 'powertools', expected: 'Power Tools' },
  { name: 'others', expected: 'Others' },
  { name: 'specialtools', expected: 'Special Tools' },
  { name: 'rentals', expected: 'Rentals' },
].forEach(({ name, expected }) => {
  test.describe("Categories validation", {
    tag: ["categories", `@${name}`]
  }, 
  () => {
    test.beforeEach(async ({ page }) => {
      
    });
    test(`Testing with ${expected}`, async ({ page }) => {


      await expect(page.getByRole('heading')).toHaveText(expected);
    });
  });
});



test.describe("Home, Contact and Sign In validation",
  {
    tag: ["@dashboard"]
  },
  () => {
    test("Home", {
      tag: "@home",
      
    }, async( { page }) => {
      
    })
    test("Contact", {
      tag: "@contact",
      
    }, async( { page }) => {
      
    })
    test("Sign In", {
      tag: "@signin",
      
    }, async( { page }) => {
      
    })
  }
)
