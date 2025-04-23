import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export declare function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function roleMiddleware(...roles: string[]): (req: Request, res: Response, next: NextFunction) => void;
export declare function sellerMiddleware(req: Request, res: Response, next: NextFunction): void;
