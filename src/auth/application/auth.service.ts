import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "../domain/user.entity"
import { Provider } from "../dto/user.provider.enum"
import { RequestUserSaveDto } from "../dto/user.request.save.dto"
import { UserRepository } from "../infrastructure/user.repository"
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}
  async localUserSave(body: RequestUserSaveDto) {
    try {
      const checkEmail = await this.findUserByEmail(body.email)
      if (checkEmail)
        throw new HttpException("이미 존재 하는 계정", HttpStatus.BAD_REQUEST)
      const hash: string = await this.hashPassword(body.password)
      const user: User = this.userRepository.create({
        email: body.email,
        password: hash,
        name: body.name,
        birth: new Date(),
        male: body.male,
        provider: Provider.LOCAL,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      console.log(err)
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async localLogin(email: string, password: string): Promise<User> {
    try {
      const findUser: User = await this.userRepository.findOne({
        where: { email },
      })
      const compareResult: boolean = await this.compareHash(
        password,
        findUser.password
      )
      return compareResult ? findUser : null
    } catch (err) {
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  signJwtWithIdx(idx: number): string {
    return this.jwtService.sign({ idx })
  }

  async getById(idx: number): Promise<User> {
    return await this.userRepository.findOne({ where: { idx } })
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, +process.env.HASH_KEYWORD)
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  async findUserByEmail(email: string): Promise<boolean> {
    const user: User[] = await this.userRepository.find({ where: { email } })
    return user.length > 0 ? true : false
  }
}
