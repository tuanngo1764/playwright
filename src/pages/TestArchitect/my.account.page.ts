import { type Page } from '@playwright/test';
import { LocatorHelper } from '../../helper/locator-helper';
import { Account } from '../../modal/account';
import { GeneralPage } from './general.page';

export class MyAccountPage extends GeneralPage {

    constructor(page: Page) {
        super(page);
        this.subLocatorHelper = new LocatorHelper(this.page, MyAccountPage.name);
    }

    async enterRegEmail(email: string) {
        await (await this.subLocatorHelper.getLocator('txtRegisterEmail')).fill(email);
    }

    async enterUsername(email: string) {
        await (await this.subLocatorHelper.getLocator('txtUsername')).fill(email);
    }

    async enterPassword(password: string) {
        await (await this.subLocatorHelper.getLocator('txtPassword')).fill(password);
    }

    async enterNewPassword(password: string) {
        await (
            await this.subLocatorHelper.getLocator('txtNewPassword')
        ).fill(password);
    }

    async enterConfirmPassword(confirmPassword: string) {
        await (
            await this.subLocatorHelper.getLocator('txtConfirmPassword')
        ).fill(confirmPassword);
    }

    async clickOnSaveNewPasswordButton() {
        await (
            await this.subLocatorHelper.getLocator('btnSavePassword')
        ).click();
    }

    async setupNewPassword(password: string, confirmPassword: string) {
        await this.enterNewPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.clickOnSaveNewPasswordButton();
    }

    async clickOnRegButton() {
        await (await this.subLocatorHelper.getLocator('btnRegister')).click();
    }

    async clickOnLoginButton() {
        await (await this.subLocatorHelper.getLocator('btnLogin')).click();
    }

    async login(account: Account) {
        await this.enterUsername(account.getEmail());
        await this.enterPassword(account.getPassword());
        await this.clickOnLoginButton();
    }

    async registerAccount(email: string) {
        await this.enterRegEmail(email);
        await this.clickOnRegButton();
    }

    async getCurrentAccountWelcome() {
        return await (
            await this.subLocatorHelper.getLocator('lblCurrentAccountWelcome')
        ).textContent();
    }

}