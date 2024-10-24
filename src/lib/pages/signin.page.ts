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
    this.title = this.page.getByRole('heading', { name: 'Login' });

    this.email = this.page.locator('[data-test="email"]');
    this.password = this.page.locator('[data-test="password"]');
    this.loginBtn = this.page.locator('[data-test="login-submit"]');

    this.registerLink = this.page.locator('[data-test="register-link"]');
    this.fname = this.page.locator('[data-test="first-name"]');
    this.lname = this.page.locator('[data-test="last-name"]');
    this.dob = this.page.locator('[data-test="dob"]');
    this.address = this.page.locator('[data-test="address"]');
    this.postal = this.page.locator('[data-test="postcode"]');
    this.city = this.page.locator('[data-test="city"]');
    this.state = this.page.locator('[data-test="state"]');
    this.country = this.page.locator('[data-test="country"]');
    this.phone = this.page.locator('[data-test="phone"]');
  }

  async goTo() {
    await this.navSignIn.click();
  }

  async register() {    
    const phone = this.generateRandomPhone();
    const dob = this.generateRandomDob();
    const country = this.selectRandomCountry();
    const email = this.generateRandomEmail();
    const password = this.generateRandomPassword();
    
    await this.registerLink.click();
    await this.fname.fill('David');
    await this.lname.fill('Numa');
    await this.dob.fill(dob);
    await this.address.fill('123 Main St');
    await this.postal.fill('12345');
    await this.city.fill('Hogsmeade');
    await this.state.fill('Village');
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
    let password = '';
    while (password.length < 6) {
        password = Math.random().toString(36).substring(2, 12);
    }
    console.log(`Generated password: ${password}`);    
    return password.slice(0, 10);
}

  selectRandomCountry() {
    // All country codes can be added here, only this few for testing purposes
    const countries = ['VG', 'UA', 'CO', 'GB', 'US', 'CA'];
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }

  generateRandomPhone() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  generateRandomDob() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - Math.floor(Math.random() * 100));
    date.setMonth(Math.floor(Math.random() * 12));
    date.setDate(Math.floor(Math.random() * 28));

    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

}