export declare class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    errors?: any;
    constructor(statusCode: number, message: string, isOperational?: boolean, errors?: any);
    static badRequest(message: string, errors?: any): ApiError;
    static unauthorized(message?: string): ApiError;
    static forbidden(message?: string): ApiError;
    static notFound(message?: string): ApiError;
    static conflict(message: string): ApiError;
    static unprocessableEntity(message: string, errors?: any): ApiError;
    static internal(message?: string): ApiError;
    static blockchain(message: string): ApiError;
}
