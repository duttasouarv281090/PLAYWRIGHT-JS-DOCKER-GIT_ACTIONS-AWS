import { EnvironmentConfig } from "./tests/config/env.js";
import playwrightConfig from "./playwright.config.js";
global.environment=EnvironmentConfig.filter(e=>e.name==playwrightConfig.use.env)[0];
console.log("Name"+global.environment.url);
