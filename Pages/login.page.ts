import { Page, expect, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput;
  readonly passwordInput;
  readonly loginButton;
  readonly logoutLink;
  readonly dashboardHeader;
  readonly loginLink;
  readonly errorMessage: Locator;
  readonly emailError: Locator;
  readonly passwordError;


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
    await this.page.goto('http://localhost:8095/');
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

   async verifyEmptyFieldErrors() {
    return (await this.emailError.textContent());
  }
  async getEmailErrorText() {
    return (await this.emailError.textContent());
}
  async getSQLLoginErrorText() {
    return (await this.emailError.textContent());
}
  
}
