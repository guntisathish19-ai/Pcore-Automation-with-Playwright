
import { defineConfig, devices } from '@playwright/test';




const config = ({
  testDir: './tests',
    timeout: 40*1000,
    //retries: 1,
    workers: 5,
  expect:{
    timeout: 30*1000,
  },
  reporter: [['html', { open: 'on-failure' }]],
  projects: [
    {
      name: 'chrome',
      use: {
        trace: 'only-on-failure',
        browserName: 'chromium',
        screenshot: 'only-on-failure',
        headless: false, 
        launchOptions: {
          args: ['--start-maximized'],
        },
        viewport:null,
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
        viewport:null,
      }
    }
  ]
});

module.exports = config;
