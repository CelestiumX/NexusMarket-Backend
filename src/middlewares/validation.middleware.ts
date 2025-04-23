import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export function validationMiddleware(type: any, skipMissingProperties = false) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors: ValidationError[] = await validate(
      plainToClass(type, req.body),
      { skipMissingProperties }
    );

    if (errors.length > 0) {
      const validationErrors = errors.reduce((acc: any, error: ValidationError) => {
        if (error.constraints) {
          acc[error.property] = Object.values(error.constraints);
        }
        return acc;
      }, {});

      next(ApiError.unprocessableEntity('Error de validación', validationErrors));
    } else {
      next();
    }
  };
}