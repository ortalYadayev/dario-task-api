import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './BaseEntity';
import { Number } from './number.entity';

@Entity('countries')
export class Country extends BaseEntity {
  @Column()
  country_code!: string;

  @Column()
  country_title!: string;

  @OneToMany(() => Number, (number) => number.country)
  numbers: Number[];
}
