import { Injectable } from "@nestjs/common"
import { FoodRepository } from "../infrastructure/food.repository"

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}
}
