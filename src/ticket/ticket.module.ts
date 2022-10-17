import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TicketService } from "./application/ticket.service"
import { TicketRepository } from "./infrastructure/ticket.repository"
import { TickController } from "./ui/ticket.controller"

@Module({
  imports: [TypeOrmModule.forFeature([TicketRepository])],
  providers: [TicketService],

  controllers: [TickController],
})
export class TicketModule {}
