import {
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  Body,
  Get,
} from "@nestjs/common"
import { JwtGuard } from "src/auth/passport/auth.jwt.guard"
import { ApiResponse } from "src/common/response/reponse.dto"
import { CommentService } from "../application/comment.service"
import { Comment } from "../domain/comment.entity"
import { RequestSaveCommentDto } from "../dto/comment.save.dto"

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post("/:id")
  @UseGuards(JwtGuard)
  async saveComment(
    @Param("id") id: string,
    @Body() body: RequestSaveCommentDto,
    @Req() req
  ) {
    const { user } = req
    const comment: Comment = await this.commentService.saveComment(
      body.text,
      user,
      Number(id)
    )
    return ApiResponse.of({
      data: comment,
      message: "success Save Comment",
      statusCode: 200,
    })
  }

  @Get("/:id")
  async getCommentList(@Param("id") id: string) {
    const commentList: Comment[] = await this.commentService.getCommentList(
      Number(id)
    )
    console.log(commentList)
    return ApiResponse.of({
      data: commentList,
      message: "success Get commentList",
      statusCode: 200,
    })
  }
}
