// wraps an async route handler so any rejected promise is forwarded to
// next(err) instead of becoming an unhandled rejection that crashes the
// process and bypasses errorHandler.js/logger entirely.
export function asyncHandler(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}
