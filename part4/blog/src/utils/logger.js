import fs from "node:fs";
import path from "node:path";

const DEBUG_ENABLED_ENVS = ["development", "pre-production"];
const isDebugEnabled = DEBUG_ENABLED_ENVS.includes(process.env.NODE_ENV);

const LOG_DIR = path.resolve("logs");
const LOG_FILE = path.join(LOG_DIR, "app.log");

fs.mkdirSync(LOG_DIR, { recursive: true });

function timestamp() {
    return new Date().toISOString();
}

function format(value) {
    if (value instanceof Error) {
        let output = value.stack ?? value.message;
        if (value.cause) {
            output += `\ncaused by: ${format(value.cause)}`;
        }
        return output;
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

    fs.appendFileSync(LOG_FILE, `${prefix} ${message}\n`);
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
