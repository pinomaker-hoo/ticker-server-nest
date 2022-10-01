import { User } from "src/auth/domain/user.entity"
import { Board } from "src/board/domain/board.entity"
import { BaseTimeEntity } from "src/common/entity/basetime.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "table_comment" })
export class Comment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  text: string

  @ManyToOne((type) => User, (user) => user.comment)
  user: User

  @ManyToOne((type) => Board, (board) => board.comment)
  board: Board
}
