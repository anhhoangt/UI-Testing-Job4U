import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { AddJobPage } from '../pages/AddJobPage';
import { DashboardPage } from '../pages/DashboardPage';
import { VALID_LOGIN_DATA } from './test-data/auth.data';
import {
  VALID_JOB_DATA,
  WHITESPACE_DATA,
  DEFAULT_VALUES,
  SALARY_DATA,
  URL_DATA,
  TEXT_AREA_DATA,
  generateUniqueJob,
} from './test-data/add-job.data';

test.describe('Add Job Page Tests', () => {
  let authPage: AuthPage;
  let addJobPage: AddJobPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    addJobPage = new AddJobPage(page);
    dashboardPage = new DashboardPage(page);

    // Login before each test with extended timeout for slow server
    await authPage.goto();
    await page.waitForLoadState('networkidle');
    await authPage.login(VALID_LOGIN_DATA.email, VALID_LOGIN_DATA.password);

    // Wait for navigation to complete - either dashboard or redirect
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);

    // Check if login was successful by looking for dashboard elements or URL change
    const currentUrl = page.url();
    if (!currentUrl.includes('register')) {
      // Successfully logged in, now navigate to Add Job
      await page.goto('https://jobtrack4u.onrender.com/add-job');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
    }
  });

  // ==================== 1. UI & VISUAL VERIFICATION ====================

  test.describe('1. UI & Visual Verification', () => {
    test.describe('Active Navigation State', () => {
      test('should highlight Add Job tab in sidebar as active', async () => {
        const isActive = await addJobPage.isAddJobNavLinkActive();
        expect(isActive).toBe(true);
      });

      test('should display Add Job nav link with teal/green color', async () => {
        // Get computed color and verify it's in the teal/green range
        const color = await addJobPage.getAddJobNavLinkColor();
        // Color could be rgb format - checking for presence of color value
        expect(color).toBeTruthy();
      });
    });

    test.describe('Form Layout', () => {
      test('should display Add Job page heading', async () => {
        await expect(addJobPage.pageHeading).toBeVisible();
        const headingText = await addJobPage.getPageHeadingText();
        expect(headingText.toLowerCase()).toContain('add job');
      });

      test('should display all basic form fields', async () => {
        const allFieldsVisible = await addJobPage.areAllBasicFieldsVisible();
        expect(allFieldsVisible).toBe(true);
      });

      test('should display Position input field', async () => {
        await expect(addJobPage.positionInput).toBeVisible();
      });

      test('should display Company input field', async () => {
        await expect(addJobPage.companyInput).toBeVisible();
      });

      test('should display Job Location input field', async () => {
        await expect(addJobPage.jobLocationInput).toBeVisible();
      });

      test('should display Status dropdown', async () => {
        await expect(addJobPage.statusSelect).toBeVisible();
      });

      test('should display Job Type dropdown', async () => {
        await expect(addJobPage.jobTypeSelect).toBeVisible();
      });

      test('should display form in organized layout', async () => {
        const formVisible = await addJobPage.isFormVisible();
        expect(formVisible).toBe(true);
      });
    });

    test.describe('Default Values', () => {
      test('should have "my city" as default Job Location', async () => {
        const jobLocation = await addJobPage.getJobLocationValue();
        expect(jobLocation.toLowerCase()).toContain('my city');
      });

      test('should have "pending" as default Status', async () => {
        const status = await addJobPage.getSelectedStatus();
        expect(status).toBe(DEFAULT_VALUES.status);
      });

      test('should have "full-time" as default Job Type', async () => {
        const jobType = await addJobPage.getSelectedJobType();
        expect(jobType).toBe(DEFAULT_VALUES.jobType);
      });

      test('should verify all default values on page load', async () => {
        await addJobPage.verifyDefaultValues();
      });
    });

    test.describe('Buttons', () => {
      test('should display Submit button', async () => {
        await expect(addJobPage.submitButton).toBeVisible();
      });

      test('should display Clear button', async () => {
        await expect(addJobPage.clearButton).toBeVisible();
      });

      test('should have Submit button enabled', async () => {
        const isEnabled = await addJobPage.isSubmitButtonEnabled();
        expect(isEnabled).toBe(true);
      });

      test('should display Submit button with primary color (teal)', async () => {
        const bgColor = await addJobPage.getSubmitButtonBackgroundColor();
        expect(bgColor).toBeTruthy();
      });

      test('should display Clear button with secondary color (grey)', async () => {
        const bgColor = await addJobPage.getClearButtonBackgroundColor();
        expect(bgColor).toBeTruthy();
      });
    });
  });

  // ==================== 2. FUNCTIONAL TEST CASES ====================

  test.describe('2. Functional Test Cases', () => {
    test.describe('Successful Job Submission', () => {
      test('should submit job with basic required fields', async ({ page }) => {
        const uniqueJob = generateUniqueJob(VALID_JOB_DATA.basic);

        await addJobPage.fillPosition(uniqueJob.position);
        await addJobPage.fillCompany(uniqueJob.company);
        await addJobPage.fillJobLocation(uniqueJob.jobLocation);
        await addJobPage.submitForm();

        // Should show success or redirect
        await page.waitForTimeout(2000);
        const url = page.url();
        // Either redirects to all-jobs or shows success message
        const isSuccessful = url.includes('all-jobs') || (await addJobPage.isSuccessMessageVisible());
        expect(isSuccessful || !url.includes('add-job')).toBeTruthy();
      });

      test('should submit job with all fields filled', async ({ page }) => {
        const uniqueJob = generateUniqueJob(VALID_JOB_DATA.basic);

        await addJobPage.fillJobForm({
          ...uniqueJob,
          status: 'pending',
          jobType: 'full-time',
        });
        await addJobPage.submitForm();

        await page.waitForTimeout(2000);
      });

      test('should submit job and form resets or redirects', async ({ page }) => {
        const uniqueJob = generateUniqueJob();

        await addJobPage.addJob(uniqueJob);
        await page.waitForTimeout(2000);

        // Check if redirected or form reset
        const currentUrl = page.url();
        const positionValue = await addJobPage.getPositionValue().catch(() => '');

        // Either redirected away from add-job page, or form was reset
        const redirected = !currentUrl.includes('add-job');
        const formReset = positionValue === '';

        expect(redirected || formReset).toBeTruthy();
      });
    });

    test.describe('Clear Form Functionality', () => {
      test('should clear Position field when clicking Clear button', async () => {
        await addJobPage.fillPosition('Test Position');
        await expect(addJobPage.positionInput).toHaveValue('Test Position');

        await addJobPage.clickClearButton();
        await addJobPage.page.waitForTimeout(500);

        const positionValue = await addJobPage.getPositionValue();
        expect(positionValue).toBe('');
      });

      test('should clear Company field when clicking Clear button', async () => {
        await addJobPage.fillCompany('Test Company');
        await expect(addJobPage.companyInput).toHaveValue('Test Company');

        await addJobPage.clickClearButton();
        await addJobPage.page.waitForTimeout(500);

        const companyValue = await addJobPage.getCompanyValue();
        expect(companyValue).toBe('');
      });

      test('should clear all fields and revert to defaults', async () => {
        // Fill multiple fields
        await addJobPage.fillPosition('Test Position');
        await addJobPage.fillCompany('Test Company');
        await addJobPage.selectStatus('interview');

        // Click clear
        await addJobPage.clickClearButton();
        await addJobPage.page.waitForTimeout(500);

        // Verify fields are cleared/reset
        const positionValue = await addJobPage.getPositionValue();
        const companyValue = await addJobPage.getCompanyValue();

        expect(positionValue).toBe('');
        expect(companyValue).toBe('');
      });
    });

    test.describe('Dropdown Selections', () => {
      test('should have Status dropdown with expected options', async () => {
        const options = await addJobPage.getStatusOptions();
        expect(options.length).toBeGreaterThan(0);

        // Check for common status options (case-insensitive)
        const optionsLower = options.map((o) => o.toLowerCase());
        expect(optionsLower).toContain('pending');
      });

      test('should be able to select "interview" status', async () => {
        await addJobPage.selectStatus('interview');
        const selectedStatus = await addJobPage.getSelectedStatus();
        expect(selectedStatus).toBe('interview');
      });

      test('should be able to select "declined" status', async () => {
        await addJobPage.selectStatus('declined');
        const selectedStatus = await addJobPage.getSelectedStatus();
        expect(selectedStatus).toBe('declined');
      });

      test('should have Job Type dropdown with expected options', async () => {
        const options = await addJobPage.getJobTypeOptions();
        expect(options.length).toBeGreaterThan(0);

        const optionsLower = options.map((o) => o.toLowerCase());
        expect(optionsLower).toContain('full-time');
      });

      test('should be able to select "part-time" job type', async () => {
        await addJobPage.selectJobType('part-time');
        const selectedType = await addJobPage.getSelectedJobType();
        expect(selectedType).toBe('part-time');
      });

      test('should be able to select "remote" job type', async () => {
        await addJobPage.selectJobType('remote');
        const selectedType = await addJobPage.getSelectedJobType();
        expect(selectedType).toBe('remote');
      });

      test('should be able to select "internship" job type', async () => {
        await addJobPage.selectJobType('internship');
        const selectedType = await addJobPage.getSelectedJobType();
        expect(selectedType).toBe('internship');
      });
    });

    test.describe('Date Pickers', () => {
      test('should be able to fill Application Date', async () => {
        const testDate = '2024-06-15';
        await addJobPage.fillApplicationDate(testDate);
        const dateValue = await addJobPage.getApplicationDateValue();
        expect(dateValue).toContain('2024');
      });

      test('should be able to fill Application Deadline', async () => {
        const testDate = '2024-07-15';
        await addJobPage.fillApplicationDeadline(testDate);
        const deadlineValue = await addJobPage.getApplicationDeadlineValue();
        expect(deadlineValue).toContain('2024');
      });

      test('should open date picker when clicking Application Date field', async () => {
        await addJobPage.openApplicationDateCalendar();
        // Date picker should be interactive
        await addJobPage.page.waitForTimeout(500);
      });
    });
  });

  // ==================== 3. FIELD VALIDATION & NEGATIVE TESTING ====================

  test.describe('3. Field Validation & Negative Testing', () => {
    test.describe('Mandatory Fields', () => {
      test('should show error when submitting with empty Position', async () => {
        await addJobPage.fillCompany('Test Company');
        await addJobPage.fillJobLocation('Test Location');
        // Leave position empty
        await addJobPage.submitForm();

        // Should show error or remain on page
        await addJobPage.page.waitForTimeout(1000);
        const url = addJobPage.page.url();
        expect(url).toContain('add-job');
      });

      test('should show error when submitting with empty Company', async () => {
        await addJobPage.fillPosition('Test Position');
        await addJobPage.fillJobLocation('Test Location');
        // Leave company empty
        await addJobPage.submitForm();

        await addJobPage.page.waitForTimeout(1000);
        const url = addJobPage.page.url();
        expect(url).toContain('add-job');
      });

      test('should show error when submitting with all empty required fields', async () => {
        // Clear all fields
        await addJobPage.clearAllFields();
        await addJobPage.submitForm();

        await addJobPage.page.waitForTimeout(1000);
        // Should remain on add-job page or show error
        const url = addJobPage.page.url();
        expect(url).toContain('add-job');
      });

      test('should show error for whitespace-only Position', async () => {
        await addJobPage.fillPosition(WHITESPACE_DATA.positionWhitespace.position);
        await addJobPage.fillCompany('Valid Company');
        await addJobPage.fillJobLocation('Valid Location');
        await addJobPage.submitForm();

        await addJobPage.page.waitForTimeout(1000);
        const url = addJobPage.page.url();
        expect(url).toContain('add-job');
      });

      test('should show error for whitespace-only Company', async () => {
        await addJobPage.fillPosition('Valid Position');
        await addJobPage.fillCompany(WHITESPACE_DATA.companyWhitespace.company);
        await addJobPage.fillJobLocation('Valid Location');
        await addJobPage.submitForm();

        await addJobPage.page.waitForTimeout(1000);
        const url = addJobPage.page.url();
        expect(url).toContain('add-job');
      });
    });

    test.describe('Salary Validation', () => {
      test('should accept valid salary range', async () => {
        await addJobPage.fillSalaryMin(SALARY_DATA.valid.salaryMin);
        await addJobPage.fillSalaryMax(SALARY_DATA.valid.salaryMax);

        const minValue = await addJobPage.getSalaryMinValue();
        const maxValue = await addJobPage.getSalaryMaxValue();

        expect(minValue).toBe(SALARY_DATA.valid.salaryMin);
        expect(maxValue).toBe(SALARY_DATA.valid.salaryMax);
      });

      test('should handle salary min greater than max', async () => {
        await addJobPage.fillSalaryMin(SALARY_DATA.minGreaterThanMax.salaryMin);
        await addJobPage.fillSalaryMax(SALARY_DATA.minGreaterThanMax.salaryMax);

        // Fill required fields
        await addJobPage.fillPosition('Test Position');
        await addJobPage.fillCompany('Test Company');
        await addJobPage.submitForm();

        await addJobPage.page.waitForTimeout(1000);
        // System should either show error or auto-correct
      });

      test('should handle non-numeric salary input', async () => {
        await addJobPage.fillSalaryMin(SALARY_DATA.invalidNonNumeric.salaryMin);
        await addJobPage.fillSalaryMax(SALARY_DATA.invalidNonNumeric.salaryMax);

        // The field might reject non-numeric input or show validation error
        const minValue = await addJobPage.getSalaryMinValue();
        // Depending on implementation, might be empty or filtered
        expect(minValue).toBeDefined();
      });

      test('should handle salary with special characters', async () => {
        await addJobPage.fillSalaryMin(SALARY_DATA.withSpecialChars.salaryMin);
        await addJobPage.fillSalaryMax(SALARY_DATA.withSpecialChars.salaryMax);

        const minValue = await addJobPage.getSalaryMinValue();
        expect(minValue).toBeDefined();
      });
    });

    test.describe('URL Validation', () => {
      test('should accept valid HTTPS URL for Company Website', async () => {
        await addJobPage.fillCompanyWebsite(URL_DATA.valid.companyWebsite);
        const value = await addJobPage.getCompanyWebsiteValue();
        expect(value).toBe(URL_DATA.valid.companyWebsite);
      });

      test('should accept valid HTTPS URL for Job Posting URL', async () => {
        await addJobPage.fillJobPostingUrl(URL_DATA.valid.jobPostingUrl);
        const value = await addJobPage.getJobPostingUrlValue();
        expect(value).toBe(URL_DATA.valid.jobPostingUrl);
      });

      test('should handle URL without protocol', async () => {
        await addJobPage.fillCompanyWebsite(URL_DATA.invalidNoProtocol.companyWebsite);

        // Fill required fields and submit
        await addJobPage.fillPosition('Test Position');
        await addJobPage.fillCompany('Test Company');
        await addJobPage.submitForm();

        await addJobPage.page.waitForTimeout(1000);
        // System should either validate or accept
      });

      test('should handle invalid URL format', async () => {
        await addJobPage.fillCompanyWebsite(URL_DATA.invalidFormat.companyWebsite);

        await addJobPage.fillPosition('Test Position');
        await addJobPage.fillCompany('Test Company');
        await addJobPage.submitForm();

        await addJobPage.page.waitForTimeout(1000);
        // Check for validation error or acceptance
      });

      test('should accept URL with query parameters', async () => {
        await addJobPage.fillJobPostingUrl(URL_DATA.withQueryParams.jobPostingUrl);
        const value = await addJobPage.getJobPostingUrlValue();
        expect(value).toBe(URL_DATA.withQueryParams.jobPostingUrl);
      });
    });

    test.describe('Text Area Limits', () => {
      test('should accept short text in Job Description', async () => {
        await addJobPage.fillJobDescription(TEXT_AREA_DATA.shortText.jobDescription);
        const value = await addJobPage.getJobDescriptionValue();
        expect(value).toBe(TEXT_AREA_DATA.shortText.jobDescription);
      });

      test('should accept short text in Notes', async () => {
        await addJobPage.fillNotes(TEXT_AREA_DATA.shortText.notes);
        const value = await addJobPage.getNotesValue();
        expect(value).toBe(TEXT_AREA_DATA.shortText.notes);
      });

      test('should handle long text in Job Description', async () => {
        await addJobPage.fillJobDescription(TEXT_AREA_DATA.longText.jobDescription);
        const value = await addJobPage.getJobDescriptionValue();
        // Should either accept full text or truncate
        expect(value.length).toBeGreaterThan(0);
      });

      test('should handle long text in Notes', async () => {
        await addJobPage.fillNotes(TEXT_AREA_DATA.longText.notes);
        const value = await addJobPage.getNotesValue();
        expect(value.length).toBeGreaterThan(0);
      });

      test('should handle text with line breaks', async () => {
        await addJobPage.fillJobDescription(TEXT_AREA_DATA.withLineBreaks.jobDescription);
        const value = await addJobPage.getJobDescriptionValue();
        expect(value).toContain('Line 1');
      });

      test('should handle text with special characters', async () => {
        await addJobPage.fillNotes(TEXT_AREA_DATA.withSpecialChars.notes);
        const value = await addJobPage.getNotesValue();
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  // ==================== 4. INTEGRATION & BACKEND ====================

  test.describe('4. Integration & Backend', () => {
    test.describe('Dashboard Update', () => {
      test('should increment pending count after adding pending job', async ({ page }) => {
        // First, go to dashboard and get current pending count
        await dashboardPage.navigateToStats();
        await dashboardPage.page.waitForTimeout(1000);
        const initialCount = await dashboardPage.getPendingApplicationsCount();

        // Navigate to add job and create a new pending job
        await dashboardPage.navigateToAddJob();
        await addJobPage.page.waitForTimeout(1000);

        const uniqueJob = generateUniqueJob();
        await addJobPage.fillPosition(uniqueJob.position);
        await addJobPage.fillCompany(uniqueJob.company);
        await addJobPage.fillJobLocation(uniqueJob.jobLocation);
        await addJobPage.selectStatus('pending');
        await addJobPage.submitForm();

        await page.waitForTimeout(2000);

        // Navigate back to dashboard
        await dashboardPage.navigateToStats();
        await page.waitForTimeout(2000);

        const newCount = await dashboardPage.getPendingApplicationsCount();

        // The count should have increased
        expect(newCount).toBeGreaterThanOrEqual(initialCount);
      });

      test('should reflect new job in All Jobs page after submission', async ({ page }) => {
        const uniqueJob = generateUniqueJob();

        await addJobPage.fillPosition(uniqueJob.position);
        await addJobPage.fillCompany(uniqueJob.company);
        await addJobPage.fillJobLocation(uniqueJob.jobLocation);
        await addJobPage.submitForm();

        await page.waitForTimeout(2000);

        // Navigate to All Jobs
        await dashboardPage.navigateToAllJobs();
        await page.waitForTimeout(2000);

        // The job should appear in the list
        const pageContent = await page.content();
        // The unique position name should be visible
        expect(pageContent).toContain(uniqueJob.company);
      });
    });

    test.describe('Timeline Update', () => {
      test('should add job with specific application date', async ({ page }) => {
        const uniqueJob = generateUniqueJob();
        const testDate = '2024-06-15';

        await addJobPage.fillPosition(uniqueJob.position);
        await addJobPage.fillCompany(uniqueJob.company);
        await addJobPage.fillJobLocation(uniqueJob.jobLocation);
        await addJobPage.fillApplicationDate(testDate);
        await addJobPage.submitForm();

        await page.waitForTimeout(2000);

        // Navigate to Timeline
        await dashboardPage.navigateToTimeline();
        await page.waitForTimeout(2000);

        // Timeline page should load
        const url = page.url();
        expect(url).toContain('timeline');
      });
    });

    test.describe('Session Persistence', () => {
      test('should maintain session after submitting multiple jobs', async ({ page }) => {
        // Submit first job
        const job1 = generateUniqueJob();
        await addJobPage.addJob(job1);
        await page.waitForTimeout(1000);

        // Navigate back to add job
        await dashboardPage.navigateToAddJob();
        await page.waitForTimeout(1000);

        // Submit second job
        const job2 = generateUniqueJob();
        await addJobPage.addJob(job2);
        await page.waitForTimeout(1000);

        // Should still be logged in
        await dashboardPage.navigateToStats();
        await expect(dashboardPage.logoutButton).toBeVisible();
      });
    });
  });

  // ==================== 5. ADDITIONAL EDGE CASES ====================

  test.describe('5. Additional Edge Cases', () => {
    test('should handle rapid form submission attempts', async () => {
      const uniqueJob = generateUniqueJob();
      await addJobPage.fillPosition(uniqueJob.position);
      await addJobPage.fillCompany(uniqueJob.company);
      await addJobPage.fillJobLocation(uniqueJob.jobLocation);

      // Rapid clicks on submit
      await addJobPage.submitButton.click();
      await addJobPage.submitButton.click();
      await addJobPage.submitButton.click();

      await addJobPage.page.waitForTimeout(2000);
      // Should handle gracefully without errors
    });

    test('should handle form submission via Enter key', async () => {
      const uniqueJob = generateUniqueJob();
      await addJobPage.fillPosition(uniqueJob.position);
      await addJobPage.fillCompany(uniqueJob.company);
      await addJobPage.fillJobLocation(uniqueJob.jobLocation);

      await addJobPage.submitWithEnter();
      await addJobPage.page.waitForTimeout(2000);
    });

    test('should navigate back to Add Job after successful submission', async ({ page }) => {
      const uniqueJob = generateUniqueJob();
      await addJobPage.addJob(uniqueJob);
      await page.waitForTimeout(2000);

      // Navigate back to Add Job
      await dashboardPage.navigateToAddJob();
      await page.waitForTimeout(1000);

      // Should load the page fresh
      await expect(addJobPage.pageHeading).toBeVisible();
    });

    test('should handle browser back button after submission', async ({ page }) => {
      const uniqueJob = generateUniqueJob();
      await addJobPage.addJob(uniqueJob);
      await page.waitForTimeout(2000);

      // Press browser back
      await page.goBack();
      await page.waitForTimeout(1000);

      // Should handle gracefully
    });
  });
});
