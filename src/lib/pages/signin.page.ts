import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { faker } from "@faker-js/faker";
import dotenv from 'dotenv';
dotenv.config();

export class SignInPage extends BasePage {
  readonly page: Page;
  readonly title: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  readonly registerLink: Locator;
  readonly fname: Locator;
  readonly lname: Locator;
  readonly dob: Locator;
  readonly country: Locator;
  readonly postal: Locator;
  readonly houseNumber: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly phone: Locator;
  readonly registerBtn: Locator;

  readonly navMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.title = this.page.getByRole("heading", { name: "Login" });

    this.email = this.page.locator('[data-test="email"]');
    this.password = this.page.locator('[data-test="password"]');
    this.loginBtn = this.page.locator('[data-test="login-submit"]');
    this.registerLink = this.page.locator(`a:has-text("Register your account")`);

    this.fname = this.page.locator('[data-test="first-name"]');
    this.lname = this.page.locator('[data-test="last-name"]');
    this.dob = this.page.locator('[data-test="dob"]');
    this.country = this.page.locator('[data-test="country"]');
    this.postal = this.page.getByPlaceholder('Your Postcode *');
    this.houseNumber = this.page.getByPlaceholder('e.g. 42 *');
    this.address = this.page.getByPlaceholder('Your Street *');
    this.city = this.page.getByPlaceholder('Your City *');
    this.state = this.page.getByPlaceholder('Your State *');
    this.phone = this.page.locator('[data-test="phone"]');
    this.registerBtn = this.page.locator('[data-test="register-submit"]');
    this.navMenu = this.page.locator('[data-test="nav-menu"]');
  }

  async goTo() {
    await this.navSignIn.click();
  }

  async register(email: string, password: string) {
    const phone = faker.string.numeric(10);
    const dob = faker.date.birthdate({ min: 20, max: 70, mode: 'age' }).toISOString().split('T')[0];
    const country = faker.helpers.arrayElement(["VG", "UA", "CO", "GB", "US", "CA"]);

    await this.registerLink.click();
    await this.fname.fill(process.env.FIRST_NAME);
    await this.lname.fill(process.env.LAST_NAME);
    await this.dob.fill(dob);
    await this.country.selectOption({ value: country });
    await this.postal.fill("12345");
    await this.houseNumber.fill("42");
    await this.address.fill("123 Main St");
    await this.city.fill("Hogsmeade");
    await this.state.fill("Village");
    await this.phone.fill(phone);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.registerBtn.click();

    console.log(`Registered user: ${email} / ${password}`);
    
  }

  async signIn(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}
