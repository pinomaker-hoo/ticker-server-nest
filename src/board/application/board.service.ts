import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { decode } from "node-base64-image"
import { User } from "src/auth/domain/user.entity"
import { Board } from "../domain/board.entity"
import { RequestBoardSaveDto } from "../dto/board.request.save.dto"
import { BoardRepository } from "../infrastructure/board.repository"

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async saveBoard(body: RequestBoardSaveDto, user: User) {
    try {
      const base = []
      for (const item of body.base) {
        const path = await this.baseToImg(item)
        base.push(path)
      }
      const board: Board = this.boardRepository.create({
        title: body.title,
        text: body.text,
        user,
        imgPath1: base[0] || null,
        imgPath2: base[1] || null,
        imgPath3: base[2] || null,
      })
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
  async getNumber() {
    let number = Math.floor(Math.random() * 1000000) + 100000
    if (number > 1000000) number -= 100000
    return number
  }

  async decodeBase(image: string, fileName: string, ext: string) {
    return await decode(image, { fname: fileName, ext: ext })
  }

  async baseToImg(encode: string) {
    try {
      const path: string = `./src/source/img/base/${await this.getNumber()}-${Date.now()}`
      const image = await this.decodeBase(encode, path, "jpg")
      return path
    } catch (err) {
      console.log(err)
    }
  }
}
