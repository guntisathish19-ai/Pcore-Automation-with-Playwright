import { BasePage } from "./BasePage";


export class LoginPage extends BasePage {

  constructor(page) {
    super(page)
    this.page = page;

    //Locators
    this.usernameInput = 'input[name="pydLogin$txtUserid"]';
    this.passwordInput = 'input[name="pydLogin$txtUserPwd"]';
    this.logInButton = 'input[name="pydLogin$btnLogin"]';
    this.loginErrorMessage = '#pydLogin_lblMsg'; // adjust if needed

    //added
    this.userIdElement = page.locator("#pydLogin_txtUserid");
    this.pwdElement = page.locator("#pydLogin_txtUserPwd");
    this.loginButton = page.locator("#pydLogin_btnLogin");
    this.topPage = this.page.frameLocator("frame[name='top']");
    this.homeEle = this.topPage.locator("a[href='../Home/PCIhome.aspx'] span");
  }

  // Navigate to Login Page
  async navigateToLoginPage() {
    await this.page.goto(
      'https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx',
      { waitUntil: 'networkidle' }
    );
  }

  // Enter Username
  async enterUserName(username) {
    await this.page.fill(this.usernameInput, username);
  }

  // Enter Password
  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  // Click Login Button
  async clickLogin() {
    await this.page.click(this.logInButton);
  }

  async userId(username){
    await this.userIdElement.fill(username)
  }

  async password(password){
    await this.pwdElement.fill(password)
  }

  async loginBut(){
    await this.loginButton.click()
  }

  // Generic Login Action (Reusable)
  async login(username, password) {
    await this.enterUserName(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

   async loginWithUsername(username) {
    try{
    await this.userId(username);
    await this.loginBut();
    }
    catch(error){
    throw new error;
    }
  }

   async loginWithPassword(password) {
    try{
    await this.password(password);
    await this.loginBut();
    }
    catch(error){
      throw new error
    }
  }

  // POSITIVE SCENARIO METHODS

  async loginWithValidCredentials(username, password) {
    await this.login(username, password);

    // Wait for navigation or dashboard indicator
    await this.page.waitForURL(/Home|Dashboard|Main/i, {
      timeout: 15000,
    });
  }

  // NEGATIVE SCENARIO METHODS

  async loginWithInvalidCredentials(username, password) {
    await this.login(username, password);
    await this.waitForLoginError();
    console.log(this.getLoginErrorMessage)
  }

   async loginWithEmptyPassword(username) {
    await this.loginWithUsername(username)
    await console.log(this.waitForAlertMeesage())
    await this.waitForAlerAccept()
  }

   async loginWithEmptyUsername(password) {
    await this.loginWithPassword(password)
    await console.log(this.waitForAlertMeesage())
    await this.waitForAlerAccept()
  }

  async waitForLoginError() {
    await this.page.waitForSelector(this.loginErrorMessage, {
      timeout: 10000,
    });
  }

  async getLoginErrorMessage() {
    return await this.page.textContent(this.loginErrorMessage);
  }

  async waitForAlertMeesage(){
    this.page.on('dialog', async dialog => {
      return dialog.message()
    });
  }

  async waitForAlerAccept(){
    this.page.on('dialog', async dialog => {
      await dialog.accept()
    });
  }

  //added
  async goto() {
    await this.page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' });
    //await this.page.waitForLoadState('networkidle');
  }

  async userLogin(userName, password) {
    try {
      await this.userIdElement.fill(userName);
      await this.pwdElement.fill(password);
      await this.loginButton.click();
      await this.homeEle.waitFor({ state: 'visible' });
      const status = this.homeEle.isVisible()
      if (status) {
        console.log("Login succesfull with user:" + userName);
        //return await this.homeEle.textContent();
        return await this.getText(this.homeEle)
      }
    }
    catch (error) {
      console.log("Incorrect userId or password - Login failed with user: " + userName)
      throw error;
    }

  }

  async navigateToPcore() {
    await this.page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
    return await this.homeEle.textContent();
  }
}

