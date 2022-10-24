import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "src/auth/domain/user.entity"
import { Board } from "../domain/board.entity"
import { RequestBoardSaveDto } from "../dto/board.request.save.dto"
import { BoardRepository } from "../infrastructure/board.repository"

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async saveBoard(body: RequestBoardSaveDto, user: User, imgPath: string) {
    try {
      const board: Board = this.boardRepository.create({
        title: body.title,
        text: body.text,
        user,
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
}
