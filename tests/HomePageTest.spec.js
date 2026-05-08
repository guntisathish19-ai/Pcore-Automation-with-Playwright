import { test, expect} from "../Utils/Fixtures";

test('Dashboard should load after login', async ({ LoggedInPage }) => {
  await expect(LoggedInPage).toHaveTitle(/Pyramid|PCI/i);
  await expect(LoggedInPage).toHaveTitle("PyramidCore Home Page.")
});

test.afterAll('Tear down', async({ LoggedInPage })=>{
    console.log("Execution is completed")
})


