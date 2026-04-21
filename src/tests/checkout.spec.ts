import { test, expect } from "@playwright/test";
import { SignInPage } from "../lib/pages/signin.page";
import { CheckoutPage } from "../lib/pages/checkout.page";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  const signInPage = new SignInPage(page);
  await page.goto("/");
  await signInPage.goTo();
});

test.describe(
  "Checkout Testing",
  {
    tag: ["@checkout", "@addtocart"],
  },
  () => {
    test("Checkout", async ({ page }) => {
      const signInPage = new SignInPage(page);
      const checkoutPage = new CheckoutPage(page);
      const email = faker.internet.email();
      const password = faker.internet.password({
        length: 12,
        memorable: false,
        prefix: "Aa1!",
      });
      const fullName = `${process.env.FIRST_NAME} ${process.env.LAST_NAME}`;
      const productPrices: number[] = [];

      await test.step("Register user", async () => {
        await signInPage.register(email, password);
        await signInPage.signIn(email, password);
        await expect(signInPage.navMenu).toContainText(fullName);
      });

      await test.step("Add to cart", async () => {
        await page.goto("/");
        const prices = await checkoutPage.addRandomProductsToCart(2);
        productPrices.push(...prices);
      });

      await test.step("Proceed to checkout", async () => {
        await checkoutPage.goToCart();

        console.log(
          `Compare each product's unit price against its cart line price`,
        );
        const linePrices = await checkoutPage.getLinePrices();
        for (let i = 0; i < productPrices.length; i++) {
          expect.soft(productPrices[i]).toBeCloseTo(linePrices[i], 2);
        }

        console.log(`Sum of line prices must equal cart total`);
        const cartTotal = await checkoutPage.getCartTotal();
        const lineSum = linePrices.reduce((a, b) => a + b, 0);
        expect.soft(lineSum).toBeCloseTo(cartTotal, 2);

        console.log(`Step 1 → 2: proceed from cart to login step`);
        await checkoutPage.proceed1.click();

        console.log(`Step 2 → 3: already signed in, proceed directly`);
        await checkoutPage.proceed2.click();

        console.log(`Step 3: fill address, proceed to payment`);
        await checkoutPage.fillAddress();
        await checkoutPage.proceed3.click();

        console.log(`Step 4: select payment method and confirm`);
        await checkoutPage.paymentMethod.selectOption({
          label: "Cash on Delivery",
        });
        await checkoutPage.finishBtn.click();

        await expect.soft(checkoutPage.paymentSuccess).toBeVisible();
      });
    });
  },
);
