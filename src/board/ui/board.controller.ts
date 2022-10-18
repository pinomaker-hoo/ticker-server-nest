import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { FilesInterceptor } from "@nestjs/platform-express"
import { JwtGuard } from "src/auth/passport/auth.jwt.guard"
import { ApiResponse } from "src/common/response/reponse.dto"
import { multerDiskOptions } from "src/utils/multerOptions"
import { BoardService } from "../application/board.service"
import { Board } from "../domain/board.entity"
import { RequestBoardSaveDto } from "../dto/board.request.save.dto"

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(JwtGuard)
  // @UseInterceptors(FilesInterceptor("files", null, multerDiskOptions))
  async saveBoard(
    @UploadedFiles() files,
    @Body() body: RequestBoardSaveDto,
    @Req() req
  ) {
    // const { path } = files[0]
    const { user } = req
    const board: Board = await this.boardService.saveBoard(body, user, "null")
    return ApiResponse.of({
      data: board,
      message: "success Save Board",
      statusCode: 200,
    })
  }

  @Get()
  async getAll() {
    return await this.boardService.getBoardList()
  }
}
