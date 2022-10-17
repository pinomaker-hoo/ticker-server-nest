import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "src/auth/domain/user.entity"
import { PointService } from "src/point/application/point.service"
import { TicketService } from "src/ticket/application/ticket.service"
import { Ticket } from "src/ticket/domain/ticket.entity"
import { TicketRepository } from "src/ticket/infrastructure/ticket.repository"
import { TicketUser } from "../domain/ticketUser.entity"
import { TicketUserRepository } from "../infrastructure/ticketUser.repository"

@Injectable()
export class TicketUserService {
  constructor(
    private readonly ticketUserRepository: TicketUserRepository,
    private readonly ticketService: TicketService,
    private readonly pointService: PointService
  ) {}

  async saveTicketUser(ticketIdx: number, user: User): Promise<TicketUser> {
    try {
      const ticket: Ticket = await this.findTicket(ticketIdx)
      const ticketUser = this.ticketUserRepository.create({
        user,
        ticket,
        used: false,
      })
      await this.pointService.updatePoint(user, ticket.price)
      return await this.ticketUserRepository.save(ticketUser)
    } catch (err) {
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async findTicket(idx: number): Promise<Ticket> {
    try {
      return await this.ticketService.findTicket(idx)
    } catch (err) {
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

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

  async updateTicketUser(idx: number) {
    const ticketUser = await this.ticketUserRepository.findOne({
      where: { idx },
    })
    return await this.ticketUserRepository.update(ticketUser.idx, {
      used: true,
    })
  }
}
