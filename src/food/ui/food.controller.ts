import { Body, Controller, Get, Post } from "@nestjs/common"
import { ApiResponse } from "src/common/response/reponse.dto"
import { FoodService } from "../application/food.service"
import { FoodSaveDto } from "../dto/food.save.dto"

@Controller("food")
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async saveFood(@Body() body: FoodSaveDto) {
    const response = await this.foodService.saveFood(body)
    return ApiResponse.of({
      data: response,
      message: "success Save Food",
      statusCode: 200,
    })
  }

  @Get()
  async getFoodList() {
    const response = await this.foodService.getFoodLiist()
    return ApiResponse.of({
      data: response,
      message: "success Get Food List",
      statusCode: 200,
    })
  }
}
