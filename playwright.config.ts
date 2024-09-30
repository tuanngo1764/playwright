import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

export default defineConfig({
  testDir: './src/tests/TestArchitect',
  outputDir: './test-results',
  workers: 1,
  timeout: 5 * 60 * 1000,
  reporter: [
    [`html`, { outputFolder: `./playwright-report/${moment().format('YYYY-MM-DD-HH-mm')}`, open: 'never' }],
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || `https://aps-lassi-api-cus-dev.azurewebsites.net`,
    headless: false,
    screenshot: 'only-on-failure',
    video: { mode: `retain-on-failure`, size: { width: 640, height: 480 } },
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'], channel: 'chrome',
      }, // or 'chrome-beta'
    },

    {
      name: 'msedge',
      use: {
        ...devices['Desktop Edge'], channel: 'msedge',
      }, // or "msedge-beta" or 'msedge-dev'
    },
  ],

});
