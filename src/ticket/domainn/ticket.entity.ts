import { BaseTimeEntity } from "src/common/entity/basetime.entity"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
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
}
