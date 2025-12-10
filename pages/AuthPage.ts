import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
  // Page heading
  readonly pageHeading: Locator;

  // Login form elements
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  // Register form elements
  readonly nameInput: Locator;

  // Toggle buttons
  readonly registerNowButton: Locator;
  readonly loginHereButton: Locator;

  // Toggle text
  readonly notMemberText: Locator;
  readonly alreadyMemberText: Locator;

  constructor(page: Page) {
    super(page);

    // Common elements
    this.pageHeading = page.locator('h3');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.getByRole('button', { name: 'submit' });

    // Register-specific
    this.nameInput = page.locator('input[name="name"]');

    // Toggle buttons
    this.registerNowButton = page.getByRole('button', { name: 'Register Now' });
    this.loginHereButton = page.getByRole('button', { name: 'Login Here' });

    // Toggle text
    this.notMemberText = page.getByText('Not a member yet?');
    this.alreadyMemberText = page.getByText('Already a member?');
  }

  async goto(): Promise<void> {
    await this.navigate('/register');
    await this.page.waitForLoadState('networkidle');
  }

  async switchToRegister(): Promise<void> {
    await this.registerNowButton.click();
    await this.nameInput.waitFor({ state: 'visible' });
  }

  async switchToLogin(): Promise<void> {
    await this.loginHereButton.click();
    await this.page.waitForTimeout(500);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async register(name: string, email: string, password: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getHeadingText(): Promise<string> {
    return await this.pageHeading.textContent() || '';
  }

  async isLoginFormVisible(): Promise<boolean> {
    const heading = await this.getHeadingText();
    return heading === 'Login';
  }

  async isRegisterFormVisible(): Promise<boolean> {
    const heading = await this.getHeadingText();
    return heading === 'Register';
  }
}
