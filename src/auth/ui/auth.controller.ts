import {
  Bind,
  Body,
  ConsoleLogger,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
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
  //  Promise<ApiResponse<User>>
  // @UseInterceptors(FileInterceptor("photo", multerDiskOptions))
  async saveLocalUser(@Req() req, @UploadedFile() file: any) {
    // const { path } = file[0]
    console.log("file", req)
    // const user: User = await this.authService.localUserSave(body, path)
    // if (!user)
    //   return ApiResponse.of({
    //     data: user,
    //     message: "Failed Save User",
    //     statusCode: 400,
    //   })
    // return ApiResponse.of({
    //   data: user,
    //   message: "success Save User",
    //   statusCode: 200,
    // })
  }

  @Post("/local")
  @UseGuards(LocalGuard)
  async loginLocalUser(@Req() req, @Res() res) {
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
