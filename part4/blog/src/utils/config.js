import { AppError } from "./appError.js";

const DATABASES = {
    development: "fso-blog-dev",
    "pre-production": "fso-blog-preprod",
    production: "fso-blog-prod",
};

function required(keyName) {
    const value = process.env[keyName];
    if (!value) {
        throw new AppError(`missing environment variable: ${keyName}`);
    }
    return value;
}

export const config = {};

export function loadConfig() {
    const NODE_ENV = required("NODE_ENV");
    const NODE_PORT = Number(process.env.NODE_PORT) || 3300;
    const MONGODB_USERNAME = required("MONGODB_USERNAME");
    const MONGODB_PASSWORD = required("MONGODB_PASSWORD");
    const JWT_SECRET = required("JWT_SECRET");
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

    const database = DATABASES[NODE_ENV];
    if (!database) {
        throw new AppError(`invalid NODE_ENV: "${NODE_ENV}"`);
    }

    Object.assign(config, {
        NODE_ENV,
        NODE_PORT,
        JWT_SECRET,
        JWT_EXPIRES_IN,
        MONGODB_DATABASE: database,
        MONGODB_URI: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@free.gupityi.mongodb.net/${database}?appName=free`,
    });

    return config;
}
