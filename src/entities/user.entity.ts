import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './BaseEntity';
import { SendLog } from './sendLog.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  user_name!: string;

  @Column()
  user_active!: string;

  @OneToMany(() => SendLog, (sendLog) => sendLog.user)
  logs: SendLog[];
}
