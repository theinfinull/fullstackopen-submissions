import { AppError } from "./appError.js";

// wraps a mongoose query promise (e.g. Model.findById(id),
// Model.findByIdAndUpdate(...), Model.findByIdAndDelete(...)) and turns both
// "no document found" (null result) and a malformed id (CastError) into the
// same clean 404 AppError. keeps controllers free of not-found/CastError
// boilerplate and works for any model/entity.
export async function orNotFound(operation, entityName = "resource") {
    let result;

    try {
        result = await operation;
    } catch (err) {
        if (err.name === "CastError") {
            throw new AppError(`${entityName} not found`, 404);
        }
        throw err;
    }

    if (!result) {
        throw new AppError(`${entityName} not found`, 404);
    }

    return result;
}
