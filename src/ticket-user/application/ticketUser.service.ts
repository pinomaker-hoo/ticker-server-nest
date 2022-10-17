import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "src/auth/domain/user.entity"
import { Ticket } from "src/ticket/domain/ticket.entity"
import { TicketRepository } from "src/ticket/infrastructure/ticket.repository"
import { TicketUser } from "../domain/ticketUser.entity"
import { TicketUserRepository } from "../infrastructure/ticketUser.repository"

@Injectable()
export class TicketUserService {
  constructor(private readonly ticketUserRepository: TicketUserRepository) {}

  // async saveTicketUser(ticketIdx: number, user: User): Promise<TicketUser> {
  //   try {
  //     const ticket: Ticket = await this.findTicket(ticketIdx)
  //     const ticketUser = this.ticketUserRepository.create({
  //       user,
  //       ticket,
  //     })
  //     return await this.ticketUserRepository.save(ticketUser)
  //   } catch (err) {
  //     throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
  //   }
  // }

  // async findTicket(idx: number): Promise<Ticket> {
  //   try {
  //     return await this.ticketRepository.findOne({ where: { idx } })
  //   } catch (err) {
  //     throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
  //   }
  // }

  async findTicketUserList(user: User) {
    try {
      return await this.ticketUserRepository.find({ where: { user } })
    } catch (err) {
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async findTicketUser(idx: number) {
    try {
      return await this.ticketUserRepository.findOne({ where: { idx } })
    } catch (error) {
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async getAll() {
    try {
      return await this.ticketUserRepository.find({
        relations: ["user", "ticket"],
      })
    } catch (err) {
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }
}
