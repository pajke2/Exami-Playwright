import {type Page, type Locator} from "@playwright/test";

export class SubjectPage {
    readonly page: Page;
    readonly category: Locator;
    readonly subjectHeading: Locator;

    constructor(page: Page, categoryName: string) {
        this.page = page;
        this.category = page.getByRole('heading', { name: categoryName });
        this.subjectHeading = page.locator('h1').first();
    }

    async chooseCategory() {
        await this.category.click();
    }

}