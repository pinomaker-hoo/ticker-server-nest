import { Module } from "@nestjs/common"
import { AuthModule } from "./auth/auth.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config/dist/config.module"
import { BoardModule } from "./board/board.module"
import { TicketModule } from "./ticket/ticket.module"
import { TicketUserModule } from "./ticket-user/ticketUser.module"
import { CommentModule } from "./comment/comment.module"
import { PointModule } from "./point/point.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),
    AuthModule,
    BoardModule,
    TicketModule,
    TicketUserModule,
    CommentModule,
    PointModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
