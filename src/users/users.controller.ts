import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User } from '../users/schema/users.schema';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }
}
