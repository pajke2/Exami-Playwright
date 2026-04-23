import {test, expect} from '@fixtures/pages.fixtures';
import {HomePage} from '@pages/homePage.page';
import {SubjectPage} from '@pages/subjectPage.page';
import {CategoryPage} from '@pages/categoryPage.page';
import {PracticePage} from '@pages/practicePage.page';
import {QuizPage} from '@pages/quizPage.page';
import { WrongAnswersPage } from '@pages/wrongAnswers.page';
import { answerAllQuestionsRandomly } from '@helpers/quizHelper';
import { practiceAllQuestionsRandomly } from '@helpers/practiceHelper';
import mainFlowData from '../data/mainFlowData.json';


test.describe.serial("Exami e2e tests", () => {
    
    test("Test Practice Mode", {tag:"@PracticeMode"}, async ({page}) => {
        const subject = mainFlowData[0].subject;
        const categoryName = mainFlowData[0].category;
        const numberOfQuestions = mainFlowData[0].questionNumbers;
        
        const homePage = new HomePage(page);
        const subjectPage = new SubjectPage(page, categoryName);
        const categoryPage = new CategoryPage(page);
        const practicePage = new PracticePage(page);

        await page.goto("/");

        await homePage.chooseSubject(subject);
        await expect(subjectPage.subjectHeading).toHaveText(subject);

        await subjectPage.chooseCategory();
        await expect(categoryPage.categoryHeading).toHaveText(categoryName);

        await categoryPage.startPractice();

        await practiceAllQuestionsRandomly(practicePage, numberOfQuestions);
        await practicePage.finishPractice();

        await expect(practicePage.practiceCompleteHeading).toHaveText('Practice Complete!');

    })

    test("Test Wrong Answers", {tag:"@WrongAnswers"}, async ({page}) => {
        const subject = mainFlowData[1].subject;
        const categoryName = mainFlowData[1].category;
        const numberOfQuestions = mainFlowData[1].questionNumbers;
        
        const homePage = new HomePage(page);
        const subjectPage = new SubjectPage(page, categoryName);
        const categoryPage = new CategoryPage(page);
        const practicePage = new PracticePage(page);
        const wrongAnswersPage = new WrongAnswersPage(page);

        await page.goto("/");

        await homePage.chooseSubject(subject);
        await expect(subjectPage.subjectHeading).toHaveText(subject);

        await subjectPage.chooseCategory();
        await expect(categoryPage.categoryHeading).toHaveText(categoryName);

        await categoryPage.goToWrongAnswers();
        await expect(wrongAnswersPage.wrongAnswersPageHeading).toHaveText('Wrong Answers')
        await expect(wrongAnswersPage.wrongAnswersPageDisclaimer).toHaveText('Wrong answers will be automatically removed after 30 days.');

        await wrongAnswersPage.waitForLoaded();
        if(await wrongAnswersPage.removeAllButton.isVisible({ timeout: 5000 })){
            await wrongAnswersPage.removeWrongAnswers();
        }

        await expect(wrongAnswersPage.noWrongAnswersLabel).toHaveText('No Wrong Answers');

        await categoryPage.startPractice();

        await practiceAllQuestionsRandomly(practicePage, numberOfQuestions);
        await practicePage.finishPractice();

        await expect(practicePage.practiceCompleteHeading).toHaveText('Practice Complete!');

        await practicePage.reviewWrongAnswers();

        const wrongAnswers = await practicePage.getWrongAnswersList();

        await practicePage.backToCategory();

        await categoryPage.goToWrongAnswers();
        await expect(wrongAnswersPage.wrongAnswersPageHeading).toHaveText('Wrong Answers')
        await expect(wrongAnswersPage.wrongAnswersPageDisclaimer).toHaveText('Wrong answers will be automatically removed after 30 days.');

        await wrongAnswersPage.waitForLoaded();
        const savedWrongAnswers = await wrongAnswersPage.getWrongAnswersList();
        await expect(wrongAnswers).toStrictEqual(savedWrongAnswers);

        if(await wrongAnswersPage.removeAllButton.isVisible({ timeout: 5000 })){
            await wrongAnswersPage.removeWrongAnswers();
        }
        await expect(wrongAnswersPage.noWrongAnswersLabel).toHaveText('No Wrong Answers');
        
 
    })

    test("Test Quiz Mode", {tag:"@QuizMode"}, async ({page}) => {
        const subject = mainFlowData[0].subject;
        const categoryName = mainFlowData[0].category;

        const homePage = new HomePage(page);
        const subjectPage = new SubjectPage(page, categoryName);
        const categoryPage = new CategoryPage(page);
        const quizPage = new QuizPage(page);

        await page.goto("/");
        await homePage.chooseSubject(subject);
        await expect(subjectPage.subjectHeading).toHaveText(subject);

        await subjectPage.chooseCategory();
        await expect(categoryPage.categoryHeading).toHaveText(categoryName);


        await categoryPage.startQuiz();
        await expect(quizPage.subjectLabel).toHaveText(subject);    
        await expect(quizPage.quizRulesLabel).toHaveText('Quiz Rules');
        await categoryPage.startQuizConfirmation();

        await answerAllQuestionsRandomly(quizPage);
        await quizPage.submitQuiz();
        await expect(quizPage.quizResultsHeading).toHaveText('Quiz Results');
        await quizPage.viewLeaderboard();
        await expect(quizPage.leaderboardHeading).toHaveText('Leaderboard');

    
    })

})
