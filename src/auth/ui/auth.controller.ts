import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common"
import { Response } from "express"
import { ApiResponse } from "src/common/response/reponse.dto"
import { AuthService } from "../application/auth.service"
import { User } from "../domain/user.entity"
import { RequestUserSaveDto } from "../dto/user.request.save.dto"
import { KakaoGuard } from "../passport/auth.kakao.guard"
import { LocalGuard } from "../passport/auth.local.guard"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async saveLocalUser(
    @Body() body: RequestUserSaveDto
  ): Promise<ApiResponse<User>> {
    const user: User = await this.authService.localUserSave(body)
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
    const { user } = req
    const token = this.authService.signJwtWithIdx(user.idx)
    res.cookie("accessToken", token, {
      maxAge: 24 * 60 * 60,
    })
    res.send({ user })
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
