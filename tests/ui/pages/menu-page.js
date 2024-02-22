import { expect } from '@playwright/test';
import uiPages from '../../utils/uiPages';

class MenuPage {
  /**
            * @param {import('@playwright/test').Page} page,
            * @param {import('@playwright/test').BrowserContext} context,
            */
  constructor(page, context) {
    this.page = page;
    this.context = context;
    this.bookStoreAPI = page.getByText('Book Store API', { exact: true });
  }

  async openSwaggerAndCheck() {
    await this.page.goto(uiPages.bookStore);
    await this.bookStoreAPI.click();
    await expect(this.page).toHaveURL(/.*swagger/);
  }
}

export default MenuPage;
