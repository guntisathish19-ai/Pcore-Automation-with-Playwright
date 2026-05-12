
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

const ENV = process.env.ENV || 'qa';
const BROWSER = process.env.BROWSER || 'chrome'; console.log(`Running tests on: ${BROWSER} browser - ${ENV} environment `);

const envUrls = {
  qa: 'https://pyramidcore.pyramidci.com/security/',
  stage: 'https://pyramidcore.pyramidci.com/security/',
  prod: 'https://pyramidcore.pyramidci.com/security/'
};


const projects = {
  chrome: {
    browserName: 'chromium',
    channel: 'chrome',
    trace: 'only-on-failure',
    screenshot: 'only-on-failure',
    headless: false,
    launchOptions: {
      args: ['--start-maximized'],
    },
    viewport: null
  },
  firefox: {
    browserName: 'firefox',
    trace: 'only-on-failure',
    screenshot: 'only-on-failure',
    headless: false,
    launchOptions: {
      args: ['--start-maximized'],
    },
    viewport: null,
  },
  webkit: {
    browserName: 'webkit',
    trace: 'only-on-failure',
    screenshot: 'only-on-failure',
    headless: false,
  },
};

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,
  workers: 5,

  expect: {
    timeout: 30 * 1000,
  },

  use: {
    baseURL: envUrls[ENV], 
    headless: !!process.env.CI,
  },

  reporter: [['html', { open: 'on-failure' }],
  ['list'],
  ['allure-playwright']
  ],

  projects: [
    {
      name: BROWSER,
      use: projects[BROWSER]
    }
  ]


  /*projects: [
    {
      name: 'chrome',
      use: {
        trace: 'only-on-failure',
        browserName: 'chromium',
        channel: 'chrome',
        screenshot: 'only-on-failure',
        headless: false,
        launchOptions: {
          args: ['--start-maximized'],
        },
        viewport: null,
      },
    },
    {
      name: 'webkit',
      use: {
        trace: 'only-on-failure',
        browserName: 'webkit',
        screenshot: 'only-on-failure',
        headless: false,
      },
    },
    {
      name: 'firefox',
      use: {
        trace: 'only-on-failure',
        browserName: 'firefox',
        screenshot: 'only-on-failure',
        headless: false,
        launchOptions: {
          args: ['--start-maximized'],
        },
        viewport: null,
      },
    },
  ],*/
});
