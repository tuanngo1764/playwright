import { Page } from "@playwright/test";
import { LocatorHelper } from "../../helper/locator-helper";
import { GeneralPage } from "./general.page";

export class ShopPage extends GeneralPage {

    constructor(page: Page) {
        super(page);
        this.subLocatorHelper = new LocatorHelper(this.page, ShopPage.name);
    }

    async hoverCardProduct(productName: string) {
        await (
            await this.subLocatorHelper.getDynamicLocator('dynamicCardProduct', productName)
        ).hover();
    }

    async addProductToCartUsingCartIcon(productName: string) {
        await this.hoverCardProduct(productName);
        await (
            await this.subLocatorHelper.getDynamicLocator('dynamicIconCartOnCardProduct', productName)
        ).click();
    }

}