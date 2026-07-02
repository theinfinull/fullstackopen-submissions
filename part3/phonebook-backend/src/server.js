import express, { response } from "express";
import cors from "cors";
import phonebookRouter from "./routes/phonebook.js";
import { requestLogger, responseLogger } from "./utils/requestLogger.js";

const app = express();

const PORT = process.env.PORT || 3192;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(responseLogger);
app.use("/api/phonebook", phonebookRouter);

app.listen(PORT, () => {
    console.log(`[server] http://localhost:${PORT}`);
});
