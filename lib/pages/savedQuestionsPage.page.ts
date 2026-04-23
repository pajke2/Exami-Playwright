import {type Page, type Locator} from "@playwright/test";

export class SavedQuestionsPage{

    readonly page: Page;
    readonly savedQuestions: Locator;
    readonly removeAllButton: Locator;
    readonly removeAllConfirmButton: Locator;
    readonly savedQuestionsStateLabel: Locator;

    constructor(page: Page){
        this.page = page;
        this.savedQuestions = page.locator('p.text-sm.leading-relaxed');
        this.removeAllButton = page.getByRole('button', {name: 'Remove All'});
        this.removeAllConfirmButton = page.getByRole('button', {name: 'Remove All'});
        this.savedQuestionsStateLabel = page.locator('p.text-lg.font-medium.text-muted-foreground');
    }

    
    async removeSavedQuestions(){
            await this.removeAllButton.click();
            await this.removeAllConfirmButton.click();
    }


}