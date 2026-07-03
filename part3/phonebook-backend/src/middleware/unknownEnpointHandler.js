export function unknownEndpointHandler(req, res) {
    res.status(404).json({
        message: "unknown endpoint",
    });
}
