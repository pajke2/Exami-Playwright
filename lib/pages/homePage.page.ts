import {type Locator, type Page} from "@playwright/test";

export class HomePage {
    readonly page: Page;


    constructor(page: Page ) {
        this.page = page;
    }

    async chooseSubject(subject: string) {
        await this.page.getByRole('heading', { name: subject }).click();
    }

}