// support/world.js

import { setWorldConstructor ,setDefaultTimeout,World} from "@cucumber/cucumber";

setDefaultTimeout(60000);
class CustomWorld extends World{

browser = null;
context = null;
page = null;
environment = null;

    constructor(options) {

super(options);
    }
}

setWorldConstructor(CustomWorld);