import { Page } from '@playwright/test';
import { GeneralPage } from './general.page';

export class MailinatorHomePage extends GeneralPage {

    constructor(page: Page) {
        super(page);
    }

    async gotoMailServer() {
        await this.page.goto(`${process.env.MAILINATOR_URL}`);
    }

}