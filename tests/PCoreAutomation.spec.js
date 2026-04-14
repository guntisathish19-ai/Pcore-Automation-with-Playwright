const { test, expect } = require('@playwright/test');

test('Timesheet update test', async ({ page }) => {

    //Login page
    await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' });
    await page.locator("#pydLogin_txtUserid").fill("sathish.kumar@celsiortech.com");
    await page.locator("#pydLogin_txtUserPwd").fill("Raju@789");
    await page.locator("#pydLogin_btnLogin").click();
    await page.waitForLoadState('networkidle');

    //Navigate to Timesheet page
    const contentPageFrame = page.frameLocator("frame[name='contents']");
    await contentPageFrame.locator("#PCIMenut28").click();
    await contentPageFrame.locator("#PCIMenut29").click();
    await page.waitForLoadState('networkidle');

    //Update project details
    const mainPageFrame = page.frameLocator("frame[name='main']");
    await mainPageFrame.getByPlaceholder("--Select--").nth(2).click();
    await mainPageFrame.getByText("Playwright & GW Upskilling").click();
    await mainPageFrame.locator("#selectedGroup").nth(2).selectOption("Quality");
    await mainPageFrame.locator("#selectedActivity").nth(2).selectOption("QA & Testing");

    //update hours
    const selectedHour = mainPageFrame.locator("div.containermain:nth-child(6) select[id='selectedHour']");
    const count = await selectedHour.count();
    for (let i = 0; i < count - 2; i++) {
        if (!(await selectedHour.nth(i).isEditable())) {
            break;
        }
        await selectedHour.nth(i).selectOption("8");
    }

    //verify test, that user is not updating more than 40 hours
    const hours = await mainPageFrame.locator(".weekTotalLow").nth(0).textContent();
    const totalHours = await parseInt(hours.split(":")[0])
    console.log("Total hours :" + totalHours);
    if (totalHours > 40)
        test.fail(true, "Total hours for a week should be < = 40, please review");
    else {
        await mainPageFrame.getByRole("button", { name: "Save" }).click();
        expect(await mainPageFrame.locator(".notifier__notification-message").textContent()).toBe("Timesheet saved successfully");
    }

    await page.pause();

});

test.only('Certification upload test', async ({ page }) => {

    //Login page
    await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' })
    await page.locator("#pydLogin_txtUserid").fill("sathish.kumar@celsiortech.com");
    await page.locator("#pydLogin_txtUserPwd").fill("Raju@789");
    await page.locator("#pydLogin_btnLogin").click();
    await page.waitForLoadState('networkidle');

    //Navigate to Human Resource page
    const contentPageFrame = page.frameLocator("frame[name='contents']");
    await contentPageFrame.locator("#PCIMenut41").click();
    await contentPageFrame.locator("#PCIMenut43").click();
    await page.waitForLoadState('networkidle');

    //Navigate Qualification tab on main page
    const mainPageFrame = page.frameLocator("frame[name='main']");
    await mainPageFrame.locator("input[value='Qualification']").click();

    //Certificate section
    try{
    await mainPageFrame.locator("select[name='ddlCertificate']").selectOption("The Complete Prompt Engineering for AI");
    await mainPageFrame.locator("#ddlCertificateProvider").waitFor({ state: "visible" });
    await mainPageFrame.locator("#ddlCertificateProvider").selectOption({ value: "6" });
    await mainPageFrame.locator("#ddlCertificateProvider").selectOption({ label: "Udemy" });
    await mainPageFrame.locator("#ddlCertificateCayegory").locator("option", { hasText: "AI/ML" }).waitFor();
    await mainPageFrame.locator("#ddlCertificateCayegory").selectOption("AI/ML");
    await mainPageFrame.locator("#FileUploadCertificate").setInputFiles("C:/Users/SATHISH.KUMAR/Downloads/AI Boot camp 2025.pdf");
    await mainPageFrame.locator("input#txtcert_date").click();
    await mainPageFrame.locator(".ui-state-default.ui-state-highlight").waitFor({ state: "visible" });
    await mainPageFrame.locator(".ui-state-default.ui-state-highlight").click();
    console.log(await mainPageFrame.locator("#txtcert_date").inputValue())
    }
    catch(e){
        console.log(e)
    }


    await page.pause();
});