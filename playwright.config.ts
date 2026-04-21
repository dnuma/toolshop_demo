import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 60 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "https://www.practicesoftwaretesting.com",
    trace: "on-first-retry",
    actionTimeout: 10 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
      },
    },
  ],
});
