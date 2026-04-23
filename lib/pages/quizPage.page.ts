import { type Page, type Locator } from '@playwright/test';

export class QuizPage {

    readonly page: Page;
    readonly answerOption: Locator;
    readonly nextQuestionButton: Locator;
    readonly submitQuizButton: Locator;
    readonly submitQuizButtonConfirm: Locator;
    readonly viewLeaderboardButton: Locator;
    readonly subjectLabel: Locator;
    readonly quizRulesLabel: Locator;
    readonly quizResultsHeading: Locator;
    readonly leaderboardHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.answerOption = page.locator('button.w-full.cursor-pointer');
        this.nextQuestionButton = page.getByRole('button', { name: 'Next' });
        this.submitQuizButton = page.getByRole('button', { name: 'Submit Quiz' }).first();
        this.submitQuizButtonConfirm = page.getByRole('button', { name: 'Submit Quiz' }).last();
        this.viewLeaderboardButton = page.getByRole('button', { name: 'View Leaderboard' });
        this.subjectLabel = page.locator('h3').nth(0);
        this.quizRulesLabel = page.locator('h3').nth(1);
        this.quizResultsHeading = page.locator('h1');
        this.leaderboardHeading = page.locator('span.hidden').first();
    }

    async selectAnswer(answerIndex: number): Promise<void> {
        await this.answerOption.nth(answerIndex).click();
    }

    async clickNext(): Promise<void> {
        await this.nextQuestionButton.click();
    }

    async submitQuiz(): Promise<void> {
        await this.submitQuizButton.click();
        await this.submitQuizButtonConfirm.click();
    }

    async viewLeaderboard(): Promise<void> {
        await this.viewLeaderboardButton.click();
    }

}