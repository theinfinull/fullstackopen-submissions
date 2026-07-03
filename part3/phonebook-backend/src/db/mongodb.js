import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const DATABASES = {
    development: "fso-phonebook-dev",
    "pre-production": "fso-phonebook-preprod",
    production: "fso-phonebook-prod",
};

export async function connectToMongoDB() {
    const { NODE_ENV, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

    const database = DATABASES[NODE_ENV];
    if (!database) {
        throw new Error(`invalid NODE_ENV: "${NODE_ENV}"`);
    }

    if (!MONGODB_USERNAME || !MONGODB_PASSWORD) {
        throw new Error(
            "MONGODB_USERNAME and MONGODB_PASSWORD must be set in env",
        );
    }

    const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@free.gupityi.mongodb.net/${database}?appName=free`;

    try {
        await mongoose.connect(uri);
        console.log(`[mongodb] connected to "${database}"`);
        return mongoose;
    } catch (err) {
        console.error("[mongodb] failed to connect");
        throw err;
    }
}

export async function disconnectFromMongoDB() {
    await mongoose.connection.close();
    console.log("[mongodb] connection closed");
}
