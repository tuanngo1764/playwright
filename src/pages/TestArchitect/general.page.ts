import { type Locator, type Page } from '@playwright/test';
import { MenuItem } from '../../common/utils/const';
import { LocatorHelper } from '../../helper/locator-helper';

export class GeneralPage {
    readonly page: Page;
    protected locatorHelper: LocatorHelper;
    protected subLocatorHelper: LocatorHelper;
    /*
        Initialize locator
    */
    private btnCloseOnJoinNewsletterPopUp: Locator;

    constructor(page: Page) {
        this.page = page;
        this.locatorHelper = new LocatorHelper(page, GeneralPage.name);
    }

    async gotoShopLink() {
        await (
            await this.locatorHelper.getDynamicLocator('dynamicMenuLink', MenuItem.SHOP)
        ).click();
        await this.closeJoinNewsletterPopUp();
    }

    async closeJoinNewsletterPopUp() {
        this.btnCloseOnJoinNewsletterPopUp = await this.locatorHelper.getLocator('btnCloseOnJoinNewsletterPopUp');
        await this.btnCloseOnJoinNewsletterPopUp.waitFor();
        await (await this.btnCloseOnJoinNewsletterPopUp).click();
    }

    async getProductQuantityInCart() {
        return Number(await (
            await this.locatorHelper.getLocator('lblProductQuantityInCart')
        ).textContent());
    }

    async gotoShoppingCart() {
        await (
            await this.locatorHelper.getLocator('cartIcon')
        ).click();
    }

    async getAlertMessage() {
        return (await (
            await this.locatorHelper.getLocator('lblalertMessage')).textContent()
        )?.trim();
    }

    async getBackgroundAlertMessage() {
        return await (
            await this.locatorHelper.getLocator('lblalertMessage')
        ).evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('background-color');
        });
    }


    async getSuccessNotifyMessage() {
        return (await (
            await this.locatorHelper.getLocator('successNotify')).textContent()
        )?.trim();
    }

    async waitForSuccessNotifyVisible() {
        await (
            await this.locatorHelper.getLocator('successNotify')
        ).waitFor();
    }

    async waitForSuccessNotifyHidden() {
        await (
            await this.locatorHelper.getLocator('successNotify')
        ).waitFor({ state: "hidden" });
    }

    async gotoMyAccount() {
        await (
            await this.locatorHelper.getLocator('lnkLoginOrSignUp')
        ).click();
    }

    async getCurrentAccount() {
        return (await (
            await this.locatorHelper.getLocator('lblMyAccount')).textContent()
        )?.trim();
    }

    async isSelectedMenuLink(menuName: string) {
        let classContent = await (await this.locatorHelper.getDynamicLocator('dynamicMenuLink', menuName)).getAttribute("class");
        return (classContent?.includes("current-menu-item"));
    }

    async getColorStepShoppingCart() {
        return await (
            await this.locatorHelper.getLocator('lnkStepShoppingCart')
        ).evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('color');
        });
    }

    async getColorStepCheckout() {
        return await (
            await this.locatorHelper.getLocator('lnkStepCheckout')
        ).evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('color');
        });
    }

    async getColorStepOrderStatus() {
        return await (
            await this.locatorHelper.getLocator('lnkStepOrderStatus')
        ).evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('color');
        });
    }

    async isStepShoppingCartActived() {
        let classContent = await (await this.locatorHelper.getDynamicLocator('lnkStepShoppingCart')).getAttribute("class");
        return (classContent?.includes("active"));
    }

    async isStepCheckoutActived() {
        let classContent = await (await this.locatorHelper.getDynamicLocator('lnkStepCheckout')).getAttribute("class");
        return (classContent?.includes("active"));
    }

    async isStepOrderStatusActived() {
        let classContent = await (await this.locatorHelper.getDynamicLocator('lnkStepOrderStatus')).getAttribute("class");
        return (classContent?.includes("active"));
    }


}
