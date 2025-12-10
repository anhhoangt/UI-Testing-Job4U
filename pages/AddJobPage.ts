import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Job data interface for type safety
 */
export interface JobData {
  position: string;
  company: string;
  jobLocation: string;
  status?: string;
  jobType?: string;
  salaryMin?: string;
  salaryMax?: string;
  currency?: string;
  applicationDate?: string;
  applicationDeadline?: string;
  applicationMethod?: string;
  priority?: string;
  companyWebsite?: string;
  jobPostingUrl?: string;
  jobDescription?: string;
  notes?: string;
}

export class AddJobPage extends BasePage {
  // Page heading
  readonly pageHeading: Locator;

  // Form inputs - Basic fields
  readonly positionInput: Locator;
  readonly companyInput: Locator;
  readonly jobLocationInput: Locator;

  // Salary fields
  readonly salaryMinInput: Locator;
  readonly salaryMaxInput: Locator;

  // URL fields
  readonly companyWebsiteInput: Locator;
  readonly jobPostingUrlInput: Locator;

  // Text areas
  readonly jobDescriptionTextarea: Locator;
  readonly notesTextarea: Locator;

  // Date pickers
  readonly applicationDateInput: Locator;
  readonly applicationDeadlineInput: Locator;
  readonly applicationDateCalendarIcon: Locator;
  readonly applicationDeadlineCalendarIcon: Locator;

  // Dropdowns
  readonly statusSelect: Locator;
  readonly jobTypeSelect: Locator;
  readonly currencySelect: Locator;
  readonly applicationMethodSelect: Locator;
  readonly prioritySelect: Locator;

  // Buttons
  readonly submitButton: Locator;
  readonly clearButton: Locator;

  // Alert/Toast messages
  readonly alertMessage: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly toastNotification: Locator;

  // Form container
  readonly form: Locator;
  readonly formRow: Locator;

  // Sidebar navigation (for active state check)
  readonly addJobNavLink: Locator;

  // Labels
  readonly positionLabel: Locator;
  readonly companyLabel: Locator;
  readonly jobLocationLabel: Locator;
  readonly statusLabel: Locator;
  readonly jobTypeLabel: Locator;
  readonly salaryMinLabel: Locator;
  readonly salaryMaxLabel: Locator;

  constructor(page: Page) {
    super(page);

    // Page heading
    this.pageHeading = page.getByRole('heading', { name: /add job/i });

    // Form inputs by name attribute - Basic fields
    this.positionInput = page.locator('input[name="position"]');
    this.companyInput = page.locator('input[name="company"]');
    this.jobLocationInput = page.locator('input[name="jobLocation"]');

    // Salary fields
    this.salaryMinInput = page.locator('input[name="salaryMin"]');
    this.salaryMaxInput = page.locator('input[name="salaryMax"]');

    // URL fields
    this.companyWebsiteInput = page.locator('input[name="companyWebsite"]');
    this.jobPostingUrlInput = page.locator('input[name="jobPostingUrl"]');

    // Text areas
    this.jobDescriptionTextarea = page.locator('textarea[name="jobDescription"]');
    this.notesTextarea = page.locator('textarea[name="notes"]');

    // Date pickers
    this.applicationDateInput = page.locator('input[name="applicationDate"]');
    this.applicationDeadlineInput = page.locator('input[name="applicationDeadline"]');
    this.applicationDateCalendarIcon = page.locator('input[name="applicationDate"] + svg, input[name="applicationDate"] ~ button');
    this.applicationDeadlineCalendarIcon = page.locator('input[name="applicationDeadline"] + svg, input[name="applicationDeadline"] ~ button');

    // Dropdowns by name attribute
    this.statusSelect = page.locator('select[name="status"]');
    this.jobTypeSelect = page.locator('select[name="jobType"]');
    this.currencySelect = page.locator('select[name="currency"]');
    this.applicationMethodSelect = page.locator('select[name="applicationMethod"]');
    this.prioritySelect = page.locator('select[name="priority"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /submit/i });
    this.clearButton = page.getByRole('button', { name: /clear/i });

    // Alert messages
    this.alertMessage = page.locator('.alert');
    this.successMessage = page.locator('.alert-success, .alert.alert-success');
    this.errorMessage = page.locator('.alert-danger, .alert.alert-danger');
    this.toastNotification = page.locator('.Toastify__toast, .toast, [class*="toast"]');

    // Form container
    this.form = page.locator('form');
    this.formRow = page.locator('.form-row');

    // Sidebar navigation
    this.addJobNavLink = page.getByRole('link', { name: /add job/i });

    // Labels
    this.positionLabel = page.locator('label').filter({ hasText: /position/i }).first();
    this.companyLabel = page.locator('label').filter({ hasText: /company/i }).first();
    this.jobLocationLabel = page.locator('label').filter({ hasText: /job location/i }).first();
    this.statusLabel = page.locator('label').filter({ hasText: /status/i }).first();
    this.jobTypeLabel = page.locator('label').filter({ hasText: /job type/i }).first();
    this.salaryMinLabel = page.locator('label').filter({ hasText: /salary.*min/i }).first();
    this.salaryMaxLabel = page.locator('label').filter({ hasText: /salary.*max/i }).first();
  }

  // ==================== NAVIGATION ====================

  async goto(): Promise<void> {
    await this.navigate('/add-job');
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== BASIC FORM INPUT METHODS ====================

  async fillPosition(position: string): Promise<void> {
    await this.positionInput.fill(position);
  }

  async fillCompany(company: string): Promise<void> {
    await this.companyInput.fill(company);
  }

  async fillJobLocation(location: string): Promise<void> {
    await this.jobLocationInput.fill(location);
  }

  // ==================== SALARY METHODS ====================

  async fillSalaryMin(salary: string): Promise<void> {
    await this.salaryMinInput.fill(salary);
  }

  async fillSalaryMax(salary: string): Promise<void> {
    await this.salaryMaxInput.fill(salary);
  }

  async getSalaryMinValue(): Promise<string> {
    return await this.salaryMinInput.inputValue();
  }

  async getSalaryMaxValue(): Promise<string> {
    return await this.salaryMaxInput.inputValue();
  }

  // ==================== URL METHODS ====================

  async fillCompanyWebsite(url: string): Promise<void> {
    await this.companyWebsiteInput.fill(url);
  }

  async fillJobPostingUrl(url: string): Promise<void> {
    await this.jobPostingUrlInput.fill(url);
  }

  async getCompanyWebsiteValue(): Promise<string> {
    return await this.companyWebsiteInput.inputValue();
  }

  async getJobPostingUrlValue(): Promise<string> {
    return await this.jobPostingUrlInput.inputValue();
  }

  // ==================== TEXT AREA METHODS ====================

  async fillJobDescription(description: string): Promise<void> {
    await this.jobDescriptionTextarea.fill(description);
  }

  async fillNotes(notes: string): Promise<void> {
    await this.notesTextarea.fill(notes);
  }

  async getJobDescriptionValue(): Promise<string> {
    return await this.jobDescriptionTextarea.inputValue();
  }

  async getNotesValue(): Promise<string> {
    return await this.notesTextarea.inputValue();
  }

  // ==================== DATE PICKER METHODS ====================

  async fillApplicationDate(date: string): Promise<void> {
    await this.applicationDateInput.fill(date);
  }

  async fillApplicationDeadline(date: string): Promise<void> {
    await this.applicationDeadlineInput.fill(date);
  }

  async getApplicationDateValue(): Promise<string> {
    return await this.applicationDateInput.inputValue();
  }

  async getApplicationDeadlineValue(): Promise<string> {
    return await this.applicationDeadlineInput.inputValue();
  }

  async openApplicationDateCalendar(): Promise<void> {
    await this.applicationDateInput.click();
  }

  async openApplicationDeadlineCalendar(): Promise<void> {
    await this.applicationDeadlineInput.click();
  }

  // ==================== DROPDOWN METHODS ====================

  async selectStatus(status: string): Promise<void> {
    await this.statusSelect.selectOption(status);
  }

  async selectJobType(jobType: string): Promise<void> {
    await this.jobTypeSelect.selectOption(jobType);
  }

  async selectCurrency(currency: string): Promise<void> {
    await this.currencySelect.selectOption(currency);
  }

  async selectApplicationMethod(method: string): Promise<void> {
    await this.applicationMethodSelect.selectOption(method);
  }

  async selectPriority(priority: string): Promise<void> {
    await this.prioritySelect.selectOption(priority);
  }

  async getSelectedStatus(): Promise<string> {
    return await this.statusSelect.inputValue();
  }

  async getSelectedJobType(): Promise<string> {
    return await this.jobTypeSelect.inputValue();
  }

  async getSelectedCurrency(): Promise<string> {
    return await this.currencySelect.inputValue();
  }

  async getSelectedApplicationMethod(): Promise<string> {
    return await this.applicationMethodSelect.inputValue();
  }

  async getSelectedPriority(): Promise<string> {
    return await this.prioritySelect.inputValue();
  }

  // ==================== DROPDOWN OPTIONS ====================

  async getStatusOptions(): Promise<string[]> {
    const options = await this.statusSelect.locator('option').allTextContents();
    return options.map((opt) => opt.trim());
  }

  async getJobTypeOptions(): Promise<string[]> {
    const options = await this.jobTypeSelect.locator('option').allTextContents();
    return options.map((opt) => opt.trim());
  }

  async getCurrencyOptions(): Promise<string[]> {
    const options = await this.currencySelect.locator('option').allTextContents();
    return options.map((opt) => opt.trim());
  }

  async getApplicationMethodOptions(): Promise<string[]> {
    const options = await this.applicationMethodSelect.locator('option').allTextContents();
    return options.map((opt) => opt.trim());
  }

  async getPriorityOptions(): Promise<string[]> {
    const options = await this.prioritySelect.locator('option').allTextContents();
    return options.map((opt) => opt.trim());
  }

  // ==================== COMPOSITE FORM METHODS ====================

  async fillJobForm(jobData: JobData): Promise<void> {
    await this.fillPosition(jobData.position);
    await this.fillCompany(jobData.company);
    await this.fillJobLocation(jobData.jobLocation);

    if (jobData.status) {
      await this.selectStatus(jobData.status);
    }
    if (jobData.jobType) {
      await this.selectJobType(jobData.jobType);
    }
    if (jobData.salaryMin) {
      await this.fillSalaryMin(jobData.salaryMin);
    }
    if (jobData.salaryMax) {
      await this.fillSalaryMax(jobData.salaryMax);
    }
    if (jobData.currency) {
      await this.selectCurrency(jobData.currency);
    }
    if (jobData.applicationDate) {
      await this.fillApplicationDate(jobData.applicationDate);
    }
    if (jobData.applicationDeadline) {
      await this.fillApplicationDeadline(jobData.applicationDeadline);
    }
    if (jobData.applicationMethod) {
      await this.selectApplicationMethod(jobData.applicationMethod);
    }
    if (jobData.priority) {
      await this.selectPriority(jobData.priority);
    }
    if (jobData.companyWebsite) {
      await this.fillCompanyWebsite(jobData.companyWebsite);
    }
    if (jobData.jobPostingUrl) {
      await this.fillJobPostingUrl(jobData.jobPostingUrl);
    }
    if (jobData.jobDescription) {
      await this.fillJobDescription(jobData.jobDescription);
    }
    if (jobData.notes) {
      await this.fillNotes(jobData.notes);
    }
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async addJob(jobData: JobData): Promise<void> {
    await this.fillJobForm(jobData);
    await this.submitForm();
  }

  async clickClearButton(): Promise<void> {
    await this.clearButton.click();
  }

  async clearAllFields(): Promise<void> {
    await this.positionInput.clear();
    await this.companyInput.clear();
    await this.jobLocationInput.clear();
    if (await this.salaryMinInput.isVisible()) {
      await this.salaryMinInput.clear();
    }
    if (await this.salaryMaxInput.isVisible()) {
      await this.salaryMaxInput.clear();
    }
    if (await this.companyWebsiteInput.isVisible()) {
      await this.companyWebsiteInput.clear();
    }
    if (await this.jobPostingUrlInput.isVisible()) {
      await this.jobPostingUrlInput.clear();
    }
    if (await this.jobDescriptionTextarea.isVisible()) {
      await this.jobDescriptionTextarea.clear();
    }
    if (await this.notesTextarea.isVisible()) {
      await this.notesTextarea.clear();
    }
  }

  // ==================== GETTER METHODS ====================

  async getPositionValue(): Promise<string> {
    return await this.positionInput.inputValue();
  }

  async getCompanyValue(): Promise<string> {
    return await this.companyInput.inputValue();
  }

  async getJobLocationValue(): Promise<string> {
    return await this.jobLocationInput.inputValue();
  }

  async getFormValues(): Promise<JobData> {
    return {
      position: await this.getPositionValue(),
      company: await this.getCompanyValue(),
      jobLocation: await this.getJobLocationValue(),
      status: await this.getSelectedStatus(),
      jobType: await this.getSelectedJobType(),
    };
  }

  // ==================== VERIFICATION METHODS ====================

  async verifyFormIsEmpty(): Promise<void> {
    await expect(this.positionInput).toHaveValue('');
    await expect(this.companyInput).toHaveValue('');
  }

  async verifyFormValues(expectedData: Partial<JobData>): Promise<void> {
    if (expectedData.position !== undefined) {
      await expect(this.positionInput).toHaveValue(expectedData.position);
    }
    if (expectedData.company !== undefined) {
      await expect(this.companyInput).toHaveValue(expectedData.company);
    }
    if (expectedData.jobLocation !== undefined) {
      await expect(this.jobLocationInput).toHaveValue(expectedData.jobLocation);
    }
    if (expectedData.status !== undefined) {
      await expect(this.statusSelect).toHaveValue(expectedData.status);
    }
    if (expectedData.jobType !== undefined) {
      await expect(this.jobTypeSelect).toHaveValue(expectedData.jobType);
    }
  }

  async verifyDefaultValues(): Promise<void> {
    // Verify default values as specified in requirements
    const jobLocation = await this.getJobLocationValue();
    const status = await this.getSelectedStatus();
    const jobType = await this.getSelectedJobType();

    expect(jobLocation.toLowerCase()).toContain('my city');
    expect(status).toBe('pending');
    expect(jobType).toBe('full-time');

    // Check additional defaults if dropdowns exist
    if (await this.currencySelect.isVisible()) {
      const currency = await this.getSelectedCurrency();
      expect(currency.toUpperCase()).toContain('USD');
    }
    if (await this.applicationMethodSelect.isVisible()) {
      const method = await this.getSelectedApplicationMethod();
      expect(method.toLowerCase()).toContain('website');
    }
    if (await this.prioritySelect.isVisible()) {
      const priority = await this.getSelectedPriority();
      expect(priority.toLowerCase()).toContain('medium');
    }
  }

  // ==================== VISIBILITY CHECKS ====================

  async isFormVisible(): Promise<boolean> {
    return await this.form.isVisible();
  }

  async areAllBasicFieldsVisible(): Promise<boolean> {
    const positionVisible = await this.positionInput.isVisible();
    const companyVisible = await this.companyInput.isVisible();
    const locationVisible = await this.jobLocationInput.isVisible();
    const statusVisible = await this.statusSelect.isVisible();
    const jobTypeVisible = await this.jobTypeSelect.isVisible();

    return positionVisible && companyVisible && locationVisible && statusVisible && jobTypeVisible;
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    return await this.submitButton.isEnabled();
  }

  async isClearButtonVisible(): Promise<boolean> {
    return await this.clearButton.isVisible();
  }

  // ==================== NAVIGATION STATE ====================

  async isAddJobNavLinkActive(): Promise<boolean> {
    const classAttribute = await this.addJobNavLink.getAttribute('class');
    return classAttribute?.includes('active') || false;
  }

  async getAddJobNavLinkColor(): Promise<string> {
    const color = await this.addJobNavLink.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    return color;
  }

  async getAddJobNavLinkBackgroundColor(): Promise<string> {
    const bgColor = await this.addJobNavLink.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    return bgColor;
  }

  // ==================== BUTTON STYLE CHECKS ====================

  async getSubmitButtonBackgroundColor(): Promise<string> {
    const bgColor = await this.submitButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    return bgColor;
  }

  async getClearButtonBackgroundColor(): Promise<string> {
    const bgColor = await this.clearButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    return bgColor;
  }

  // ==================== MESSAGE HANDLING ====================

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async isToastVisible(): Promise<boolean> {
    return await this.toastNotification.isVisible();
  }

  async getAlertMessage(): Promise<string> {
    await this.alertMessage.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.alertMessage.textContent()) || '';
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.errorMessage.textContent()) || '';
  }

  async getToastMessage(): Promise<string> {
    await this.toastNotification.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.toastNotification.textContent()) || '';
  }

  async waitForSuccessMessage(timeout: number = 5000): Promise<void> {
    await this.successMessage.waitFor({ state: 'visible', timeout });
  }

  async waitForErrorMessage(timeout: number = 5000): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible', timeout });
  }

  async waitForToast(timeout: number = 5000): Promise<void> {
    await this.toastNotification.waitFor({ state: 'visible', timeout });
  }

  // ==================== FORM LAYOUT ====================

  async getFormRowCount(): Promise<number> {
    return await this.formRow.count();
  }

  async isGridLayout(): Promise<boolean> {
    const formDisplay = await this.form.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.display;
    });
    return formDisplay === 'grid' || formDisplay === 'flex';
  }

  // ==================== KEYBOARD NAVIGATION ====================

  async submitWithEnter(): Promise<void> {
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async tabThroughFields(): Promise<void> {
    await this.positionInput.focus();
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
  }

  // ==================== PAGE STATE ====================

  async getPageHeadingText(): Promise<string> {
    return (await this.pageHeading.textContent()) || '';
  }

  async isPageLoaded(): Promise<boolean> {
    return await this.pageHeading.isVisible();
  }
}
