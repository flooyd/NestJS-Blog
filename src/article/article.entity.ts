import { UserEntity } from '@app/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: '' })
  visibility: string;

  @Column()
  userId: number;

  @ManyToOne((type) => UserEntity, (user) => user.articles)
  author: UserEntity;
}
