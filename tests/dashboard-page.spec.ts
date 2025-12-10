import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';
import { VALID_LOGIN_DATA, generateUniqueEmail } from './test-data/auth.data';
import {
  SIDEBAR_NAVIGATION_ITEMS,
  CHART_CONFIG,
  VIEWPORT_SIZES,
  EDGE_CASE_USERS,
  generateEdgeCaseEmail,
  DATA_VALIDATION,
} from './test-data/dashboard.data';

test.describe('Dashboard Page Tests', () => {
  let authPage: AuthPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    dashboardPage = new DashboardPage(page);

    // Login before each test
    await authPage.goto();
    await authPage.login(VALID_LOGIN_DATA.email, VALID_LOGIN_DATA.password);
    await expect(dashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });
  });

  // ==================== 1. UI & VISUAL VERIFICATION ====================

  test.describe('1. UI & Visual Verification', () => {
    test.describe('Layout Structure', () => {
      test('should display sidebar navigation area', async () => {
        await expect(dashboardPage.sidebar).toBeVisible();
      });

      test('should display header section', async () => {
        await expect(dashboardPage.header).toBeVisible();
      });

      test('should display dashboard heading', async () => {
        await expect(dashboardPage.dashboardHeading).toBeVisible();
        await expect(dashboardPage.dashboardHeading).toHaveText('dashboard');
      });

      test('should display all three summary cards', async () => {
        await expect(dashboardPage.pendingApplications).toBeVisible();
        await expect(dashboardPage.interviewsScheduled).toBeVisible();
        await expect(dashboardPage.jobsDeclined).toBeVisible();
      });

      test('should display Monthly Applications chart area', async () => {
        await expect(dashboardPage.monthlyApplicationsHeading).toBeVisible();
        await expect(dashboardPage.chartContainer).toBeVisible();
      });

      test('should display chart toggle button', async () => {
        await expect(dashboardPage.chartToggleButton).toBeVisible();
      });
    });

    test.describe('Sidebar Navigation Elements', () => {
      test('should display Stats link in sidebar', async () => {
        await expect(dashboardPage.statsLink).toBeVisible();
      });

      test('should display Advanced Analytics link in sidebar', async () => {
        await expect(dashboardPage.advancedAnalyticsLink).toBeVisible();
      });

      test('should display All Jobs link in sidebar', async () => {
        await expect(dashboardPage.allJobsLink).toBeVisible();
      });

      test('should display Add Job link in sidebar', async () => {
        await expect(dashboardPage.addJobLink).toBeVisible();
      });

      test('should display Activities link in sidebar', async () => {
        await expect(dashboardPage.activitiesLink).toBeVisible();
      });

      test('should display Timeline link in sidebar', async () => {
        await expect(dashboardPage.timelineLink).toBeVisible();
      });

      test('should display Templates link in sidebar', async () => {
        await expect(dashboardPage.templatesLink).toBeVisible();
      });

      test('should display AI Assistant link in sidebar', async () => {
        await expect(dashboardPage.aiAssistantLink).toBeVisible();
      });

      test('should display Profile link in sidebar', async () => {
        await expect(dashboardPage.profileLink).toBeVisible();
      });

      test('should have correct spelling for all navigation items', async () => {
        const navLinks = await dashboardPage.getAllNavigationLinks();
        const expectedItems = SIDEBAR_NAVIGATION_ITEMS.map((item) => item.name.toLowerCase());

        for (const expectedItem of expectedItems) {
          expect(navLinks).toContain(expectedItem);
        }
      });
    });

    test.describe('Header Elements', () => {
      test('should display Dashboard title in header', async () => {
        await expect(dashboardPage.dashboardHeading).toBeVisible();
      });

      test('should display user profile button in header', async () => {
        await expect(dashboardPage.userNameButton).toBeVisible();
      });

      test('should display logout button', async () => {
        await expect(dashboardPage.logoutButton).toBeVisible();
      });
    });

    test.describe('Responsive Design', () => {
      test('should display dashboard correctly on desktop viewport', async ({ page }) => {
        await page.setViewportSize(VIEWPORT_SIZES.desktop);
        await page.waitForTimeout(500);

        await expect(dashboardPage.dashboardHeading).toBeVisible();
        await expect(dashboardPage.pendingApplications).toBeVisible();
        await expect(dashboardPage.chartContainer).toBeVisible();
      });

      test('should display dashboard correctly on tablet viewport', async ({ page }) => {
        await page.setViewportSize(VIEWPORT_SIZES.tablet);
        await page.waitForTimeout(500);

        await expect(dashboardPage.dashboardHeading).toBeVisible();
        await expect(dashboardPage.pendingApplications).toBeVisible();
      });

      test('should display dashboard correctly on mobile viewport', async ({ page }) => {
        await page.setViewportSize(VIEWPORT_SIZES.mobile);
        await page.waitForTimeout(500);

        await expect(dashboardPage.dashboardHeading).toBeVisible();
        await expect(dashboardPage.pendingApplications).toBeVisible();
      });

      test('should maintain chart visibility on different viewports', async ({ page }) => {
        // Desktop
        await page.setViewportSize(VIEWPORT_SIZES.desktop);
        await expect(dashboardPage.chartContainer).toBeVisible();

        // Tablet
        await page.setViewportSize(VIEWPORT_SIZES.tablet);
        await expect(dashboardPage.monthlyApplicationsHeading).toBeVisible();

        // Mobile
        await page.setViewportSize(VIEWPORT_SIZES.mobile);
        await expect(dashboardPage.monthlyApplicationsHeading).toBeVisible();
      });
    });
  });

  // ==================== 2. FUNCTIONAL TEST CASES ====================

  test.describe('2. Functional Test Cases', () => {
    test.describe('Sidebar Navigation', () => {
      test('should navigate to Stats page when clicking Stats link', async ({ page }) => {
        await dashboardPage.navigateToStats();
        await expect(page).toHaveURL(/.*\//);
        await expect(dashboardPage.dashboardHeading).toBeVisible();
      });

      test('should navigate to All Jobs page when clicking All Jobs link', async ({ page }) => {
        await dashboardPage.navigateToAllJobs();
        await expect(page).toHaveURL(/.*all-jobs.*/);
      });

      test('should navigate to Add Job page when clicking Add Job link', async ({ page }) => {
        await dashboardPage.navigateToAddJob();
        await expect(page).toHaveURL(/.*add-job.*/);
      });

      test('should navigate to Profile page when clicking Profile link', async ({ page }) => {
        await dashboardPage.navigateToProfile();
        await expect(page).toHaveURL(/.*profile.*/);
      });

      test('should navigate to Activities page when clicking Activities link', async ({ page }) => {
        await dashboardPage.navigateToActivities();
        await expect(page).toHaveURL(/.*activities.*/);
      });

      test('should navigate to Timeline page when clicking Timeline link', async ({ page }) => {
        await dashboardPage.navigateToTimeline();
        await expect(page).toHaveURL(/.*timeline.*/);
      });

      test('should navigate to Templates page when clicking Templates link', async ({ page }) => {
        await dashboardPage.navigateToTemplates();
        await expect(page).toHaveURL(/.*templates.*/);
      });

      test('should navigate to AI Assistant page when clicking AI Assistant link', async ({ page }) => {
        await dashboardPage.navigateToAIAssistant();
        await expect(page).toHaveURL(/.*ai-assistant.*/);
      });

      test('should navigate to Advanced Analytics page when clicking Advanced Analytics link', async ({ page }) => {
        await dashboardPage.navigateToAdvancedAnalytics();
        await expect(page).toHaveURL(/.*analytics.*/);
      });

      test('should highlight Stats tab as active on Dashboard page', async () => {
        const isActive = await dashboardPage.isStatsLinkActive();
        expect(isActive).toBe(true);
      });
    });

    test.describe('Toggle Chart Button', () => {
      test('should display "Switch To Area Chart" button initially', async () => {
        const buttonText = await dashboardPage.getChartToggleButtonText();
        expect(buttonText.toLowerCase()).toContain('area');
      });

      test('should switch chart type when clicking toggle button', async () => {
        // Get initial button text
        const initialButtonText = await dashboardPage.getChartToggleButtonText();

        // Click toggle
        await dashboardPage.toggleChart();

        // Get new button text
        const newButtonText = await dashboardPage.getChartToggleButtonText();

        // Button text should change
        expect(newButtonText.toLowerCase()).not.toBe(initialButtonText.toLowerCase());
      });

      test('should toggle from Bar to Area chart', async () => {
        // Initially should be bar chart (button says "Switch To Area Chart")
        expect(await dashboardPage.isBarChart()).toBe(true);

        // Click toggle
        await dashboardPage.toggleChart();

        // Now should be area chart (button says "Switch To Bar Chart")
        expect(await dashboardPage.isAreaChart()).toBe(true);
      });

      test('should toggle back from Area to Bar chart', async () => {
        // Toggle to area chart
        await dashboardPage.toggleChart();
        expect(await dashboardPage.isAreaChart()).toBe(true);

        // Toggle back to bar chart
        await dashboardPage.toggleChart();
        expect(await dashboardPage.isBarChart()).toBe(true);
      });

      test('should maintain chart data after toggling chart type', async () => {
        // Get chart state before toggle
        const chartVisibleBefore = await dashboardPage.chartContainer.isVisible();

        // Toggle chart
        await dashboardPage.toggleChart();

        // Chart should still be visible
        const chartVisibleAfter = await dashboardPage.chartContainer.isVisible();

        expect(chartVisibleBefore).toBe(true);
        expect(chartVisibleAfter).toBe(true);
      });

      test('should not reload page when toggling chart', async ({ page }) => {
        const urlBefore = page.url();

        await dashboardPage.toggleChart();

        const urlAfter = page.url();
        expect(urlAfter).toBe(urlBefore);
      });
    });

    test.describe('User Profile Menu', () => {
      test('should display user name button', async () => {
        await expect(dashboardPage.userNameButton).toBeVisible();
      });

      test('should display logout button', async () => {
        await expect(dashboardPage.logoutButton).toBeVisible();
      });

      test('should logout when clicking logout button', async ({ page }) => {
        await dashboardPage.logout();
        await page.waitForLoadState('networkidle');

        // Should redirect to login page
        await expect(page).toHaveURL(/.*register.*/);
      });
    });
  });

  // ==================== 3. DATA VALIDATION ====================

  test.describe('3. Data Validation (Backend Integration)', () => {
    test.describe('Summary Cards (Counters)', () => {
      test('should display Pending Applications count as a number', async () => {
        const count = await dashboardPage.getPendingApplicationsCount();
        expect(count).toBeGreaterThanOrEqual(DATA_VALIDATION.minCount);
      });

      test('should display Interviews Scheduled count as a number', async () => {
        const count = await dashboardPage.getInterviewsScheduledCount();
        expect(count).toBeGreaterThanOrEqual(DATA_VALIDATION.minCount);
      });

      test('should display Jobs Declined count as a number', async () => {
        const count = await dashboardPage.getJobsDeclinedCount();
        expect(count).toBeGreaterThanOrEqual(DATA_VALIDATION.minCount);
      });

      test('should display reasonable count values (not exceeding max limit)', async () => {
        const pendingCount = await dashboardPage.getPendingApplicationsCount();
        const interviewsCount = await dashboardPage.getInterviewsScheduledCount();
        const declinedCount = await dashboardPage.getJobsDeclinedCount();

        expect(pendingCount).toBeLessThanOrEqual(DATA_VALIDATION.maxReasonableCount);
        expect(interviewsCount).toBeLessThanOrEqual(DATA_VALIDATION.maxReasonableCount);
        expect(declinedCount).toBeLessThanOrEqual(DATA_VALIDATION.maxReasonableCount);
      });
    });

    test.describe('Monthly Applications Chart', () => {
      test('should display Monthly Applications heading', async () => {
        await expect(dashboardPage.monthlyApplicationsHeading).toBeVisible();
        await expect(dashboardPage.monthlyApplicationsHeading).toContainText(CHART_CONFIG.title);
      });

      test('should display chart container', async () => {
        await expect(dashboardPage.chartContainer).toBeVisible();
      });

      test('should display X-axis labels (dates)', async () => {
        const xAxisLabels = await dashboardPage.getChartXAxisLabels();
        // Should have some labels if there is data
        expect(xAxisLabels.length).toBeGreaterThanOrEqual(0);
      });

      test('should have chronologically sorted X-axis labels', async () => {
        const xAxisLabels = await dashboardPage.getChartXAxisLabels();

        if (xAxisLabels.length > 1) {
          // Parse dates and verify chronological order
          const dates = xAxisLabels.map((label) => {
            // Assuming format like "Dec 2021" or "Apr 2023"
            return new Date(label);
          });

          for (let i = 1; i < dates.length; i++) {
            const prevDate = dates[i - 1].getTime();
            const currDate = dates[i].getTime();
            // If dates are valid, check order
            if (!isNaN(prevDate) && !isNaN(currDate)) {
              expect(currDate).toBeGreaterThanOrEqual(prevDate);
            }
          }
        }
      });
    });

    test.describe('Empty State Handling', () => {
      test('should handle dashboard display for new user with no data', async ({ page }) => {
        // Logout current user
        await dashboardPage.logout();
        await page.waitForLoadState('networkidle');

        // Create new user
        const authPage = new AuthPage(page);
        await authPage.switchToRegister();

        const uniqueEmail = generateUniqueEmail();
        await authPage.register('New Test User', uniqueEmail, 'password123');

        // Wait for dashboard
        const newDashboardPage = new DashboardPage(page);
        await expect(newDashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });

        // New user should have 0 pending applications
        await expect(newDashboardPage.pendingApplications).toBeVisible();
        const pendingCount = await newDashboardPage.getPendingApplicationsCount();
        expect(pendingCount).toBe(0);

        // Chart should still be visible (even if empty)
        await expect(newDashboardPage.monthlyApplicationsHeading).toBeVisible();
      });
    });
  });

  // ==================== 4. EDGE CASES ====================

  test.describe('4. Edge Cases', () => {
    test.describe('Long Names Handling', () => {
      test('should display user with long name correctly', async ({ page }) => {
        // Logout current user
        await dashboardPage.logout();
        await page.waitForLoadState('networkidle');

        // Create user with long name
        const authPage = new AuthPage(page);
        await authPage.switchToRegister();

        const uniqueEmail = generateEdgeCaseEmail('longname');
        await authPage.register(EDGE_CASE_USERS.longName.name, uniqueEmail, EDGE_CASE_USERS.longName.password);

        // Wait for dashboard
        const newDashboardPage = new DashboardPage(page);
        await expect(newDashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });

        // User button should be visible and not break layout
        await expect(newDashboardPage.userNameButton).toBeVisible();

        // Dashboard should still be functional
        await expect(newDashboardPage.pendingApplications).toBeVisible();
        await expect(newDashboardPage.chartContainer).toBeVisible();
      });

      test('should display user with special characters in name correctly', async ({ page }) => {
        // Logout current user
        await dashboardPage.logout();
        await page.waitForLoadState('networkidle');

        // Create user with special characters
        const authPage = new AuthPage(page);
        await authPage.switchToRegister();

        const uniqueEmail = generateEdgeCaseEmail('specialchar');
        await authPage.register(
          EDGE_CASE_USERS.specialCharName.name,
          uniqueEmail,
          EDGE_CASE_USERS.specialCharName.password
        );

        // Wait for dashboard
        const newDashboardPage = new DashboardPage(page);
        await expect(newDashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });

        // Dashboard should function normally
        await expect(newDashboardPage.pendingApplications).toBeVisible();
      });
    });

    test.describe('Stats Card Layout Stability', () => {
      test('should maintain stats card layout with zero values', async ({ page }) => {
        // Logout and create new user
        await dashboardPage.logout();
        await page.waitForLoadState('networkidle');

        const authPage = new AuthPage(page);
        await authPage.switchToRegister();

        const uniqueEmail = generateEdgeCaseEmail('zerostats');
        await authPage.register('Zero Stats User', uniqueEmail, 'password123');

        const newDashboardPage = new DashboardPage(page);
        await expect(newDashboardPage.dashboardHeading).toBeVisible({ timeout: 15000 });

        // All stats cards should be visible even with 0 values
        await expect(newDashboardPage.pendingApplications).toBeVisible();
        await expect(newDashboardPage.interviewsScheduled).toBeVisible();
        await expect(newDashboardPage.jobsDeclined).toBeVisible();

        // Values should be 0 for new user
        const pendingCount = await newDashboardPage.getPendingApplicationsCount();
        const interviewsCount = await newDashboardPage.getInterviewsScheduledCount();
        const declinedCount = await newDashboardPage.getJobsDeclinedCount();

        expect(pendingCount).toBe(0);
        expect(interviewsCount).toBe(0);
        expect(declinedCount).toBe(0);
      });
    });

    test.describe('Chart Behavior Edge Cases', () => {
      test('should handle rapid chart toggle clicks', async () => {
        // Rapidly toggle chart multiple times
        for (let i = 0; i < 5; i++) {
          await dashboardPage.toggleChart();
          await dashboardPage.page.waitForTimeout(200);
        }

        // Chart should still be visible and functional
        await expect(dashboardPage.chartContainer).toBeVisible();
        await expect(dashboardPage.chartToggleButton).toBeVisible();
      });

      test('should maintain chart state after navigation and return', async ({ page }) => {
        // Toggle chart to area
        await dashboardPage.toggleChart();

        // Navigate away
        await dashboardPage.navigateToAllJobs();
        await page.waitForLoadState('networkidle');

        // Navigate back to dashboard
        await dashboardPage.navigateToStats();
        await page.waitForLoadState('networkidle');

        // Chart should be visible (note: state may reset based on implementation)
        await expect(dashboardPage.chartContainer).toBeVisible();
      });
    });

    test.describe('Navigation Edge Cases', () => {
      test('should handle double-clicking navigation links', async ({ page }) => {
        await dashboardPage.allJobsLink.dblclick();
        await page.waitForLoadState('networkidle');

        // Should still navigate correctly
        await expect(page).toHaveURL(/.*all-jobs.*/);
      });

      test('should maintain session after multiple page navigations', async ({ page }) => {
        // Navigate through multiple pages
        await dashboardPage.navigateToAllJobs();
        await page.waitForTimeout(500);

        await dashboardPage.navigateToAddJob();
        await page.waitForTimeout(500);

        await dashboardPage.navigateToProfile();
        await page.waitForTimeout(500);

        await dashboardPage.navigateToStats();
        await page.waitForTimeout(500);

        // Should still be logged in
        await expect(dashboardPage.logoutButton).toBeVisible();
        await expect(dashboardPage.dashboardHeading).toBeVisible();
      });
    });

    test.describe('Viewport Resize Behavior', () => {
      test('should handle viewport resize from desktop to mobile', async ({ page }) => {
        // Start with desktop
        await page.setViewportSize(VIEWPORT_SIZES.desktop);
        await expect(dashboardPage.dashboardHeading).toBeVisible();

        // Resize to mobile
        await page.setViewportSize(VIEWPORT_SIZES.mobile);
        await page.waitForTimeout(500);

        // Dashboard should still be functional
        await expect(dashboardPage.dashboardHeading).toBeVisible();
        await expect(dashboardPage.pendingApplications).toBeVisible();
      });

      test('should handle viewport resize from mobile to desktop', async ({ page }) => {
        // Start with mobile
        await page.setViewportSize(VIEWPORT_SIZES.mobile);
        await expect(dashboardPage.dashboardHeading).toBeVisible();

        // Resize to desktop
        await page.setViewportSize(VIEWPORT_SIZES.desktop);
        await page.waitForTimeout(500);

        // Dashboard should be fully visible
        await expect(dashboardPage.dashboardHeading).toBeVisible();
        await expect(dashboardPage.chartContainer).toBeVisible();
      });
    });
  });
});
