"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = validationMiddleware;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const apiError_1 = require("../utils/apiError");
function validationMiddleware(type, skipMissingProperties = false) {
    return async (req, res, next) => {
        const errors = await (0, class_validator_1.validate)((0, class_transformer_1.plainToClass)(type, req.body), { skipMissingProperties });
        if (errors.length > 0) {
            const validationErrors = errors.reduce((acc, error) => {
                if (error.constraints) {
                    acc[error.property] = Object.values(error.constraints);
                }
                return acc;
            }, {});
            next(apiError_1.ApiError.unprocessableEntity('Error de validación', validationErrors));
        }
        else {
            next();
        }
    };
}
//# sourceMappingURL=validation.middleware.js.map