import { Dialog } from '../../modal/dialog';
import { Product } from '../../modal/product';
import { HomePage } from '../../pages/TestArchitect/home.page';
import { ShopPage } from '../../pages/TestArchitect/shop.page';
import { ShoppingCart } from '../../pages/TestArchitect/shopping.cart.page';
import { expect, test } from '../base.test';
/*
  Import test data
*/
import beatsSolo3WirelessOnEar from '../../common/data/products/beats-solo3-wireless-on-ear.json';
import { AlertMessage, MenuItem, NotifyMessage, Title } from '../../common/utils/const';


test('TC001 - Verify clearing Shopping cart', async ({ page }) => {
  /*
    Initialize PO
  */
  const homePage = new HomePage(page);
  const shopPage = new ShopPage(page);
  const shoppingCartPage = new ShoppingCart(page);
  const alertDialog = new Dialog(page);
  /*
    Initialize variables
  */
  const product = new Product(beatsSolo3WirelessOnEar);
  let cartQuantity: number = 0;

  await test.step('1. Go to home page', async () => {
    await homePage.goto();
  });
  await test.step('2. Click on Shop link', async () => {
    await homePage.gotoShopLink();
    //VP. SHOP page is shown
    expect.soft(await shopPage.isSelectedMenuLink(MenuItem.SHOP)).toBe(true);
  });
  await test.step('3. Click on cart icon to add product to cart', async () => {
    await shopPage.addProductToCartUsingCartIcon(product.getProductName());
    await shopPage.waitForSuccessNotifyVisible();
    expect.soft(await shopPage.getSuccessNotifyMessage()).toBe(NotifyMessage.PRODUCT_ADDED_SUCCESS);
    cartQuantity++;
    await shopPage.waitForSuccessNotifyHidden();
    //VP. Cart icon number at the top right of Shop page is increased correctly 
    expect(await shopPage.getProductQuantityInCart()).toBe(cartQuantity);
  });
  await test.step('4. Click on Cart icon at the top right of Shop page', async () => {
    await shopPage.gotoShoppingCart();
    //VP. SHOPPING CART is shown with corrected info (item name, price, quantity, total)
    let amount: string = `${product.getCurrency()}${(product.getProductPrice() * cartQuantity).toFixed(2)}`;
    expect(await shoppingCartPage.isProductDisplayed(product.getProductName())).toBe(true);
    expect(await shoppingCartPage.getProductPriceByName(product.getProductName())).toBe(`${product.getProductPaymentPrice()}`);
    expect(await shoppingCartPage.getProductQuantityByName(product.getProductName())).toBe(cartQuantity);
    expect(await shoppingCartPage.getProductSubTotalByName(product.getProductName())).toBe(amount);
    expect(await shoppingCartPage.getCartTotalAmount()).toBe(amount);
  });
  await test.step('5. Click on "Clear Shopping Cart". Step 6. Click OK', async () => {
    await alertDialog.acceptAlert(); // Handle the dialog. (Click OK).
    await shoppingCartPage.clearShoppingCart(); cartQuantity = 0;
    //VP. Pop-up "Are you sure" is shown
    expect.soft(await alertDialog.getMessage()).toBe(AlertMessage.CONFIRM_CLEAR_SHOP_CART);
    //VP. There is no more item in Shopping Cart page."
    expect.soft(await shoppingCartPage.getProductQuantityInCart()).toBe(cartQuantity);
    //VP. "YOUR SHOPPING CART IS EMPTY" is shown 
    expect.soft(await shoppingCartPage.getShoppingCartEmptyTitle()).toBe(Title.SHOPPING_CART_EMPTY);
  });
});