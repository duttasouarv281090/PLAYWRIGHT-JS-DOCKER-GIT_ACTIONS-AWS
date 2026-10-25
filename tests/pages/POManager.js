import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const {CartPage} =require('../pages/CartPage')

export default class POManager
{
    constructor(page)
    {
        this.page=page;
        this.cartpage=new CartPage(this.page);
        
    }

    getCartPage()
    {
        return this.cartpage;
    }
}

