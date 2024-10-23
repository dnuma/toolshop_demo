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

    test("Sorting A-Z", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardTitleLocator = categoriesPage.cardTitle;

      await categoriesPage.sorting(Sorting.AtoZ);
      const results = await categoriesPage.getCardInfo(cardTitleLocator);
      const resultsAssorted = results.toSorted((a, b) => a.localeCompare(b)); 

      expect.soft(results).toEqual(resultsAssorted);
      
    })

    test("Sorting Z-A", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardTitleLocator = categoriesPage.cardTitle;

      await categoriesPage.sorting(Sorting.ZtoA);
      const results = await categoriesPage.getCardInfo(cardTitleLocator);
      const resultsAssorted = results.toSorted((a, b) => b.localeCompare(a));   

      expect.soft(results).toEqual(resultsAssorted);
      
    })

    test("Sorting Price High - Low", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardPriceLocator = categoriesPage.cardPrice;

      await categoriesPage.sorting(Sorting.PriceHightoLow);
      const results = await categoriesPage.getCardInfo(cardPriceLocator);

      // create numeric array
      const parsedPrices = results.map(price => parseInt(price.replace(/[$.]/g, ''), 10));      
      
      // Confirm sorting and assert
      const pricesAssorted = parsedPrices.toSorted((a, b) => b - a);      
      expect.soft(parsedPrices).toEqual(pricesAssorted);
      
    })

    test("Sorting Price Low - High", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardPriceLocator = categoriesPage.cardPrice;
      
      // await page.pause()
      await categoriesPage.sorting(Sorting.PriceLowtoHigh);
      const results = await categoriesPage.getCardInfo(cardPriceLocator);

      // create numeric array
      const parsedPrices = results.map(price => parseInt(price.replace(/[$.]/g, ''), 10));      
      
      // Confirm sorting and assert
      const pricesAssorted = parsedPrices.toSorted((a, b) => a - b);      
      expect.soft(parsedPrices).toEqual(pricesAssorted);
      
    })
  }
)