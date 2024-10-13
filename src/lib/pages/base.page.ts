import type { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly navHome: Locator;
  readonly navCategories: Locator

  constructor(page: Page) {
    this.page = page;
    this.navCategories = this.page.locator('[data-test="nav-categories"]');
    this.navHome = this.page.locator('[data-test="nav-home"]');
  }

}