import {type Page, type Locator} from "@playwright/test"

export class WrongAnswersPage{

    readonly page: Page;
    readonly wrongAnswer: Locator;
    readonly removeAllButton: Locator;
    readonly wrongAnswersPageHeading: Locator;
    readonly wrongAnswersPageDisclaimer: Locator;
    readonly noWrongAnswersLabel: Locator;
    readonly loadingLabel: Locator;

    constructor(page: Page){
        this.page = page;
        this.wrongAnswer = page.locator('.text-sm.font-medium.leading-relaxed');
        this.removeAllButton =  page.getByRole('button', {name: 'Remove All'});
        this.wrongAnswersPageHeading = page.getByRole('heading', { name: 'Wrong Answers' });
        this.wrongAnswersPageDisclaimer = page.locator('p.mt-2.flex.items-start.gap-2.rounded-md.border');
        this.noWrongAnswersLabel = page.locator('p.text-lg');
        this.loadingLabel = page.getByText('Loading wrong answers...');
    }

    async waitForLoaded() {
        await this.loadingLabel.waitFor({ state: 'hidden', timeout: 15000 });
    }

    async removeWrongAnswers() {
            await this.removeAllButton.click();
            await this.removeAllButton.waitFor({ state: 'visible' });
            await this.removeAllButton.click();
            await this.waitForLoaded();
    }

    async getWrongAnswersList(): Promise<string[]> {
        await this.wrongAnswer.first().waitFor({ state: 'visible' });
        const answers = await this.wrongAnswer.allTextContents();
        return answers.sort()
    }

}