export class LoginPage {

    constructor(page) {
        this.page = page;
        this.userIdElement = page.locator("#pydLogin_txtUserid");
        this.pwdElement = page.locator("#pydLogin_txtUserPwd");
        this.loginButton = page.locator("#pydLogin_btnLogin");
        this.topPage = this.page.frameLocator("frame[name='top']");
        this.homeEle = this.topPage.locator("a[href='../Home/PCIhome.aspx'] span");
    }

    async goto() {
        await this.page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' });
    }

    async login(userName, password) {
        try {
            await this.userIdElement.fill(userName);
            await this.pwdElement.fill(password);
            await this.loginButton.click();
            await this.page.waitForLoadState('networkidle');
            console.log("Login succesfull with user:" +userName);
            return await this.homeEle.textContent();
        }
        catch (error) {
            console.log("Login failed", error)
            throw error;
        }

    }

}
