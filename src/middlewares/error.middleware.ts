import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';
import { ApiError } from '../utils/apiError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const logger = new Logger('ErrorMiddleware');

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  let error = err;

  // Manejo de errores específicos de Prisma
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': // Error de valor único
        error = ApiError.conflict(`Ya existe un registro con el mismo valor en '${err.meta?.target as string}'`);
        break;
      case 'P2025': // Registro no encontrado
        error = ApiError.notFound('El registro solicitado no existe');
        break;
      case 'P2003': // Restricción de clave externa
        error = ApiError.badRequest('Operación no permitida debido a restricciones de relaciones');
        break;
      default:
        error = ApiError.internal('Error en la base de datos');
    }
  }

  // Manejo de errores de API conocidos
  if (error instanceof ApiError) {
    // Si es un error operacional (esperado), lo registramos como información
    if (error.isOperational) {
      logger.log(`[${req.method}] ${req.path} - ${error.statusCode}: ${error.message}`);
    } else {
      // Si no es operacional, registramos como error con stack trace
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

  // Para errores desconocidos
  logger.error(`[${req.method}] ${req.path} - Unexpected Error:`);
  logger.error(error);

  return res.status(500).json({
    success: false,
    message: 'Algo salió mal',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
}