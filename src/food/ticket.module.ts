import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FoodService } from "./application/food.service"
import { FoodRepository } from "./infrastructure/food.repository"
import { FoodController } from "./ui/food.controller"

@Module({
  imports: [TypeOrmModule.forFeature([FoodRepository])],
  providers: [FoodService],
  exports: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
