export class ContentPage{
    
    constructor(page){
        this.page = page;
        this.contentPageFrame = page.frameLocator("frame[name='contents']");
        this.timesheet = this.contentPageFrame.locator("#PCIMenut28");
        this.myTimesheet = this.contentPageFrame.locator("#PCIMenut29");
        this.humanResource = this.contentPageFrame.locator("#PCIMenut41");
        this.view = this.contentPageFrame.locator("#PCIMenut43");
        this.infoDesk = this.contentPageFrame.locator("#PCIMenut66");
        this.reports = this.contentPageFrame.locator("#PCIMenut67");
        this.yourSupervisor = this.contentPageFrame.locator("#PCIMenut68");

    }

    async getMyTimesheet(){
    await this.timesheet.click();
    await this.myTimesheet.click();
    await this.page.waitForLoadState('networkidle');
    }

    async getHumanResource(){
    await this.humanResource.click();
    await this.view.click();
    await this.page.waitForLoadState('networkidle');
    }

    async navigateToSupervisorMenu(){
        await this.infoDesk.click();
        await this.reports.click();
        await this.yourSupervisor.click()
        await this.page.waitForLoadState('networkidle');
    }

}