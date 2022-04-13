import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './BaseEntity';
import { Country } from './country.entity';
import { SendLog } from './sendLog.entity';

@Entity('numbers')
export class Number extends BaseEntity {
  @ManyToOne(() => Country, (country) => country.numbers)
  country: Country;

  @Column()
  num_number!: string;

  @OneToMany(() => SendLog, (sendLog) => sendLog.num)
  logs: SendLog[];
}
