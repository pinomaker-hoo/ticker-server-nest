import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Ticket } from "../domain/ticket.entity"
import { TicketSaveDto } from "../dto/ticket.save.dto"
import { TicketRepository } from "../infrastructure/ticket.repository"

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async saveTicket(body: TicketSaveDto): Promise<Ticket> {
    try {
      const ticket = this.ticketRepository.create({
        title: body.title,
        kind: body.kind,
        price: body.price,
      })
      return await this.ticketRepository.save(ticket)
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
}
