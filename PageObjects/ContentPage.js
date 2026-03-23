export class ContentPage{
    
    constructor(page){
        this.page = page;
        this.contentPageFrame = page.frameLocator("frame[name='contents']");
        this.timesheet = this.contentPageFrame.locator("#PCIMenut28");
        this.myTimesheet = this.contentPageFrame.locator("#PCIMenut29");
    }

    async getMyTimesheet(){
    await this.timesheet.click();
    await this.myTimesheet.click();
    await this.page.waitForLoadState('networkidle');
    }
}