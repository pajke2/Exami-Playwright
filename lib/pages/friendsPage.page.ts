import {type Page, type Locator} from "@playwright/test";

export class FrinedsPage{
    readonly page: Page;
    readonly searchFriendsInputField: Locator;
    readonly addFriendButton: Locator;
    readonly acceptFriendRequestButton: Locator;
    readonly removeFriendButton: Locator;
    readonly removeFriendConfirm: Locator;

    constructor(page: Page){
        this.page = page;
        this.searchFriendsInputField = page.getByRole('textbox', { name: 'Search by name or email...' });
        this.addFriendButton = page.getByRole('main').getByRole('button');
        this.acceptFriendRequestButton = page.locator('path[d="M20 6 9 17l-5-5"]');
        this.removeFriendButton = page.getByRole('button', {name: "Remove"});
        this.removeFriendConfirm = page.getByRole('button', {name: "Remove Friend"});
    }

    async searchForFriend(name: string){
        await this.searchFriendsInputField.fill(name);
    }

    async sendFriendRequest(){
        await this.addFriendButton.click();
    }

    async acceptFriendRequest(){
        await this.acceptFriendRequestButton.click();
    }

    async removeFrined(){
        await this.removeFriendButton.click();
        await this.removeFriendConfirm.click();
    }
}