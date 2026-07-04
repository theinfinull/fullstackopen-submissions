import fs from "node:fs";
import path from "node:path";

const DEBUG_ENABLED_ENVS = ["development", "pre-production"];
const isDebugEnabled = DEBUG_ENABLED_ENVS.includes(process.env.NODE_ENV);

const LOG_DIR = path.resolve("logs");
const LOG_FILE = path.join(LOG_DIR, "app.log");

fs.mkdirSync(LOG_DIR, { recursive: true });

const logStream = fs.createWriteStream(LOG_FILE, {
    flags: "a", // append
});

function timestamp() {
    return new Date().toISOString();
}

function format(value) {
    if (value instanceof Error) {
        return value.stack ?? value.message;
    }

    if (typeof value === "string") {
        return value;
    }

    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}

function log(level, loggerName, ...args) {
    const prefix = `[${timestamp()}] ${level.padEnd(5)} [${loggerName}]`;
    const message = args.map(format).join(" ");

    logStream.write(`${prefix} ${message}\n`);
}

export function createLogger(loggerName) {
    return {
        info: (...args) => log("INFO", loggerName, ...args),
        warn: (...args) => log("WARN", loggerName, ...args),
        error: (...args) => log("ERROR", loggerName, ...args),
        debug: (...args) => {
            if (!isDebugEnabled) return;
            log("DEBUG", loggerName, ...args);
        },
    };
}
