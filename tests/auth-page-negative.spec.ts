import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import {
    INVALID_EMAILS,
    INVALID_PASSWORDS,
    INVALID_NAMES,
    MISSING_FIELDS,
    WRONG_CREDENTIALS,
    ERROR_MESSAGES,
} from './test-data/auth.data';

test.describe('Auth Page - Negative Path Tests', () => {
    let authPage: AuthPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        await authPage.goto();
    });

    test.describe('Login Form - Missing Fields', () => {
        test('should not login with missing email', async ({ page }) => {
            const { email, password } = MISSING_FIELDS.login.missingEmail;
            await authPage.login(email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not login with missing password', async ({ page }) => {
            const { email, password } = MISSING_FIELDS.login.missingPassword;
            await authPage.login(email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not login with all fields empty', async ({ page }) => {
            const { email, password } = MISSING_FIELDS.login.missingBoth;
            await authPage.login(email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });
    });

    test.describe('Login Form - Invalid Email Format', () => {
        test('should not login with email missing @ symbol', async ({ page }) => {
            await authPage.login(INVALID_EMAILS.missingAtSymbol, 'password123');

            await expect(page).toHaveURL(/register/);
        });

        test('should not login with email missing domain', async ({ page }) => {
            await authPage.login(INVALID_EMAILS.missingDomain, 'password123');

            await expect(page).toHaveURL(/register/);
        });

        test('should not login with email missing username', async ({ page }) => {
            await authPage.login(INVALID_EMAILS.missingUsername, 'password123');

            await expect(page).toHaveURL(/register/);
        });

        test('should not login with email having invalid domain', async ({ page }) => {
            await authPage.login(INVALID_EMAILS.invalidDomain, 'password123');

            await expect(page).toHaveURL(/register/);
        });

        test('should not login with email having double dots', async ({ page }) => {
            await authPage.login(INVALID_EMAILS.doubleDot, 'password123');

            await expect(page).toHaveURL(/register/);
        });

        test('should not login with email having spaces', async ({ page }) => {
            await authPage.login(INVALID_EMAILS.spacesInEmail, 'password123');

            await expect(page).toHaveURL(/register/);
        });
    });

    test.describe('Login Form - Wrong Credentials', () => {
        test('should stay on register page with non-existent email', async ({ page }) => {
            const { email, password } = WRONG_CREDENTIALS.wrongEmail;
            await authPage.login(email, password);
            await page.waitForTimeout(2000);

            // Should stay on register page (not redirect to dashboard)
            await expect(page).toHaveURL(/register/);
            // Login form should still be visible
            await expect(authPage.pageHeading).toHaveText('Login');
        });

        test('should stay on register page with wrong password', async ({ page }) => {
            const { email, password } = WRONG_CREDENTIALS.wrongPassword;
            await authPage.login(email, password);
            await page.waitForTimeout(2000);

            // Should stay on register page (not redirect to dashboard)
            await expect(page).toHaveURL(/register/);
            // Login form should still be visible
            await expect(authPage.pageHeading).toHaveText('Login');
        });

        test('should stay on register page with both wrong email and password', async ({ page }) => {
            const { email, password } = WRONG_CREDENTIALS.bothWrong;
            await authPage.login(email, password);
            await page.waitForTimeout(2000);

            // Should stay on register page (not redirect to dashboard)
            await expect(page).toHaveURL(/register/);
            // Login form should still be visible
            await expect(authPage.pageHeading).toHaveText('Login');
        });
    });

    test.describe('Login Form - Password Field Security', () => {
        test('should mask password input (type="password")', async () => {
            await expect(authPage.passwordInput).toHaveAttribute('type', 'password');
        });

        test('should not display password as plain text', async () => {
            await authPage.passwordInput.fill('secretPassword123');

            const inputType = await authPage.passwordInput.getAttribute('type');
            expect(inputType).toBe('password');
            expect(inputType).not.toBe('text');
        });
    });

    test.describe('Register Form - Missing Fields', () => {
        test.beforeEach(async () => {
            await authPage.switchToRegister();
        });

        test('should not register with missing name', async ({ page }) => {
            const { name, email, password } = MISSING_FIELDS.register.missingName;
            await authPage.register(name, email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not register with missing email', async ({ page }) => {
            const { name, email, password } = MISSING_FIELDS.register.missingEmail;
            await authPage.register(name, email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not register with missing password', async ({ page }) => {
            const { name, email, password } = MISSING_FIELDS.register.missingPassword;
            await authPage.register(name, email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not register with all fields empty', async ({ page }) => {
            const { name, email, password } = MISSING_FIELDS.register.missingAll;
            await authPage.register(name, email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not register with missing name and email', async ({ page }) => {
            const { name, email, password } = MISSING_FIELDS.register.missingNameAndEmail;
            await authPage.register(name, email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not register with missing name and password', async ({ page }) => {
            const { name, email, password } = MISSING_FIELDS.register.missingNameAndPassword;
            await authPage.register(name, email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not register with missing email and password', async ({ page }) => {
            const { name, email, password } = MISSING_FIELDS.register.missingEmailAndPassword;
            await authPage.register(name, email, password);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });
    });

    test.describe('Register Form - Invalid Email Format', () => {
        test.beforeEach(async () => {
            await authPage.switchToRegister();
        });

        test('should not register with email missing @ symbol', async ({ page }) => {
            await authPage.register('John Doe', INVALID_EMAILS.missingAtSymbol, 'password123');

            await expect(page).toHaveURL(/register/);
        });

        test('should not register with email missing domain', async ({ page }) => {
            await authPage.register('John Doe', INVALID_EMAILS.missingDomain, 'password123');

            await expect(page).toHaveURL(/register/);
        });

        test('should not register with email missing username', async ({ page }) => {
            await authPage.register('John Doe', INVALID_EMAILS.missingUsername, 'password123');

            await expect(page).toHaveURL(/register/);
        });

        test('should not register with email having invalid domain', async ({ page }) => {
            await authPage.register('John Doe', INVALID_EMAILS.invalidDomain, 'password123');

            await expect(page).toHaveURL(/register/);
        });

        test('should not register with email having double dots', async ({ page }) => {
            await authPage.register('John Doe', INVALID_EMAILS.doubleDot, 'password123');

            await expect(page).toHaveURL(/register/);
        });
    });

    test.describe('Register Form - Invalid Name', () => {
        test.beforeEach(async () => {
            await authPage.switchToRegister();
        });

        test('should not register with empty name', async ({ page }) => {
            await authPage.register(INVALID_NAMES.empty, 'test@example.com', 'password123');

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not register with spaces only as name', async ({ page }) => {
            await authPage.register(INVALID_NAMES.spacesOnly, 'test@example.com', 'password123');

            await expect(page).toHaveURL(/register/);
        });
    });

    test.describe('Register Form - Invalid Password', () => {
        test.beforeEach(async () => {
            await authPage.switchToRegister();
        });

        test('should not register with empty password', async ({ page }) => {
            await authPage.register('John Doe', 'test@example.com', INVALID_PASSWORDS.empty);

            await expect(page).toHaveURL(/register/);
            await expect(page.getByText(ERROR_MESSAGES.missingFields)).toBeVisible({ timeout: 5000 });
        });

        test('should not register with too short password', async ({ page }) => {
            await authPage.register('John Doe', 'test@example.com', INVALID_PASSWORDS.tooShort);

            await expect(page).toHaveURL(/register/);
        });

        test('should not register with spaces only as password', async ({ page }) => {
            await authPage.register('John Doe', 'test@example.com', INVALID_PASSWORDS.spacesOnly);

            await expect(page).toHaveURL(/register/);
        });
    });

    test.describe('Register Form - Password Field Security', () => {
        test.beforeEach(async () => {
            await authPage.switchToRegister();
        });

        test('should mask password input (type="password")', async () => {
            await expect(authPage.passwordInput).toHaveAttribute('type', 'password');
        });

        test('should not display password as plain text in register form', async () => {
            await authPage.passwordInput.fill('secretPassword123');

            const inputType = await authPage.passwordInput.getAttribute('type');
            expect(inputType).toBe('password');
            expect(inputType).not.toBe('text');
        });
    });

    test.describe('Register Form - Duplicate Email', () => {
        test.beforeEach(async () => {
            await authPage.switchToRegister();
        });

        test('should not register with already registered email', async ({ page }) => {
            // Using a known existing email
            await authPage.register('New User', 'testuser@example.com', 'password123');

            await expect(page).toHaveURL(/register/);
            const errorMessage = page.getByText(/already|exists|in use|duplicate/i);
            await expect(errorMessage).toBeVisible({ timeout: 5000 });
        });
    });

    test.describe('Input Field Validation', () => {
        test('should have email input with type="email" in login form', async () => {
            await expect(authPage.emailInput).toHaveAttribute('type', 'email');
        });

        test('should have password input with type="password" in login form', async () => {
            await expect(authPage.passwordInput).toHaveAttribute('type', 'password');
        });

        test('should have email input with type="email" in register form', async () => {
            await authPage.switchToRegister();
            await expect(authPage.emailInput).toHaveAttribute('type', 'email');
        });

        test('should have password input with type="password" in register form', async () => {
            await authPage.switchToRegister();
            await expect(authPage.passwordInput).toHaveAttribute('type', 'password');
        });

        test('should have name input with type="text" in register form', async () => {
            await authPage.switchToRegister();
            await expect(authPage.nameInput).toHaveAttribute('type', 'text');
        });
    });
});
