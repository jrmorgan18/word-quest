import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 90_000,
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [
    // Android tablet (Chromium, touch, landscape)
    { name: 'android-tablet', use: { ...devices['Galaxy Tab S4 landscape'] } },
    // iPad (WebKit, touch, portrait)
    { name: 'ipad', use: { ...devices['iPad (gen 7)'] } },
  ],
});
