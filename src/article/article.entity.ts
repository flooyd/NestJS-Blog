import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  content: string;

  @Column({ default: '' })
  tags: string;

  @Column()
  userId: number;
}
