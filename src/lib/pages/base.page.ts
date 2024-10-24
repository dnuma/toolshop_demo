import type { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly navHome: Locator;
  readonly navCategories: Locator;
  readonly navContact: Locator;
  readonly navSignIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navCategories = this.page.locator('[data-test="nav-categories"]');
    this.navHome = this.page.locator('[data-test="nav-home"]');
    this.navContact = this.page.locator('[data-test="nav-contact"]');
    this.navSignIn = this.page.locator('[data-test="nav-sign-in"]');
  }

  async openProduct(product: Locator) {
    await product.click();
  }

}