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

    console.error(err);

    return res.status(500).json({
        message: "internal server error",
    });
    next(err);
}
