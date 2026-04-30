export class BrowserSetup{

    constructor(browser){
        this.browser = browser;
    }

    async login(email, pwd) {
        
        const context = await this.browser.newContext();
        const page = await context.newPage()
        await page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle');
        await page.locator("#pydLogin_txtUserid").fill(email);
        await page.locator("#pydLogin_txtUserPwd").fill(pwd);
        await page.locator("#pydLogin_btnLogin").click()
        await page.waitForLoadState('networkidle');
        console.log("Login succesfull with user:" +email);
        await context.storageState({path: 'pcore-state-json'});
        return await this.browser.newContext({storageState: 'pcore-state-json'})

    }
}



