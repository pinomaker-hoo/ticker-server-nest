import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TicketRepository } from "src/ticket/infrastructure/ticket.repository"
import { TicketModule } from "src/ticket/ticket.module"
import { TicketUserService } from "./application/ticketUser.service"
import { TicketUserRepository } from "./infrastructure/ticketUser.repository"
import { TicketUserController } from "./ui/ticketUser.controller"

@Module({
  imports: [TypeOrmModule.forFeature([TicketUserRepository])],
  providers: [TicketUserService],
  controllers: [TicketUserController],
})
export class TicketUserModule {}
