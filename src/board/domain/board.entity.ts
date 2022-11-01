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
  imgPath1: string

  @Column({ type: "varchar", nullable: true })
  imgPath2: string

  @Column({ type: "varchar", nullable: true })
  imgPath3: string

  @ManyToOne((type) => User, (user) => user.board, {
    onDelete: "CASCADE",
  })
  user: User

  @OneToMany((type) => Comment, (comment) => comment.board)
  comment: Comment[]
}
