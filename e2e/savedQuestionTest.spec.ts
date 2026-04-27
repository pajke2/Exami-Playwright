import {test, expect} from '@fixtures/pages.fixtures';
import {Header} from '@components/header.page';
import {HomePage} from '@pages/homePage.page';
import {SubjectPage} from '@pages/subjectPage.page';
import {CategoryPage} from '@pages/categoryPage.page';
import {PracticePage} from '@pages/practicePage.page';
import { SavedQuestionsPage } from '@pages/savedQuestionsPage.page';

test.describe.serial("Testing Saved Questions", () => {
    
    test("Question Save Test", async ({page})=>{

    const subject = "Biology";
    const categoryName = "Mycology";
    
    const homePage = new HomePage(page);
    const subjectPage = new SubjectPage(page);
    const categoryPage = new CategoryPage(page);
    const practicePage = new PracticePage(page);
    const savedQuestionsPage = new SavedQuestionsPage(page);

    await page.goto("/");
    await homePage.chooseSubject(subject);
    await expect(subjectPage.subjectHeading).toHaveText(subject);

    await subjectPage.chooseCategory(categoryName);
    await expect(categoryPage.categoryHeading).toHaveText(categoryName);

    await categoryPage.savedQuestionsTab.click();
    
    if(await savedQuestionsPage.removeAllButton.isVisible({timeout: 5000})){
        await savedQuestionsPage.removeSavedQuestions();
    }

    await categoryPage.startPractice();

    await expect(practicePage.finishPracticeButton).toBeVisible({timeout: 10000});

    const questionTitle = await practicePage.questionTitle.textContent();
    expect(questionTitle).not.toBeNull();

    await practicePage.saveButton.click();
    await practicePage.finishPractice();
    await practicePage.backToCategoryButton.click();
    
    await categoryPage.savedQuestionsTab.click();
    const savedQuestionText = await savedQuestionsPage.savedQuestions.first();
    await expect(savedQuestionText).toContainText(questionTitle!)

    if(await savedQuestionsPage.removeAllButton.isVisible({timeout: 5000})){
        await savedQuestionsPage.removeSavedQuestions();
    }

    await expect(savedQuestionsPage.savedQuestionsStateLabel).toHaveText('No Saved Questions');
    
    })


})

