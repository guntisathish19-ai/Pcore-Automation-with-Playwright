import {test as base} from "@playwright/test";
const data = JSON.parse(JSON.stringify(require('../Test Data/Userdata.json')))

export const test = base.extend({
    loggedInPage: async ({page}, use) => {
          try {
            await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' })
            await page.locator("#pydLogin_txtUserid").fill(data.username);
            await page.locator("#pydLogin_txtUserPwd").fill(data.password);
            await page.locator("#pydLogin_btnLogin").click();
            const topPage = await page.frameLocator("frame[name='top']");
            const homeEle = await topPage.locator("a[href='../Home/PCIhome.aspx'] span")
            await homeEle.waitFor({state: 'visible'});
            const status = await homeEle.isVisible()
            if(status){
                console.log("Login succesfull with user:" +data.username);
                //return await this.homeEle.textContent();
                
            }
        }
        catch (error) {
            console.log("Incorrect userId or password - Login failed with user: "+data.username)
            throw error;
        }
        await use(page)
    }
});