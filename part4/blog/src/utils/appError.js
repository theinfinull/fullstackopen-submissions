export class AppError extends Error {
    constructor(message, statusCode = 404) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;

        Error.captureStackTrace?.(this, this.constructor); // remove the constructor from stack trace
    }
}
