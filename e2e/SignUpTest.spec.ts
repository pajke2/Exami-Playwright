import {test, expect} from "@playwright/test";
import {RegisterPage} from "@pages/registerPage.page";

test.describe.skip("Sign Up e2e tests", () => {

    test.beforeEach(async ({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goToRegisterPage();
    })

    test("Try to register with all empty fields", async ({page}) => {
        const registerPage = new RegisterPage(page);
        await registerPage.createAccountButton.click();

        await expect(registerPage.validationTriggeredMessage.nth(0)).toHaveText('Name is required');
        await expect(registerPage.validationTriggeredMessage.nth(1)).toHaveText('Username is required');
        await expect(registerPage.validationTriggeredMessage.nth(2)).toHaveText('Email is required');
        await expect(registerPage.validationTriggeredMessage.nth(3)).toHaveText('Password is required');
        await expect(registerPage.validationTriggeredMessage.nth(4)).toHaveText('Please confirm your password');


    })

    test("Try to register with already used email", async ({page}) => {
        const registerPage = new RegisterPage(page);
        const name = "Milos Pajic";
        const username = "pajke1223";
        const email = "pajicr@hotmail.com";
        const password = "password123";
        const passwordConfirmation = "password123";

        await registerPage.submitRegisterForm(name, username, email, password, passwordConfirmation);

        await expect(page.locator('.text-sm.text-destructive')).toHaveText('An account with this email address already exists.');
        
    })

    test("Try to register with already used username", async ({page}) => {
        
        const registerPage = new RegisterPage(page);
        const name = "Milos Pajic";
        const username = "pajke12";
        const email = "pajicr123@hotmail.com";
        const password = "password123";
        const passwordConfirmation = "password123";

        await registerPage.submitRegisterForm(name, username, email, password, passwordConfirmation);

        await expect(page.locator('.text-sm.text-destructive')).toHaveText('This username is already taken.');
        
    })

    test("Try to register with password confirmation mismatch", async ({page}) => {
        
        const registerPage = new RegisterPage(page);
        const name = "Milos Pajic";
        const username = "pajke12";
        const email = "pajicr123@hotmail.com";
        const password = "password123";
        const passwordConfirmation = "password12345";

        await registerPage.submitRegisterForm(name, username, email, password, passwordConfirmation);

        await expect(page.locator('.text-sm.text-destructive')).toHaveText('Passwords do not match');
        
    })

        test("Try to register with wrong email format", async ({page}) => {

        const registerPage = new RegisterPage(page);
        const name = "Milos Pajic";
        const username = "pajke12";
        const email = "wrongemailformat";
        const password = "password123";
        const passwordConfirmation = "password12345";
        await registerPage.submitRegisterForm(name, username, email, password, passwordConfirmation);
        
        const emailValidationMessage = await registerPage.returnEmailValidationMessage();

        expect(emailValidationMessage).toContain("Please include an '@' in the email address");
        
    })

});