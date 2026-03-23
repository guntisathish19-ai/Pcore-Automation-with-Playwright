// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
    timeout: 40*1000,
  expect:{
    timeout: 40*1000,
  },
  reporter: [['html', { open: 'on-failure' }]],
  
  use: {
  
    trace: 'on',
    browserName: 'chromium',
    screenshot: 'on',
    headless: false,

   
  },

});

module.exports = config;
