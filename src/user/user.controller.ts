import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { Roles } from '@app/decorators/roles.decorator';
import { UserEntity } from '@app/user/user.entity';
import { RolesGuard } from '@app/guards/roles.guard';
import { Reflector } from '@nestjs/core';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('users')
  @Roles('admin dog')
  @UseGuards(new RolesGuard(new Reflector()))
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }
}
