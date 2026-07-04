export class AppError extends Error {
    constructor(message, statusCode = 400, options) {
        super(message, options);

        this.name = this.constructor.name;
        this.statusCode = statusCode;

        Error.captureStackTrace?.(this, this.constructor);
    }
}
