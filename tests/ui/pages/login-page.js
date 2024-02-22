import { expect } from '@playwright/test';
import messages from '../../utils/messages';

class LoginPage {
  /**
             * @param {import('@playwright/test').Page} page
             */
  constructor(page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.messagePanel = page.locator('#output');
    this.password = page.getByPlaceholder('Password');
    this.userName = page.getByPlaceholder('UserName');
  }

  async fillEmail(email) {
    await this.userName.fill(email);
  }

  async fillPassword(password) {
    await this.password.fill(password);
  }

  async doLogin(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.loginButton.click();
  }

  async checkLoggedIn() {
    await expect(this.page).toHaveURL(/.*profile/);
    await expect(this.page).toHaveTitle(/DEMOQA/);
  }

  async checkInvalidCredentials() {
    await expect(this.messagePanel).toHaveText(messages.login.invalid);
  }
}

export default LoginPage;
