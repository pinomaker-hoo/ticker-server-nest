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

@Entity({ name: "tbl_board" })
export class Board extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  title: string

  @Column()
  text: string

  @Column({ type: "varchar", nullable: true })
  imgPath: string

  @ManyToOne((type) => User, (user) => user.board)
  user: User

  @OneToMany((type) => Comment, (comment) => comment.board)
  comment: Comment[]
}
