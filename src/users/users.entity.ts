import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  timestamp: Date;
}
