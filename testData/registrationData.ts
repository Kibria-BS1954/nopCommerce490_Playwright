import { faker } from '@faker-js/faker';

export class RegistrationData {
    static generateValidUser() {
        return {
            gender: faker.helpers.arrayElement(['male', 'female']),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            companyName: faker.company.name(),
            newsletter: faker.datatype.boolean(),
            password: 'Test@123456',
            confirmPassword: 'Test@123456'
        };
    }

    static generateInvalidEmail() {
        const user = this.generateValidUser();
        return {
            ...user,
            email: 'invalid-email'
        };
    }

    static generatePasswordMismatch() {
        const user = this.generateValidUser();
        return {
            ...user,
            confirmPassword: 'Different@123456'
        };
    }

    static generateEmptyFields() {
        return {
            gender: 'male' as const,
            firstName: '',
            lastName: '',
            email: '',
            companyName: '',
            newsletter: false,
            password: '',
            confirmPassword: ''
        };
    }

    static generateWeakPassword() {
        const user = this.generateValidUser();
        return {
            ...user,
            password: '123',
            confirmPassword: '123'
        };
    }

    static generateLongNames() {
        return {
            gender: 'male' as const,
            firstName: faker.string.alpha(100), // Very long first name
            lastName: faker.string.alpha(100),  // Very long last name
            email: faker.internet.email(),
            companyName: faker.string.alpha(200),
            newsletter: false,
            password: 'Test@123456',
            confirmPassword: 'Test@123456'
        };
    }
}