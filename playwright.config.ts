import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,

  fullyParallel: true,

  // Reporter to use
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:4200',
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],

  webServer: {
    command: 'npx ng serve',
    port: 4200,
    reuseExistingServer: true,
  },
});
