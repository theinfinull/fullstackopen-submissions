import mongoose from "mongoose";
import { createLogger } from "./logger.js";
import { AppError } from "./appError.js";

const logger = createLogger("mongodb");

mongoose.set("strictQuery", false);

const DATABASES = {
    development: "fso-blog-dev",
    "pre-production": "fso-blog-preprod",
    production: "fso-blog-prod",
};

export async function connectToMongoDB() {
    const { NODE_ENV, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

    const database = DATABASES[NODE_ENV];
    if (!database) {
        logger.error(`invalid NODE_ENV: "${NODE_ENV}"`);
        throw new AppError(`invalid NODE_ENV: "${NODE_ENV}"`);
    }

    const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@free.gupityi.mongodb.net/${database}?appName=free`;

    try {
        await mongoose.connect(uri);
        logger.info(`connected to mongodb database: "${database}"`);
        return mongoose;
    } catch (err) {
        logger.error("failed to connect");
        throw err;
    }
}

export async function disconnectFromMongoDB() {
    await mongoose.connection.close();
    logger.info("connection closed");
}
