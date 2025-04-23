import { Request, Response, NextFunction } from 'express';
export declare function validationMiddleware(type: any, skipMissingProperties?: boolean): (req: Request, res: Response, next: NextFunction) => Promise<void>;
