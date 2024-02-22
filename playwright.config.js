import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './tests/utils/environmentBaseUrl';
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

export default defineConfig({
  globalSetup: require.resolve('./tests/setup/global-setup'),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  //retries: 2,
  workers: undefined,
  reporter: 'html',
  // timeout: 5000,
  use: {
    storageState: 'storageState.json',
    trace: 'on',
    viewport: null,
    baseURL: process.env.ENV === 'production'
      ? baseEnvUrl.production.home
      : process.env.ENV === 'staging'
        ? baseEnvUrl.staging.home
        : baseEnvUrl.local.home
  },

  projects: [
    {
      name: 'auth-setup',
      testMatch: /auth-setup\.js/
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
      },
    },
    {
      name: 'chromium-auth',
      use: {
        ...devices['Desktop Chrome'],
        // storageState: '.auth/admin.json', //use this in case you have multiple projects one per user
      },
      dependencies: ['auth-setup'],
    },
  ],
});
