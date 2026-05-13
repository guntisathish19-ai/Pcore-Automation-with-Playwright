export class BasePage {

    constructor(page, logger) {
        this.page = page;
        this.logger = logger;
    }

    async click(element) {
        try {
            await element.waitFor({ state: 'visible' });
            await element.scrollIntoViewIfNeeded();
            await element.click();
        } catch (err) {
            console.log(`Retrying click with ${element}`);
            await this.page.waitForTimeout(500);
        }

    }

    // Enter Username
    async enterUserName(username, element) {
        await this.page.fill(element, username);
    }

    // Enter Password
    async enterPassword(password, element) {
        await this.page.fill(element, password);
    }

    // Click Login Button
    async clickLogin(element) {
        await this.page.click(element);
    }


    async selectOption(element, option) {
        try {
            await element.waitFor({ state: 'visible' })
            await element.scrollIntoViewIfNeeded()
            await element.selectOption(option)
        }
        catch (err) {
            throw new Error(
                `Failed to select option in ${element} with ${JSON.stringify(option)}`
            );
        }

        // Optional validation (recommended)
        const selected = await element.evaluate(el => el.value);
        if (option.value && selected !== option.value) {
            throw new Error(
                `Option not selected correctly. Expected: ${option.value}, Got: ${selected}`
            );
        }
    }

    async clear(element) {
        if (element.isEditable()) {
            await element.press('Control+A');
            await element.press('Delete');
            await element.clear()
        }
        else
            console.log("Element is not in interactable or editable: " + element)
    }

    async getText(element) {
        await element.waitFor({ state: 'visible', timeout: 3000 })
        if (element.isVisible()) {
            return element.textContent()
        }
        else
            return "Element is not visible or not interactble"
    }

    async getAndAcceptAlert() {
        const message = dialog.message();
        await dialog.accept();
        return message;
    }


    async userId(username, element) {
        await element.fill(username)
    }

    async password(password, element) {
        await element.fill(password)
    }

    async loginBut(element) {
        await element.click()
    }



}