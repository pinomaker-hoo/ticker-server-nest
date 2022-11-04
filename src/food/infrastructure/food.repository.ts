import { EntityRepository, Repository } from "typeorm"
import { Food } from "../domain/food.domain"

@EntityRepository(Food)
export class FoodRepository extends Repository<Food> {}
