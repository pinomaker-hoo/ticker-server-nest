import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PointModule } from "src/point/point.module"
import { AuthService } from "./application/auth.service"
import { UserRepository } from "./infrastructure/user.repository"
import { JwtStrategy } from "./passport/auth.jwt.strategy"
import { KakaoStrategy } from "./passport/auth.kakao.strateyg"
import { LocalStrategy } from "./passport/auth.local.stratehgy"
import { AuthController } from "./ui/auth.controller"

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get("JWT_EXPIRESIN"),
        },
      }),
    }),
    PointModule,
  ],
  providers: [AuthService, LocalStrategy, KakaoStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
