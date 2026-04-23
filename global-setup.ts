import { chromium } from "@playwright/test";
import loginData from "./data/loginData.json";

const BASE_URL = 'https://exami.space';

export default async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const { email, password } = loginData[0];

    await page.goto(`${BASE_URL}/login`);

    await page.locator('#login').fill(email);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: ' Sign in' }).click();

    await page.waitForURL(`${BASE_URL}/subjects`);

    await context.storageState({ path: ".auth/user.json" });

    await browser.close();
}
