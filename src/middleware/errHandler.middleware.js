import { apiError } from "../utils/apiError.utils.js";

export const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);

    // Check if the error is an instance of your custom apiError class
    if (err instanceof apiError) {
        return res.status(err.statuscode).json({
            success: false,
            error: {
                message: err.message,
                errors: err.errors
            }
        });
    }
};

