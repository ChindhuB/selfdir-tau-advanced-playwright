import { test as setup } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import uiPages from '../utils/uiPages';
//setup.use({ storageState: { cookies: [], origins: [] } });
const adminFile = '.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  const user = process.env.USERNAME_ADMIN;
  const password = process.env.USERNAME_PASSWORD;
  console.log(`Local Env Admin Username: ${user}`);
  console.log(`Local Env  Admin Password: ${password}`);
  await doLogin(page, user, password);

  await page.context().storageState({ path: adminFile });
});

const userFile = '.auth/user.json';
setup.use({ storageState: { cookies: [], origins: [] } });
setup('authenticate as user', async ({ page }) => {
  const user = process.env.USERNAME_USER;
  const password = process.env.USERNAME_PASSWORD;
  console.log(`Local Env User Username: ${user}`);
  console.log(`Local Env  User Password: ${password}`);
  await doLogin(page, user, password);
  await page.context().storageState({ path: userFile });
});

async function doLogin(page, user, password) {
  const baseURL = setup.info().project.use.baseURL;
  const loginPage = new LoginPage(page);

  await page.goto(baseURL + uiPages.login);
  await loginPage.doLogin(user, password);
  await page.waitForURL(baseURL + uiPages.login);
  await loginPage.checkLoggedIn();
}
