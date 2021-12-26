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
    Object.assign(newArticle, { ...createArticleDto, userId });
    return await this.articleRepository.save(newArticle);
  }

  async getArticles(
    query: any,
    userId?: number | null,
  ): Promise<[ArticleEntity[], number]> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    if (userId) {
      return this.articleRepository.findAndCount({
        where: { userId },
        take,
        skip,
      });
    }
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return {
      article: {
        ...article,
      },
    };
  }
}
