import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './BaseEntity';
import { User } from "./user.entity";
import { Number } from "./number.entity";

@Entity('send_log')
export class SendLog extends BaseEntity {
  @ManyToOne(() => User, user => user.logs)
  user: User;

  @ManyToOne(() => Number, number => number.logs)
  num: Number;

  @Column()
  log_message!: string;

  @Column()
  log_success!: boolean;
}
