import { BasePage } from "./BasePage";

export class LoginPageMine extends BasePage {

    constructor(page) {
        super(page)
        this.page = page;
        
        //Locators
        this.userIdElement = page.locator("#pydLogin_txtUserid");
        this.pwdElement = page.locator("#pydLogin_txtUserPwd");
        this.loginButton = page.locator("#pydLogin_btnLogin");
        this.topPage = this.page.frameLocator("frame[name='top']");
        this.homeEle = this.topPage.locator("a[href='../Home/PCIhome.aspx'] span");
    }

    async goto() { 
        await this.page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' });
        //await this.page.waitForLoadState('networkidle');
    }   

    async login(userName, password) {
        try {
            await this.userIdElement.fill(userName);
            await this.pwdElement.fill(password);
            await this.loginButton.click();
            await this.homeEle.waitFor({state: 'visible'});
            const status = this.homeEle.isVisible()
            if(status){
                console.log("Login succesfull with user:" +userName);
                //return await this.homeEle.textContent();
                return await this.getText(this.homeEle)
            }
        }
        catch (error) {
            console.log("Incorrect userId or password - Login failed with user: "+userName)
            throw error;
        }

    }

    async navigateToPcore(){
        await this.page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('networkidle');
        return await this.homeEle.textContent();
    }

}
