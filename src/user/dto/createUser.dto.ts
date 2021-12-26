import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, { message: 'Username should be at least 3 characters.' })
  readonly username: string;

  @IsEmail({}, { message: 'Email should be an email address.' })
  readonly email: string;

  @MinLength(3, { message: 'Password should be at least 3 characters.' })
  readonly password: string;
}
