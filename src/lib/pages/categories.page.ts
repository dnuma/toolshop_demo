import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CategoriesPage extends BasePage {
  readonly page: Page;
  readonly navHandTools: Locator;
  readonly navPowerTools: Locator;
  readonly navOther: Locator;
  readonly navSpecialTools: Locator;
  readonly navRentals: Locator;

  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navHandTools = this.page.locator('[data-test="nav-hand-tools"]');
    this.navPowerTools = this.page.locator('[data-test="nav-power-tools"]');
    this.navOther = this.page.locator('[data-test="nav-other"]');
    this.navSpecialTools = this.page.locator('[data-test="nav-special-tools"]');
    this.navRentals = this.page.locator('[data-test="nav-rentals"]');
    this.pageTitle = this.page.locator('[data-test="page-title"]');
  }

  async goTo(category: string) {
    await this.navCategories.click();

    switch(category) {
      case "handtools": {
        await this.navHandTools.click();
        break;
      }
      case "powertools": {
        await this.navPowerTools.click();
        break;
      }
      case "other": {
        await this.navOther.click();
        break;
      }
      case "specialtools": {
        await this.navSpecialTools.click();
        break;
      }
      case "rentals": {
        await this.navRentals.click();
        break;
      }
    }
  }


}