import { EntityRepository, Repository } from "typeorm"
import { TicketUser } from "../domain/ticketUser.entity"

@EntityRepository(TicketUser)
export class TicketUserRepository extends Repository<TicketUser> {}
