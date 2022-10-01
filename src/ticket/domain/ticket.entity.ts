import { BaseTimeEntity } from "src/common/entity/basetime.entity"
import { TicketUser } from "src/ticket-user/domain/ticketUser.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { TicketKind } from "../dto/ticket.kind.enum"

@Entity({ name: "tbl_ticket" })
export class Ticket extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  title: string

  @Column()
  kind: TicketKind

  @Column()
  price: number

  @OneToMany((type) => TicketUser, (ticketUser) => ticketUser.ticket)
  ticketUser: TicketUser[]
}
