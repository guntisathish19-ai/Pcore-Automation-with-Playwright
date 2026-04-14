const { POManager } = require('../PageObjects/POManager');
const { test, expect } = require('@playwright/test');
const data = JSON.parse(JSON.stringify(require('../Utils/TestData.json')));

test.beforeEach(async ({ page }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPageObject();
    await loginPage.goto();
    const message = await loginPage.login(data.username, data.password);
    expect(message).toBe(" Home ")

});

test('Timesheet update test', async ({ page }) => {

    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    await contentPage.getMyTimesheet();
    const mainPage = poManager.getMainPageobject();
    await mainPage.updateTicketDetails();
    await mainPage.updateHours(); 
    const message = await mainPage.validateTotalHours();
    expect(message).toBe("Timesheet saved successfully");

});

test('Certificate upload', async ({page})=>{

    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    contentPage.getHumanResource();
    const mainPage = poManager.getMainPageobject();
    await mainPage.getQualificationTab();
    await mainPage.updateCertificate();


});

test.afterAll(()=>{
    console.log("All tests finished execution and browser closed");
});

