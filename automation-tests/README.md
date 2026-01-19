# QA Automation POC - Instructions

This test suite uses **Playwright** with the **Page Object Model (POM)** pattern.

## Prerequisites
- Node.js (v18+)
- Local application environment running (Frontend: 4200, Backend: 5067)

## Setup
1. Navigate to the automation directory:
   ```bash
   cd automation-tests
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

## Running Tests
- **All tests (headless)**: 
  ```bash
  npm test
  ```
- **Headed mode (to see browser)**:
  ```bash
  npm run test:headed
  ```
- **UI Mode (Interactive)**:
  ```bash
  npm run test:ui
  ```

## CI/CD Integration
The suite is configured to run in CI environments:
- Headless execution by default.
- Parallelization enabled.
- Retries on failure (2 in CI, 0 locally).
- Base URL can be overridden via environment variable: `BASE_URL=https://staging.app npm test`.

## Automation Structure
- `src/pages/`: Contains Page Object Models logic/selectors.
- `src/tests/`: Contains spec files (E2E and API).
- `playwright.config.ts`: Main configuration.
