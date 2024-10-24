import { test, expect } from '@playwright/test';
import { CategoriesPage } from '../lib/pages/categories.page';

test.beforeEach(async ({ page }) => {
  const categoriesPage = new CategoriesPage(page);
  await page.goto('/');
  await categoriesPage.goTo("powertools")
});

test.describe("Categories - Power tools testing",
  {
    tag: ["@categories", "@powertools"]
  },
  () => {

    enum Category {
      Grinder = "Grinder",
      Sander = "Sander",
      Saw = "Saw",
      Drill = "Drill"
    }

    test("Filter by Grinder", {
      tag: "@grinder",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);
      const cardTitleLocator = categoriesPage.cardTitle;
      
      await categoriesPage.filterBy(Category.Grinder);
      
      if(await categoriesPage.pageEmpty.isVisible()){
        expect(true, { message: "There are no products found"});
      }
      else {
        const results = await categoriesPage.getCardInfo(cardTitleLocator);
        const resultsFiltered = results.filter((title) => title.includes(Category.Grinder));
        expect.soft(results).toEqual(resultsFiltered);
      }
      
    })
  }
)