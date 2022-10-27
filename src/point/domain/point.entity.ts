import { User } from "src/auth/domain/user.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "tbl_point" })
export class Point {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  money: number

  @ManyToOne((type) => User, (user) => user.point, {
    onDelete: "CASCADE",
  })
  user: User
}
