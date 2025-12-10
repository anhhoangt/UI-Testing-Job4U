/**
 * Test Data for Dashboard Page
 * Contains test data for UI verification, edge cases, and expected values
 */

// ==================== NAVIGATION ITEMS ====================

export const SIDEBAR_NAVIGATION_ITEMS = [
  { name: 'stats', expectedUrl: '/', shouldBeActive: true },
  { name: 'advanced analytics', expectedUrl: '/analytics' },
  { name: 'all jobs', expectedUrl: '/all-jobs' },
  { name: 'add job', expectedUrl: '/add-job' },
  { name: 'activities', expectedUrl: '/activities' },
  { name: 'timeline', expectedUrl: '/timeline' },
  { name: 'templates', expectedUrl: '/templates' },
  { name: 'AI assistant', expectedUrl: '/ai-assistant' },
  { name: 'profile', expectedUrl: '/profile' },
];

export const EXPECTED_NAV_ITEMS_COUNT = 9;

// ==================== STATS CARDS ====================

export const STATS_CARDS = {
  pendingApplications: {
    title: 'pending applications',
    cssClass: 'pending',
  },
  interviewsScheduled: {
    title: 'interviews scheduled',
    cssClass: 'interview',
  },
  jobsDeclined: {
    title: 'jobs declined',
    cssClass: 'declined',
  },
};

// ==================== CHART DATA ====================

export const CHART_CONFIG = {
  title: 'Monthly Applications',
  defaultChartType: 'bar',
  toggleButtonText: {
    switchToArea: 'Switch To Area Chart',
    switchToBar: 'Switch To Bar Chart',
  },
};

// ==================== VIEWPORTS ====================

export const VIEWPORT_SIZES = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  largeDesktop: { width: 1920, height: 1080 },
};

// ==================== EDGE CASE TEST DATA ====================

export const EDGE_CASE_USERS = {
  longName: {
    name: 'Christopher-Jonathan-Alexander',
    email: 'longnameuser@test.com',
    password: 'password123',
  },
  shortName: {
    name: 'Al',
    email: 'shortname@test.com',
    password: 'password123',
  },
  specialCharName: {
    name: "O'Brien-Smith Jr.",
    email: 'specialchar@test.com',
    password: 'password123',
  },
};

// Generate unique email for edge case testing
export const generateEdgeCaseEmail = (prefix: string): string => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString(36);
  return `${prefix}_${randomString}${timestamp}@test.com`;
};

// ==================== EXPECTED TEXT CONTENT ====================

export const EXPECTED_TEXT = {
  dashboardTitle: 'dashboard',
  headerTitle: 'Dashboard',
  logoutButton: 'logout',
};

// ==================== URL PATTERNS ====================

export const URL_PATTERNS = {
  dashboard: '/',
  stats: '/',
  analytics: '/analytics',
  allJobs: '/all-jobs',
  addJob: '/add-job',
  activities: '/activities',
  timeline: '/timeline',
  templates: '/templates',
  aiAssistant: '/ai-assistant',
  profile: '/profile',
};

// ==================== DATA VALIDATION ====================

export const DATA_VALIDATION = {
  minCount: 0,
  maxReasonableCount: 10000,
};

// ==================== CHART MONTHS (for chronological sorting validation) ====================

export const EXPECTED_MONTH_ORDER = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
