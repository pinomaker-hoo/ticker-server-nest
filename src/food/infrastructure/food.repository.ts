import { EntityRepository, Repository } from "typeorm"
import { Food } from "../domain/food.entity"

@EntityRepository(Food)
export class FoodRepository extends Repository<Food> {}
