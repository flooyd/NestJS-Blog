import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @MinLength(3, { message: 'Username should be at least 3 characters.' })
  readonly username: string;

  @MinLength(3, { message: 'Password should be at least 3 characters.' })
  readonly password: string;
}
