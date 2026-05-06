
const { test: base, expect } = require('@playwright/test');

exports.test = base.extend({
    LoggedInPage: async ({ browser }, use) => {
        // Create new isolated browser context
        const context = await browser.newContext();
        const page = await context.newPage();

        // Open PCI Login Page
        await page.goto(
            'https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx',
            { waitUntil: 'networkidle' }
        );

        // 🔐 PASSING CREDENTIALS HERE (from .env)
        await page.fill(
            'input[name="pydLogin$txtUserid"]',
            process.env.PCI_VALID_USERNAME
        );

        await page.fill(
            'input[name="pydLogin$txtUserPwd"]',
            process.env.PCI_VALID_PASSWORD
        );

        // Click Login
        await page.click('input[name="pydLogin$btnLogin"]');

        // ✅ Validate login success (adjust selector if needed)
        await page.waitForURL(/Dashboard|Home|Default/i, {
            timeout: 15000
        });

        // Give logged-in page to test
        await use(page);

        // Cleanup
        await context.close();
    }
});

exports.expect = expect;
