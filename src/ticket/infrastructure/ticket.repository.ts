import { EntityRepository, Repository } from "typeorm"
import { Ticket } from "../domainn/ticket.entity"

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {}
