import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from '@app/article/types/articleResponse.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    createArticleDto: CreateArticleDto,
    userId,
  ): Promise<ArticleEntity> {
    const articleByTitle = await this.articleRepository.findOne({
      userId,
      title: createArticleDto.title,
    });

    if (articleByTitle) {
      throw new HttpException(
        'Article with this title already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newArticle = new ArticleEntity();
    Object.assign(newArticle, {
      ...createArticleDto,
      userId,
      author: userId,
    });
    return await this.articleRepository.save(newArticle);
  }

  async getArticles(
    query: any,
    userId?: number | null,
  ): Promise<[ArticleEntity[], number]> {
    const data = await this.articleRepository
      .createQueryBuilder('article')
      .innerJoin('article.author', 'author')
      .select(['article', 'author.username', 'author.id', 'author.image'])
      .where({ author: userId })
      .take(100)
      .getManyAndCount();

    return data;
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return {
      article: {
        ...article,
      },
    };
  }
}
