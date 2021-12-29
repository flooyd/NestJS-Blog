import {
  Equals,
  equals,
  IsIn,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @MinLength(3, { message: 'Title should be at least 3 characters' })
  @MaxLength(255, { message: 'Title should not be longer than 255 characters' })
  readonly title: string;

  readonly content: string;

  @MaxLength(50)
  readonly tags: string;

  @IsIn(['public', 'private', 'draft'])
  readonly type: string;
}
