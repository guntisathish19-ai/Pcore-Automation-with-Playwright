const { POManager } = require('../PageObjects/POManager');
const { test, expect } = require('@playwright/test');
const { BrowserSetup } = require('../BrowserSetup')
const data = JSON.parse(JSON.stringify(require('../Utils/TestData.json')));
let webcontext;
let poManager;
let contentPage;
let mainPage;

test.describe.configure({mode: 'parallel'});

/**test.beforeAll(async ({browser})=>{
    const browsersetup = new BrowserSetup(browser);
    webcontext = await browsersetup.login(data.username, data.password);
});

test.beforeEach(async () => {
    const page = await webcontext.newPage()
    poManager = new POManager(page);
    const loginPage = poManager.getLoginPageObject();
    const message = await loginPage.navigateToPcore();
    expect(message).toBe(" Home ");
    contentPage = poManager.getContentPageObject();
    mainPage = poManager.getMainPageobject();
});*/

test.beforeEach(async ({page}) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPageObject();
    await loginPage.goto();
    const message = await loginPage.login(data.username, data.password);
    expect(message).toBe(" Home ")
    
});

test('Timesheet update test', async ({page}) => {
    
    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    await contentPage.getMyTimesheet();
    const mainPage = poManager.getMainPageobject();
    await mainPage.updateTicketDetails();
    await mainPage.updateHours(); 
    const message = await mainPage.validateTotalHours();
    expect(message).toBe("Timesheet saved successfully");

});

test('Add Emergency contact detail', async ({page})=>{
    
    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    await contentPage.getHumanResource();
    const mainPage = poManager.getMainPageobject();
    await mainPage.getContact();
    const message = await mainPage.addContact(data.informationtype, data.contactname, data.mobileno, data.relation);
    expect(message).toBe(" Record Added successfully");
    
});

test("Update contact details", async ({page})=>{
    
    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    await contentPage.getHumanResource();
    const mainPage = poManager.getMainPageobject();
    await mainPage.getContact();
    const message = await mainPage.updateContact(data.informationtype, data.mobileno)
    expect(message).toBe(" Record Updated successfully");

});

test('Delete Emergency contact details', async({page})=>{

    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    await contentPage.getHumanResource();
    const mainPage = poManager.getMainPageobject();
    await mainPage.getContact();
    const message = await mainPage.deleteContact(data.informationtype);
    expect(message).toBeTruthy

})

test.only('Certificate upload', async ({page})=>{

    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    contentPage.getHumanResource();
    const mainPage = poManager.getMainPageobject();
    await mainPage.getQualificationTab();
    const upload = await mainPage.updateCertificate();
    expect(upload).toBeTruthy;

});

test('Verify supervisor', async ({page})=>{

    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    contentPage.navigateToSupervisorMenu();
    const mainPage = poManager.getMainPageobject();
    const supervisor = await mainPage.verifySupervisor(data.branch, data.department, data.employeeid);
    expect(supervisor).toBe(data.supervisorname)

});

test.afterAll(()=>{
    console.log("All tests finished execution and browser closed");
});

