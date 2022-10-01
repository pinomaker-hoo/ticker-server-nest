import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { AuthService } from "../application/auth.service"
import { User } from "../domain/user.entity"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    })
  }
  async validate(email: string, password: string): Promise<User> {
    return await this.authService.localLogin(email, process.env.HASH_KEYWORD)
  }
}
