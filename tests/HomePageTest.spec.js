import { test, expect} from "../Fixtures/LoginFixtures";
import { Logger } from "../Utils/Logger";
import { testInfo } from "@playwright/test"

test('Dashboard should load after login', async ({ loggedInPage }, testInfo) => {
  const logger = new Logger()
  logger.info('Test started')
  await expect(loggedInPage).toHaveTitle(/Pyramid|PCI/);
  await expect(loggedInPage).toHaveTitle("PyramidCore Home Page.") 
  logger.info('Niavigation done')

  await testInfo.attach('Logs', {
    body: logger.getLogs(),
    contentType: 'text/plain',
  });

});

test.afterAll('Tear down', async()=>{
    console.log("Execution is completed")
})


