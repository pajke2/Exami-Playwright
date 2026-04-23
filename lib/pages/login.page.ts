import {type Locator, type Page} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly signUpLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#login');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: ' Sign in' });
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    }

    async goToLoginPage() {
        await this.page.goto("/login");
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}