import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.js";

const app = express();

const PORT = process.env.PORT || 3389;

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
    console.log(`[server] http://localhost:${PORT}`);
});
