import "dotenv/config";
import { config } from "./utils/config.js";
import { createLogger } from "./utils/logger.js";
import { createApp } from "./app.js";
import { connectToMongoDB } from "./utils/mongoDB.js";

const logger = createLogger("index");

try {
    const app = createApp();
    console.log(`connecting to mongodb...`)
    await connectToMongoDB();
    app.listen(config.NODE_PORT, () => {
        console.log(`server listening on port:${config.NODE_PORT}`);
    });
} catch (err) {
    logger.error(err);
    console.error("server startup failed. Check logs/app.log for more details.");
    process.exit(1);
}
