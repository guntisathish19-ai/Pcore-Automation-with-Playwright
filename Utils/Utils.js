import ExcelJS from 'exceljs';

export class Utils {
    map = new Map();
    constructor() {

    }

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

    getCredDetails() {
        this.map.set("userName", "aaaaa");
        this.map.set("password", "bbbb");
        //this.map.set("URL", "https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx");
        return this.map;
    }
}