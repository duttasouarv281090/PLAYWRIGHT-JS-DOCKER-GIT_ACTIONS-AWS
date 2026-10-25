import { Given,When,Then } from "@cucumber/cucumber";
import {expect,test} from '@playwright/test'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import path from 'path'
const { default: POManager } = require('../../pages/POManager.js')
require('dotenv').config();
const loadClass= require('../../locator/index');
let Page;
Given('user navigates to the page', async function()
{
    await this.page.goto(global.environment.url);
    //await this.page.goto(this.environment.url);
});
Then('user waits for {string} page to load', async function (homepage) {
    Page= await loadClass.getPage(homepage)
});

Then('user logs in the application with credentials {string} {string}', async function (ele1,ele2) {
    let userName=process.env.loginUser
    let userPassword=process.env.loginPassword
    await this.page.locator(Page.locator[ele1]).fill(userName);
    await this.page.locator(Page.locator[ele2]).fill(userPassword)
    await this.page.locator("#login").click();
    //await this.page.pause()
});

Then('user lands on the {string} dashboardPage', async function(homePage)
{   
    await this.page.locator(Page.locator[homePage]).waitFor();
    const bool=await this.page.locator(Page.locator[homePage]).isVisible();
    expect(bool).toBeTruthy();
});

Then ('user adds products {string} to cart', async function(productname)
{
   // await this.page.locator('button').filter({ hasText: 'Add To Cart' }).first().waitFor();
    await this.page.locator('button').filter({ hasText: 'Add To Cart' }).first().click();
    //await this.page.locator(Page.locator[productname]).click();
})

Then ('user clicks on Cart verifies Product and checkout', async function()
{
          let manager =new POManager(this.page);
          let cartPage= await manager.getCartPage();
          await cartPage.clickCartLink();
          const checkProducts= await cartPage.VerifyProductIsDisplayed("ADIDAS ORIGINAL");
          await cartPage.Checkout();
})