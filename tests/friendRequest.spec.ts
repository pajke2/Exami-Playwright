import {test, expect} from '@playwright/test';
import {Header} from '@components/header.page';
import { FrinedsPage } from '@pages/friendsPage.page';
import { LoginPage } from '@pages/login.page';
import loginData from "../data/loginData.json";

test.describe.skip("Sent, Recive, Accept Friend request", () => {
    

    test("Send Friend Request", async({page}) => {
        const loginPage = new LoginPage(page);
        const header = new Header(page);
        const frinedsPage = new FrinedsPage(page);
        const email = loginData[0].email;
        const password = loginData[0].password;

        await page.goto("/");
        await header.turnDarkModeOn();

        await header.openHamburgerMenu();
        await header.openFriendsPage();

        await frinedsPage.searchForFriend('James Wilson');
        await frinedsPage.sendFriendRequest();

    })

    test("Accept Friend Request", async({page}) => {
        const loginPage = new LoginPage(page);
        const header = new Header(page);
        const frinedsPage = new FrinedsPage(page);
        const email = loginData[1].email;
        const password = loginData[1].password;

        await page.goto("/");
        await header.logout();
        await loginPage.goToLoginPage();
        await loginPage.login(email, password);

        await header.turnDarkModeOn();

        await header.openHamburgerMenu();
        await header.openFriendsPage();

        await frinedsPage.acceptFriendRequest();


    })

    test('Remove Friend', async({page})=>{
        const loginPage = new LoginPage(page);
        const header = new Header(page);
        const frinedsPage = new FrinedsPage(page);
        const email = loginData[1].email;
        const password = loginData[1].password;

        await page.goto("/");
        await header.logout();
        await loginPage.goToLoginPage();
        await loginPage.login(email, password);

        await header.turnDarkModeOn();

        await header.openHamburgerMenu();
        await header.openFriendsPage();

        await frinedsPage.removeFrined();

    })

})