import "dotenv/config";

const {
    NODE_ENV,
    NODE_PORT,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
} = process.env;

export const config = {
    env: NODE_ENV || "development",
    port: Number(NODE_PORT) || 3300,
    mongodb: {
        username: MONGODB_USERNAME,
        password: MONGODB_PASSWORD,
        database: MONGODB_DATABASE,
    },
};
