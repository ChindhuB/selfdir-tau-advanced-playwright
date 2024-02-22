import { test as base } from '@playwright/test';
import BookPage from '../pages/book-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

export const test = base.extend({
  isDupe: false,
  bookPage: async ({ isDupe, page }, use) => {
    const bookPage =
      await hooks.beforeEach(page, BookPage, pages.bookStorePage);

    await use(bookPage);
    console.log('Inisde Again');
    await bookPage.addToYourCollection(isDupe);
  },
});

export { expect } from '@playwright/test'; 