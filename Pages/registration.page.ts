import { Page, expect } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;

    // Locators
    readonly genderMale = '#gender-male';
    readonly genderFemale = '#gender-female';
    readonly firstName = '#FirstName';
    readonly lastName = '#LastName';
    readonly email = '#Email';
    readonly companyName = '#Company';
    readonly newsletter = '//label[@for="NewsLetterSubscriptions_1__IsActive"]';
    readonly password = '#Password';
    readonly confirmPassword = '#ConfirmPassword';
    readonly registerButton = '#register-button';
    readonly successMessage = '.result';
    readonly errorMessage = '.message-error';
    readonly fieldValidationErrors = '.field-validation-error';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToRegister() {
        await this.page.goto('http://localhost:8095/register?returnUrl=%2F');
    }

    async selectGender(gender: 'male' | 'female') {
        if (gender === 'male') {
            await this.page.click(this.genderMale);
        } else {
            await this.page.click(this.genderFemale);
        }
    }

    async fillPersonalDetails(firstName: string, lastName: string, email: string) {
        await this.page.fill(this.firstName, firstName);
        await this.page.fill(this.lastName, lastName);
        await this.page.fill(this.email, email);
    }

    async fillCompanyDetails(companyName: string) {
        await this.page.fill(this.companyName, companyName);
    }

    async toggleNewsletter(subscribe: boolean) {
        const isChecked = await this.page.isChecked(this.newsletter);
        if (subscribe !== isChecked) {
            await this.page.click(this.newsletter);
        }
    }

    async fillPasswordDetails(password: string, confirmPassword: string) {
        await this.page.fill(this.password, password);
        await this.page.fill(this.confirmPassword, confirmPassword);
    }

    async clickRegister() {
        await this.page.click(this.registerButton);
    }

    // New assertion methods - Different from login approach
    async verifyRegistrationSuccess() {
        await expect(this.page.locator(this.successMessage)).toBeVisible();
        await expect(this.page.locator(this.successMessage)).toContainText('Your registration completed');
    }

    async verifyErrorMessageContains(text: string) {
        await expect(this.page.locator(this.errorMessage)).toContainText(text);
    }

    async verifyFieldErrorCount(expectedCount: number) {
        const errors = this.page.locator(this.fieldValidationErrors);
        await expect(errors).toHaveCount(expectedCount);
    }

    async verifySpecificFieldError(field: string, expectedError: string) {
        let fieldLocator: string;
        
        switch(field) {
            case 'firstName':
                fieldLocator = '#FirstName-error';
                break;
            case 'lastName':
                fieldLocator = '#LastName-error';
                break;
            case 'email':
                fieldLocator = '#Email-error';
                break;
            case 'password':
                fieldLocator = '#Password-error';
                break;
            case 'confirmPassword':
                fieldLocator = '#ConfirmPassword-error';
                break;
            default:
                throw new Error(`Unknown field: ${field}`);
        }
        
        await expect(this.page.locator(fieldLocator)).toHaveText(expectedError);
    }

    async verifyUrlContains(text: string) {
        await expect(this.page).toHaveURL(new RegExp(text));
    }
}