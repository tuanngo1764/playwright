import { Page } from '@playwright/test';
import { LocatorHelper } from '../../helper/locator-helper';
import { GeneralPage } from './general.page';

export class HomePage extends GeneralPage {

    constructor(page: Page) {
        super(page);
        this.subLocatorHelper = new LocatorHelper(this.page, HomePage.name);
    }

    async goto() {
        await this.page.goto('/');
    }

}