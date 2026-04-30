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
        this.qualification = this.mainPageFrame.locator("input[value='Qualification']");
        this.certificate = this.mainPageFrame.locator("select[name='ddlCertificate']");
        this.certificateProvider = this.mainPageFrame.locator("#ddlCertificateProvider");
        this.functionalArea = this.mainPageFrame.locator("#ddlCertificateCayegory");
        this.uploadCertificate = this.mainPageFrame.locator("#FileUploadCertificate");
        this.date = this.mainPageFrame.locator("input#txtcert_date");
        this.todayDate = this.mainPageFrame.locator(".ui-state-default.ui-state-highlight");
        this.contact = this.mainPageFrame.locator("#ImgbtnContactInfo");
        this.informationType = this.mainPageFrame.locator("//select[@name='ddlMailType']");
        this.emailId = this.mainPageFrame.locator("#txtEmailID");
        this.country = this.mainPageFrame.locator("#ddlcountry");
        this.mobileNo = this.mainPageFrame.locator("#txtNo");
        this.add = this.mainPageFrame.locator("#btnAdd");
        this.recordAdded = this.mainPageFrame.locator("//b");
        this.relation = this.mainPageFrame.locator("#ddlRelation")
        this.contactsTable = this.mainPageFrame.locator(".datagrid tr");
        this.branch = this.mainPageFrame.locator("#ddlBranch");
        this.department = this.mainPageFrame.locator("#ddlDept")
        this.status = this.mainPageFrame.locator("#ddlFreezeStatus")
        this.show = this.mainPageFrame.getByRole("button", { name: 'Show' });
        this.month = this.mainPageFrame.locator("#ddlMonth");
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
        if (totalHours > 40) {
            this.message = "Total hours for a week should be < = 40, please review!";
            console.log(this.message);
        }
        else {
            await this.save.click();
            this.message = await this.message.textContent();
        }
        return this.message;
    }

    async getQualificationTab() {
        await this.qualification.click();
    }

    async updateCertificate() {
        try {
            let upload = false;
            await this.certificate.waitFor({ state: 'visible' });
            await this.certificate.selectOption("Playwright with JavaScript");
            await this.certificateProvider.waitFor({ state: "visible" });
            //await this.certificateProvider.selectOption({ value: "6" });
            await this.certificateProvider.selectOption({ label: "Udemy" });
            await this.functionalArea.locator("option", { hasText: "QA Testing" }).waitFor();
            await this.functionalArea.selectOption("QA Testing");
            if (!upload) {
                await this.uploadCertificate.setInputFiles("C:/Users/SATHISH.KUMAR/Downloads/Palywright automation certificate.pdf");
                await this.date.click();
                await this.todayDate.waitFor({ state: "visible" });
                await this.todayDate.click();
                upload = true;
            }
            return upload;
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }

    async getContact() {
        await this.contact.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async addContact(contactType, emailOrContact, mobileNo, relation) {
        try {
            await this.informationType.selectOption(contactType);
            await this.emailId.waitFor({ state: 'visible' });
            await this.emailId.click();
            await this.emailId.press('Control+A');
            await this.emailId.press('Delete');
            await this.emailId.type(emailOrContact, { delay: 50 });
            await this.country.selectOption({ label: "India (+91)" });
            await this.mobileNo.waitFor({ state: 'visible' });
            await this.mobileNo.click();
            await this.mobileNo.press('Control+A');
            await this.mobileNo.press('Delete');
            await this.mobileNo.type(mobileNo, { delay: 50 });
            await this.relation.selectOption(relation);
            await this.add.click();
            await this.recordAdded.waitFor({ state: 'visible' });
            const message = await this.recordAdded.textContent();
            console.log(message);
            return message;
        }
        catch (error) {
            console.log(error)
            throw error;
        }

    }

    async updateContact(contact, mobileNo) {
        try {
            await this.contactsTable.first().waitFor({ state: 'visible' });
            const row = await this.contactsTable.filter({ hasText: `${contact}` });
            await row.first().locator('td').nth(6).click();
            await this.mobileNo.click();
            await this.mobileNo.press('Control+A');
            await this.mobileNo.press('Delete');
            await this.mobileNo.type(mobileNo, { delay: 50 });
            await this.add.click();
            await this.recordAdded.waitFor({ state: 'visible' });
            const message = await this.recordAdded.textContent();
            console.log(message);
            return message

        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }

    async deleteContact(contact) {
        try {
            await this.mainPageFrame.locator(".datagrid").waitFor({ state: 'visible' });
            await this.mainPageFrame.locator(".datagrid tr").first().waitFor();
            const dialogPromise = new Promise(resolve => {
                this.page.once('dialog', async dialog => {
                    console.log("Alert message:" + dialog.message());
                    await dialog.accept();
                    resolve();
                });
            });
            const rows = await this.mainPageFrame.locator(".datagrid tr");
            const rowcount = await rows.count();
            let found = false;
            for (let i = 0; i < rowcount; i++) {
                const row = rows.nth(i)
                const firstCellText = (await row.locator('td').nth(0).textContent())?.trim();
                if (firstCellText === contact) {
                    await row.locator('td').nth(7).click();
                    found = true;
                    break;
                }
            }

            if (!found) {
                throw new Error(`Contact "${contact}" not found`);
            }
            await dialogPromise
            return found;
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }
    async verifySupervisor(branch, department, employeeid) {
        try {
            await this.branch.selectOption(branch)
            await this.department.selectOption(department)
            await this.status.selectOption("Active");
            await this.show.click();
            await this.contactsTable.first().waitFor({ state: 'visible' });
            const row = await this.contactsTable.filter({ hasText: `${employeeid}` });
            const message = await row.first().locator('td').nth(5).textContent();
            console.log(message)
            return message;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    async verifyDOBofEmployee(branch, department, month, employeeid) {
        try {
            await this.branch.selectOption(branch);
            await this.department.selectOption(department);
            await this.month.selectOption(month);
            await this.show.click();
            await this.contactsTable.first().waitFor({ state: 'visible' });
            const row = this.contactsTable.filter({ hasText: `${employeeid}` });
            const message = await row.first().locator('td').nth(5).textContent();
            console.log(message)
            return message;
        }
        catch (error) {
            console.log(error);
            throw error;
        }

    }

    async verifyAnniversaryofEmployee(branch, department, month, employeeid){
         try {
            await this.branch.selectOption(branch);
            await this.department.selectOption(department);
            await this.month.selectOption(month);
            await this.show.click();
            await this.contactsTable.first().waitFor({ state: 'visible' });
            const row = this.contactsTable.filter({ hasText: `${employeeid}` });
            const message = await row.first().locator('td').nth(6).textContent();
            console.log(message)
            return message;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}