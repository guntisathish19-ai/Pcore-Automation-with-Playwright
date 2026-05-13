import { LoginPage } from './LoginPage';
import { ContentPage } from './ContentPage';
import { MainPage } from './MainPage';

export class POManager {
    constructor(page, logger) {
        this.page = page;
        this.logger = logger

        //Instances for page object classes
        this.loginPage = new LoginPage(this.page, this.logger);
        this.contentPage = new ContentPage(this.page, this.logger);
        this.mainPage = new MainPage(this.page, this.logger);
    }
    getLoginPageObject() {
        return this.loginPage;
    }

    getContentPageObject() {
        return this.contentPage;
    }

    getMainPageobject() {
        return this.mainPage;
    }

    getUtilsObject() {
        return this.utils;
    }
}