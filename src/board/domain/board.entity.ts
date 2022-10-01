import { User } from "src/auth/domain/user.entity"
import { BaseTimeEntity } from "src/common/entity/basetime.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "tbl_board" })
export class Board extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  title: string

  @Column()
  text: string

  @Column()
  imgPath: string

  @ManyToOne((type) => User, (user) => user.board)
  user: User
}
