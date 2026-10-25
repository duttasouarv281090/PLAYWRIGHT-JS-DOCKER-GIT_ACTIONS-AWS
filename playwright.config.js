// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const configDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(configDirectory, '.env') });

const playwrightConfig = defineConfig({
  testDir: './tests',
  timeout:40000,
  expect:
  {
    timeout:3000
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'],['allure']],
  /* Shared settings for all the projects below.*/
  use: {
    browserName:'chromium',
    headless:true,
    trace: 'retain-on-failure',
    screenshot:'only-on-failure',
    env:"sit",
    tag:"@test",
    grep:[new RegExp("@smoke"),new RegExp("@sanity")],
    grepInvert:[new RegExp("@smoke"),new RegExp("@sanity")]//runs all other test aprt from mentioned in the bracket
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'] ,
        actionTimeout:5000,
        navigationTimeout:3000,
        browserName:"chromium",
        headless:true,
        screenshot:'on',
        trace:'retain-on-failure'
      

      }

    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  ],
});

export default playwrightConfig;

