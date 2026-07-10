import express from "express";
import cors from "cors";

import { createLogger } from "./utils/logger.js";
import morgan from "./utils/morgan.js";
import { unknownEndpointHandler } from "./utils/unknownEndpointHandler.js";
import { errorHandler } from "./utils/errorHandler.js";
import blogRouter from "./controllers/blog.js";
import userRouter from "./controllers/user.js";
import authRouter from "./controllers/auth.js";
import authMiddleware from "./utils/auth.js";

const logger = createLogger("app");

export function createApp() {
    const app = express();

    logger.info("configuring middlewares...");
    app.use(cors());
    app.use(morgan);
    app.use(express.json());

    logger.info("configuring routes...");
    app.use("/api/blogs", authMiddleware, blogRouter);
    app.use("/api/users", userRouter);
    app.use("/api/", authRouter);

    logger.info("configuring error handlers...");
    app.use(unknownEndpointHandler);
    app.use(errorHandler);

    return app;
}
