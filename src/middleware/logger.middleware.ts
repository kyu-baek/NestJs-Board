import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log('Middleware1...');
		next(); // next 를 하지 않으면 Middleware2 가 수행 되지 않음!!!!
	}
}

@Injectable()
export class LoggerMiddleware2 implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log('Middleware2...');
		next();
	}
}
