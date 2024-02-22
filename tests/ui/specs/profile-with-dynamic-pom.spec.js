import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

let profilePage; let page;
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
    // await page.goto(pages.profile);
    // profilePage = new ProfilePage(page);
    profilePage = await hooks.beforeEach(page, ProfilePage, pages.profile);
});

test.describe('Profile - Dynamic Page Object Model', () => {
    test('Check logged in', async () => {
        await profilePage.checkLoggedIn();
    });
});
