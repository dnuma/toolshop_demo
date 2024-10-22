import { test, expect, Locator } from '@playwright/test';
import { CategoriesPage } from '../lib/pages/categories.page';

const softExpectVisible = async (element: Locator) => {
  await expect.soft(element).toBeVisible();
};

test.beforeEach(async ({ page }) => {
  const categoriesPage = new CategoriesPage(page);
  await page.goto('/');
  await categoriesPage.goTo("handtools")
});

test.describe("Categories - Hand tools testing",
  {
    tag: ["@categories", "@handtools"]
  },
  () => {

    enum Sorting {
      AtoZ = "a-z",
      ZtoA = "z-a",
      PriceHightoLow = "h-l",
      PriceLowtoHigh = "l-h"
    }

    test("Sorting A-Z", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      await categoriesPage.sorting(Sorting.AtoZ);
      const results = await categoriesPage.getResults();
      const resultsAssorted = results.toSorted();

      expect.soft(results === resultsAssorted);
      
    })


  }
)