export class MainPage {
    message;
    constructor(page) {
        this.page = page;
        this.mainPageFrame = page.frameLocator("frame[name='main']");
        this.ticket = this.mainPageFrame.getByPlaceholder("--Select--").nth(2);
        this.project = this.mainPageFrame.getByText("Playwright & GW Upskilling");
        this.group = this.mainPageFrame.locator("#selectedGroup").nth(2);
        this.activity = this.mainPageFrame.locator("#selectedActivity").nth(2);
        this.selectHoursEle = this.mainPageFrame.locator("div.containermain:nth-child(6) select[id='selectedHour']");
        this.totalHoursEle = this.mainPageFrame.locator(".weekTotalLow").nth(0);
        this.save = this.mainPageFrame.getByRole("button", { name: "Save" });
        this.message = this.mainPageFrame.locator(".notifier__notification-message");
    }

    async updateTicketDetails() {
        await this.ticket.click();
        await this.project.click();
        await this.group.selectOption("Quality");
        await this.activity.selectOption("QA & Testing");
    }

    async updateHours() {

        const count = await this.selectHoursEle.count();
        for (let i = 0; i < count - 2; i++) {
            if (!(await this.selectHoursEle.nth(i).isEditable()))
                break;
            await this.selectHoursEle.nth(i).selectOption("8");
        }
    }

    async validateTotalHours() {
        await this.totalHoursEle.waitFor({ state: 'visible' });
        const hours = await this.totalHoursEle.textContent();
        const totalHours = await parseInt(hours.split(":")[0])
        console.log("Total hours :" + totalHours);
        if (totalHours > 40){
            this.message = "Total hours for a week should be < = 40, please review!";
            console.log(this.message);
        }
        else {
            await this.save.click();
            //expect(await this.message.textContent()).toBe("Timesheet saved successfully");
            this.message = await this.message.textContent();
        }
        return this.message;
    }
}