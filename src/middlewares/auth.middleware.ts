import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';
import { prisma } from '../config/prisma';
import env from '../config/env';

// Extender Request para incluir usuario
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Verificar si existe el token en el encabezado
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(ApiError.unauthorized('Se requiere un token de acceso'));
    }

    // Obtener el token del encabezado
    const token = authHeader.split(' ')[1];

    // Verificar el token
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;

    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
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

    // Verificar si el usuario existe
    if (!user) {
      return next(ApiError.unauthorized('Usuario no encontrado'));
    }

    // Verificar si el usuario está activo
    if (user.status !== 'ACTIVE') {
      return next(ApiError.forbidden('Esta cuenta ha sido suspendida'));
    }

    // Adjuntar el usuario a la solicitud
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(ApiError.unauthorized('Token inválido'));
    } else if (error instanceof jwt.TokenExpiredError) {
      return next(ApiError.unauthorized('Token expirado'));
    }
    next(error);
  }
}

// Middleware para verificar roles
export function roleMiddleware(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }

    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden('No tienes permisos para realizar esta acción'));
    }

    next();
  };
}

// Middleware para verificar si es vendedor
export function sellerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return next(ApiError.unauthorized());
  }

  if (!req.user.seller) {
    return next(ApiError.forbidden('Solo los vendedores pueden realizar esta acción'));
  }

  next();
}