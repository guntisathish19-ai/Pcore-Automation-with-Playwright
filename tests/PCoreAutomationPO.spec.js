const { POManager } = require('../PageObjects/POManager');
const { test, expect } = require('@playwright/test');
const { BrowserSetup } = require('../BrowserSetup')
const data = JSON.parse(JSON.stringify(require('../Utils/TestData.json')));


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

test('Upload a certificate of a course', async ({page})=>{

    const poManager = new POManager(page);
    const contentPage = poManagergetContentPageObject();
    contentPage.getHumanResource();
    const mainPage = poManager.getMainPageobject();
    await mainPage.getQualificationTab();
    const upload = await mainPage.updateCertificate();
    expect(upload).toBeTruthy;

});

test('Verify supervisor of an Employee', async ({page})=>{

    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    contentPage.navigateToSupervisorMenu();
    const mainPage = poManager.getMainPageobject();
    const supervisor = await mainPage.verifySupervisor(data.branch, data.department, data.employeeid);
    expect(supervisor).toBe(data.supervisorname)

});

test('verify DOB of an Employee', async ({page})=>{

    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    contentPage.navigateDOBandAnniversary();
    const mainPage = poManager.getMainPageobject();
    const dob = await mainPage.verifyDOBofEmployee(data.branch, data.department, data.month, data.employeeid);
    expect(dob).toBe(data.dob)

});

test.only('verify Anniversary of an Employee', async ({page})=>{

    const poManager = new POManager(page);
    const contentPage = poManager.getContentPageObject();
    contentPage.navigateDOBandAnniversary();
    const mainPage = poManager.getMainPageobject();
    const anniversary = await mainPage.verifyAnniversaryofEmployee(data.branch, data.department, data.month, data.employeeid);
    expect(anniversary).toBe(data.anniversary)

});

test.afterAll(()=>{
    console.log("All tests finished execution and browser closed");
});

