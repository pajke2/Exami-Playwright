import { QuizPage } from '@pages/quizPage.page';

const ANSWER_OPTIONS_PER_QUESTION = 4;
const DEFAULT_TOTAL_QUESTIONS = 15;

export async function answerAllQuestionsRandomly(
    quizPage: QuizPage,
    totalQuestions = DEFAULT_TOTAL_QUESTIONS,
): Promise<void> {
    for (let i = 0; i < totalQuestions; i++) {
        const answerIndex = Math.floor(Math.random() * ANSWER_OPTIONS_PER_QUESTION);
        await quizPage.selectAnswer(answerIndex);
        const isLastQuestion = i === totalQuestions - 1;
        if (!isLastQuestion) {
            await quizPage.clickNext();
        }
    }
}
