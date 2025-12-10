import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Landing Page Tests', () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto();
  });

  test.describe('Page Load and Title', () => {
    test('should load the landing page successfully', async ({ page }) => {
      await expect(page).toHaveURL(/jobtrack4u/);
    });

    test('should display correct page title', async ({ page }) => {
      await expect(page).toHaveTitle('JobTrack4U');
    });
  });

  test.describe('Main Heading Section', () => {
    test('should display the main heading "job tracking app"', async () => {
      await expect(landingPage.mainHeading).toBeVisible();
    });

    test('should have correct main heading text', async () => {
      await expect(landingPage.mainHeading).toHaveText('job tracking app');
    });
  });

  test.describe('Page Description', () => {
    test('should display the page description', async () => {
      await expect(landingPage.pageDescription).toBeVisible();
    });

    test('should contain description about job search organization', async ({ page }) => {
      const description = page.getByText(/stay organized and motivated/);
      await expect(description).toBeVisible();
    });

    test('should contain call-to-action text', async ({ page }) => {
      const ctaText = page.getByText(/Sign up for JobTrack4U today/);
      await expect(ctaText).toBeVisible();
    });
  });

  test.describe('Login/Register Button', () => {
    test('should display Login/Register button', async () => {
      await expect(landingPage.loginRegisterButton).toBeVisible();
    });

    test('should have correct button text', async () => {
      await expect(landingPage.loginRegisterButton).toHaveText('Login/Register');
    });

    test('should be clickable and navigate to login page', async ({ page }) => {
      await landingPage.clickLoginRegister();
      await expect(page).toHaveURL(/register|login/);
    });
  });

  test.describe('Features Section', () => {
    test('should display "Interesting Features:" heading', async () => {
      await expect(landingPage.featuresHeading).toBeVisible();
    });

    test('should have correct features heading text', async () => {
      await expect(landingPage.featuresHeading).toHaveText('Interesting Features:');
    });

    test('should display Responsive Search Engine feature', async () => {
      await expect(landingPage.responsiveSearchFeature).toBeVisible();
    });

    test('should display Dynamic Charts feature', async () => {
      await expect(landingPage.dynamicChartsFeature).toBeVisible();
    });

    test('should display search feature description', async ({ page }) => {
      const searchDescription = page.getByText(/search for jobs by keywords, status, and job type/);
      await expect(searchDescription).toBeVisible();
    });

    test('should display charts feature description', async ({ page }) => {
      const chartsDescription = page.getByText(/how many jobs they apply in the last 6 active months/);
      await expect(chartsDescription).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(landingPage.mainHeading).toBeVisible();
      await expect(landingPage.loginRegisterButton).toBeVisible();
    });

    test('should be responsive on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(landingPage.mainHeading).toBeVisible();
      await expect(landingPage.loginRegisterButton).toBeVisible();
    });

    test('should be responsive on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(landingPage.mainHeading).toBeVisible();
      await expect(landingPage.loginRegisterButton).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible Login/Register link', async () => {
      await expect(landingPage.loginRegisterButton).toHaveAttribute('href');
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
    });
  });
});
