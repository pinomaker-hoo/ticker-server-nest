import { User } from "src/auth/domain/user.entity"
import { BaseTimeEntity } from "src/common/entity/basetime.entity"
import { Ticket } from "src/ticket/domain/ticket.entity"
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "tbl_ticket-user" })
export class TicketUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @ManyToOne((type) => User, (user) => user.ticketUser)
  user: User

  @ManyToOne((type) => Ticket, (ticket) => ticket.ticketUser)
  ticket: Ticket
}
