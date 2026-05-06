import { LoginPage } from './LoginPage';
import { ContentPage } from './ContentPage';
import { MainPage } from './MainPage';

export class POManager {
    constructor(page) {
        this.page = page;

        //Instances for page object classes
        this.loginPage = new LoginPage(this.page);
        this.contentPage = new ContentPage(this.page);
        this.mainPage = new MainPage(this.page);
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