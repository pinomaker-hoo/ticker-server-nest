import { Injectable } from "@nestjs/common"
import { TicketRepository } from "../infrastructure/ticket.repository"

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}
}
