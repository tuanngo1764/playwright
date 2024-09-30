import { BillingDetails } from '../../modal/billing.details';
import { Product } from '../../modal/product';
import { CheckoutPage } from '../../pages/TestArchitect/checkout.page';
import { HomePage } from '../../pages/TestArchitect/home.page';
import { OrderStatusPage } from '../../pages/TestArchitect/order.status.page';
import { ShopPage } from '../../pages/TestArchitect/shop.page';
import { ShoppingCart } from '../../pages/TestArchitect/shopping.cart.page';
import { expect, test } from '../base.test';
/*
  Import test data
*/
import billingDetailsJSONData from '../../common/data/billing-details/sample-info.json';
import beatsSolo3WirelessOnEar from '../../common/data/products/beats-solo3-wireless-on-ear.json';
import { MenuItem, NotifyMessage, PaymentMethod, RGBColor, Title } from '../../common/utils/const';
import { Order } from '../../modal/order';



test('TC003 - Verify puchasing by a Guest', async ({ page }) => {
    /*
      Initialize PO
    */
    const homePage = new HomePage(page);
    const shopPage = new ShopPage(page);
    const shoppingCartPage = new ShoppingCart(page);
    const checkoutPage = new CheckoutPage(page);
    const oderStatusPage = new OrderStatusPage(page);
    /*
      Initialize variables
    */
    const product = new Product(beatsSolo3WirelessOnEar);
    const billingDetails = new BillingDetails(billingDetailsJSONData);
    billingDetails.setPaymentMethod(PaymentMethod.CASH_ON_DELIVERY);
    let cartQuantity: number = 0;

    await test.step('1. Go to home page', async () => {
        await homePage.goto();
    });
    await test.step('2. Click on Cart icon in the top right of shopping page', async () => {
        await shopPage.gotoShoppingCart();
        //VP. "YOUR SHOPPING CART IS EMPTY" is shown 
        expect(await shoppingCartPage.getShoppingCartEmptyTitle()).toBe(Title.SHOPPING_CART_EMPTY);
    });
    await test.step('3. Click on "Return to Shop" button', async () => {
        await shoppingCartPage.clickOnReturnToShopButton();
        //VP. SHOP page is shown
        expect(await shopPage.isSelectedMenuLink(MenuItem.SHOP)).toBe(true);
    });
    await test.step('4. Click on cart icon to add product to cart', async () => {
        await shopPage.addProductToCartUsingCartIcon(product.getProductName());
        await shopPage.waitForSuccessNotifyVisible();
        expect.soft(await shopPage.getSuccessNotifyMessage()).toBe(NotifyMessage.PRODUCT_ADDED_SUCCESS);
        cartQuantity++;
        await shopPage.waitForSuccessNotifyHidden();
        //VP. Cart icon number at the top right of Shop page is increased correctly 
        expect(await shopPage.getProductQuantityInCart()).toBe(cartQuantity);
    });
    await test.step('5. Click on Cart icon at the top right of Shop page', async () => {
        await shopPage.gotoShoppingCart();
        //VP. Progress is shown correctly: SHOPPING Cart is black bold while CHECKOUT and ORDER STATUS is grey
        expect(await shoppingCartPage.getColorStepShoppingCart()).toBe(RGBColor.BOLDED);
        expect(await shoppingCartPage.getColorStepCheckout()).toBe(RGBColor.GREY);
        expect(await shoppingCartPage.getColorStepOrderStatus()).toBe(RGBColor.GREY);
        expect.soft(await shoppingCartPage.isStepShoppingCartActived()).toBe(true);
        expect.soft(await shoppingCartPage.isStepCheckoutActived()).toBe(false);
        expect.soft(await shoppingCartPage.isStepOrderStatusActived()).toBe(false);
    });
    await test.step('6. Click on "Process to checkout" button', async () => {
        await shoppingCartPage.clickOnProccedToCheckoutLink();
        //VP. Progress is shown correctly: SHOPPING Cart and CHECKOUT are black bold while ORDER STATUS is grey
        expect(await checkoutPage.getColorStepShoppingCart()).toBe(RGBColor.BOLDED);
        expect(await checkoutPage.getColorStepCheckout()).toBe(RGBColor.BOLDED);
        expect(await checkoutPage.getColorStepOrderStatus()).toBe(RGBColor.GREY);
        expect.soft(await checkoutPage.isStepShoppingCartActived()).toBe(true);
        expect.soft(await checkoutPage.isStepCheckoutActived()).toBe(true);
        expect.soft(await checkoutPage.isStepOrderStatusActived()).toBe(false);
    });
    await test.step('7. Enter required fields  then click on "Place Order" button', async () => {
        await checkoutPage.fillAllRequiredFieldOnBillingDetails(billingDetails);
        await checkoutPage.uncheckCreateAnAccount();
        await checkoutPage.checkPaymentMethod(billingDetails.getPaymentMethod());
        await checkoutPage.clickOnPlaceOrder();
        //VP. "Message is shown: "THANK YOU. YOUR ORDER HAS BEEN RECEIVED.".
        expect(await oderStatusPage.getThankyouOrderReceivedNotify()).toBe(NotifyMessage.COMPLETE_ORDER);
        //VP. Order info is shown correctly: Order number: a number, Date: today, Total: corrected price, Payment method: Cash on Delivery, Product: correct name as at step 4, Email: corrected email address"
        let amount: string = `${product.getCurrency()}${(product.getProductPrice() * cartQuantity).toFixed(2)}`;
        const order = new Order(amount, billingDetails.getPaymentMethod(), billingDetails.getEmail());
        expect(await Number(await oderStatusPage.getOrderNumber())).not.toBeNaN();
        expect(await oderStatusPage.getOrderDate()).toBe(order.getOrderDate());
        expect(await oderStatusPage.getOrderTotal()).toBe(order.getOrderTotal());
        expect(await oderStatusPage.getOrderPaymentMethod()).toBe(order.getPaymentMethod());
        expect(await oderStatusPage.isProductDisplayed(product.getProductName())).toBe(true);
        expect(await oderStatusPage.getProductQuantityByName(product.getProductName())).toBe(cartQuantity);
        expect(await oderStatusPage.getProductSubTotalByName(product.getProductName())).toBe(amount);
        expect(await oderStatusPage.getCartTotalAmount()).toBe(amount);
    });
});