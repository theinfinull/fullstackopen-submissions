import { AppError } from "./appError.js";
import { createLogger } from "./logger.js";

const logger = createLogger("config");

function required(keyName) {
    const value = process.env[keyName];
    if (!value) {
        logger.error(
            `server startup failed due to missing environment variable: ${keyName}`,
        );
        throw new AppError(`missing environment variable: ${keyName}`, -1);
    }

    return value;
}

export const config = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_PORT: process.env.NODE_PORT,
    MONGODB_CREDENTIALS: {
        USERNAME: required('MONGODB_USERNAME'),
        PASSWORD: required('MONGODB_PASSWORD'),
    },
};
