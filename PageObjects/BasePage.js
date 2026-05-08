export class BasePage {

    constructor(page) {
        this.page = page;
    }

    async click(element) {
        try {
            await element.waitFor({ state: 'visible'});
            await element.scrollIntoViewIfNeeded();
            await element.click();
            return;
        } catch (err) {
            console.log(`Retrying click with ${element}`);
            await this.page.waitForTimeout(500);
        }

    }

    async selectOption(element, option) {
        try {
            await element.waitFor({ state: 'visible'})
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

}