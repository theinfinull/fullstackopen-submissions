import { createLogger } from "./logger.js";

const logger = createLogger("error-handler");

export function errorHandler(err, req, res, next) {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            error: "malformed json",
        });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message,
        });
    }

    logger.error("internal server error occured: ", err);
    res.status(500).json({
        message: "internal server error",
    });
}
