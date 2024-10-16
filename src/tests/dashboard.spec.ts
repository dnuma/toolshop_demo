import { test, expect, Locator } from '@playwright/test';
import { CategoriesPage } from '../lib/pages/categories.page';
import { SignInPage } from '../lib/pages/signin.page';
import { ContactForm } from '../lib/interfaces/contactForm';
import { ContactPage } from '../lib/pages/contact.page';

const softExpectVisible = async (element: Locator) => {
  await expect.soft(element).toBeVisible();
};

[
  { name: 'handtools', expected: 'Category: Hand Tools' },
  { name: 'powertools', expected: 'Category: Power Tools' },
  { name: 'other', expected: 'Category: Other' },
  { name: 'specialtools', expected: 'Category: Special Tools' },
  { name: 'rentals', expected: 'Rentals' },
].forEach(({ name, expected }) => {
  test.describe("Categories validation", {
    tag: ["@categories", `@${name}`]
  }, 
  () => {

    test.beforeEach(async ({ page }) => {
      const categoriesPage = new CategoriesPage(page);
      await page.goto('/');
      await categoriesPage.goTo(`${name}`);
    });

    test(`Testing with ${expected}`, async ({ page }) => {
      const categoriesPage = new CategoriesPage(page);
      await expect(categoriesPage.pageTitle).toHaveText(expected);
    });
  });
});



test.describe("Home, Contact and Sign In validation",
  {
    tag: ["@dashboard"]
  },
  () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test("Home", {
      tag: "@home",
      
    }, async( { page }) => {
      
    })
    
    test("Contact", {
      tag: "@contact",
      
    }, async( { page }) => {
      const userInfo: ContactForm = {
        fname: 'John', 
        lname: 'Doe',
        email: 'john.doe@example.com',
        subject: 'webmaster', 
        message: `Hello, I need help with my website. The performance is not the same as last month.` 
      }

      const contactPage = new ContactPage(page);
      await contactPage.goTo();
      await contactPage.fillForm(userInfo);

      await softExpectVisible(contactPage.confirmationToaster);

    })

    test("Sign In", {
      tag: "@signin",
      
    }, async( { page }) => {
      const signInPage = new SignInPage(page);
      await signInPage.goTo();
      await softExpectVisible(signInPage.title);
      await softExpectVisible(signInPage.email);
      await softExpectVisible(signInPage.password);
      await softExpectVisible(signInPage.loginBtn);

    })
  }
)
