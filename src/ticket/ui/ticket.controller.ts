import { Body, Controller, Get, Post } from "@nestjs/common"
import { TicketService } from "../application/ticket.service"
import { TicketSaveDto } from "../dto/ticket.save.dto"

@Controller("ticket")
export class TickController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async saveTicket(@Body() body: TicketSaveDto) {
    return await this.ticketService.saveTicket(body)
  }

  @Get()
  async getTicketList() {
    return await this.ticketService.getTicketList()
  }
}
