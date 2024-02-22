import { expect } from '@playwright/test';
import bookListData from '../../data/book-list-data';
import apiPaths from '../../utils/apiPaths';

class SearchPage {

  /**
          * @param {import('@playwright/test').Page} page,
          */
  constructor(page) {
    this.page = page;
    this.bookAdminLabel = page.getByText('Speaking JavaScript');
    this.booksCollectionRequestRegExp = new RegExp(apiPaths.account);
    this.bookUserLabel = page.getByText('Understanding ECMAScript 6');
    this.gridRow1 = page.locator('div:nth-child(1) > .rt-tr > div:nth-child(2)').last();
    this.gridRow2 = page.locator('div:nth-child(2) > .rt-tr > div:nth-child(2)');
    this.notLoggedInLabel = page.getByText('Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.');
    this.searchField = page.getByPlaceholder('Type to search');
    this.titleHeaderLabel = page.getByText('Title');
  }

  async fillSearchField(q) {
    await this.searchField.fill(q);
  }

  async checkSearchResult(q, items) {
  }

  async checkBooksList() {
    for (const book of bookListData.books) {
      await expect(this.page.getByRole('link', { name: book.title })).toBeVisible();
    }
  }

  async sortBooksList() {
    await this.titleHeaderLabel.click({ clickCount: 2 });
  }

  async checkLoggedIn() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    // await expect(this.notLoggedInLabel).toBeVisible();
  }

  async checkLoggedInUser() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    await expect(this.bookUserLabel).toBeVisible();
  }

  async checkLoggedInAdmin() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    await expect(this.bookAdminLabel).toBeVisible();
  }

  async checkSort() {
    await expect(this.gridRow1).toContainText(bookListData.books[1].title);
    await expect(this.gridRow2).toContainText(bookListData.books[0].title);
  }

  async getBooksList() {
  }

  async mockBooksListResponse(context) {
    await context.route(this.booksCollectionRequestRegExp, (route) => route.fulfill({
      body: JSON.stringify({ ...(bookListData) })
    }));
  }
}

export default SearchPage;
