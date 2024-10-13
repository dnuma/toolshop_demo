import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class SignInPage extends BasePage {
  readonly page: Page;
  readonly navSignIn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navSignIn = this.page.locator('[data-test="nav-sign-in"]');
  }

  async goTo() {
    await this.navSignIn.click();
  }

}