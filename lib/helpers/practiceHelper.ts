import { expect } from '@playwright/test';
import { PracticePage } from '@pages/practicePage.page';

export async function practiceAllQuestionsRandomly(
    practicePage: PracticePage,
    totalQuestions: number,
): Promise<void> {
    for (let i = 0; i < totalQuestions; i++) {
        const count = await practicePage.getAnswerCount();
        const answerIndex = Math.floor(Math.random() * count);

        for (let attempt = 0; attempt < 3; attempt++) {
            await practicePage.selectAnswer(answerIndex);
            try {
                await expect(practicePage.answerOption.nth(answerIndex)).toBeDisabled({ timeout: 2000 });
                break;
            } catch {
                if (attempt === 2) throw new Error(`Answer not selected after 3 attempts on question ${i + 1}`);
            }
        }

        if (i < totalQuestions - 1) {
            // await practicePage.nextQuestionButton.waitFor({ state: 'visible' });
            // await expect(practicePage.nextQuestionButton).toBeVisible();
            await practicePage.clickNextQuestion();
        }
    }
}
