# GitHub Actions CI/CD Setup Guide for Playwright Tests

This guide explains the GitHub Actions workflow configuration for running Playwright tests in the UI-Testing-Job4U project.

## Overview

GitHub Actions provides a free, integrated CI/CD solution that runs directly in your GitHub repository. The workflow is automatically triggered on pushes and pull requests.

## Workflow Features

| Feature | Description |
|---------|-------------|
| **Auto-trigger** | Runs on push to `main`/`develop` and on pull requests |
| **Manual trigger** | Run tests manually with browser selection |
| **Matrix testing** | Test across multiple browsers in parallel |
| **Sharded execution** | Split tests across multiple runners for faster execution |
| **Artifact storage** | HTML reports and test results saved for 30 days |
| **Caching** | npm dependencies cached for faster builds |

## Workflow Triggers

```yaml
on:
  push:
    branches: [main, develop]    # Auto-run on push
  pull_request:
    branches: [main]              # Auto-run on PR
  workflow_dispatch:              # Manual trigger with options
```

## Jobs Overview

### 1. `test` - Standard Test Run
- **Trigger:** Push to main/develop
- **Browser:** Chromium (configurable)
- **Duration:** ~10-15 minutes

### 2. `test-all-browsers` - Multi-Browser Testing
- **Trigger:** Manual only (select "all" browsers)
- **Browsers:** Chromium, Firefox, WebKit
- **Duration:** ~30-45 minutes

### 3. `test-sharded` - Parallel Sharded Tests
- **Trigger:** Pull requests only
- **Shards:** 2 parallel runners
- **Duration:** ~5-8 minutes (faster due to parallelization)

### 4. `merge-reports` - Combine Sharded Results
- **Trigger:** After sharded tests complete
- **Output:** Merged HTML report

## How to Use

### Automatic Runs
Tests run automatically when you:
- Push to `main` or `develop` branch
- Create or update a Pull Request to `main`

### Manual Trigger
1. Go to **Actions** tab in GitHub
2. Select **Playwright Tests** workflow
3. Click **Run workflow**
4. Choose browser option:
   - `chromium` (default, fastest)
   - `firefox`
   - `webkit`
   - `all` (runs all browsers)
5. Click **Run workflow**

## Viewing Results

### Test Status
- Check the **Actions** tab for workflow runs
- Green ✅ = all tests passed
- Red ❌ = some tests failed

### Downloading Reports
1. Go to the completed workflow run
2. Scroll to **Artifacts** section
3. Download:
   - `playwright-report-{browser}` - HTML report
   - `test-results-{browser}` - Raw test results

### Viewing HTML Report Locally
```bash
# Download and extract the artifact
unzip playwright-report-chromium.zip -d report

# Open in browser
npx playwright show-report report
```

## Workflow Configuration

### Enable Multi-Browser Matrix Testing
Edit `.github/workflows/playwright.yml`:

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]  # Uncomment this line
```

### Adjust Sharding
For larger test suites, increase shards:

```yaml
matrix:
  shardIndex: [1, 2, 3, 4]  # 4 parallel shards
  shardTotal: [4]
```

### Change Node.js Version
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change version here
```

### Modify Artifact Retention
```yaml
- name: Upload HTML Report
  uses: actions/upload-artifact@v4
  with:
    retention-days: 14  # Keep for 14 days instead of 30
```

## Environment Secrets

For tests requiring authentication or API keys:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets (e.g., `TEST_USER_PASSWORD`)
3. Use in workflow:

```yaml
- name: Run tests
  run: npx playwright test
  env:
    TEST_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
```

## Branch Protection Rules (Recommended)

Set up branch protection to require passing tests:

1. Go to **Settings** → **Branches**
2. Click **Add rule** for `main` branch
3. Enable:
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
4. Add status check: `Run Playwright Tests`

## Comparison: GitHub Actions vs Jenkins

| Feature | GitHub Actions | Jenkins |
|---------|---------------|---------|
| **Setup** | Zero config, built-in | Requires server setup |
| **Cost** | Free for public repos | Self-hosted (free) or cloud |
| **Maintenance** | Managed by GitHub | Self-maintained |
| **Customization** | YAML-based | Groovy/UI-based |
| **Scaling** | Auto-scales | Manual scaling |
| **Integration** | Native GitHub | Plugin-based |

### When to Use GitHub Actions
- ✅ Open source projects
- ✅ Quick setup needed
- ✅ Small to medium teams
- ✅ GitHub-centric workflow

### When to Use Jenkins
- ✅ Complex enterprise pipelines
- ✅ On-premise requirements
- ✅ Custom infrastructure needs
- ✅ Legacy system integration

## Troubleshooting

### Common Issues

#### 1. Tests timeout
```yaml
jobs:
  test:
    timeout-minutes: 60  # Increase timeout
```

#### 2. Browser install fails
```yaml
- name: Install Playwright Browsers
  run: npx playwright install --with-deps chromium
  # The --with-deps flag installs system dependencies
```

#### 3. Flaky tests
```yaml
# In playwright.config.ts
retries: process.env.CI ? 2 : 0,  # Retry failed tests in CI
```

#### 4. Out of disk space
```yaml
- name: Free disk space
  run: |
    sudo rm -rf /usr/share/dotnet
    sudo rm -rf /opt/ghc
```

### Debug Mode
Add debug step to workflow:
```yaml
- name: Debug info
  run: |
    echo "Node version: $(node --version)"
    echo "npm version: $(npm --version)"
    echo "Working directory: $(pwd)"
    ls -la
```

## Badge for README

Add test status badge to your README:

```markdown
![Playwright Tests](https://github.com/anhhoangt/UI-Testing-Job4U/actions/workflows/playwright.yml/badge.svg)
```

Result: ![Playwright Tests](https://github.com/anhhoangt/UI-Testing-Job4U/actions/workflows/playwright.yml/badge.svg)

## File Structure

```
.github/
└── workflows/
    └── playwright.yml    # GitHub Actions workflow
```

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI/CD Guide](https://playwright.dev/docs/ci-intro)
- [actions/checkout](https://github.com/actions/checkout)
- [actions/setup-node](https://github.com/actions/setup-node)
- [actions/upload-artifact](https://github.com/actions/upload-artifact)
