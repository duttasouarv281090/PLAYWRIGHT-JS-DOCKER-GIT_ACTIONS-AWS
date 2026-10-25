// config/browserFactory.js

import { chromium, firefox, webkit } from "@playwright/test";

class BrowserFactory {

    static browser = null;

    static async launchBrowser() {

        if (BrowserFactory.browser) {
            return BrowserFactory.browser;
        }

        const browserName =
            process.env.BROWSER || "chrome";

        switch (browserName.toLowerCase()) {

            case "chrome":
                BrowserFactory.browser =
                    await chromium.launch({
                        headless: true
                    });
                break;

            case "edge":
                BrowserFactory.browser =
                    await chromium.launch({
                        channel: "msedge",
                        headless: true
                    });
                break;

            case "webkit":
                BrowserFactory.browser =
                    await webkit.launch({
                        headless: true
                    });
                break;

            case "firefox":
                BrowserFactory.browser =
                    await firefox.launch({
                        headless: true
                    });
                break;

            default:
                throw new Error(
                    `Browser ${browserName} not supported`
                );
        }

        return BrowserFactory.browser;
    }

    static async closeBrowser() {
        if (BrowserFactory.browser) {
            await BrowserFactory.browser.close();
            BrowserFactory.browser = null;
        }
    }
}

export default BrowserFactory;