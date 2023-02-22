import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware, LoggerMiddleware2 } from './middleware/logger.middleware';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    EventsModule
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
    .apply(LoggerMiddleware, LoggerMiddleware2) // 여러개의 미들웨어 가능~
    .exclude({ path: '/users', method: RequestMethod.GET }) // 이런 조건에서는 미들웨어 적용 제외~
    .forRoutes('/users');
  }
}
