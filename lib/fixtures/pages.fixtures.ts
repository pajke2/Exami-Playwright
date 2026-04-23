import { test as base } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { Header } from "@components/header.page";

type AppFixtures = {
    loginPage: LoginPage;
    header: Header;
    darkMode: Header;
};

export const test = base.extend<AppFixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    header: async ({ page }, use) => {
        await use(new Header(page));
    },

    // Opt-in: turns dark mode on before the test, returns the Header instance.
    // Use only in tests or describe blocks that require the dark theme.
    darkMode: async ({ page }, use) => {
        const header = new Header(page);
        await header.turnDarkModeOn();
        await use(header);
    },

});

export { expect } from "@playwright/test";
