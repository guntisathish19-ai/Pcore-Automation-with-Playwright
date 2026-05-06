import { test, expect} from "../Utils/Fixtrue";

/*test('Fixture test one', async ({ loggedInPage }) => {
    await loggedInPage.goto("https://pyramidcore.pyramidci.com/Home/PCIhome.aspx", { waitUntil: 'domcontentloaded' })
    console.log("logged in first test")
})

test('Fixture second test', async ({ loggedInPage }) => {
    await loggedInPage.goto("https://pyramidcore.pyramidci.com/Home/PCIhome.aspx", { waitUntil: 'domcontentloaded' })
    console.log("logged in second test")
})*/


test.only('Dashboard should load after login', async ({ LoggedInPage }) => {
  await expect(LoggedInPage).toHaveTitle(/Pyramid|PCI/i);
  await expect(LoggedInPage).toHaveTitle("PyramidCore Home Page.")
});
