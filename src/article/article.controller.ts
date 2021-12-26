import {
  Body,
  Controller,
  Get,
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
  @UsePipes(new ValidationPipe())
  @Roles('user')
  @UseGuards(new RolesGuard(new Reflector()))
  async createArticle(
    @Body('article') createArticleDto: CreateArticleDto,
    @Req() request: any,
  ) {
    const article = await this.articleService.createArticle(
      createArticleDto,
      request.user.id,
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Get('articles')
  @UsePipes(new ValidationPipe())
  @Roles('user')
  @UseGuards(new RolesGuard(new Reflector()))
  async getOwnArticles(
    @Req() request: any,
    @Query() query,
  ): Promise<[ArticleEntity[], number]> {
    console.log(query.dogs);
    return this.articleService.getArticles(query, request.user.id);
  }
}
