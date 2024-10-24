import { test, expect } from '@playwright/test';
import { CategoriesPage } from '../lib/pages/categories.page';

test.beforeEach(async ({ page }) => {
  const categoriesPage = new CategoriesPage(page);
  await page.goto('/');
  await categoriesPage.goTo("other")
});

test.describe("Categories - Other testing",
  {
    tag: ["@categories", "@other"]
  },
  () => {

    enum Category {
      ForgeFlex = "ForgeFlex Tools",
      MightyCraft = "MightyCraft Hardware",
    }

    test("Filter by ForgeFlex", {
      tag: "@forgeflex",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);

      await categoriesPage.filterBy(Category.ForgeFlex);
      
      if(await categoriesPage.pageEmpty.isVisible()){
        expect(true, { message: "There are no products found"});
      }
      else {
        const cardTitleLocator = categoriesPage.cardTitle.first();
        await categoriesPage.openProduct(cardTitleLocator);

        expect(await categoriesPage.brand.innerText()).toContain(Category.ForgeFlex);
      }
    })

    test("Filter by MightyCraft", {
      tag: "@mightycraft",      
    }, async( { page }) => {
      const categoriesPage = new CategoriesPage(page);

      await categoriesPage.filterBy(Category.MightyCraft);
      
      if(await categoriesPage.pageEmpty.isVisible()){
        expect(true, { message: "There are no products found"});
      }
      else {
        const cardTitleLocator = categoriesPage.cardTitle.first();
        await categoriesPage.openProduct(cardTitleLocator);

        expect(await categoriesPage.brand.innerText()).toContain(Category.MightyCraft);
      }
    })
    
  }
)