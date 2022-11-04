import { Controller } from "@nestjs/common"
import { FoodService } from "../application/food.service"

@Controller("food")
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
}
