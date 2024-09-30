import { Locator, Page } from '@playwright/test';
import { LocatorHelper } from '../../helper/locator-helper';
import { GeneralPage } from './general.page';

export class OrderStatusPage extends GeneralPage {

    constructor(page: Page) {
        super(page);
        this.subLocatorHelper = new LocatorHelper(this.page, OrderStatusPage.name);
    }

    async getThankyouOrderReceivedNotify() {
        let orderReceiveNotify: Locator = await this.subLocatorHelper.getLocator('thankyouOrderReceivedNotify');
        const textTransform = await orderReceiveNotify.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('text-transform');
        });
        if (textTransform.toLocaleLowerCase() == "uppercase")
            return (await orderReceiveNotify.textContent())?.toUpperCase().trim();
        else
            return (await orderReceiveNotify.textContent())?.trim();
    }

    async getOrderNumber() {
        return (await (
            await this.subLocatorHelper.getLocator('lblOrderNumber')).textContent()
        )?.trim();
    }

    async getOrderDate() {
        return (await (
            await this.subLocatorHelper.getLocator('lblOrderDate')).textContent()
        )?.trim();
    }

    async getOrderTotal() {
        return (await (
            await this.subLocatorHelper.getLocator('lblOrderTotal')).textContent()
        )?.trim();
    }

    async getOrderPaymentMethod() {
        return (await (
            await this.subLocatorHelper.getLocator('lblOrderPaymentMethod')).textContent()
        )?.trim();
    }

    async isProductDisplayed(productName: string) {
        let lblProductTitle: Locator = await this.subLocatorHelper.getDynamicLocator('dynamicProductTitle', productName);
        await lblProductTitle.waitFor();
        return await lblProductTitle.isVisible();
    }

    async getProductQuantityByName(productName: string) {
        return Number((await (
            await this.subLocatorHelper.getDynamicLocator('dynamicLblProductQuantity', productName)
        ).textContent())?.replace("×", "")?.trim());
    }

    async getProductSubTotalByName(productName: string) {
        return (await (
            await this.subLocatorHelper.getDynamicLocator('dynamicLblProductSubTotal', productName)
        ).textContent())?.trim();
    }

    async getCartTotalAmount() {
        return await (
            await this.subLocatorHelper.getLocator('lblOrderTotalAmount')
        ).textContent();
    }

}