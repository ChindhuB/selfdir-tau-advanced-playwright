import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
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

test.describe('Profile - Stored Auth', () => {
    test('Check logged in', async () => {
        await profilePage.checkLoggedIn();
    });
});
