import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "src/auth/domain/user.entity"
import { Point } from "../domain/point.entity"
import { PointRepository } from "../infrastructure/point.repository"

@Injectable()
export class PointService {
  constructor(private readonly pointRepository: PointRepository) {}

  async updatePoint(user: User, money: number) {
    try {
      const point: Point = await this.pointRepository.findOne({
        where: { user },
      })
      const saveMoney = point.money + money
      return await this.pointRepository.update(point.idx, { money: saveMoney })
    } catch (err) {
      console.log(err)
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
    }
  }

  async getPoint(user: User, money: number) {
    try {
      const data = await this.pointRepository
        .createQueryBuilder("location")
        .select("SUM(location.something)", "sum")
        .getRawOne()
    } catch (err) {
      console.log(err)
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
    }
  }

  async savePoint(user: User) {
    try {
      const point = this.pointRepository.create({ user, money: 0 })
      return await this.pointRepository.save(point)
    } catch (err) {
      console.log(err)
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
    }
  }
}
