import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
export declare class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
export declare class LoggerMiddleware2 implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
