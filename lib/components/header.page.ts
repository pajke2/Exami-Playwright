import { type Page, type Locator} from "@playwright/test";

export class Header {
    readonly page: Page;
    readonly userIcon: Locator;
    readonly darkModeSwitch: Locator;
    readonly hamburgerMenu: Locator;
    readonly friendsPageLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userIcon = page.locator('[data-slot="dropdown-menu-trigger"]');
        this.darkModeSwitch = page.getByRole('switch');
        this.hamburgerMenu = page.getByRole('button', { name: 'Toggle menu' });
        this.friendsPageLink = page.getByRole('button', { name: 'Friends' });
    }

    async logout() {
        await this.hamburgerMenu.click();
        await this.page.getByRole('button', { name: 'Logout' }).click();
        const activeSessionConfirm = this.page.getByRole('button', { name: 'Submit and sign out' });
        if (await activeSessionConfirm.isVisible({ timeout: 3000 })) {
            await activeSessionConfirm.click();
        }
    }

    async turnDarkModeOn() {
        const state = await this.darkModeSwitch.getAttribute('data-state');
        if (state !== 'checked') {
            await this.darkModeSwitch.click();
        }
    }

    async openHamburgerMenu(){
        const state = await this.hamburgerMenu.getAttribute('data-state');
        if (state == 'closed') {
            await this.hamburgerMenu.click();
        }
    }

    async openFriendsPage(){
        await this.friendsPageLink.click();

    }

}