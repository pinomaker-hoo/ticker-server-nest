import {
  Body,
  ConsoleLogger,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { FilesInterceptor } from "@nestjs/platform-express"
import { Response } from "express"
import { ApiResponse } from "src/common/response/reponse.dto"
import { multerDiskOptions } from "src/utils/multerOptions"
import { AuthService } from "../application/auth.service"
import { User } from "../domain/user.entity"
import { RequestUserSaveDto } from "../dto/user.request.save.dto"
import { KakaoGuard } from "../passport/auth.kakao.guard"
import { LocalGuard } from "../passport/auth.local.guard"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getUserAll() {
    return await this.authService.getUserAll()
  }

  @Post()
  @UseInterceptors(FilesInterceptor("files", null, multerDiskOptions))
  async saveLocalUser(
    @Body() body: RequestUserSaveDto,
    @UploadedFiles() files: any
  ): Promise<ApiResponse<User>> {
    console.log(body, files)
    const { path } = files[0]
    const user: User = await this.authService.localUserSave(body, path)
    if (!user)
      return ApiResponse.of({
        data: user,
        message: "Failed Save User",
        statusCode: 400,
      })
    return ApiResponse.of({
      data: user,
      message: "success Save User",
      statusCode: 200,
    })
  }

  @Post("/local")
  @UseGuards(LocalGuard)
  async loginLocalUser(@Req() req, @Res() res) {
    console.log(1)
    const { user } = req
    const token = this.authService.signJwtWithIdx(user.idx)
    res.send({ user, token })
  }

  @Get("/kakao")
  @UseGuards(KakaoGuard)
  async loginKakaoUser() {
    return HttpStatus.OK
  }

  @Get("/kakao/callback")
  @UseGuards(KakaoGuard)
  async kakaoCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.kakaoLogin(req.user)
    res.header("Access-Control-Allow-Origin", "*")
    res.set("Authorization", "Bearer " + token)
    res.cookie("accessToken", token, {
      maxAge: 24 * 60 * 60,
    })
    res.redirect("http://localhost:5173")
  }
}
