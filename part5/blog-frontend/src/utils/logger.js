// src/utils/logger.js

const isDebugEnabled = import.meta.env.DEV;

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
        return JSON.stringify(value, null, 2);
    } catch {
        return String(value);
    }
}

function log(level, loggerName, ...args) {
    const prefix = `[${timestamp()}] ${level.padEnd(5)} [${loggerName}]`;

    const message = args.map(format).join(" ");

    switch (level) {
        case "INFO":
            console.info(prefix, message);
            break;
        case "WARN":
            console.warn(prefix, message);
            break;
        case "ERROR":
            console.error(prefix, message);
            break;
        case "DEBUG":
            console.debug(prefix, message);
            break;
        default:
            console.log(prefix, message);
    }
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
