import { chromium ,firefox,webkit} from "@playwright/test";
import playwrightConfig from "../../playwright.config.js";
import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { EnvironmentConfig } from "../config/env.js";
import BrowserFactory from "../helper/browserFactory.js";

//Hooks for crossbrowser execution in parallel mode

// BeforeAll(async function () {
// await BrowserFactory.launchBrowser();
// console.log(`Browser Started : ${process.env.BROWSER || "chrome"}`);});

// Before(async function () {
// this.browser =
// await BrowserFactory.launchBrowser();
// this.context =await this.browser.newContext({viewport: null});
// this.page =await this.context.newPage();
// this.environment =EnvironmentConfig.find(env =>env.name ===playwrightConfig.use.env);});

// After(async function ({ pickle, result }) {
// const scenarioName =pickle.name.replace(/[^a-zA-Z0-9]/g,"_");
// if (result.status === Status.FAILED) {
// const screenshot =await this.page.screenshot({path:`./test-result/screenshots/${scenarioName}_${Date.now()}.png`,fullPage: true});
// await this.attach(screenshot,"image/png");}
// await this.page?.close();
// await this.context?.close();
// });

// AfterAll(async function () {
// await BrowserFactory.closeBrowser();
// console.log("Browser Closed");
// });
//Hooks for execution with 1 worker and 1 browser set up
let browser={};
let context={};
let page ={};

BeforeAll(async function()
{
browser=  await chromium.launch({headless:playwrightConfig.use.headless});
});
Before(async function()
{
context= await browser.newContext();
this.page=await context.newPage();
global.environment=EnvironmentConfig.filter(e=>e.name==playwrightConfig.use.env)[0];
})
After(async function({pickle ,result})
{
  //screenshot attach to report after success for each scenario.
  const image=await this.page.screenshot({path:`./test-result/screenshots/${pickle.name}.png`,type:"png"});
  await this.attach(image,"image/png");
  //screenshot attach to report after failure.
  if(result.status==Status.FAILED)
  {
    const image=await this.page.screenshot({path:`./test-result/screenshots/${pickle.name}.png`,type:"png"});
    await this.attach(image,"image/png");
  }
  await context.close();
})

AfterAll(async function()
{
  await browser.close();
})