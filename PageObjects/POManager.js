import { LoginPage } from './LoginPage';
import { ContentPage } from './ContentPage';
import { MainPage } from './MainPage';
import { Utils } from '../Utils/Utils';

export class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.contentPage = new ContentPage(this.page);
        this.mainPage = new MainPage(this.page);
        this.utils = new Utils(this.page);
    }
    getLoginPageObject(){
        return this.loginPage;
    }

    getContentPageObject(){
        return this.contentPage;
    }

    getMainPageobject(){
        return this.mainPage;
    }

    getUtilsObject(){
        return this.utils;
    }
}