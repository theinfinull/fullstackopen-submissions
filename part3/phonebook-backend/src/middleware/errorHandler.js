export function errorHandler(err, req, res, next) {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            error: "malformed json",
        });
    }
    next(err);
}
