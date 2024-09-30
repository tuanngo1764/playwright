import { type Page } from '@playwright/test';

export class GeneralPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOnPublicInboxLink() {
        await (
            await this.page.locator("//a[@class='inbox-link']")
        ).click();
    }

}
