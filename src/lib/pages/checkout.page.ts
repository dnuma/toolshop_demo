import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import dotenv from 'dotenv';
dotenv.config();

export class CheckoutPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }


}
