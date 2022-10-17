import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import { JwtGuard } from "src/auth/passport/auth.jwt.guard"
import { PointService } from "../application/point.service"
import { PointUpdateDto } from "../dto/point.update.dto"

@Controller("point")
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  @UseGuards(JwtGuard)
  async updatePoint(@Req() req: any, @Body() body: PointUpdateDto) {
    return await this.pointService.updatePoint(req.user, body.money)
  }
}
