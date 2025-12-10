import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';
import { VALID_LOGIN_DATA, generateUniqueEmail } from './test-data/auth.data';

test.describe('Auth Page - Happy Path Tests', () => {
    let authPage: AuthPage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        await authPage.goto();
    });

    test.describe('Login Form - Happy Path', () => {
        test('should display login form by default', async () => {
            await expect(authPage.pageHeading).toHaveText('Login');
        });

        test('should display email input field', async () => {
            await expect(authPage.emailInput).toBeVisible();
        });

        test('should display password input field', async () => {
            await expect(authPage.passwordInput).toBeVisible();
        });

        test('should display submit button', async () => {
            await expect(authPage.submitButton).toBeVisible();
        });

        test('should allow user to enter email', async () => {
            await authPage.emailInput.fill('test@example.com');
            await expect(authPage.emailInput).toHaveValue('test@example.com');
        });

        test('should allow user to enter password', async () => {
            await authPage.passwordInput.fill('password123');
            await expect(authPage.passwordInput).toHaveValue('password123');
        });

        test('should display "Not a member yet?" text with Register Now button', async () => {
            await expect(authPage.notMemberText).toBeVisible();
            await expect(authPage.registerNowButton).toBeVisible();
        });
    });

    test.describe('Register Form - Happy Path', () => {
        test.beforeEach(async () => {
            await authPage.switchToRegister();
        });

        test('should switch to register form when clicking Register Now', async () => {
            await expect(authPage.pageHeading).toHaveText('Register');
        });

        test('should display name input field', async () => {
            await expect(authPage.nameInput).toBeVisible();
        });

        test('should display email input field', async () => {
            await expect(authPage.emailInput).toBeVisible();
        });

        test('should display password input field', async () => {
            await expect(authPage.passwordInput).toBeVisible();
        });

        test('should display submit button', async () => {
            await expect(authPage.submitButton).toBeVisible();
        });

        test('should allow user to enter name', async () => {
            await authPage.nameInput.fill('John Doe');
            await expect(authPage.nameInput).toHaveValue('John Doe');
        });

        test('should allow user to enter email', async () => {
            await authPage.emailInput.fill('john@example.com');
            await expect(authPage.emailInput).toHaveValue('john@example.com');
        });

        test('should allow user to enter password', async () => {
            await authPage.passwordInput.fill('securePassword123');
            await expect(authPage.passwordInput).toHaveValue('securePassword123');
        });

        test('should display "Already a member?" text with Login Here button', async () => {
            await expect(authPage.alreadyMemberText).toBeVisible();
            await expect(authPage.loginHereButton).toBeVisible();
        });

        test('should fill all register fields successfully', async () => {
            await authPage.nameInput.fill('John Doe');
            await authPage.emailInput.fill('john@example.com');
            await authPage.passwordInput.fill('securePassword123');

            await expect(authPage.nameInput).toHaveValue('John Doe');
            await expect(authPage.emailInput).toHaveValue('john@example.com');
            await expect(authPage.passwordInput).toHaveValue('securePassword123');
        });
    });

    test.describe('Form Toggle - Happy Path', () => {
        test('should switch from Login to Register form', async () => {
            await expect(authPage.pageHeading).toHaveText('Login');
            await authPage.switchToRegister();
            await expect(authPage.pageHeading).toHaveText('Register');
        });

        test('should switch from Register back to Login form', async () => {
            await authPage.switchToRegister();
            await expect(authPage.pageHeading).toHaveText('Register');
            await authPage.switchToLogin();
            await expect(authPage.pageHeading).toHaveText('Login');
        });

        test('should show name field only in Register form', async () => {
            await expect(authPage.nameInput).not.toBeVisible();
            await authPage.switchToRegister();
            await expect(authPage.nameInput).toBeVisible();
        });
    });

    test.describe('Successful Login - Redirect to Dashboard', () => {
        test('should redirect to root URL (/) after successful login', async ({ page }) => {
            await authPage.login(VALID_LOGIN_DATA.email, VALID_LOGIN_DATA.password);

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
            await expect(page).toHaveURL('https://jobtrack4u.onrender.com/');
        });

        test('should display dashboard heading after successful login', async ({ page }) => {
            await authPage.login(VALID_LOGIN_DATA.email, VALID_LOGIN_DATA.password);

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
        });

        test('should display logout button after successful login', async ({ page }) => {
            await authPage.login(VALID_LOGIN_DATA.email, VALID_LOGIN_DATA.password);

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
            await expect(dashboardPage.logoutButton).toBeVisible();
        });

        test('should display stats cards after successful login', async ({ page }) => {
            await authPage.login(VALID_LOGIN_DATA.email, VALID_LOGIN_DATA.password);

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
            await expect(dashboardPage.pendingApplications).toBeVisible();
            await expect(dashboardPage.interviewsScheduled).toBeVisible();
            await expect(dashboardPage.jobsDeclined).toBeVisible();
        });

        test('should display Monthly Applications chart after successful login', async ({ page }) => {
            await authPage.login(VALID_LOGIN_DATA.email, VALID_LOGIN_DATA.password);

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
            await expect(dashboardPage.monthlyApplicationsHeading).toBeVisible();
        });

        test('should display navigation links after successful login', async ({ page }) => {
            await authPage.login(VALID_LOGIN_DATA.email, VALID_LOGIN_DATA.password);

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
            await expect(dashboardPage.statsLink).toBeVisible();
            await expect(dashboardPage.allJobsLink).toBeVisible();
            await expect(dashboardPage.addJobLink).toBeVisible();
            await expect(dashboardPage.profileLink).toBeVisible();
        });
    });

    test.describe('Successful Registration - Redirect to Dashboard', () => {
        test('should redirect to root URL (/) after successful registration', async ({ page }) => {
            await authPage.switchToRegister();

            const uniqueEmail = generateUniqueEmail();
            await authPage.register('Test User', uniqueEmail, 'password123');

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
            await expect(page).toHaveURL('https://jobtrack4u.onrender.com/');
        });

        test('should display dashboard heading after successful registration', async ({ page }) => {
            await authPage.switchToRegister();

            const uniqueEmail = generateUniqueEmail();
            await authPage.register('Test User', uniqueEmail, 'password123');

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
        });

        test('should display logout button after successful registration', async ({ page }) => {
            await authPage.switchToRegister();

            const uniqueEmail = generateUniqueEmail();
            await authPage.register('Test User', uniqueEmail, 'password123');

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
            await expect(dashboardPage.logoutButton).toBeVisible();
        });

        test('should display stats cards after successful registration', async ({ page }) => {
            await authPage.switchToRegister();

            const uniqueEmail = generateUniqueEmail();
            await authPage.register('Test User', uniqueEmail, 'password123');

            const dashboardPage = new DashboardPage(page);
            await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
            await expect(dashboardPage.pendingApplications).toBeVisible();
            await expect(dashboardPage.interviewsScheduled).toBeVisible();
            await expect(dashboardPage.jobsDeclined).toBeVisible();
        });
    });
});
