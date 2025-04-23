"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.roleMiddleware = roleMiddleware;
exports.sellerMiddleware = sellerMiddleware;
const jwt = require("jsonwebtoken");
const apiError_1 = require("../utils/apiError");
const prisma_1 = require("../config/prisma");
const env_1 = require("../config/env");
async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(apiError_1.ApiError.unauthorized('Se requiere un token de acceso'));
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env_1.default.JWT_SECRET);
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                walletAddress: true,
                status: true,
                seller: {
                    select: {
                        id: true,
                        storeName: true,
                        verified: true,
                        reputationScore: true,
                    },
                },
            },
        });
        if (!user) {
            return next(apiError_1.ApiError.unauthorized('Usuario no encontrado'));
        }
        if (user.status !== 'ACTIVE') {
            return next(apiError_1.ApiError.forbidden('Esta cuenta ha sido suspendida'));
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(apiError_1.ApiError.unauthorized('Token inválido'));
        }
        else if (error instanceof jwt.TokenExpiredError) {
            return next(apiError_1.ApiError.unauthorized('Token expirado'));
        }
        next(error);
    }
}
function roleMiddleware(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return next(apiError_1.ApiError.unauthorized());
        }
        if (!roles.includes(req.user.role)) {
            return next(apiError_1.ApiError.forbidden('No tienes permisos para realizar esta acción'));
        }
        next();
    };
}
function sellerMiddleware(req, res, next) {
    if (!req.user) {
        return next(apiError_1.ApiError.unauthorized());
    }
    if (!req.user.seller) {
        return next(apiError_1.ApiError.forbidden('Solo los vendedores pueden realizar esta acción'));
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map