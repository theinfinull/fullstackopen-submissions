import { createLogger } from "./logger.js";
import { AppError } from "./appError.js";

const logger = createLogger("error-handler");

export function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "malformed json",
        });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message,
        });
    }

    logger.error("internal server error occurred", err);
    res.status(500).json({
        message: "internal server error",
    });
}
