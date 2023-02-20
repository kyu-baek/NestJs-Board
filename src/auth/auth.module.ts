import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmExModule } from '../typeOrmCustomRepo/typeorm-ex.module';

@Module({
  imports: [ TypeOrmExModule.forCustomRepository([UserRepository]) ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
