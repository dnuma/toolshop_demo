import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

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
  readonly address: Locator;
  readonly postal: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly registerBtn: Locator;

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
    this.address = this.page.locator('[data-test="address"]');
    this.postal = this.page.locator('[data-test="postcode"]');
    this.city = this.page.locator('[data-test="city"]');
    this.state = this.page.locator('[data-test="state"]');
    this.country = this.page.locator('[data-test="country"]');
    this.phone = this.page.locator('[data-test="phone"]');
    this.registerBtn = this.page.locator('[data-test="register-submit"]');
  }

  async goTo() {
    await this.navSignIn.click();
  }

  async register(email: string, password: string) {
    const phone = this.generateRandomPhone();
    const dob = this.generateRandomDob();
    const country = this.selectRandomCountry();

    await this.registerLink.click();
    await this.fname.fill("David");
    await this.lname.fill("Numa");
    await this.dob.fill(dob);
    await this.address.fill("123 Main St");
    await this.postal.fill("12345");
    await this.city.fill("Hogsmeade");
    await this.state.fill("Village");
    await this.country.selectOption({ value: country });
    await this.phone.fill(phone);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.registerBtn.click();
  }

  generateRandomEmail() {
    const timestamp = new Date().getTime();
    const domain = `hogwarts.com`;
    return `griffindor+${timestamp}@${domain}`.toLowerCase();
  }

  generateRandomPassword() {
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    const getRandomChar = (chars: string) =>
      chars[Math.floor(Math.random() * chars.length)];

    let password = "";
    while (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)
    ) {
      password = "";
      for (let i = 0; i < 8; i++) {
        const charType = Math.floor(Math.random() * 4);
        if (charType === 0) {
          password += getRandomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        } else if (charType === 1) {
          password += getRandomChar("abcdefghijklmnopqrstuvwxyz");
        } else if (charType === 2) {
          password += getRandomChar("0123456789");
        } else {
          password += getRandomChar(symbols);
        }
      }
    }
    return password;
  }

  selectRandomCountry() {
    // All country codes can be added here, only this few for testing purposes
    const countries = ["VG", "UA", "CO", "GB", "US", "CA"];
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }

  generateRandomPhone() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  generateRandomDob() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const minYear = currentYear - 100;
    const maxYear = currentYear - 20;

    date.setFullYear(Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear);
    date.setMonth(Math.floor(Math.random() * 12));
    date.setDate(Math.floor(Math.random() * 28) + 1); // Ensure date is between 1 and 28

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}
}
