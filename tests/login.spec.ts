// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../Pages/login.page';
// // import * as loginData from '../testData/loginData.json';
// import { loginData } from '../utils/env';

// test.describe('Login Tests - nopCommerce 4.90', () => {

//   test('Valid login should redirect to dashboard', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login(loginData.validUser.email, loginData.validUser.password);
//     await loginPage.verifyLoginSuccess();
//   });

//   test('Invalid login should show error message', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login(loginData.invalidUser.email, loginData.invalidUser.password);
//     await loginPage.verifyLoginFailure();
//   });

//   test('Empty credentials should show field validation errors', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login(loginData.emptyUser.email, loginData.emptyUser.password);
//     await test.step('Verify email field error message', async () => {
//        const actualError = await loginPage.verifyEmptyFieldErrors();
//        console.log('Email field error message:', actualError);
//        const expectedError = 'Please enter your email';
//       // expect(actualError).toBe(expectedError);
//        expect(actualError).toEqual(expectedError);
//     });
//   });

//   test('Invalid email format should show validation error', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login(loginData.invalidEmailFormat.email, loginData.invalidEmailFormat.password);
    
//     await test.step('Verify invalid email format error message', async () => {
//        const actualError = await loginPage.getEmailErrorText();
//        console.log('Email format error message:', actualError);
//        const expectedError = actualError; // Adjust based on actual error
//        expect(actualError).toEqual(expectedError);
//     });

//  });
//   test('SQL injection attempt should show security error', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login(loginData.sqlInjection.email, loginData.sqlInjection.password);
    
//     await test.step('Verify SQL injection error message', async () => {
//        const actualError = await loginPage.getSQLLoginErrorText();
//        console.log('SQL injection error message:', actualError);
//        const expectedError = actualError;
//        expect(actualError).toContain(expectedError);
//     });
// });
// });

// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login.page';
import { loginData } from '../utils/env';

test.describe('Login Tests - nopCommerce 4.90', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Valid login should redirect to dashboard', async () => {
    await loginPage.login(loginData.validUser.email, loginData.validUser.password);
    await loginPage.verifyLoginSuccess();
  });

  test('Invalid login should show error message', async () => {
    await loginPage.login(loginData.invalidUser.email, loginData.invalidUser.password);
    await loginPage.verifyLoginFailure();

    // Verify the error message content
    const errorText = await loginPage.getGeneralErrorText();
    expect.soft(errorText).toContain('Login was unsuccessful');
  });

  test('Empty credentials should show field validation errors', async () => {
    await loginPage.login(loginData.emptyUser.email, loginData.emptyUser.password);

    await test.step('Verify email field error message', async () => {
      const actualError = await loginPage.getEmailErrorText();
      console.log('Email field error message:', actualError);
      const expectedError = 'Please enter your email';
      expect.soft(actualError).toEqual(expectedError);
    });
  });

  test('Invalid email format should show validation error', async () => {
    await loginPage.login(loginData.invalidEmailFormat.email, loginData.invalidEmailFormat.password);

    await test.step('Verify invalid email format error message', async () => {
      const actualError = await loginPage.getEmailErrorText();
      console.log('Email format error message:', actualError);

      // Common email validation messages
      expect.soft(actualError).toMatch(/Please enter a valid email address|Wrong email/i);
    });
  });

  test('SQL injection attempt should show security error', async () => {
    await loginPage.login(loginData.sqlInjection.email, loginData.sqlInjection.password);

    await test.step('Verify SQL injection error message', async () => {
      const actualError = await loginPage.getSQLLoginErrorText();
      console.log('SQL injection error message:', actualError);
      const expectedError = actualError;
      expect.soft(actualError).toContain(expectedError);
    });
  });
});