import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "src/auth/domain/user.entity"
import { Ticket } from "src/ticket/domain/ticket.entity"
import { TicketRepository } from "src/ticket/infrastructure/ticket.repository"
import { TicketUser } from "../domain/ticketUser.entity"
import { TicketUserRepository } from "../infrastructure/ticketUser.repository"

@Injectable()
export class TicketUserService {
  constructor(
    private readonly ticketUserRepository: TicketUserRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async saveTicketUser(ticketIdx: number, user: User): Promise<TicketUser> {
    try {
      const ticket: Ticket = await this.findTicket(ticketIdx)
      const ticketUser = this.ticketUserRepository.create({
        user,
        ticket,
      })
      return await this.ticketUserRepository.save(ticketUser)
    } catch (err) {
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async findTicket(idx: number): Promise<Ticket> {
    try {
      return await this.ticketRepository.findOne({ where: { idx } })
    } catch (err) {
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }
}
