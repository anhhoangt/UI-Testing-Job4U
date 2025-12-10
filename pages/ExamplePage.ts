import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExamplePage extends BasePage {
  readonly getStartedLink: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.heading = page.getByRole('heading', { name: 'Installation' });
  }

  async goto(): Promise<void> {
    await this.navigate('https://playwright.dev/');
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink.click();
  }
}
