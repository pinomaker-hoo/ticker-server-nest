import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common"
import { ApiResponse } from "src/common/response/reponse.dto"
import { AuthService } from "../application/auth.service"
import { User } from "../domain/user.entity"
import { NaverDto } from "../dto/user.naver.dto"
import { RequestUserSaveDto } from "../dto/user.request.save.dto"
import { JwtGuard } from "../passport/auth.jwt.guard"
import { LocalGuard } from "../passport/auth.local.guard"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getUserAll() {
    return await this.authService.getUserAll()
  }

  @Get("/user")
  @UseGuards(JwtGuard)
  async findUser(@Req() req) {
    const { user } = req
    console.log(user)
    return user
  }

  @Patch()
  @UseGuards(JwtGuard)
  async updatePass(@Body() body, @Req() req) {
    return await this.authService.updatePass(req.user, body.pass)
  }

  @Post()
  async saveLocalUser(@Req() req, @Body() body: RequestUserSaveDto) {
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
    console.log(user)
    res.send({ user, token })
  }

  @Post("/naver")
  async loginNaverUser(@Body() body: NaverDto) {
    return await this.authService.naverLogin(body)
  }

  @Post("/password")
  async initPassword(@Body() body) {
    return await this.authService.initPassword(body.email)
  }

  @Patch("/password")
  @UseGuards(JwtGuard)
  async changePassword(@Req() req, @Body() body) {
    return await this.authService.updatePassword(req.user, body.password)
  }

  @Delete()
  @UseGuards()
  async deleteUser(@Req() req) {
    return await this.authService.deleteUser(req.user)
  }
}
