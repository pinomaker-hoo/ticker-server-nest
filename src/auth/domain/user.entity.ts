import { BaseTimeEntity } from 'src/common/entity/basetime.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbl_user' })
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number;
}
