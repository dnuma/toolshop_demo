import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { faker } from "@faker-js/faker";

export class CheckoutPage extends BasePage {
  readonly page: Page;

  // Navigation
  readonly navCart: Locator;
  readonly cartQuantity: Locator;

  // Product overview – in-stock cards only
  readonly productCards: Locator;

  // Product detail
  readonly unitPrice: Locator;
  readonly addToCartBtn: Locator;

  // Cart (step 1)
  readonly cartProductPrices: Locator;
  readonly linePrices: Locator;
  readonly cartTotal: Locator;
  readonly proceed1: Locator;

  // Checkout step 2 – login (user is already signed in)
  readonly proceed2: Locator;

  // Checkout step 3 – address
  readonly addressCountry: Locator;
  readonly addressPostal: Locator;
  readonly addressHouseNumber: Locator;
  readonly addressStreet: Locator;
  readonly addressCity: Locator;
  readonly addressState: Locator;
  readonly proceed3: Locator;

  // Checkout step 4 – payment
  readonly paymentMethod: Locator;
  readonly finishBtn: Locator;
  readonly paymentSuccess: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.navCart = this.page.locator('[data-test="nav-cart"]');
    this.cartQuantity = this.page.locator('[data-test="cart-quantity"]');

    this.productCards = this.page.locator('a[data-test^="product-"]').filter({
      hasNot: this.page.locator('[data-test="out-of-stock"]'),
    });

    this.unitPrice = this.page.locator('[data-test="unit-price"]');
    this.addToCartBtn = this.page.locator('[data-test="add-to-cart"]');

    this.cartProductPrices = this.page.locator('[data-test="product-price"]');
    this.linePrices = this.page.locator('[data-test="line-price"]');
    this.cartTotal = this.page.locator('[data-test="cart-total"]');
    this.proceed1 = this.page.locator('[data-test="proceed-1"]');

    this.proceed2 = this.page.locator('[data-test="proceed-2"]');

    this.addressCountry = this.page.locator('[data-test="country"]');
    this.addressPostal = this.page.locator('[data-test="postal_code"]');
    this.addressHouseNumber = this.page.locator('[data-test="house_number"]');
    this.addressStreet = this.page.locator('[data-test="street"]');
    this.addressCity = this.page.locator('[data-test="city"]');
    this.addressState = this.page.locator('[data-test="state"]');
    this.proceed3 = this.page.locator('[data-test="proceed-3"]');

    this.paymentMethod = this.page.locator('[data-test="payment-method"]');
    this.finishBtn = this.page.locator('[data-test="finish"]');
    this.paymentSuccess = this.page.locator('[data-test="payment-success-message"]');
  }

  async goToCart(): Promise<void> {
    await this.page.goto('/checkout');
    await this.page.waitForLoadState('networkidle');
  }

  async addRandomProductsToCart(count: number = 2): Promise<number[]> {
    const prices: number[] = [];
    await this.productCards.first().waitFor(); // wait for Angular to render product cards
    const total = await this.productCards.count();

    // Pick random unique indices from available in-stock products
    const indices = faker.helpers.arrayElements([...Array(total).keys()], count);

    // Pre-collect hrefs so the list position doesn't affect navigation
    const hrefs: string[] = [];
    for (const idx of indices) {
      hrefs.push(await this.productCards.nth(idx).getAttribute('href'));
    }

    for (const href of hrefs) {
      await this.page.goto(href);
      const priceText = await this.unitPrice.textContent();
      prices.push(parseFloat(priceText.replace('$', '').trim()));
      await this.addToCartBtn.click();
      await this.page.waitForLoadState('networkidle');
    }

    return prices;
  }

  async getLinePrices(): Promise<number[]> {
    const texts = await this.linePrices.allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '').trim()));
  }

  async getCartTotal(): Promise<number> {
    const text = await this.cartTotal.textContent();
    return parseFloat(text.replace('$', '').trim());
  }

  async fillAddress(): Promise<void> {
    await this.addressCountry.fill('United States');
    await this.addressPostal.fill('10001');
    await this.addressHouseNumber.fill('42');
    await this.page.waitForLoadState('networkidle'); // wait for address auto-fill lookup
    await this.addressStreet.fill('123 Main St');
    await this.addressCity.fill('New York');
    await this.addressState.fill('NY');
  }
}
