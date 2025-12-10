import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  // Page heading
  readonly dashboardHeading: Locator;

  // Stats cards
  readonly pendingApplications: Locator;
  readonly interviewsScheduled: Locator;
  readonly jobsDeclined: Locator;
  readonly pendingApplicationsCard: Locator;
  readonly interviewsScheduledCard: Locator;
  readonly jobsDeclinedCard: Locator;

  // Chart section
  readonly monthlyApplicationsHeading: Locator;
  readonly chartToggleButton: Locator;
  readonly chartContainer: Locator;

  // Sidebar container
  readonly sidebar: Locator;
  readonly sidebarLogo: Locator;

  // Navigation links
  readonly statsLink: Locator;
  readonly advancedAnalyticsLink: Locator;
  readonly allJobsLink: Locator;
  readonly addJobLink: Locator;
  readonly activitiesLink: Locator;
  readonly timelineLink: Locator;
  readonly templatesLink: Locator;
  readonly aiAssistantLink: Locator;
  readonly profileLink: Locator;

  // Navigation icons (for visual verification)
  readonly statsIcon: Locator;
  readonly advancedAnalyticsIcon: Locator;
  readonly allJobsIcon: Locator;
  readonly addJobIcon: Locator;
  readonly activitiesIcon: Locator;
  readonly timelineIcon: Locator;
  readonly templatesIcon: Locator;
  readonly aiAssistantIcon: Locator;
  readonly profileIcon: Locator;

  // Header section
  readonly header: Locator;
  readonly headerTitle: Locator;

  // User section
  readonly logoutButton: Locator;
  readonly userNameButton: Locator;
  readonly userDropdownMenu: Locator;

  // Sidebar toggle (mobile)
  readonly sidebarToggle: Locator;

  constructor(page: Page) {
    super(page);

    // Page heading
    this.dashboardHeading = page.getByRole('heading', { name: 'dashboard' });

    // Stats cards - labels
    this.pendingApplications = page.getByText('pending applications');
    this.interviewsScheduled = page.getByText('interviews scheduled');
    this.jobsDeclined = page.getByText('jobs declined');

    // Stats cards - containers (for getting count values)
    this.pendingApplicationsCard = page.locator('.job').filter({ hasText: 'pending applications' });
    this.interviewsScheduledCard = page.locator('.job').filter({ hasText: 'interviews scheduled' });
    this.jobsDeclinedCard = page.locator('.job').filter({ hasText: 'jobs declined' });

    // Chart section
    this.monthlyApplicationsHeading = page.getByRole('heading', { name: 'Monthly Applications' });
    this.chartToggleButton = page.getByRole('button', { name: /Switch to.*Chart/i });
    this.chartContainer = page.locator('.recharts-wrapper');

    // Sidebar
    this.sidebar = page.locator('.big-sidebar, aside, nav').first();
    this.sidebarLogo = page.locator('.logo, [class*="logo"]').first();

    // Navigation links
    this.statsLink = page.getByRole('link', { name: 'stats' }).first();
    this.advancedAnalyticsLink = page.getByRole('link', { name: 'advanced analytics' }).first();
    this.allJobsLink = page.getByRole('link', { name: 'all jobs' }).first();
    this.addJobLink = page.getByRole('link', { name: 'add job' }).first();
    this.activitiesLink = page.getByRole('link', { name: 'activities' }).first();
    this.timelineLink = page.getByRole('link', { name: 'timeline' }).first();
    this.templatesLink = page.getByRole('link', { name: 'templates' }).first();
    this.aiAssistantLink = page.getByRole('link', { name: 'AI assistant' }).first();
    this.profileLink = page.getByRole('link', { name: 'profile' }).first();

    // Navigation icons
    this.statsIcon = page.locator('[class*="nav-link"]').filter({ hasText: 'stats' }).locator('svg').first();
    this.advancedAnalyticsIcon = page.locator('[class*="nav-link"]').filter({ hasText: 'advanced analytics' }).locator('svg').first();
    this.allJobsIcon = page.locator('[class*="nav-link"]').filter({ hasText: 'all jobs' }).locator('svg').first();
    this.addJobIcon = page.locator('[class*="nav-link"]').filter({ hasText: 'add job' }).locator('svg').first();
    this.activitiesIcon = page.locator('[class*="nav-link"]').filter({ hasText: 'activities' }).locator('svg').first();
    this.timelineIcon = page.locator('[class*="nav-link"]').filter({ hasText: 'timeline' }).locator('svg').first();
    this.templatesIcon = page.locator('[class*="nav-link"]').filter({ hasText: 'templates' }).locator('svg').first();
    this.aiAssistantIcon = page.locator('[class*="nav-link"]').filter({ hasText: 'AI assistant' }).locator('svg').first();
    this.profileIcon = page.locator('[class*="nav-link"]').filter({ hasText: 'profile' }).locator('svg').first();

    // Header
    this.header = page.locator('.dashboard-page header, .dashboard header, header').first();
    this.headerTitle = page.locator('header h3, .dashboard-page h3').first();

    // User section
    this.logoutButton = page.getByRole('button', { name: 'logout' });
    this.userNameButton = page.locator('.btn-container button, [class*="user"] button').first();
    this.userDropdownMenu = page.locator('.dropdown, [class*="dropdown"]');

    // Sidebar toggle for mobile
    this.sidebarToggle = page.locator('.sidebar-toggle, .toggle-btn, [class*="toggle"]').first();
  }

  async goto(): Promise<void> {
    await this.navigate('/');
    await this.page.waitForLoadState('networkidle');
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  // Navigation methods
  async navigateToStats(): Promise<void> {
    await this.statsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToAdvancedAnalytics(): Promise<void> {
    await this.advancedAnalyticsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToAllJobs(): Promise<void> {
    await this.allJobsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToAddJob(): Promise<void> {
    await this.addJobLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToActivities(): Promise<void> {
    await this.activitiesLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToTimeline(): Promise<void> {
    await this.timelineLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToTemplates(): Promise<void> {
    await this.templatesLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToAIAssistant(): Promise<void> {
    await this.aiAssistantLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToProfile(): Promise<void> {
    await this.profileLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Chart methods
  async toggleChart(): Promise<void> {
    await this.chartToggleButton.click();
    await this.page.waitForTimeout(500); // Wait for chart animation
  }

  async getChartToggleButtonText(): Promise<string> {
    return await this.chartToggleButton.textContent() || '';
  }

  async isBarChart(): Promise<boolean> {
    const buttonText = await this.getChartToggleButtonText();
    return buttonText.toLowerCase().includes('area');
  }

  async isAreaChart(): Promise<boolean> {
    const buttonText = await this.getChartToggleButtonText();
    return buttonText.toLowerCase().includes('bar');
  }

  // Stats card methods
  async getPendingApplicationsCount(): Promise<number> {
    const countText = await this.pendingApplicationsCard.locator('h5, .count, span').first().textContent();
    return parseInt(countText || '0', 10);
  }

  async getInterviewsScheduledCount(): Promise<number> {
    const countText = await this.interviewsScheduledCard.locator('h5, .count, span').first().textContent();
    return parseInt(countText || '0', 10);
  }

  async getJobsDeclinedCount(): Promise<number> {
    const countText = await this.jobsDeclinedCard.locator('h5, .count, span').first().textContent();
    return parseInt(countText || '0', 10);
  }

  // User profile methods
  async openUserMenu(): Promise<void> {
    await this.userNameButton.click();
    await this.page.waitForTimeout(300);
  }

  async getUserName(): Promise<string> {
    return await this.userNameButton.textContent() || '';
  }

  async isUserMenuOpen(): Promise<boolean> {
    return await this.userDropdownMenu.isVisible();
  }

  // Dashboard state methods
  async isDashboardVisible(): Promise<boolean> {
    return await this.dashboardHeading.isVisible();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.logoutButton.isVisible();
  }

  async isSidebarVisible(): Promise<boolean> {
    return await this.sidebar.isVisible();
  }

  async isStatsLinkActive(): Promise<boolean> {
    const classAttribute = await this.statsLink.getAttribute('class');
    return classAttribute?.includes('active') || false;
  }

  // Responsive methods
  async toggleSidebar(): Promise<void> {
    await this.sidebarToggle.click();
    await this.page.waitForTimeout(300);
  }

  // Get all navigation link texts
  async getAllNavigationLinks(): Promise<string[]> {
    const links = [
      this.statsLink,
      this.advancedAnalyticsLink,
      this.allJobsLink,
      this.addJobLink,
      this.activitiesLink,
      this.timelineLink,
      this.templatesLink,
      this.aiAssistantLink,
      this.profileLink,
    ];

    const linkTexts: string[] = [];
    for (const link of links) {
      if (await link.isVisible()) {
        const text = await link.textContent();
        if (text) linkTexts.push(text.trim().toLowerCase());
      }
    }
    return linkTexts;
  }

  // Chart data methods (for data validation)
  async getChartBars(): Promise<Locator> {
    return this.page.locator('.recharts-bar-rectangle, .recharts-bar rect');
  }

  async getChartXAxisLabels(): Promise<string[]> {
    const labels = await this.page.locator('.recharts-xAxis .recharts-cartesian-axis-tick-value').allTextContents();
    return labels;
  }

  async isChartEmpty(): Promise<boolean> {
    const bars = await this.getChartBars();
    const barCount = await bars.count();
    return barCount === 0;
  }
}
