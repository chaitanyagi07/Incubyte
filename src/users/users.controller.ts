import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.usersService.registerUser(username, email, password);
  }
}
