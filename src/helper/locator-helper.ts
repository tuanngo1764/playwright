import { type Page } from '@playwright/test';

export class LocatorHelper {
    readonly page: Page;
    readonly locators: any;

    constructor(page: Page, className: string) {
        this.page = page;
        this.locators = require(`../locators/${className}.json`);
    }

    private getValue(locatorKey: string) {
        return (this.locators.filter(item => item.name === locatorKey))[0].locator;
    }

    private getValueWithDynamicParam(locatorKey: string, ...dynamicValue: any[]) {
        let locator : string = (this.locators.filter(item => item.name === locatorKey))[0].locator;
        dynamicValue.forEach((arg, index) => {
            locator = locator.replace(`{${index}}`, arg);
        })
        return locator;
    }

    getLocator(locatorKey: string) {
        return this.page.locator(this.getValue(locatorKey));
    }

    async getDynamicLocator(locatorKey: string, ...dynamicValue: any[]) {
        return this.page.locator(this.getValueWithDynamicParam(locatorKey, ...dynamicValue));
    }
}
