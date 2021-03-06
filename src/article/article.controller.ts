import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from '@app/article/article.service';
import { CreateArticleDto } from '@app/article/dto/createArticle.dto';
import { Roles } from '@app/decorators/roles.decorator';
import { RolesGuard } from '@app/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { ArticleEntity } from '@app/article/article.entity';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('articles')
  @Roles('user')
  @UseGuards(new RolesGuard(new Reflector()))
  @UsePipes(new ValidationPipe())
  async createArticle(
    @Body('article') createArticleDto: CreateArticleDto,
    @Req() request: any,
  ) {
    const article = await this.articleService.createArticle(
      createArticleDto,
      request.raw.user.id,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Get('articles')
  @UsePipes(new ValidationPipe())
  @Roles('user')
  @UseGuards(new RolesGuard(new Reflector()))
  async getOwnArticles(@Req() request: any) {
    console.log(request.raw.user);
    const [articles, count] = await this.articleService.getOwnArticles(
      request.raw.user.id,
    );
    return {
      articles,
      count,
    };
  }

  @Get('articles/:id')
  async getArticle(@Param() params): Promise<ArticleEntity> {
    const article = await this.articleService.getArticleById(
      parseInt(params.id),
    );
    return article;
  }
}
