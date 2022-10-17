import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "../domain/user.entity"
import { Provider } from "../dto/user.provider.enum"
import { RequestUserSaveDto } from "../dto/user.request.save.dto"
import { UserRepository } from "../infrastructure/user.repository"
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt"
import { KakaoDto } from "../dto/user.kakao.dto"
import { PointService } from "src/point/application/point.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly pointService: PointService
  ) {}
  async localUserSave(body: RequestUserSaveDto, path: string) {
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
        image: path,
      })
      await this.userRepository.save(user)
      await this.pointService.savePoint(user)
      return user
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

  async kakaoLogin(body: KakaoDto): Promise<string> {
    try {
      const findUser = await this.findKakaoUserByKakaoId(body.kakaoId)
      if (findUser) return this.signJwtWithIdx(findUser.idx)
      const saveUser = await this.kakaoSave(body)
      return this.signJwtWithIdx(saveUser.idx)
    } catch (err) {
      throw new HttpException("Not Found", HttpStatus.BAD_REQUEST)
    }
  }

  /** Kakao Save -> Kakao Login에서 호출 */
  async kakaoSave(body: KakaoDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        email: body.email,
        name: body.name,
        provider: Provider.KAKAO,
        providerId: body.kakaoId,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      throw new HttpException("Not Found!!", HttpStatus.BAD_REQUEST)
    }
  }
  async getUserAll() {
    return await this.userRepository.find()
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

  async findKakaoUserByKakaoId(providerId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { providerId } })
  }
}
