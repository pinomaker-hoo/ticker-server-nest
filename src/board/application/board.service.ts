import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "src/auth/domain/user.entity"
import { Board } from "../domain/board.entity"
import { BoardKind } from "../dto/board.kind.enum"
import { RequestBoardSaveDto } from "../dto/board.request.save.dto"
import { BoardRepository } from "../infrastructure/board.repository"

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async saveBoard(body: RequestBoardSaveDto, user: User, imgPath: string) {
    try {
      const kind = body.kind ? BoardKind.FREE : BoardKind.FOOD
      const board: Board = this.boardRepository.create({
        title: body.title,
        text: body.text,
        user,
        boardKind: kind,
      })
      console.log(board)
      return await this.boardRepository.save(board)
    } catch (err) {
      console.log(err)
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async getBoardList() {
    try {
      return await this.boardRepository.find({ relations: ["user", "comment"] })
    } catch (err) {
      console.log(err)
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async getBoard(idx: number) {
    try {
      return await this.boardRepository.findOne({
        where: { idx },
        relations: ["user", "comment"],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async getFreeBoardList() {
    try {
      return await this.boardRepository.find({
        where: { boardKind: BoardKind.FREE },
        relations: ["user", "comment"],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async getFoodBoardList() {
    try {
      return await this.boardRepository.find({
        where: { boardKind: BoardKind.FOOD },
        relations: ["user", "comment"],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }
}
