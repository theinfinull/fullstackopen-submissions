/**
 * wraps an async express handler so rejected promises are forwarded to
 * next(err) automatically, removing the need for try/catch in controllers.
 */
export function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
