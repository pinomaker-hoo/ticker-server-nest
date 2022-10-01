import { Injectable } from "@nestjs/common"
import { TicketUserRepository } from "../infrastructure/ticketUser.repository"

@Injectable()
export class TicketUserService {
  constructor(private readonly ticketUserRepository: TicketUserRepository) {}
}
