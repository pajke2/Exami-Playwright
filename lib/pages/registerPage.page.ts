import {type Locator, type Page} from "@playwright/test";
import {LoginPage} from "./login.page";

export class RegisterPage {

    readonly page: Page;
    readonly baseURL: string;
    readonly nameInput: Locator;
    readonly createAccountButton: Locator;
    readonly loginPage: LoginPage;
    readonly name: Locator;
    readonly username: Locator;
    readonly email: Locator;
    readonly password: Locator
    readonly passwordConfirmation: Locator;
    readonly validationTriggeredMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.baseURL = "https://exami.space";
        this.nameInput = page.locator('#name');
        this.loginPage = new LoginPage(page);
        this.name = page.locator('#name');
        this.username = page.locator('#username');
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.passwordConfirmation = page.locator('#password_confirmation');
        this.validationTriggeredMessage = page.locator('.text-sm.text-destructive');
        this.createAccountButton = page.getByRole('button', {name: ' Create account'});

    }

    async goToRegisterPage() {
        await this.page.goto(`${this.baseURL}`);
        await this.loginPage.signUpLink.click();
    }

    async submitRegisterForm(name: string, username: string, email: string, password: string, passwordconfirmation: string) {
        await this.name.fill(name);
        await this.username.fill(username);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.passwordConfirmation.fill(passwordconfirmation);
        await this.createAccountButton.click();

    }

    async returnEmailValidationMessage(){

        let validationMessage = await this.email.evaluate(
            (el: HTMLInputElement) => el.validationMessage
        );
        return validationMessage;

    }


}