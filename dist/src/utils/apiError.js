"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    isOperational;
    errors;
    constructor(statusCode, message, isOperational = true, errors) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message, errors) {
        return new ApiError(400, message, true, errors);
    }
    static unauthorized(message = 'No autorizado') {
        return new ApiError(401, message);
    }
    static forbidden(message = 'Prohibido') {
        return new ApiError(403, message);
    }
    static notFound(message = 'Recurso no encontrado') {
        return new ApiError(404, message);
    }
    static conflict(message) {
        return new ApiError(409, message);
    }
    static unprocessableEntity(message, errors) {
        return new ApiError(422, message, true, errors);
    }
    static internal(message = 'Error interno del servidor') {
        return new ApiError(500, message, false);
    }
    static blockchain(message) {
        return new ApiError(502, message, false);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=apiError.js.map