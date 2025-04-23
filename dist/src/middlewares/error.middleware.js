"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const common_1 = require("@nestjs/common");
const apiError_1 = require("../utils/apiError");
const library_1 = require("@prisma/client/runtime/library");
const logger = new common_1.Logger('ErrorMiddleware');
function errorMiddleware(err, req, res, next) {
    let error = err;
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                error = apiError_1.ApiError.conflict(`Ya existe un registro con el mismo valor en '${err.meta?.target}'`);
                break;
            case 'P2025':
                error = apiError_1.ApiError.notFound('El registro solicitado no existe');
                break;
            case 'P2003':
                error = apiError_1.ApiError.badRequest('Operación no permitida debido a restricciones de relaciones');
                break;
            default:
                error = apiError_1.ApiError.internal('Error en la base de datos');
        }
    }
    if (error instanceof apiError_1.ApiError) {
        if (error.isOperational) {
            logger.log(`[${req.method}] ${req.path} - ${error.statusCode}: ${error.message}`);
        }
        else {
            logger.error(`[${req.method}] ${req.path} - ${error.statusCode}: ${error.message}`);
            logger.error(error.stack);
        }
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
    logger.error(`[${req.method}] ${req.path} - Unexpected Error:`);
    logger.error(error);
    return res.status(500).json({
        success: false,
        message: 'Algo salió mal',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
}
//# sourceMappingURL=error.middleware.js.map