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
}

export class AddJobPage extends BasePage {
  // Page heading
  readonly pageHeading: Locator;

  // Form inputs
  readonly positionInput: Locator;
  readonly companyInput: Locator;
  readonly jobLocationInput: Locator;

  // Dropdowns
  readonly statusSelect: Locator;
  readonly jobTypeSelect: Locator;

  // Buttons
  readonly submitButton: Locator;
  readonly clearButton: Locator;

  // Alert/Toast messages
  readonly alertMessage: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  // Form container
  readonly form: Locator;

  // Labels
  readonly positionLabel: Locator;
  readonly companyLabel: Locator;
  readonly jobLocationLabel: Locator;
  readonly statusLabel: Locator;
  readonly jobTypeLabel: Locator;

  constructor(page: Page) {
    super(page);

    // Page heading
    this.pageHeading = page.getByRole('heading', { name: /add job/i });

    // Form inputs by name attribute
    this.positionInput = page.locator('input[name="position"]');
    this.companyInput = page.locator('input[name="company"]');
    this.jobLocationInput = page.locator('input[name="jobLocation"]');

    // Dropdowns by name attribute
    this.statusSelect = page.locator('select[name="status"]');
    this.jobTypeSelect = page.locator('select[name="jobType"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /submit/i });
    this.clearButton = page.getByRole('button', { name: /clear/i });

    // Alert messages
    this.alertMessage = page.locator('.alert');
    this.successMessage = page.locator('.alert-success, .alert.alert-success');
    this.errorMessage = page.locator('.alert-danger, .alert.alert-danger');

    // Form container
    this.form = page.locator('form');

    // Labels
    this.positionLabel = page.getByText('position', { exact: false }).first();
    this.companyLabel = page.getByText('company', { exact: false }).first();
    this.jobLocationLabel = page.getByText('job location', { exact: false }).first();
    this.statusLabel = page.getByText('status', { exact: false }).first();
    this.jobTypeLabel = page.getByText('job type', { exact: false }).first();
  }

  /**
   * Navigate to Add Job page directly
   */
  async goto(): Promise<void> {
    await this.navigate('/add-job');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill the position input field
   */
  async fillPosition(position: string): Promise<void> {
    await this.positionInput.fill(position);
  }

  /**
   * Fill the company input field
   */
  async fillCompany(company: string): Promise<void> {
    await this.companyInput.fill(company);
  }

  /**
   * Fill the job location input field
   */
  async fillJobLocation(location: string): Promise<void> {
    await this.jobLocationInput.fill(location);
  }

  /**
   * Select job status from dropdown
   */
  async selectStatus(status: string): Promise<void> {
    await this.statusSelect.selectOption(status);
  }

  /**
   * Select job type from dropdown
   */
  async selectJobType(jobType: string): Promise<void> {
    await this.jobTypeSelect.selectOption(jobType);
  }

  /**
   * Fill the entire job form
   */
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
  }

  /**
   * Submit the job form
   */
  async submitForm(): Promise<void> {
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill and submit the job form in one action
   */
  async addJob(jobData: JobData): Promise<void> {
    await this.fillJobForm(jobData);
    await this.submitForm();
  }

  /**
   * Clear the form (if clear button exists)
   */
  async clearForm(): Promise<void> {
    if (await this.clearButton.isVisible()) {
      await this.clearButton.click();
    }
  }

  /**
   * Clear all input fields manually
   */
  async clearAllFields(): Promise<void> {
    await this.positionInput.clear();
    await this.companyInput.clear();
    await this.jobLocationInput.clear();
  }

  /**
   * Get the current value of position input
   */
  async getPositionValue(): Promise<string> {
    return await this.positionInput.inputValue();
  }

  /**
   * Get the current value of company input
   */
  async getCompanyValue(): Promise<string> {
    return await this.companyInput.inputValue();
  }

  /**
   * Get the current value of job location input
   */
  async getJobLocationValue(): Promise<string> {
    return await this.jobLocationInput.inputValue();
  }

  /**
   * Get the currently selected status
   */
  async getSelectedStatus(): Promise<string> {
    return await this.statusSelect.inputValue();
  }

  /**
   * Get the currently selected job type
   */
  async getSelectedJobType(): Promise<string> {
    return await this.jobTypeSelect.inputValue();
  }

  /**
   * Get all available status options
   */
  async getStatusOptions(): Promise<string[]> {
    const options = await this.statusSelect.locator('option').allTextContents();
    return options.map((opt) => opt.trim());
  }

  /**
   * Get all available job type options
   */
  async getJobTypeOptions(): Promise<string[]> {
    const options = await this.jobTypeSelect.locator('option').allTextContents();
    return options.map((opt) => opt.trim());
  }

  /**
   * Check if form is displayed
   */
  async isFormVisible(): Promise<boolean> {
    return await this.form.isVisible();
  }

  /**
   * Check if success message is displayed
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Get the alert message text
   */
  async getAlertMessage(): Promise<string> {
    await this.alertMessage.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.alertMessage.textContent()) || '';
  }

  /**
   * Get the success message text
   */
  async getSuccessMessage(): Promise<string> {
    await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.successMessage.textContent()) || '';
  }

  /**
   * Get the error message text
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.errorMessage.textContent()) || '';
  }

  /**
   * Wait for success message to appear
   */
  async waitForSuccessMessage(timeout: number = 5000): Promise<void> {
    await this.successMessage.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for error message to appear
   */
  async waitForErrorMessage(timeout: number = 5000): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible', timeout });
  }

  /**
   * Check if all required fields are visible
   */
  async areAllFieldsVisible(): Promise<boolean> {
    const positionVisible = await this.positionInput.isVisible();
    const companyVisible = await this.companyInput.isVisible();
    const locationVisible = await this.jobLocationInput.isVisible();
    const statusVisible = await this.statusSelect.isVisible();
    const jobTypeVisible = await this.jobTypeSelect.isVisible();

    return positionVisible && companyVisible && locationVisible && statusVisible && jobTypeVisible;
  }

  /**
   * Check if submit button is enabled
   */
  async isSubmitButtonEnabled(): Promise<boolean> {
    return await this.submitButton.isEnabled();
  }

  /**
   * Get all form field values as an object
   */
  async getFormValues(): Promise<JobData> {
    return {
      position: await this.getPositionValue(),
      company: await this.getCompanyValue(),
      jobLocation: await this.getJobLocationValue(),
      status: await this.getSelectedStatus(),
      jobType: await this.getSelectedJobType(),
    };
  }

  /**
   * Verify form is empty/reset
   */
  async verifyFormIsEmpty(): Promise<void> {
    await expect(this.positionInput).toHaveValue('');
    await expect(this.companyInput).toHaveValue('');
    await expect(this.jobLocationInput).toHaveValue('');
  }

  /**
   * Verify form values match expected data
   */
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

  /**
   * Type in position field character by character (for testing input behavior)
   */
  async typePosition(position: string): Promise<void> {
    await this.positionInput.pressSequentially(position);
  }

  /**
   * Type in company field character by character
   */
  async typeCompany(company: string): Promise<void> {
    await this.companyInput.pressSequentially(company);
  }

  /**
   * Type in job location field character by character
   */
  async typeJobLocation(location: string): Promise<void> {
    await this.jobLocationInput.pressSequentially(location);
  }

  /**
   * Press Enter to submit form
   */
  async submitWithEnter(): Promise<void> {
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Tab through form fields
   */
  async tabThroughFields(): Promise<void> {
    await this.positionInput.focus();
    await this.page.keyboard.press('Tab'); // to company
    await this.page.keyboard.press('Tab'); // to location
    await this.page.keyboard.press('Tab'); // to status
    await this.page.keyboard.press('Tab'); // to job type
    await this.page.keyboard.press('Tab'); // to submit button
  }

  /**
   * Get the page heading text
   */
  async getPageHeadingText(): Promise<string> {
    return (await this.pageHeading.textContent()) || '';
  }

  /**
   * Check if page is loaded successfully
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.pageHeading.isVisible();
  }
}
