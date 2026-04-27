import { QuizPage } from '@pages/quizPage.page';

const DEFAULT_TOTAL_QUESTIONS = 15;

export async function answerAllQuestionsRandomly(
    quizPage: QuizPage,
    totalQuestions = DEFAULT_TOTAL_QUESTIONS,
): Promise<void> {
    for (let i = 0; i < totalQuestions; i++) {
        await quizPage.answerOption.first().waitFor({ state: 'visible' });
        const count = await quizPage.answerOption.count();
        const answerIndex = Math.floor(Math.random() * count);
        await quizPage.selectAnswer(answerIndex);

        if (i < totalQuestions - 1) {
            await quizPage.clickNext();
        }
    }
}
