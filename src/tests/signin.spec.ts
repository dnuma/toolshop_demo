import { test, expect } from "@playwright/test";
import { SignInPage } from "../lib/pages/signin.page";

test.beforeEach(async ({ page }) => {
  const signInPage = new SignInPage(page);
  await page.goto("/");
  await signInPage.goTo();
});

test.describe(
  "Sign In testing",
  {
    tag: ["@register", "@signIn"],
  },
  () => {
    let email = "";
    let password = "";

    test("Register the user", async ({ page }) => {
      const signInPage = new SignInPage(page);
      email = signInPage.generateRandomEmail();
      password = signInPage.generateRandomPassword();

      await signInPage.register(email, password);
      await expect(signInPage.title).toBeVisible();
    });

    test("Sign in the user", async ({ page }) => {
      const signInPage = new SignInPage(page);

      await signInPage.signIn(email, password);
      await page.pause();
      // await expect(signInPage.title).toBeVisible();
    });
  }
);
