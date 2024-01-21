import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User } from '../users/schema/users.schema';
import { CreateUserDto } from '../users/dto/user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getUser(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }
}
