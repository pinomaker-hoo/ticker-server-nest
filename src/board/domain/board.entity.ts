import { User } from "src/auth/domain/user.entity"
import { Comment } from "src/comment/domain/comment.entity"
import { BaseTimeEntity } from "src/common/entity/basetime.entity"
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { BoardKind } from "../dto/board.kind.enum"

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

  @Column({ type: "enum", enum: BoardKind })
  boardKind: BoardKind

  @ManyToOne((type) => User, (user) => user.board)
  user: User

  @OneToMany((type) => Comment, (comment) => comment.board)
  comment: Comment[]
}
