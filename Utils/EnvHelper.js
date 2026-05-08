import ExcelJS from 'exceljs';

export class EnvHelper {

    map = new Map();
    constructor() {

    }

    // to read credentials from .env file
    getCredentials(userData) {
        if (userData.username && userData.password) {
            return {
                username: process.env[userData.username],
                password: process.env[userData.password]
            };
        }

        // For negative scenarios (hardcoded invalid users)
        return {
            username: process.env[userData.username],
            password: process.env[userData.password]
        };
    }

    //to read credentials from excel
    async getTestData(user) {
        const workBook = new ExcelJS.Workbook();
        await workBook.xlsx.readFile("C:/Users/SATHISH.KUMAR/WokingProjects/Pcore Automation with Playwright/TestData.xlsx");
        const workSheet = workBook.getWorksheet("Sheet1")
        workSheet.eachRow((row) => {
            const userCell = row.getCell(2).value;
            if (userCell === user) {
                this.map.set("userName", row.getCell(3).value);
                this.map.set("password", row.getCell(4).value);
            }

        });
        return this.map;
    }

    //to store credentails and return
    async getCredDetails() {
        this.map.set("userName", "aaaaa");
        this.map.set("password", "bbbb");
        //this.map.set("URL", "https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        return this.map;
    }

};

