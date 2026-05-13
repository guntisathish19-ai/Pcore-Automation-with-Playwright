import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

  constructor(page, logger) {
    super(page, logger)
    this.page = page;
    this.logger = logger;

    //Locators
    this.usernameInput = 'input[name="pydLogin$txtUserid"]';
    this.passwordInput = 'input[name="pydLogin$txtUserPwd"]';
    this.logInButton = 'input[name="pydLogin$btnLogin"]';
    this.loginErrorMessage = '#pydLogin_lblMsg';
    this.logErrorMessage = this.page.locator("#pydLogin_lblMsg"); // adjust if needed
    this.userIdElement = this.page.locator("#pydLogin_txtUserid");
    this.pwdElement = this.page.locator("#pydLogin_txtUserPwd");
    this.loginButton = this.page.locator("#pydLogin_btnLogin");
    this.topPage = this.page.frameLocator("frame[name='top']");
    this.homeEle = this.topPage.locator("a[href='../Home/PCIhome.aspx'] span");
  }

  // Navigate to Login Page
  async navigateToLoginPage() {
    this.logger.info(`Test execution is started`)
    await this.page.goto(
      '/security/PCILoginNew.aspx',
      { waitUntil: 'networkidle' }
    );
  }


  // Generic Login Action (Reusable)
  async login(username, password) {
    await this.enterUserName(username, this.usernameInput);
    await this.enterPassword(password, this.passwordInput);
    await this.clickLogin(this.logInButton);
  }

  // POSITIVE SCENARIO METHODS

  async loginWithValidCredentials(username, password) {
    await this.login(username, password);
    console.log(`Logged in with user Id: ${username}`)
    // Wait for navigation or dashboard indicator
    await this.page.waitForURL(/Home|Dashboard|Main/, {
      timeout: 15000,
    });
    this.logger.info(`successfully logged in with userId: ${username}`)
  }

  // NEGATIVE SCENARIO METHODS

  async loginWithInvalidCredentials(username, password) {
    await this.login(username, password);
    await this.waitForLoginError();
    const msg = await this.getLoginErrorMessage()
    const cleanMessage = msg?.trim() || 'Log in with invalid credentials';
    console.log(cleanMessage)
    this.logger.info(cleanMessage)
  }

  async loginWithEmptyPassword(username) {
    await this.loginWithUsername(username)
    return new Promise(async (resolve, reject) => {
      this.page.once('dialog', async dialog => {
        try {
          const alertMessage = await dialog.message();
          console.log(`Password was not entered: ${alertMessage}`);
          await this.logger.info(`Password was not entered: ${alertMessage}`)
          await dialog.accept();
          resolve(alertMessage)
        }
        catch (err) {
          reject(err)
          this.logger.error(err)
        }
      });

      // Do NOT await the click
      this.loginBut(this.loginButton);
    });

  }

  async loginWithEmptyUsername(password) {
    await this.loginWithPassword(password)
    return new Promise(async (resolve, reject) => {
      this.page.once('dialog', async dialog => {
        try {
          const alertMessage = await dialog.message();
          console.log('User Id was not entered:', alertMessage);
          await this.logger.info(`User Id was not entered: ${alertMessage}`)
          await dialog.accept();
          resolve(alertMessage)
        }
        catch (err) {
          reject(err)
          this.logger.error(err)
        }
      });

      // Do NOT await the click
      this.loginBut(this.loginButton);
    });
  }

   //Login with only username
  async loginWithUsername(username) {
    try {
      await this.userId(username, this.userIdElement);
    }
    catch (error) {
      throw new error;
      this.log.error(error)
    }
  }

  //Login with only password
  async loginWithPassword(password) {
    try {
      await this.password(password, this.pwdElement);
    }
    catch (error) {
      throw new error
      this.log.error(error)
    }
  }

  async waitForLoginError() {
    await this.page.waitForSelector(this.loginErrorMessage, {
      timeout: 10000,
    });
  }

  async getLoginErrorMessage() {
    try{
      await this.logErrorMessage.waitFor({ state: 'visible' })
      const message = await this.logErrorMessage.textContent();
      return message
    }
    catch(error){
      this.logger.error(`Error fetching message: ${error.message}`);
       return 'Error fetching message'
    }
  }

  //added
  async goto() {
    await this.page.goto("/security/PCILoginNew.aspx", { waitUntil: 'networkidle' });
    this.logger.info('Test started');
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
        this.logger.info("Login succesfull with user:" + userName)
        //return await this.homeEle.textContent();
        return await this.getText(this.homeEle)
      }
    }
    catch (error) {
      console.log("Incorrect userId or password - Login failed with user: " + userName)
      this.log.error("Incorrect userId or password - Login failed with user: " + userName)
      throw error;
    }

  }

  async navigateToPcore() {
    await this.page.goto("https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx", { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
    return await this.homeEle.textContent();
  }
}

