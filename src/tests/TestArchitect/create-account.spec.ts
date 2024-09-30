import { Account } from '../../modal/account';
import { MailinatorHomePage } from '../../pages/Mailinator/home.page';
import { PublicMessagePage } from '../../pages/Mailinator/public.message.page';
import { HomePage } from '../../pages/TestArchitect/home.page';
import { MyAccountPage } from '../../pages/TestArchitect/my.account.page';
import { expect, test } from '../base.test';

/*
  Import test data
*/
import { AlertMessage, RGBColor } from '../../common/utils/const';

test('TC002 - Verify creating and activating an account', async ({ context, page }) => {
  /*
    Initialize TestArchitect PO
  */
  let homePage = new HomePage(page);
  let myAccountPage = new MyAccountPage(page);
  /*
    Initialize Mailinator PO
  */
  let mailinatorHomePage = new MailinatorHomePage(page);
  let publicMessagePage = new PublicMessagePage(page);
  /*
    Initialize variables
  */
  const account = new Account();

  await test.step('1. Go to home page', async () => {
    await homePage.goto();
  });
  await test.step('2. Click Log in / Sign up in the top page', async () => {
    await homePage.gotoMyAccount();
  });
  await test.step('3. Enter email in Register email textbox', async () => {
    await myAccountPage.registerAccount(account.getEmail());
    //VP. My Account page displays with the correct email info
    expect(await myAccountPage.getCurrentAccount()).toBe(account.getUsername());
    expect(await myAccountPage.getCurrentAccountWelcome()).toBe(account.getUsername());
  });
  await test.step('4. Close Shopping page window\n5. Go to mail server page', async () => {
    await mailinatorHomePage.gotoMailServer();
  });
  await test.step('6. Click on "Public Inbox" on the top right of mail server page', async () => {
    await mailinatorHomePage.clickOnPublicInboxLink();
  });
  await test.step('7. Enter email at step 3 to textbox at the top right of the "Public Messages" page', async () => {
    await publicMessagePage.enterEmailToInboxField(account.getUsername());
    await publicMessagePage.clickOnGoButton();
  });
  await test.step('8. Click on email with subject contained "Sample Website account has been created!"', async () => {
    await publicMessagePage.openCreatedAccountEmail(account);
  });
  await test.step('9. Find and click on hyperlink "Click here to set your new password." in the email content', async () => {
    await publicMessagePage.clickOnSetPasswordLink();
    // Handle switch to new tab
    const [newPage] = await Promise.all([context.waitForEvent('page'),])
    homePage = new HomePage(newPage);
    myAccountPage = new MyAccountPage(newPage);
  });
  await test.step('10. Enter new password and confirm password', async () => {
    await myAccountPage.enterNewPassword(account.getPassword());
    await myAccountPage.enterConfirmPassword(account.getPassword());
  });
  await test.step('11. Click Save button', async () => {
    await myAccountPage.clickOnSaveNewPasswordButton();
    //VP."Message appear: Your password has been reset successfully.
    expect(await myAccountPage.getAlertMessage()).toBe(AlertMessage.RESET_PASSWORD_SUCCESS);
    //VP. Background color is green (means successful)"
    expect(await myAccountPage.getBackgroundAlertMessage()).toBe(RGBColor.GREEN);
  });
  await test.step('12. Enter email and password to login to shopping page', async () => {
    await myAccountPage.enterUsername(account.getEmail());
    await myAccountPage.enterPassword(account.getPassword());
    await myAccountPage.clickOnLoginButton();
    //VP. MY ACCOUNT page is displayed with corrected user name and email
    expect(await myAccountPage.getCurrentAccount()).toBe(account.getUsername());
    expect(await myAccountPage.getCurrentAccountWelcome()).toBe(account.getUsername());
  });

});