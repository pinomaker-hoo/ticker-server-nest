import { Controller } from "@nestjs/common"
import { TicketUserService } from "../application/ticketUser.service"

@Controller("ticketUser")
export class TicketUserController {
  constructor(private readonly ticketUserService: TicketUserService) {}
}
