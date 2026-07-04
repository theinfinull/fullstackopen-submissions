import { AppError } from "./appError.js";

export function unknownEndpointHandler(req, res, next) {
    next(new AppError("unknown endpoint", 404));
}
