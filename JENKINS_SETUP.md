# Jenkins CI/CD Setup Guide for Playwright Tests

This guide explains how to configure Jenkins to run Playwright tests for the UI-Testing-Job4U project.

## Prerequisites

1. **Jenkins Installation** (version 2.387+)
2. **Required Jenkins Plugins:**
   - [NodeJS Plugin](https://plugins.jenkins.io/nodejs/)
   - [HTML Publisher Plugin](https://plugins.jenkins.io/htmlpublisher/)
   - [JUnit Plugin](https://plugins.jenkins.io/junit/) (usually pre-installed)
   - [Pipeline Plugin](https://plugins.jenkins.io/workflow-aggregator/)
   - [Git Plugin](https://plugins.jenkins.io/git/)
   - [Workspace Cleanup Plugin](https://plugins.jenkins.io/ws-cleanup/)

## Jenkins Configuration Steps

### Step 1: Install Required Plugins.........

1. Go to **Manage Jenkins** → **Manage Plugins**
2. Click on **Available** tab
3. Search and install:
   - NodeJS
   - HTML Publisher
   - Pipeline
   - Workspace Cleanup

### Step 2: Configure NodeJS

1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Scroll to **NodeJS**
3. Click **Add NodeJS**
4. Configure:
   - **Name:** `NodeJS-18` (must match the name in Jenkinsfile)
   - **Version:** Select Node.js 18.x or later
   - Check **Install automatically**
5. Click **Save**

### Step 3: Create Jenkins Pipeline Job

1. Click **New Item**
2. Enter job name: `UI-Testing-Job4U`
3. Select **Pipeline**
4. Click **OK**

### Step 4: Configure Pipeline

#### Option A: Pipeline from SCM (Recommended)

1. In the job configuration, scroll to **Pipeline** section
2. Select **Pipeline script from SCM**
3. Configure:
   - **SCM:** Git
   - **Repository URL:** `https://github.com/anhhoangt/UI-Testing-Job4U.git`
   - **Branch Specifier:** `*/main`
   - **Script Path:** `Jenkinsfile`
4. Click **Save**

#### Option B: Webhook for Automatic Builds (Optional)

1. In GitHub repository, go to **Settings** → **Webhooks**
2. Add webhook:
   - **Payload URL:** `http://your-jenkins-url/github-webhook/`
   - **Content type:** `application/json`
   - **Events:** Select "Just the push event"
3. In Jenkins job configuration:
   - Check **GitHub hook trigger for GITScm polling**

## Pipeline Stages

The Jenkinsfile defines the following stages:

| Stage | Description |
|-------|-------------|
| **Checkout** | Clone the repository |
| **Install Dependencies** | Run `npm ci` to install packages |
| **Install Playwright Browsers** | Install Chromium browser for tests |
| **Run Tests** | Execute Playwright tests with HTML and JUnit reporters |

## Test Reports

After each build, two types of reports are available:

### 1. HTML Report
- Click on **Playwright HTML Report** in the job sidebar
- Interactive report with test details, screenshots, and traces

### 2. JUnit Test Results
- View in **Test Result** section
- Trend graphs for test pass/fail rates
- Integration with Jenkins Test Results Analyzer

## NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run test` | Run all tests locally |
| `npm run test:ci` | Run tests in CI mode (Chromium only, with reporters) |
| `npm run test:ci:all` | Run tests on all browsers in CI mode |
| `npm run test:headed` | Run tests with browser visible |
| `npm run test:debug` | Run tests in debug mode |
| `npm run report` | Open HTML report |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CI` | Set to `true` in CI environment | `true` |
| `PLAYWRIGHT_BROWSERS_PATH` | Browser installation path | `0` (default) |

## Troubleshooting

### Common Issues

#### 1. NodeJS not found
**Error:** `Tool type 'nodejs' not found`

**Solution:** 
- Ensure NodeJS plugin is installed
- Verify the NodeJS tool name in Global Tool Configuration matches `NodeJS-18`

#### 2. Browser installation fails
**Error:** `Failed to install browsers`

**Solution:**
```bash
# Install system dependencies (Linux)
npx playwright install-deps chromium
```

#### 3. Tests timeout
**Error:** `Test timeout of 30000ms exceeded`

**Solution:**
- Increase timeout in `playwright.config.ts`
- Check if target application is accessible from Jenkins server

#### 4. HTML Report not accessible
**Error:** `Blank page when viewing HTML report`

**Solution:**
1. Go to **Manage Jenkins** → **Script Console**
2. Run:
```groovy
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
```

### Debug Pipeline

To debug pipeline issues:
1. Add `sh 'env'` to see all environment variables
2. Add `sh 'pwd && ls -la'` to check workspace
3. Use `catchError(buildResult: 'UNSTABLE')` to continue on failure

## Docker Alternative (Optional)

If you prefer Docker, create this `docker-compose.yml`:

```yaml
version: '3.8'
services:
  playwright:
    image: mcr.microsoft.com/playwright:v1.40.0-jammy
    working_dir: /app
    volumes:
      - .:/app
    command: npm run test:ci
    environment:
      - CI=true
```

Run with: `docker-compose run playwright`

## Project Structure

```
UI-Testing-Job4U/
├── Jenkinsfile              # Jenkins pipeline definition
├── playwright.config.ts     # Playwright configuration
├── package.json             # NPM scripts and dependencies
├── pages/                   # Page Object Models
│   ├── BasePage.ts
│   ├── AuthPage.ts
│   ├── DashboardPage.ts
│   └── LandingPage.ts
├── tests/                   # Test files
│   ├── auth-page.spec.ts
│   ├── auth-page-negative.spec.ts
│   ├── dashboard-page.spec.ts
│   ├── landing-page.spec.ts
│   └── test-data/
│       ├── auth.data.ts
│       └── dashboard.data.ts
├── playwright-report/       # HTML test report (generated)
└── test-results/            # Test artifacts & JUnit XML (generated)
```

## Support

For issues with this setup, check:
1. [Playwright CI/CD Documentation](https://playwright.dev/docs/ci)
2. [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
