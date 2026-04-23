import { type Page, type Locator } from "@playwright/test";

export class PracticePage {
    readonly page: Page;
    readonly answerOption: Locator;
    readonly nextQuestionButton: Locator;
    readonly finishPracticeButton: Locator;
    readonly finishPracticeConfirmButton: Locator;
    readonly questionTitle: Locator;
    readonly saveButton: Locator;
    readonly backToCategoryButton: Locator;
    readonly wrongAnswerTitle: Locator;
    readonly reviewWrongAnswersButton: Locator;
    readonly sheetOverlay: Locator;
    readonly practiceCompleteHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.answerOption = page.locator('button.w-full.cursor-pointer');
        this.nextQuestionButton = page.getByRole('button', { name: 'Next Question' });
        this.finishPracticeButton = page.getByRole('button', { name: 'Finish Practice' }).first();
        this.finishPracticeConfirmButton = page.getByRole('button', { name: 'Finish Practice' }).last();
        this.questionTitle = page.locator('h3');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.backToCategoryButton = page.getByRole('button', { name: 'Back to Category' });
        this.wrongAnswerTitle = page.locator('h3.font-semibold.text-base');
        this.reviewWrongAnswersButton = page.getByRole('button', { name: 'Review Wrong Answers' });
        this.sheetOverlay = page.locator('[data-slot="sheet-overlay"]');
        this.practiceCompleteHeading = page.locator('h3');
    }

    async getAnswerCount(): Promise<number> {
        await this.answerOption.first().waitFor({ state: 'visible' });
        return this.answerOption.count();
    }

    async selectAnswer(index: number): Promise<void> {
        const answer = this.answerOption.nth(index);
        await answer.waitFor({ state: 'visible' });
        await answer.click();
    }

    async clickNextQuestion(): Promise<void> {
        await this.nextQuestionButton.click();
    }

    async reviewWrongAnswers(): Promise<void> {
        await this.reviewWrongAnswersButton.click();
    }

    async backToCategory(): Promise<void> {
        await this.backToCategoryButton.click();
    }

    async finishPractice(): Promise<void> {
        await this.finishPracticeButton.click();
        await this.finishPracticeConfirmButton.click();
    }

    async getWrongAnswersList(): Promise<string[]> {
        await this.wrongAnswerTitle.first().waitFor({ state: 'visible' });
        const answers = await this.wrongAnswerTitle.allTextContents();
        return answers.sort();
    }
}
