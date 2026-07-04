import express from "express";
import cors from "cors";

import { createLogger } from "./utils/logger.js";
import morgan from "./utils/morgan.js";
import { unknownEndpointHandler } from "./utils/unknownEndpointHandler.js";
import { errorHandler } from "./utils/errorHandler.js";
import blogRouter from "./controllers/blog.js";

const logger = createLogger("app");

export function createApp() {
    const app = express();

    logger.info("configuring middlewares...");
    app.use(cors());
    app.use(morgan);
    app.use(express.json());

    logger.info("configuring routes...");
    app.use("/api/blogs", blogRouter)

    logger.info("configuring error handlers...");
    app.use(unknownEndpointHandler);
    app.use(errorHandler);

    return app;
}
