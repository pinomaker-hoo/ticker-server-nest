import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "../domain/user.entity"
import { Provider } from "../dto/user.provider.enum"
import { RequestUserSaveDto } from "../dto/user.request.save.dto"
import { UserRepository } from "../infrastructure/user.repository"
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt"
import { NaverDto } from "../dto/user.naver.dto"
import { PointService } from "src/point/application/point.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly pointService: PointService
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
      await this.userRepository.save(user)
      await this.pointService.savePoint(user)
      return user
    } catch (err) {
      console.log(err)
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async updatePass(user: User, pass: string) {
    try {
      console.log(user, pass)
      user.pass = pass
      return await this.userRepository.update(user.idx, { pass })
    } catch (err) {
      console.log(err)
    }
  }

  async localLogin(email: string, password: string): Promise<User> {
    try {
      const findUser: User = await this.userRepository.findOne({
        where: { email },
        relations: ["point"],
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

  async naverLogin(body: NaverDto) {
    try {
      const findUser = await this.findKakaoUserByKakaoId(body.naverId)
      if (findUser) {
        const token = this.signJwtWithIdx(findUser.idx)
        return { token, user: findUser }
      }
      const saveUser = await this.naverSave(body)
      const token = this.signJwtWithIdx(saveUser.idx)
      return { token, user: saveUser }
    } catch (err) {
      throw new HttpException("Not Found", HttpStatus.BAD_REQUEST)
    }
  }

  /** naver Save -> Kakao Login에서 호출 */
  async naverSave(body: NaverDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        email: body.email,
        name: body.name,
        provider: Provider.NAVER,
        providerId: body.naverId,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      throw new HttpException("Not Found!!", HttpStatus.BAD_REQUEST)
    }
  }

  async findKakaoUserByKakaoId(providerId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { providerId } })
  }

  async getUserAll() {
    return await this.userRepository.find()
  }

  signJwtWithIdx(idx: number): string {
    return this.jwtService.sign({ idx })
  }

  async getById(idx: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { idx },
      relations: ["point"],
    })
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
