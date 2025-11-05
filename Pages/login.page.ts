// import { Page, expect, Locator } from '@playwright/test';
// import { getEnvVar } from '../utils/env'; // safe getter

// export class LoginPage {
//   readonly page: Page;
//   readonly emailInput;
//   readonly passwordInput;
//   readonly loginButton;
//   readonly logoutLink;
//   readonly dashboardHeader;
//   readonly loginLink;
//   readonly errorMessage: Locator;
//   readonly emailError: Locator;
//   readonly passwordError;


//   constructor(page: Page) {
//     this.page = page;
//     this.emailInput = page.locator('#Email');
//     this.passwordInput = page.locator('#Password');
//     this.loginButton = page.locator('//button[text()="Log in"]');
//     this.logoutLink = page.locator('a[href="/logout"]');
//     this.dashboardHeader = page.locator('//img[@alt="Your store name"]');
//     this.loginLink = page.locator('//a[text()="Log in"]');
//     this.errorMessage = page.locator('.message-error');
//     this.emailError = page.locator('//span[@id="Email-error"]');
//     this.passwordError = page.locator('#Password-error');
//   }

//    async goto() {
//     const baseUrl = getEnvVar('BASE_URL'); // throws if missing
//     // ensure we have trailing slash or not based on your site; using exactly what env has
//     await this.page.goto(baseUrl);
//     await this.loginLink.click();
//   }

//   async login(email: string, password: string) {
//     await this.emailInput.fill(email);
//     await this.passwordInput.fill(password);
//     await this.loginButton.click();
//   }

//   async verifyLoginSuccess() {
//     await expect(this.dashboardHeader).toBeVisible();
//   }

//   async verifyLoginFailure() {
//     await expect(this.errorMessage).toBeVisible();
//   }

//    async verifyEmptyFieldErrors() {
//     return (await this.emailError.textContent());
//   }
//   async getEmailErrorText() {
//     return (await this.emailError.textContent());
// }
//   async getSQLLoginErrorText() {
//     return (await this.emailError.textContent());
// }
  
// }
// pages/login.page.ts
import { Page, expect, Locator } from '@playwright/test';
import { getEnvVar } from '../utils/env';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly dashboardHeader: Locator;
  readonly loginLink: Locator;
  readonly errorMessage: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('//button[text()="Log in"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.dashboardHeader = page.locator('//img[@alt="Your store name"]');
    this.loginLink = page.locator('//a[text()="Log in"]');
    this.errorMessage = page.locator('.message-error');
    this.emailError = page.locator('//span[@id="Email-error"]');
    this.passwordError = page.locator('#Password-error');
  }

  async goto() {
    const baseUrl = getEnvVar('BASE_URL');
    await this.page.goto(baseUrl);
    await this.loginLink.click();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.dashboardHeader).toBeVisible();
  }

  async verifyLoginFailure() {
    await expect(this.errorMessage).toBeVisible();
  }

  async getEmailErrorText(): Promise<string | null> {
    return await this.emailError.textContent();
  }

  async getPasswordErrorText(): Promise<string | null> {
    return await this.passwordError.textContent();
  }

  async getGeneralErrorText(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
  async getSQLLoginErrorText() {
    return (await this.emailError.textContent());
}
  async verifyEmptyFieldErrors() {
    const emailError = await this.getEmailErrorText();
    const passwordError = await this.getPasswordErrorText();
    return { emailError, passwordError };
  }
}