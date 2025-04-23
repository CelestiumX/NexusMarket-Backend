export class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    errors?: any;
  
    constructor(statusCode: number, message: string, isOperational = true, errors?: any) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.errors = errors;
      
      // Captura la stack trace para una mejor depuración
      Error.captureStackTrace(this, this.constructor);
    }
  
    static badRequest(message: string, errors?: any): ApiError {
      return new ApiError(400, message, true, errors);
    }
  
    static unauthorized(message = 'No autorizado'): ApiError {
      return new ApiError(401, message);
    }
  
    static forbidden(message = 'Prohibido'): ApiError {
      return new ApiError(403, message);
    }
  
    static notFound(message = 'Recurso no encontrado'): ApiError {
      return new ApiError(404, message);
    }
  
    static conflict(message: string): ApiError {
      return new ApiError(409, message);
    }
  
    static unprocessableEntity(message: string, errors?: any): ApiError {
      return new ApiError(422, message, true, errors);
    }
  
    static internal(message = 'Error interno del servidor'): ApiError {
      return new ApiError(500, message, false);
    }
  
    static blockchain(message: string): ApiError {
      return new ApiError(502, message, false);
    }
  }