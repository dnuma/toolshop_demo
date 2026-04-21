import { test, expect } from "@playwright/test";
import { SignInPage } from "../lib/pages/signin.page";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  const signInPage = new SignInPage(page);
  await page.goto("/");
  await signInPage.goTo();
});

test.describe(
  "Register and sign In testing",
  {
    tag: ["@register", "@signIn"],
  },
  () => {
    let email = "";
    let password = "";

    test("", async ({ page }) => {
      const signInPage = new SignInPage(page);

      await test.step("Generate random user credentials", async () => {
        email = faker.internet.email();
        password = faker.internet.password({ length: 12, memorable: false, prefix: 'Aa1!' });
        console.log(`New Credentials: Email [ ${email} ] - Password [ ${password} ]`)
      });

      await test.step("Register the user", async () => {
        await signInPage.register(email, password);
        await expect(signInPage.title).toBeVisible();
      });

      await test.step("Sign in the user", async () => {
        const fullName = `${process.env.FIRST_NAME} ${process.env.LAST_NAME}`;
        await signInPage.signIn(email, password);
        await expect(signInPage.navMenu).toContainText(fullName);
      });
    });
  }
);
