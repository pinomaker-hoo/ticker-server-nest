import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { User } from "src/auth/domain/user.entity"
import { JwtGuard } from "src/auth/passport/auth.jwt.guard"
import { ApiResponse } from "src/common/response/reponse.dto"
import { TicketUserService } from "../application/ticketUser.service"
import { TicketUser } from "../domain/ticketUser.entity"
import { RequestSaveTicketUser } from "../dto/ticketUser.sava.dto"

@Controller("ticketUser")
export class TicketUserController {
  constructor(private readonly ticketUserService: TicketUserService) {}

  @Post()
  @UseGuards(JwtGuard)
  async saveTicketUser(@Body() body: RequestSaveTicketUser, @Req() req) {
    const { user } = req
    const ticketUser: TicketUser = await this.ticketUserService.saveTicketUser(
      body.ticketIdx,
      user
    )
    return ApiResponse.of({
      data: ticketUser,
      message: "success Save TicketUser",
      statusCode: 200,
    })
  }
}
