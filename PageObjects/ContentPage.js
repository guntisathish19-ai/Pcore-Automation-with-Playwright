export class ContentPage{
    
    constructor(page){
        this.page = page;
        this.contentPageFrame = page.frameLocator("frame[name='contents']");
        this.timesheet = this.contentPageFrame.locator("#PCIMenut28");
        this.myTimesheet = this.contentPageFrame.locator("#PCIMenut29");
        this.humanResource = this.contentPageFrame.locator("#PCIMenut41");
        this.view = this.contentPageFrame.locator("#PCIMenut43");

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

}