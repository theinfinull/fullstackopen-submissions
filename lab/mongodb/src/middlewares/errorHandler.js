export function notFoundHandler(req, res) {
    res.status(404).json({
        message: "resource not found",
    });
}

export function errorHandler(err, req, res, next) {
    if (err.name === "CastError") {
        return res.status(404).json({
            message: "note not found",
        });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message,
        });
    }

    console.error(`[error] internal server error: ${err}`);

    res.status(500).json({
        message: "internal server error",
    });
}
