import { BaseTimeEntity } from "src/common/entity/basetime.entity"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "tbl_food" })
export class Food extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  rice: string

  @Column()
  soup: string

  @Column()
  food1: string

  @Column()
  food2: string
}
