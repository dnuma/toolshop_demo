import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { ContactForm } from "../interfaces/contactForm";

export class ContactPage extends BasePage {
  readonly page: Page;
  readonly fname: Locator;
  readonly lname: Locator;
  readonly email: Locator;
  readonly subject: Locator;
  readonly message: Locator;
  readonly submitBtn: Locator;

  readonly confirmationToaster: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.fname = this.page.locator('[data-test="first-name"]');
    this.lname = this.page.locator('[data-test="last-name"]');
    this.email = this.page.locator('[data-test="email"]');
    this.subject = this.page.locator('[data-test="subject"]');
    this.message = this.page.locator('[data-test="message"]');
    this.submitBtn = this.page.locator('[data-test="contact-submit"]');
    this.confirmationToaster = this.page.getByText(`Thanks for your message! We will`);

  }

  async goTo() {
    await this.navContact.click();
  }

  async fillForm(userInfo: ContactForm) {
    await this.fname.fill(userInfo.fname);
    await this.lname.fill(userInfo.lname);
    await this.email.fill(userInfo.email);
    
    await this.subject.click();
    await this.subject.selectOption(userInfo.subject);

    await this.message.fill(userInfo.message);
    await this.submitBtn.click();

    await this.page.waitForLoadState('domcontentloaded');
  }

}