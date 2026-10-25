import { generate } from 'multiple-cucumber-html-reporter';

generate({
  jsonDir: "./reports",
  reportPath: "./reports",
  emailReport: true,
  metadata: {
    browser: {
      name: "chrome",
      //name: process.env.BROWSER || "chrome",
      version: "122.0.6261.112",
    },
    device: "local",
    executionPlatform: 'local',
    platform: {
      name: "windows",
      version: "11",
    },
  },
  customData: {
    projectName: 'Playwright sample project',
    release: '1.2.0',
    testCycle: 'Cycle 1',
    buildNumber: 'Build 1',
    environment: 'production',
    ciPipeline: 'GitHub Actions',
  },
});
