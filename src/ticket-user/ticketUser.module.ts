import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TicketUserService } from "./application/ticketUser.service"
import { TicketUserRepository } from "./infrastructure/ticketUser.repository"
import { TicketUserController } from "./ui/ticketUser.controller"

@Module({
  imports: [TypeOrmModule.forFeature([TicketUserRepository])],
  providers: [TicketUserService],
  controllers: [TicketUserController],
})
export class TicketUserModule {}
