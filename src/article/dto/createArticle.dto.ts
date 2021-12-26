import { MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
  @MinLength(3)
  @MaxLength(255)
  readonly title: string;

  readonly content: string;

  @MaxLength(50)
  readonly tags: string;
}
