import "dotenv/config";
import { config, loadConfig } from "./utils/config.js";
import { createLogger } from "./utils/logger.js";
import { createApp } from "./app.js";
import { connectToMongoDB } from "./utils/mongoDB.js";
import { AppError } from "./utils/appError.js";

const logger = createLogger("index");

// on some runtimes the "listening" callback can fire (with a null address)
// just before a late "error" event (e.g. EADDRINUSE), so we can't trust the
// callback alone — server.address() is the only reliable success signal.
function listen(app, port) {
    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            if (!server.address()) {
                server.removeAllListeners("error");
                reject(new AppError(`failed to bind to port ${port}`, 500));
                return;
            }
            resolve(server);
        });
        server.once("error", reject);
    });
}

const port = process.env.NODE_PORT || 3300;
console.log(`initiating server startup on port: ${port}`);

try {
    loadConfig();
    const app = createApp();

    logger.info("connecting to mongodb...");
    await connectToMongoDB(config.MONGODB_URI);
    logger.info(`connected to mongodb database: "${config.MONGODB_DATABASE}"`);

    await listen(app, config.NODE_PORT);
    logger.info("server startup succeeded");

    console.log(`server listening on port: ${config.NODE_PORT}`);
} catch (err) {
    logger.error("server startup failed", err);
    console.error("server startup failed. for more details see app logs.");
    process.exit(1);
}
