import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './application/auth.service';
import { UserRepository } from './infrastructure/user.repository';
import { AuthController } from './ui/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
