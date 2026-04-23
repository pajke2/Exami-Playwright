import {type Page, type Locator} from "@playwright/test";

export class CategoryPage {

    readonly page: Page;
    readonly practiceTab: Locator;
    readonly quizTab: Locator;
    readonly wrongAnswersTab: Locator;
    readonly startPracticeButton: Locator;
    readonly startQuizButton: Locator;
    readonly startQuizButtonConfirm: Locator;
    readonly iUnderstandStartQuizButton: Locator;
    readonly categoryHeading: Locator;
    readonly savedQuestionsTab: Locator;


    constructor (page: Page){
        this.page = page;
        this.practiceTab = page.getByRole('tab', { name: 'Practice' });
        this.quizTab = page.getByRole('tab', { name: 'Quiz' });
        this.wrongAnswersTab = page.getByRole('tab', { name: 'Wrong Answers' });
        this.startPracticeButton = page.getByRole('button', { name: 'Start Practice Session' });
        this.startQuizButton = page.getByRole('button', { name: 'Start Quiz' }).first();
        this.startQuizButtonConfirm = page.getByRole('button', { name: 'Start Quiz' }).last();
        this.iUnderstandStartQuizButton = page.getByRole('button', { name: 'I understand, Start Quiz' });
        this.categoryHeading = page.locator('h1');
        this.savedQuestionsTab = page.getByRole('tab', { name: 'Saved' });
        
    }

    async startPractice() {
        await this.practiceTab.click();
        await this.startPracticeButton.click();
    }


    async startQuiz() {
        await this.quizTab.click();
        await this.startQuizButton.click();
    }

    async goToWrongAnswers(): Promise<void> {
        await this.wrongAnswersTab.click();
    }

    async startQuizConfirmation() {
        await this.startQuizButtonConfirm.click();
        await this.iUnderstandStartQuizButton.click();
    }



}