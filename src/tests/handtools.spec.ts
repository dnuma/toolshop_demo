import { test, expect } from '@playwright/test';
import { CategoriesPage } from '../lib/pages/categories.page';

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

      if(await categoriesPage.pageEmpty.isVisible()){
        expect(true, { message: "There are no products found"});
      }
      else {
        const results = await categoriesPage.getCardInfo(cardTitleLocator);
        const resultsAssorted = results.toSorted((a, b) => a.localeCompare(b)); 
  
        expect.soft(results).toEqual(resultsAssorted);
      }      
    })

    test("Sorting Z-A", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardTitleLocator = categoriesPage.cardTitle;

      await categoriesPage.sorting(Sorting.ZtoA);

      if(await categoriesPage.pageEmpty.isVisible()){
        expect(true, { message: "There are no products found"});
      }
      else {
        const results = await categoriesPage.getCardInfo(cardTitleLocator);
        const resultsAssorted = results.toSorted((a, b) => b.localeCompare(a));   

        expect.soft(results).toEqual(resultsAssorted);
      }
    })

    test("Sorting Price High - Low", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardPriceLocator = categoriesPage.cardPrice;

      await categoriesPage.sorting(Sorting.PriceHightoLow);

      if(await categoriesPage.pageEmpty.isVisible()){
        expect(true, { message: "There are no products found"});
      }
      else {
        const results = await categoriesPage.getCardInfo(cardPriceLocator);

        // create numeric array
        const parsedPrices = results.map(price => parseInt(price.replace(/[$.]/g, ''), 10));      
        
        // Confirm sorting and assert
        const pricesAssorted = parsedPrices.toSorted((a, b) => b - a);      
        expect.soft(parsedPrices).toEqual(pricesAssorted);
      }
    })

    test("Sorting Price Low - High", {
      tag: "@sorting",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardPriceLocator = categoriesPage.cardPrice;
      
      await categoriesPage.sorting(Sorting.PriceLowtoHigh);

      if(await categoriesPage.pageEmpty.isVisible()){
        expect(true, { message: "There are no products found"});
      }
      else {
        const results = await categoriesPage.getCardInfo(cardPriceLocator);

        // create numeric array
        const parsedPrices = results.map(price => parseInt(price.replace(/[$.]/g, ''), 10));      
        
        // Confirm sorting and assert
        const pricesAssorted = parsedPrices.toSorted((a, b) => a - b);      
        expect.soft(parsedPrices).toEqual(pricesAssorted);
      }
    })
  }
)