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

  @Column({ default: 'None' })
  dcCreator?: string;

  @Column({ length: 2000 })
  content: string;

  @Column({ length: 1000 })
  contentSnippet: string;

  @Column()
  guid: string;

  @Column({ length: 1000 })
  categories: string;

  @Column({ default: 'None' })
  isoDate?: string;
}
