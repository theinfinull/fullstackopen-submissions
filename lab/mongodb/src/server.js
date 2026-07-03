import { createApp } from "./app.js";
import { connectMongoDB } from "./db/mongodb.js";
import { config } from "./config/index.js";

async function start() {
    await connectMongoDB();

    const app = createApp();
    app.listen(config.port, () => {
        console.log(`[server] http://localhost:${config.port}`);
    });
}

start().catch((err) => {
    console.error(`[server] failed to start: ${err}`);
    process.exit(1);
});
