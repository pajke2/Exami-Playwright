import { PracticePage } from '@pages/practicePage.page';

export async function practiceAllQuestionsRandomly(
    practicePage: PracticePage,
    totalQuestions: number,
): Promise<void> {
    for (let i = 0; i < totalQuestions; i++) {
        const count = await practicePage.getAnswerCount();
        const answerIndex = Math.floor(Math.random() * count);
        await practicePage.selectAnswer(answerIndex);
        if (i < totalQuestions - 1) {
            await practicePage.clickNextQuestion();
        }
    }
}
