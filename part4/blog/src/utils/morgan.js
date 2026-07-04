import fs from "node:fs";
import path from "node:path";
import morgan from "morgan";

const LOG_DIR = path.join(process.cwd(), "logs");
const ACCESS_LOG = path.join(LOG_DIR, "access.log");

fs.mkdirSync(LOG_DIR, { recursive: true });

const accessLogStream = fs.createWriteStream(ACCESS_LOG, {
    flags: "a",
});

morgan.token("json", (req) =>
    req.body ? JSON.stringify(req.body) : "-"
);

export default morgan(
    "[:date[iso]] :method :url :status :res[content-length] - :response-time ms body: :json",
    {
        stream: accessLogStream,
    },
);
