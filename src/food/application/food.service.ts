import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { Food } from "../domain/food.entity"
import { FoodSaveDto } from "../dto/food.save.dto"
import { FoodRepository } from "../infrastructure/food.repository"

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  async saveFood(body: FoodSaveDto) {
    try {
      const food: Food = this.foodRepository.create({
        rice: body.rice,
        soup: body.soup,
        food1: body.food1,
        food2: body.food2,
      })
      return await this.foodRepository.save(food)
    } catch (err) {
      console.log(err)
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  async getFoodLiist() {
    try {
      return await this.foodRepository.find()
    } catch (err) {
      console.log(err)
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
    }
  }
}
