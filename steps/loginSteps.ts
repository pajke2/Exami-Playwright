import {Given, When, Then, Before, After} from "@cucumber/cucumber"
import { expect, Page, chromium, Browser } from "@playwright/test"

let page: Page;
let browser: Browser;

Before(async()=>{
    browser = await chromium.launch({headless:false});
    const context = await browser.newContext()
    page = await context.newPage()
})

After(async()=>{
    await browser.close();
})

Given("User is on the login page", async()=>{
    await page.goto("https://exami.space");
})

When("User enters valid email and password", async()=>{
    await page.locator('#login').fill("pajicr@hotmail.com");
    await page.locator('#password').fill("Radivoje123");
    await page.getByRole('button', { name: ' Sign in' }).click();
})

Then("User is redirected to Subject page", async()=>{
    await expect(page.locator('h1')).toHaveText("Subjects");
})