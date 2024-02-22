import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './tests/utils/environmentBaseUrl';
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

export default defineConfig({
  globalSetup: require.resolve('./tests/setup/global-setup'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  use: {
    storageState: 'storageState.json',
    trace: 'on',
    baseURL: process.env.ENV === 'production'
      ? baseEnvUrl.production.home
      : process.env.ENV === 'staging'
        ? baseEnvUrl.staging.home
        : baseEnvUrl.local.home
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
