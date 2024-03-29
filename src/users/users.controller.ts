import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { User } from '../users/schema/users.schema';
import { Role, Roles } from 'src/auth/enums/enums';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { HttpValidationPipe } from 'src/validation/validation';
import { CreateUserDto } from './dto/user.dto';

@Controller('/api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/admin/users/')
  @Roles(Role.ADMIN, Role.MANAGER)
  async createUser(
    @Body(new HttpValidationPipe()) body: CreateUserDto,
  ): Promise<Partial<User>> {
    return await this.userService.create(body);
  }

  @Get('/admin/users/')
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAdmin(@Param() params: any): Promise<Array<Partial<User>>> {
    return await this.userService.findAll(params);
  }

  @Get('/manager/users/')
  @Roles(Role.MANAGER)
  async getManager(@Param() params: any): Promise<Array<Partial<User>>> {
    return await this.userService.findAll(params);
  }
}
