import express, { response } from "express";
import cors from "cors";
import phonebookRouter from "./routes/phonebook.js";
import morgan from "./middleware/morgan.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const PORT = process.env.PORT || 3192;

app.use(cors());
app.use(morgan);
app.use(express.json());

app.use("/api/phonebook", phonebookRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`[server] http://localhost:${PORT}`);
});
