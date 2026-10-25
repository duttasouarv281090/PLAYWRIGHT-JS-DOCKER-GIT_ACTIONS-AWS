import {expect} from '@playwright/test'
class CartPage{
    constructor(page)
    {
        this.page=page;
        this.cart =  page.locator("[routerlink*='cart']");
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.checkout = page.locator("text=Checkout");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async VerifyProductIsDisplayed(productName)
{
   
    await this.cartProducts.waitFor();
    const bool =await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();

}
 getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}
async Checkout()
{
    await this.checkout.click();
}

async clickCartLink()
{
    await this.cart.click();

}


}
export {CartPage};