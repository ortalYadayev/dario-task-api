import { Column, Entity, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import BaseEntity from './BaseEntity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @Column({ type: 'datetime', nullable: true })
  verifiedAt!: Date | null;

  @Column({ nullable: true })
  imageUrl!: string;

  // @OneToMany(() => UrlToken, (urlToken) => urlToken.user)
  // urlTokens!: UrlToken[];
  //
  // @OneToMany(() => Post, (post) => post.createdBy)
  // posts!: Post[];
  //
  // @OneToMany(() => Post, (post) => post.user)
  // relatedPosts!: Post[];
}
