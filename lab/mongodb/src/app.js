import express from "express";
import notesRouter from "./routes/notes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

export function createApp() {
    const app = express();

    app.use(express.static("dist"))

    app.use(express.json());
    app.use("/api/notes", notesRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}
