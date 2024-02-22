import { test } from '@playwright/test';
import BookPage from '../pages/book-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

let bookPage;
let page;
/**
        * @param {import('@playwright/test').Browser} browser
        */
test.beforeAll(async ({ browser }, testInfo) => {
    // Create a new incognito browser context
    const context = await browser.newContext();
    // Create a new page inside context.
    page = await context.newPage();
    console.log(`Running Project: ${testInfo.project.name}, Title: ${testInfo.title}`);
});
test.beforeEach(async ({ page }) => {
    bookPage = await hooks.beforeEach(page, BookPage, pages.bookStorePage);
});

test.describe('Books - Dynamic Page Object Model', () => {
    test('Add brand new book', async () => {
        await bookPage.clickAtSpeakingJSBook();
        // ** Commented as NOT Working in DEMO QA Page ---await bookPage.checkSpeakingJSIsbn();
    });
});
