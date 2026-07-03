import mongoose from "mongoose";
import { config } from "../config/index.js";

mongoose.set("strictQuery", false);

export async function connectMongoDB() {
    const { username, password, database } = config.mongodb;

    if (!username || !password || !database) {
        throw new Error("missing mongoDB env variables.");
    }

    const url = `mongodb+srv://${username}:${password}@free.gupityi.mongodb.net/${database}?appName=free`;
    await mongoose.connect(url, { family: 4 });

    console.log("✓ connected to mongoDB");
}

export default mongoose;
