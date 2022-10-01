import { EntityRepository, Repository } from "typeorm"
import { Board } from "../domain/board.entity"

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
