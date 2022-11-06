import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Ticket } from "../domain/ticket.entity"
import { TicketKind } from "../dto/ticket.kind.enum"
import { TicketSaveDto } from "../dto/ticket.save.dto"
import { TicketRepository } from "../infrastructure/ticket.repository"

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async saveTicket(body: TicketSaveDto): Promise<Ticket> {
    try {
      const kind = body.kind === "korean" ? TicketKind.KOREAN : TicketKind.CHINA
      const ticket = await this.ticketRepository.save({
        title: body.title,
        kind: kind,
        price: body.price,
      })
      return ticket
    } catch (err) {
      console.log(err)
      throw new HttpException("Bad", HttpStatus.BAD_REQUEST)
    }
  }

  async getTicketList(): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.find()
    } catch (err) {
      console.log(err)
      throw new HttpException("Bad", HttpStatus.BAD_REQUEST)
    }
  }

  async findTicket(idx: number) {
    try {
      return await this.ticketRepository.findOne({ where: { idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException("Bad", HttpStatus.BAD_REQUEST)
    }
  }
}
