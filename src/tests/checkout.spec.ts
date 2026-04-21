import { test, expect } from "@playwright/test";
import { SignInPage } from "../lib/pages/signin.page";
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
      const email = faker.internet.email();
      const password = faker.internet.password({ length: 12, memorable: false, prefix: 'Aa1!' });
      const fullName = `${process.env.FIRST_NAME} ${process.env.LAST_NAME}`;

      await test.step("Add to cart", async () => {

      });

      await test.step("Register user", async () => {        
        await signInPage.register(email, password);
        await signInPage.signIn(email, password);
        await expect(signInPage.navMenu).toContainText(fullName);
      });

      
    });


  }
);
