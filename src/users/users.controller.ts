import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User } from '../users/schema/users.schema';
import { Role, Roles } from 'src/auth/enums/enums';

@Controller('/api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/admin/users/')
  @Roles(Role.ADMIN)
  async createUser(@Body() body): Promise<Partial<User>> {
    const user = await this.userService.create(body);
    return user;
  }

  @Get('/admin/users/')
  @Roles(Role.ADMIN)
  async getAdmin(@Param() params): Promise<Array<Partial<User>>> {
    const users = this.userService.findAll(params);
    return users;
  }

  @Get('/manager/users/')
  @Roles(Role.MANAGER)
  async getManager(@Param() params): Promise<Array<Partial<User>>> {
    const users = this.userService.findAll(params);
    return users;
  }
}
