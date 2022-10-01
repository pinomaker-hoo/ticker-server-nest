import { Controller } from "@nestjs/common"
import { TicketService } from "../application/ticket.service"

@Controller("ticket")
export class TickController {
  constructor(private readonly ticketService: TicketService) {}
}
