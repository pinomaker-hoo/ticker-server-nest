import { MailerModule } from "@nestjs-modules/mailer"
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PointModule } from "src/point/point.module"
import { AuthService } from "./application/auth.service"
import { UserRepository } from "./infrastructure/user.repository"
import { JwtStrategy } from "./passport/auth.jwt.strategy"
import { LocalStrategy } from "./passport/auth.local.stratehgy"
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { AuthController } from "./ui/auth.controller"
import { male } from "src/config/env/node"

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
    MailerModule.forRoot({
      transport: {
        host: male.MALE_HOST,
        port: male.MALE_PORT,
        auth: {
          user: male.MALE_ID,
          pass: male.GOOGLE_KEY,
        },
        secure: true,
      },
      template: {
        dir: process.cwd() + "/template/",
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    PointModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
