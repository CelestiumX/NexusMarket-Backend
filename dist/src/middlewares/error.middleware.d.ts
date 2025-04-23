import { Request, Response, NextFunction } from 'express';
export declare function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
