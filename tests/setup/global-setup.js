import { chromium } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import uiPages from '../utils/uiPages';


/**
           * @param {import('@playwright/test').FullConfig} config
           */
async function globalSetup(config) {

  const user = process.env.USER;
  const password = process.env.PASSWORD;
  console.log(`Local Env Username: ${user}`);
  console.log(`Local Env  Password: ${password}`);
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: true, timeout: 10000 });
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  await page.goto(baseURL + uiPages.login);
  await loginPage.doLogin(user, password);
  await loginPage.checkLoggedIn();
  await page.context().storageState({ path: storageState });
  await browser.close();
}

export default globalSetup;

// https://playwright.dev/docs/test-global-setup-teardown#capturing-trace-of-failures-during-global-setup
// https://playwright.dev/docs/trace-viewer
