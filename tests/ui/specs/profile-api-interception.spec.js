import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import apiPaths from '../../utils/apiPaths';
import pages from '../../utils/pages';

let profilePage;
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
    await page.goto(pages.profile);
    profilePage = new ProfilePage(page);
});

test.describe('Profile - API Interception', () => {
    test('Sort books', async ({ page, context }) => {
        await watchAPICallAndMockResponse(page, context);
        await profilePage.checkBooksList();
        await profilePage.sortBooksList();
        await profilePage.checkSort();
    });
});

async function watchAPICallAndMockResponse(page, context) {
    await profilePage.mockBooksListResponse(context);
    const [response] = await Promise.all([
        page.waitForResponse(new RegExp(apiPaths.account)),
        await page.reload(),
    ]);
    const r = await response.json();
    console.info(r);
}
