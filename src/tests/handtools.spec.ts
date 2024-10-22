import { test, expect, Locator } from '@playwright/test';
import { CategoriesPage } from '../lib/pages/categories.page';
import { resourceLimits } from 'worker_threads';

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

    test.skip("Sorting A-Z", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardTitleLocator = categoriesPage.cardTitle;

      await categoriesPage.sorting(Sorting.AtoZ);
      const results = await categoriesPage.getCardInfo(cardTitleLocator);
      const resultsAssorted = results.toSorted();

      expect.soft(results).toEqual(resultsAssorted);
      
    })

    test("Sorting Z-A", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardTitleLocator = categoriesPage.cardTitle;

      await categoriesPage.sorting(Sorting.ZtoA);
      const results = await categoriesPage.getCardInfo(cardTitleLocator);
      const resultsAssorted = results.toSorted().reverse();

      expect.soft(results).toEqual(resultsAssorted);
      
    })

    
  }
)