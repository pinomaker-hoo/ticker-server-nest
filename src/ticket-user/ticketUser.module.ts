import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PointModule } from "src/point/point.module"
import { TicketRepository } from "src/ticket/infrastructure/ticket.repository"
import { TicketModule } from "src/ticket/ticket.module"
import { TicketUserService } from "./application/ticketUser.service"
import { TicketUserRepository } from "./infrastructure/ticketUser.repository"
import { TicketUserController } from "./ui/ticketUser.controller"

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketUserRepository]),
    TicketModule,
    PointModule,
  ],
  providers: [TicketUserService],
  controllers: [TicketUserController],
})
export class TicketUserModule {}
