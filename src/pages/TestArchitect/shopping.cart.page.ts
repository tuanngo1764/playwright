import { Locator, Page } from "@playwright/test";
import { LocatorHelper } from "../../helper/locator-helper";
import { GeneralPage } from "./general.page";

export class ShoppingCart extends GeneralPage {

    constructor(page: Page) {
        super(page);
        this.subLocatorHelper = new LocatorHelper(this.page, ShoppingCart.name);
    }

    async isProductDisplayed(productName: string) {
        let lblProductTitle: Locator = await this.subLocatorHelper.getDynamicLocator('dynamicLblProductTitle', productName);
        await lblProductTitle.waitFor();
        return await lblProductTitle.isVisible();
    }

    async getProductPriceByName(productName: string) {
        return await (
            await this.subLocatorHelper.getDynamicLocator('dynamicLblProductPrice', productName)
        ).textContent();
    }

    async getProductQuantityByName(productName: string) {
        return Number(await (
            await this.subLocatorHelper.getDynamicLocator('dynamicTxtProductQuantity', productName)
        ).inputValue());
    }

    async getProductSubTotalByName(productName: string) {
        return (await (
            await this.subLocatorHelper.getDynamicLocator('dynamicTxtProductSubTotal', productName)
        ).textContent())?.trim();
    }

    async getCartTotalAmount() {
        return await (
            await this.subLocatorHelper.getLocator('lblCartTotalAmount')
        ).textContent();
    }

    async clearShoppingCart() {
        (await this.subLocatorHelper.getLocator('lnkClearShoppingCart')).click();
    }

    async getShoppingCartEmptyTitle() {
        return (await (
            await this.subLocatorHelper.getLocator('lblShoppingCartEmptyTitle')).textContent()
        )?.trim();
    }

    async clickOnReturnToShopLink() {
        await (
            await this.subLocatorHelper.getLocator('lnkReturnToShop')
        ).click();
        await this.closeJoinNewsletterPopUp();
    }

    async clickOnReturnToShopButton() {
        await (
            await this.subLocatorHelper.getLocator('btnReturnToShop')
        ).click();
        await this.closeJoinNewsletterPopUp();
    }

    async clickOnProccedToCheckoutLink() {
        await (
            await this.subLocatorHelper.getLocator('lnkProceedToCheckout')
        ).click();
    }

}