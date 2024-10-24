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
      const cardTitle = categoriesPage.cardTitle;
      
      await categoriesPage.filterBy(Category.Grinder);

      // Fetch results and compare
      
    })
  }
)