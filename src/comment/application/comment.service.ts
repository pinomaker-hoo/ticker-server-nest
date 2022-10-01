import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "src/auth/domain/user.entity"
import { BoardService } from "src/board/application/board.service"
import { Comment } from "../domain/comment.entity"
import { CommentRepository } from "../infrastructure/comment.repository"

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly boardService: BoardService
  ) {}

  async saveComment(
    text: string,
    user: User,
    boardIdx: number
  ): Promise<Comment> {
    try {
      const board = await this.boardService.getBoard(boardIdx)
      const comment: Comment = this.commentRepository.create({
        text,
        user,
        board,
      })
      return await this.commentRepository.save(comment)
    } catch (err) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
    }
  }

  async getCommentList(boardIdx: number): Promise<Comment[]> {
    try {
      const board = await this.boardService.getBoard(boardIdx)
      return await this.commentRepository.find({ where: { board } })
    } catch (err) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
    }
  }
}
