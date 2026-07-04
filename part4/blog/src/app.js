import express from "express";
import cors from "cors";

import { createLogger } from "./utils/logger.js";
import morgan from "./utils/morgan.js";
import { unknownEndpointHandler } from "./utils/unknownEnpointHandler.js";
import { errorHandler } from "./utils/errorHandler.js";

const logger = createLogger("app");

export function createApp() {
    const app = express();

    logger.info("configuring middlewares...");
    app.use(cors());
    app.use(morgan);
    app.use(express.json());

    logger.info("configuring routes...");
    app.use(unknownEndpointHandler);
    app.use(errorHandler);

    return app;
}
