import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly sortTitle: Locator;
  readonly filterTitle: Locator;
  readonly banner: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.sortTitle = this.page.getByRole('heading', { name: 'Sort' });
    this.filterTitle = this.page.getByRole('heading', { name: 'Filters' });
    this.banner = this.page.getByRole('img', { name: 'Banner' });

  }

  async goTo() {
    await this.navHome.click();
  }


}