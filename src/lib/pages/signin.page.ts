import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class SignInPage extends BasePage {
  readonly page: Page;
  readonly navSignIn: Locator;
  readonly title: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navSignIn = this.page.locator('[data-test="nav-sign-in"]');
    this.title = this.page.getByRole('heading', { name: 'Login' });

    this.email = this.page.locator('[data-test="email"]');
    this.password = this.page.locator('[data-test="password"]');
    this.loginBtn = this.page.locator('[data-test="login-submit"]');

  }

  async goTo() {
    await this.navSignIn.click();
  }

}