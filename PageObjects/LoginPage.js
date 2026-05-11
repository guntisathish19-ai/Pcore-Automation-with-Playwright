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
    this.userIdElement = page.locator("#pydLogin_txtUserid");
    this.pwdElement = page.locator("#pydLogin_txtUserPwd");
    this.loginButton = page.locator("#pydLogin_btnLogin");
    this.topPage = this.page.frameLocator("frame[name='top']");
    this.homeEle = this.topPage.locator("a[href='../Home/PCIhome.aspx'] span");
  }

  // Navigate to Login Page
  async navigateToLoginPage() {
    await this.page.goto(
      '/security/PCILoginNew.aspx',
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

  async userId(username) {
    await this.userIdElement.fill(username)
  }

  async password(password) {
    await this.pwdElement.fill(password)
  }

  async loginBut() {
    await this.loginButton.click()
  }

  // Generic Login Action (Reusable)
  async login(username, password) {
    await this.enterUserName(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async loginWithUsername(username) {
    try {
      await this.userId(username);
    }
    catch (error) {
      throw new error;
    }
  }

  async loginWithPassword(password) {
    try {
      await this.password(password);
    }
    catch (error) {
      throw new error
    }
  }

  // POSITIVE SCENARIO METHODS

  async loginWithValidCredentials(username, password) {
    await this.login(username, password);
    console.log(`Logged in with user Id: ${username}`)
    // Wait for navigation or dashboard indicator
    await this.page.waitForURL(/Home|Dashboard|Main/i, {
      timeout: 15000,
    });
  }

  // NEGATIVE SCENARIO METHODS

  async loginWithInvalidCredentials(username, password) {
    await this.login(username, password);
    console.log(`Logged in with invalid user/password`)
    await this.waitForLoginError();
    console.log(this.getLoginErrorMessage)
  }

  async loginWithEmptyPassword(username) {
    await this.loginWithUsername(username)
    return new Promise(async (resolve, reject) => {
      this.page.once('dialog', async dialog => {
        try {
          const alertMessage = dialog.message();
          console.log('Password was not entered:', alertMessage);
          await dialog.accept();
          resolve(alertMessage)
        }
        catch (err) {
          reject(err)
        }
      });

      // Do NOT await the click
      this.loginButton.click();


    });

  }

  async loginWithEmptyUsername(password) {
    await this.loginWithPassword(password)
    return new Promise(async (resolve, reject) => {
      this.page.once('dialog', async dialog => {
        try {
          const alertMessage = dialog.message();
          console.log('User Id was not entered:', alertMessage);
          await dialog.accept();
          resolve(alertMessage)
        }
        catch (err) {
          reject(err)
        }
      });

      // Do NOT await the click
      this.loginButton.click();
    });
  }

  async waitForLoginError() {
    await this.page.waitForSelector(this.loginErrorMessage, {
      timeout: 10000,
    });
  }

  async getLoginErrorMessage() {
    return await this.page.textContent(this.loginErrorMessage);
  }




  //added
  async goto() {
    await this.page.goto("/security/PCILoginNew.aspx", { waitUntil: 'networkidle' });
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

