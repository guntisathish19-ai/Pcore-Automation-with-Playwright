import { test as base } from '@playwright/test';
import { Logger } from '../Utils/logger';
import { browser } from '@playwright/test'

export const test = base.extend({

  //custom logger fixture
  logger: async ({ }, use, testInfo) => {
    const logger = new Logger();

    await use(logger)

    //attach logs after test
    await testInfo.attach('Execution logs', {
      body: logger.getLogs(),
      contentType: 'text/plain',
    });

    /*await allure.attachment('Execution logs', {
      body: logger.getLogs(),
      contentType: 'text/plain',
    });*/

    logger.clear();
  },

  page: async ({ browser, logger }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()


    //Capture browser console logs
    page.on('console', msg => {
      logger.info(`[Browser ${msg.type()}] ${msg.text()}`);
    });

    //Capture page errors
    page.on('pageerror', error => {
      logger.error(`[Page Error] ${error.message}`);
    });

    await use(page)

    await context.close()

  },
})

export { expect } from '@playwright/test';



