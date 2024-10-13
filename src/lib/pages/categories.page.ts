import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CategoriesPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

}