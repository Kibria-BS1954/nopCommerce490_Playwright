import { Page, expect, Locator } from '@playwright/test';
import ENV from '../utils/env';

export class RegistrationPage {
  readonly page: Page;

  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly companyName: Locator;
  readonly newsletter: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly fieldValidationErrors: Locator;

  constructor(page: Page) {
    this.page = page;
    this.genderMale = page.locator('#gender-male');
    this.genderFemale = page.locator('#gender-female');
    this.firstName = page.locator('#FirstName');
    this.lastName = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.companyName = page.locator('#Company');
    this.newsletter = page.locator('//label[@for="NewsLetterSubscriptions_1__IsActive"]');
    this.password = page.locator('#Password');
    this.confirmPassword = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.successMessage = page.locator('.result');
    this.errorMessage = page.locator('.message-error');
    this.fieldValidationErrors = page.locator('.field-validation-error');
  }

  async goto() {
    const baseUrl = ENV.BASE_URL || 'http://localhost:8095';
    // const baseUrl = ENV.BASE_URL;
    await this.page.goto(`${baseUrl}/register?returnUrl=%2F`);
  }

  async selectGender(gender: 'male' | 'female') {
    const target = gender === 'male' ? this.genderMale : this.genderFemale;
    await target.check();
  }

  async fillPersonalDetails(firstName: string, lastName: string, email: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
  }

  async fillCompanyDetails(companyName: string) {
    await this.companyName.fill(companyName);
  }

  async setNewsletter(subscribe: boolean) {
    if (subscribe) {
      await this.newsletter.check();
    } else {
      await this.newsletter.uncheck();
    }
  }

  async fillPasswordDetails(password: string, confirmPassword: string) {
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
  }

  async submit() {
    await this.registerButton.click();
  }

  async verifyRegistrationSuccess() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText('Your registration completed');
  }

  async verifyErrorMessageContains(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }

  async verifyFieldErrorCount(expectedCount: number) {
    await expect(this.fieldValidationErrors).toHaveCount(expectedCount);
  }

  async verifySpecificFieldError(field: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword', expectedError: string) {
    const selectors: Record<typeof field, string> = {
      firstName: '#FirstName-error',
      lastName: '#LastName-error',
      email: '#Email-error',
      password: '#Password-error',
      confirmPassword: '#ConfirmPassword-error'
    };

    await expect(this.page.locator(selectors[field])).toHaveText(expectedError);
  }

  async verifyUrlContains(fragment: string) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }
}