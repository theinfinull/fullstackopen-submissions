import mongoose from "mongoose";
import { AppError } from "./appError.js";

mongoose.set("strictQuery", false);

export async function connectToMongoDB(uri) {
    try {
        await mongoose.connect(uri);
        return mongoose;
    } catch (err) {
        throw new AppError("failed to connect to mongodb", 503, { cause: err });
    }
}

export async function disconnectFromMongoDB() {
    await mongoose.connection.close();
}
