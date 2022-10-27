import { User } from "src/auth/domain/user.entity"
import { BaseTimeEntity } from "src/common/entity/basetime.entity"
import { Ticket } from "src/ticket/domain/ticket.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "tbl_ticket-user" })
export class TicketUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: "boolean" })
  used: boolean

  @ManyToOne((type) => User, (user) => user.ticketUser, {
    onDelete: "CASCADE",
  })
  user: User

  @ManyToOne((type) => Ticket, (ticket) => ticket.ticketUser, {
    onDelete: "CASCADE",
  })
  ticket: Ticket
}
