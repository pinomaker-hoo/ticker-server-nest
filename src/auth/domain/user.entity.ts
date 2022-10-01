import { Board } from "src/board/domain/board.entity"
import { BaseTimeEntity } from "src/common/entity/basetime.entity"
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"
import { Provider } from "../dto/user.provider.enum"

@Entity({ name: "tbl_user" })
@Unique(["email", "providerId"])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: "varchar", name: "user_email" })
  email: string

  @Column({ type: "varchar", name: "user_name" })
  name: string

  @Column({ type: "varchar", name: "user_password", nullable: true })
  password: string

  @Column({ type: "date", name: "user_birth" })
  birth: Date

  @Column({ type: "boolean", name: "user_male" })
  male: boolean

  @Column({ type: "enum", enum: Provider, name: "user_provider" })
  provider: Provider

  @Column({ type: "varchar", name: "user_provider_id", nullable: true })
  providerId: string

  @OneToMany((type) => Board, (board) => board.user)
  board: Board[]
}
