import { Locator, Page } from '@playwright/test';
import { Account } from '../../modal/account';
import { GeneralPage } from './general.page';

export class PublicMessagePage extends GeneralPage {

    constructor(page: Page) {
        super(page);
    }

    async enterEmailToInboxField(email: string) {
        await (
            await this.page.locator("//input[@id='inbox_field']")
        ).fill(email);
    }

    async clickOnGoButton() {
        return await (
            await this.page.locator("//button[normalize-space(text())='GO']")
        ).click();
    }

    async filterInboxEmail(email: string) {
        await this.enterEmailToInboxField(email);
        await this.clickOnGoButton();
    }

    async openCreatedAccountEmail(account: Account) {
        await (
            await this.page.locator(`//tr[contains(@id, '${account.getUsername()}')]/td[contains(text(), 'Sample Website account has been created!')]`)
        ).click();
    }

    async clickOnSetPasswordLink() {
        await (
            await this.page.frameLocator("//iframe[@id='html_msg_body']")
        ).locator("//a[contains(text(),'set your new password')]")
            .click();
    }

}