import {type Page, type Locator} from "@playwright/test";

export class SubjectPage {
    readonly page: Page;
    readonly subjectHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.subjectHeading = page.locator('h1').first();
    }

    async chooseCategory(categoryName: string) {
        await this.page.getByRole('heading', { name: categoryName }).click();
    }

}