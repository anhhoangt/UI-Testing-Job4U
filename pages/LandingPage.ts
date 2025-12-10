import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LandingPage extends BasePage {
    // Locators
    readonly mainHeading: Locator;
    readonly featuresHeading: Locator;
    readonly loginRegisterButton: Locator;
    readonly pageDescription: Locator;

    // Feature sections
    readonly responsiveSearchFeature: Locator;
    readonly dynamicChartsFeature: Locator;

    constructor(page: Page) {
        super(page);

        // Main elements
        this.mainHeading = page.getByRole('heading', { name: 'job tracking app' });
        this.featuresHeading = page.getByRole('heading', { name: 'Interesting Features:' });
        this.loginRegisterButton = page.getByRole('link', { name: 'Login/Register' });

        // Description text
        this.pageDescription = page.getByText(/Whether you're actively searching/);

        // Feature sections - using role-based selectors to avoid strict mode violations
        this.responsiveSearchFeature = page.getByRole('heading', { name: 'Responsive Search Engine' });
        this.dynamicChartsFeature = page.getByRole('heading', { name: 'Dynamic Charts' });
    }

    async goto(): Promise<void> {
        await this.navigate('/');
        await this.page.waitForLoadState('networkidle');
    }

    async clickLoginRegister(): Promise<void> {
        await this.loginRegisterButton.click();
    }

    async isMainHeadingVisible(): Promise<boolean> {
        return await this.mainHeading.isVisible();
    }

    async isFeaturesHeadingVisible(): Promise<boolean> {
        return await this.featuresHeading.isVisible();
    }

    async isLoginRegisterButtonVisible(): Promise<boolean> {
        return await this.loginRegisterButton.isVisible();
    }

    async getMainHeadingText(): Promise<string> {
        return await this.mainHeading.textContent() || '';
    }

    async getFeaturesHeadingText(): Promise<string> {
        return await this.featuresHeading.textContent() || '';
    }

    async isResponsiveSearchFeatureVisible(): Promise<boolean> {
        return await this.responsiveSearchFeature.isVisible();
    }

    async isDynamicChartsFeatureVisible(): Promise<boolean> {
        return await this.dynamicChartsFeature.isVisible();
    }
}
