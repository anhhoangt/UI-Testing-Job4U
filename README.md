# UI-Testing-Job4U

![Playwright Tests](https://github.com/anhhoangt/UI-Testing-Job4U/actions/workflows/playwright.yml/badge.svg)

End-to-end UI testing project for JobTrack4U application using Playwright and TypeScript.

## 🚀 Features

- **Page Object Model (POM)** architecture for maintainable tests
- **TypeScript** for type safety and better IDE support
- **Multi-browser testing** (Chromium, Firefox, WebKit)
- **CI/CD Integration** with GitHub Actions and Jenkins
- **Comprehensive test coverage** for authentication, dashboard, and landing pages

## 📁 Project Structure

```
UI-Testing-Job4U/
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions workflow
├── pages/                      # Page Object Models
│   ├── BasePage.ts
│   ├── AuthPage.ts
│   ├── DashboardPage.ts
│   └── LandingPage.ts
├── tests/                      # Test files
│   ├── auth-page.spec.ts
│   ├── auth-page-negative.spec.ts
│   ├── dashboard-page.spec.ts
│   ├── landing-page.spec.ts
│   └── test-data/
│       ├── auth.data.ts
│       └── dashboard.data.ts
├── Jenkinsfile                 # Jenkins pipeline
├── playwright.config.ts        # Playwright configuration
├── package.json
├── JENKINS_SETUP.md           # Jenkins setup guide
└── GITHUB_ACTIONS_SETUP.md    # GitHub Actions setup guide
```

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/anhhoangt/UI-Testing-Job4U.git
cd UI-Testing-Job4U

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests on specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run tests for CI (with reporters)
npm run test:ci

# View HTML report
npm run report
```

## 📊 Test Coverage

| Module | Test Cases | Coverage |
|--------|-----------|----------|
| **Authentication** | Login, Register, Form Toggle | Happy path + Negative tests |
| **Dashboard** | UI Layout, Navigation, Charts, Stats Cards | UI + Functional + Data + Edge Cases |
| **Landing Page** | Hero Section, Features, Navigation | Visual + Functional |

### Dashboard Test Categories

1. **UI & Visual Verification**
   - Layout structure (sidebar, header, cards, chart)
   - Sidebar navigation elements
   - Responsive design (mobile, tablet, desktop)

2. **Functional Tests**
   - Sidebar navigation links
   - Chart toggle functionality
   - User profile menu

3. **Data Validation**
   - Summary cards counters
   - Chart data accuracy
   - Empty state handling

4. **Edge Cases**
   - Long user names
   - Zero stats display
   - Rapid interactions
   - Viewport resizing

## 🔄 CI/CD Integration

### GitHub Actions (Recommended)
Tests run automatically on:
- Push to `main` or `develop` branch
- Pull requests to `main`
- Manual trigger with browser selection

See [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md) for details.

### Jenkins
Alternative for enterprise/on-premise setups.

See [JENKINS_SETUP.md](./JENKINS_SETUP.md) for details.

## ⚙️ Configuration

### Playwright Config (`playwright.config.ts`)

| Setting | Value |
|---------|-------|
| Test timeout | 30 seconds |
| Expect timeout | 10 seconds |
| Retries (CI) | 2 |
| Workers (CI) | 1 |
| Browsers | Chromium, Firefox, WebKit |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `CI` | Set to `true` in CI environment |
| `BASE_URL` | Target application URL |

## 📝 Writing Tests

### Using Page Objects

```typescript
import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';

test('should login successfully', async ({ page }) => {
  const authPage = new AuthPage(page);
  const dashboardPage = new DashboardPage(page);

  await authPage.goto();
  await authPage.login('user@example.com', 'password');

  await expect(dashboardPage.dashboardHeading).toBeVisible();
});
```

### Using Test Data

```typescript
import { VALID_LOGIN_DATA } from './test-data/auth.data';

test('login with valid credentials', async ({ page }) => {
  await authPage.login(VALID_LOGIN_DATA.email, VALID_LOGIN_DATA.password);
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tests`)
3. Write tests following the existing patterns
4. Run tests locally (`npm test`)
5. Commit changes (`git commit -m 'Add new tests'`)
6. Push to branch (`git push origin feature/new-tests`)
7. Create a Pull Request

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 📄 License

ISC License
