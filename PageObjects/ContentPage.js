import { BasePage } from "./BasePage";

export class ContentPage extends BasePage{
    
    constructor(page){
        super(page)

        //Locators
        this.page = page;
        this.contentPageFrame = page.frameLocator("frame[name='contents']");
        this.timesheet = this.contentPageFrame.locator("#PCIMenut28");
        this.myTimesheet = this.contentPageFrame.locator("#PCIMenut29");
        this.humanResource = this.contentPageFrame.locator("#PCIMenut41");
        this.view = this.contentPageFrame.locator("#PCIMenut43");
        this.infoDesk = this.contentPageFrame.locator("#PCIMenut66");
        this.reports = this.contentPageFrame.locator("#PCIMenut67");
        this.yourSupervisor = this.contentPageFrame.locator("#PCIMenut68");
        this.DOBandAnniversary = this.contentPageFrame.locator("#PCIMenut69");
    }


    async getMyTimesheet(){
    await this.click(this.timesheet)
    await this.click(this.myTimesheet);
    }

    async getHumanResource(){
    await this.click(this.humanResource);
    await this.click(this.view);
    }

    async navigateToSupervisorMenu(){
        await this.click(this.infoDesk);
        await this.click(this.reports);
        await this.click(this.yourSupervisor)
    }

    async navigateDOBandAnniversary(){
        await this.click(this.infoDesk);
        await this.click(this.reports);
        await this.click(this.DOBandAnniversary);
    }

}