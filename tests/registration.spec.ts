import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../Pages/registration.page';
import { RegistrationData } from '../testData/registrationData';

test.describe('Registration Tests - nopCommerce', () => {
    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await registrationPage.navigateToRegister();
    });

    // POSITIVE SCENARIOS
    test('Successful registration with all valid data', async () => {
        const userData = RegistrationData.generateValidUser();
        
        await test.step('Fill registration form with valid data', async () => {
            await registrationPage.selectGender(userData.gender);
            await registrationPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.email);
            await registrationPage.fillCompanyDetails(userData.companyName);
            await registrationPage.toggleNewsletter(userData.newsletter);
            await registrationPage.fillPasswordDetails(userData.password, userData.confirmPassword);
            await registrationPage.clickRegister();
        });

        await test.step('Verify successful registration', async () => {
            await registrationPage.verifyRegistrationSuccess();
            await registrationPage.verifyUrlContains('registerresult');
        });
    });

    test('Successful registration with only required fields', async () => {
        const userData = RegistrationData.generateValidUser();
        
        await test.step('Fill only required fields', async () => {
            await registrationPage.selectGender(userData.gender);
            await registrationPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.email);
            await registrationPage.fillPasswordDetails(userData.password, userData.confirmPassword);
            await registrationPage.clickRegister();
        });

        await test.step('Verify registration success with minimal data', async () => {
            await registrationPage.verifyRegistrationSuccess();
        });
    });

    // NEGATIVE SCENARIOS
    test('Registration with empty required fields should show validation errors', async () => {
        const userData = RegistrationData.generateEmptyFields();
        
        await test.step('Submit form with empty required fields', async () => {
            await registrationPage.selectGender(userData.gender);
            await registrationPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.email);
            await registrationPage.fillPasswordDetails(userData.password, userData.confirmPassword);
            await registrationPage.clickRegister();
        });

        await test.step('Verify field validation errors', async () => {
            await registrationPage.verifyFieldErrorCount(4); // First name, last name, email, password, confirm password
            await registrationPage.verifySpecificFieldError('firstName', 'First name is required.');
            await registrationPage.verifySpecificFieldError('lastName', 'Last name is required.');
            await registrationPage.verifySpecificFieldError('email', 'Email is required.');
        });
    });

    test('Registration with invalid email format', async () => {
        const userData = RegistrationData.generateInvalidEmail();
        
        await test.step('Submit form with invalid email', async () => {
            await registrationPage.selectGender(userData.gender);
            await registrationPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.email);
            await registrationPage.fillPasswordDetails(userData.password, userData.confirmPassword);
            await registrationPage.clickRegister();
        });

        await test.step('Verify email validation error', async () => {
            await registrationPage.verifySpecificFieldError('email', 'Please enter a valid email address.');
        });
    });

    test('Registration with password mismatch', async () => {
        const userData = RegistrationData.generatePasswordMismatch();
        
        await test.step('Submit form with mismatched passwords', async () => {
            await registrationPage.selectGender(userData.gender);
            await registrationPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.email);
            await registrationPage.fillPasswordDetails(userData.password, userData.confirmPassword);
            await registrationPage.clickRegister();
        });

        await test.step('Verify password mismatch error', async () => {
            await registrationPage.verifySpecificFieldError('confirmPassword', 'The password and confirmation password do not match.');
        });
    });

    test('Registration with weak password', async () => {
        const userData = RegistrationData.generateWeakPassword();
        
        await test.step('Submit form with weak password', async () => {
            await registrationPage.selectGender(userData.gender);
            await registrationPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.email);
            await registrationPage.fillPasswordDetails(userData.password, userData.confirmPassword);
            await registrationPage.clickRegister();
        });

        await test.step('Verify password strength requirements', async () => {
            await registrationPage.verifySpecificFieldError('password', 'Password must meet the following rules: must have at least 6 characters and not greater than 64 characters');
            await registrationPage.verifySpecificFieldError('password', 'Password must meet the following rules: must have at least 6 characters and not greater than 64 characters');
        });
    });

    // EDGE CASE SCENARIOS
    test('Registration with very long names', async () => {
        const userData = RegistrationData.generateLongNames();
        
        await test.step('Submit form with very long names', async () => {
            await registrationPage.selectGender(userData.gender);
            await registrationPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.email);
            await registrationPage.fillCompanyDetails(userData.companyName);
            await registrationPage.fillPasswordDetails(userData.password, userData.confirmPassword);
            await registrationPage.clickRegister();
        });

        await test.step('Verify registration handles long inputs', async () => {
            await registrationPage.verifyRegistrationSuccess();
        });
    });

    test('Registration with existing email', async () => {
        const userData = RegistrationData.generateValidUser();
        // Use a known existing email
        userData.email = 'admin@yourstore.com';
        
        await test.step('Try to register with existing email', async () => {
            await registrationPage.selectGender(userData.gender);
            await registrationPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.email);
            await registrationPage.fillPasswordDetails(userData.password, userData.confirmPassword);
            await registrationPage.clickRegister();
        });

        await test.step('Verify duplicate email error', async () => {
            await registrationPage.verifyErrorMessageContains('The specified email already exists');
        });
    });
});