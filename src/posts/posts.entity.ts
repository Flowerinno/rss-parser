import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  pubDate: string;

  @Column()
  content: string;

  @Column()
  contentSnippet: string;

  @Column()
  categories: string;
}
