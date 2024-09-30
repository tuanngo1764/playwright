import { Page } from '@playwright/test';
import { LocatorHelper } from '../../helper/locator-helper';
import { BillingDetails } from '../../modal/billing.details';
import { GeneralPage } from './general.page';

export class CheckoutPage extends GeneralPage {

    constructor(page: Page) {
        super(page);
        this.subLocatorHelper = new LocatorHelper(this.page, CheckoutPage.name);
    }

    async enterBillingFirstName(firstName: string) {
        await (
            await this.subLocatorHelper.getLocator("txtBillingFirstName")
        ).fill(firstName);
    }

    async enterBillingLastName(lastName: string) {
        await (
            await this.subLocatorHelper.getLocator("txtBillingLastName")
        ).fill(lastName);
    }

    async selectBillingCountry(country: string) {
        await (
            await this.subLocatorHelper.getLocator("cbbBillingCountry")
        ).selectOption(country);
    }

    async enterBillingAddress(address: string) {
        await (
            await this.subLocatorHelper.getLocator("txtBillingAddress")
        ).fill(address);
    }

    async enterBillingCity(city: string) {
        await (
            await this.subLocatorHelper.getLocator("txtBillingCity")
        ).fill(city);
    }

    async enterBillingPhone(phone: string) {
        await (
            await this.subLocatorHelper.getLocator("txtBillingPhone")
        ).fill(phone);
    }

    async enterBillingEmail(phone: string) {
        await (
            await this.subLocatorHelper.getLocator("txtBillingEmail")
        ).fill(phone);
    }

    async clickOnPlaceOrder() {
        await (
            await this.subLocatorHelper.getLocator("btnPlaceOrder")
        ).click();
    }

    async checkCreateAnAccount() {
        await (
            await this.subLocatorHelper.getLocator("chbCreateAnAccount")
        ).check();
    }

    async uncheckCreateAnAccount() {
        await (
            await this.subLocatorHelper.getLocator("chbCreateAnAccount")
        ).uncheck();
    }

    async fillAllRequiredFieldOnBillingDetails(billingDetails: BillingDetails) {
        await this.enterBillingFirstName(billingDetails.getFirstName());
        await this.enterBillingLastName(billingDetails.getLastName());
        await this.selectBillingCountry(billingDetails.getCountry());
        await this.enterBillingAddress(billingDetails.getAddress());
        await this.enterBillingCity(billingDetails.getCity());
        await this.enterBillingPhone(billingDetails.getPhone());
        await this.enterBillingEmail(billingDetails.getEmail());
    }

    async checkPaymentMethod(paymentMethod: string) {
        await (
            await this.subLocatorHelper.getDynamicLocator("dynamicPaymentMethodChb", paymentMethod)
        ).setChecked(true);
    }

}