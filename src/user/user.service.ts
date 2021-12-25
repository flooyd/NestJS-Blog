import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email and/or Username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const userByUsername = await this.userRepository.findOne({
      username: loginUserDto.username,
    });

    if (!userByUsername) {
      throw new HttpException(
        'Invalid Username or Password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const passwordIsValid = await this.validatePassword(
      loginUserDto.password,
      userByUsername.password,
    );

    if (!passwordIsValid) {
      throw new HttpException(
        'Invalid Username or Password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return userByUsername;
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  async validatePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const match = await compare(password, hashPassword);

    if (match) {
      return true;
    } else {
      return false;
    }
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    delete user.password;
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
