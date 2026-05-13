const { test, expect } = require('../Base/BaseTest');
const testData = require('../Test Data/Logindata.json');
const { EnvHelper } = require('../Utils/EnvHelper');
const { POManager } = require('../PageObjects/POManager')

test('Login with valid credentials', async ({ page, logger }) => {
  const poManager = new POManager(page, logger);
  const loginPage = poManager.getLoginPageObject()
  const envHelper = new EnvHelper()
  const creds = envHelper.getCredentials(testData.validUser)

  await loginPage.navigateToLoginPage();
  await loginPage.loginWithValidCredentials(
    creds.username,
    creds.password
  );
  await expect(page).toHaveTitle("PyramidCore Home Page.")

});


test('Login with invalid user', async ({ page, logger }) => {
  const poManager = new POManager(page, logger);
  const loginPage = poManager.getLoginPageObject();
  const envHelper = new EnvHelper()
  const creds = envHelper.getCredentials(testData.invalidUser)
 
  await loginPage.navigateToLoginPage();
  await loginPage.loginWithInvalidCredentials(
    creds.username,
    creds.password
  );
  const errorMsg = await loginPage.getLoginErrorMessage();
  expect(errorMsg).toContain('not found');

});


test('Login with invalid password', async ({ page, logger }) =>{
  const poManager = new POManager(page, logger);
  const loginPage = poManager.getLoginPageObject();
  const envHelper = new EnvHelper()
  const creds = envHelper.getCredentials(testData.invalidPassword)

  await loginPage.navigateToLoginPage();
  await loginPage.loginWithInvalidCredentials(
    creds.username,
    creds.password
  );
  const errorMsg = await loginPage.getLoginErrorMessage();
  expect(errorMsg).toContain('not found');

})


test('Login with empty password', async ({ page, logger }) =>{
  const poManager = new POManager(page, logger);
  const loginPage = poManager.getLoginPageObject();
  const envHelper = new EnvHelper()
  const creds = envHelper.getCredentials(testData.emptyPassword)

  await loginPage.navigateToLoginPage();
  const errorMsg = await loginPage.loginWithEmptyPassword(
    creds.username
  );
  expect(errorMsg).toContain('Please enter your Password');

})


test('Login with empty username', async ({ page, logger }) =>{
  const poManager = new POManager(page, logger);
  const loginPage = poManager.getLoginPageObject();
  const envHelper = new EnvHelper()
  const creds = envHelper.getCredentials(testData.emptyUsername)

  await loginPage.navigateToLoginPage();
  const errorMsg = await loginPage.loginWithEmptyUsername(
    creds.password
  );
  expect(errorMsg).toContain('Please enter your User Id/Official Email Id');
  
})