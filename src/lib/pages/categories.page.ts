import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CategoriesPage extends BasePage {
  readonly page: Page;
  readonly navHandTools: Locator;
  readonly navPowerTools: Locator;
  readonly navOther: Locator;
  readonly navSpecialTools: Locator;
  readonly navRentals: Locator;

  readonly pageTitle: Locator;

  readonly sort: Locator;
  readonly cardTitle: Locator;
  readonly cardPrice: Locator;
  readonly category: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navHandTools = this.page.locator('[data-test="nav-hand-tools"]');
    this.navPowerTools = this.page.locator('[data-test="nav-power-tools"]');
    this.navOther = this.page.locator('[data-test="nav-other"]');
    this.navSpecialTools = this.page.locator('[data-test="nav-special-tools"]');
    this.navRentals = this.page.locator('[data-test="nav-rentals"]');
    this.pageTitle = this.page.locator('[data-test="page-title"]');
    this.sort = this.page.locator('[data-test="sort"]');
    this.cardTitle = this.page.locator(`.card-title`);
    this.cardPrice = this.page.locator(`[data-test="product-price"]`);
  }

  async goTo(category: string) {
    await this.navCategories.click();

    switch(category) {
      case "handtools": {
        await this.navHandTools.click();
        break;
      }
      case "powertools": {
        await this.navPowerTools.click();
        break;
      }
      case "other": {
        await this.navOther.click();
        break;
      }
      case "specialtools": {
        await this.navSpecialTools.click();
        break;
      }
      case "rentals": {
        await this.navRentals.click();
        break;
      }
      default: break;
    }
  }

  async sorting(sortType: string) {
    await this.sort.click();

    switch(sortType) {
      case "a-z": { // Name A to Z
        await this.sort.selectOption('name,asc');
        break;
      }
      case "z-a": { // Name Z to A
        await this.sort.selectOption('name,desc');
        break;
      }
      case "h-l": { // Price High to Low
        await this.sort.selectOption('price,desc');
        break;
      }
      case "l-h": {  // Price Low to High
        await this.sort.selectOption('price,asc');
        break;
      }
      default: break;
    }

    await this.page.waitForTimeout(2000);
  }


  async getCardInfo(card: Locator): Promise<string[]> {
    
    const titles: string[] = [];
    const cardsQty = await card.count();
    
    for (let i = 0; i < cardsQty; i++) {
      const text = await card.nth(i).textContent();      
      titles.push(text);
    }
        
    return titles;
  }

}