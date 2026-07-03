import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import phonebookRouter from "./routes/phonebook.js";
import morgan from "./middleware/morgan.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { unknownEndpointHandler } from "./middleware/unknownEnpointHandler.js";
import { connectToMongoDB } from "./db/mongodb.js";

const app = express();
const PORT = process.env.NODE_PORT || 9000;

app.use(cors());
app.use(morgan);
app.use(express.json());

app.use(express.static("dist"));
app.use("/api/phonebook", phonebookRouter);

app.use(unknownEndpointHandler);
app.use(errorHandler);

try {
    await connectToMongoDB();
    app.listen(PORT, () => {
        console.log(`[server] listening on http://localhost:${PORT}`);
    });
} catch (err) {
    console.error("[server] failed to start server");
    console.error(`[server] reason: ${err.message}`);
    process.exit(1);
}
