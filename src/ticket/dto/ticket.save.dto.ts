import { TicketKind } from "./ticket.kind.enum"

export class TicketSaveDto {
  title: string
  price: number
  kind: TicketKind
}
