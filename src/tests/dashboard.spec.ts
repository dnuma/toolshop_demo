import { test, expect } from '@playwright/test';
import { CategoriesPage } from '../lib/pages/categories.page';
import { SignInPage } from '../lib/pages/signin.page';

[
  { name: 'handtools', expected: 'Category: Hand Tools' },
  { name: 'powertools', expected: 'Category: Power Tools' },
  { name: 'other', expected: 'Category: Other' },
  { name: 'specialtools', expected: 'Category: Special Tools' },
  { name: 'rentals', expected: 'Rentals' },
].forEach(({ name, expected }) => {
  test.describe("Categories validation", {
    tag: ["@categories", `@${name}`]
  }, 
  () => {

    test.beforeEach(async ({ page }) => {
      const categoriesPage = new CategoriesPage(page);
      await page.goto('/');
      await categoriesPage.goTo(`${name}`);
    });

    test(`Testing with ${expected}`, async ({ page }) => {
      const categoriesPage = new CategoriesPage(page);
      await expect(categoriesPage.pageTitle).toHaveText(expected);
    });
  });
});



test.describe("Home, Contact and Sign In validation",
  {
    tag: ["@dashboard"]
  },
  () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

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
      const signInPage = new SignInPage(page);
      await signInPage.goTo();
      await expect.soft(signInPage.title).toBeVisible();
      await expect.soft(signInPage.email).toBeVisible();
      await expect.soft(signInPage.password).toBeVisible();
      await expect.soft(signInPage.loginBtn).toBeVisible();

    })
  }
)
