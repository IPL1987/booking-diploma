import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/users.schema';
import { IUserService } from './interface/users.interface';
import { ID } from './interface/users.interface';
import { SearchUserParams } from './interface/search-users.interface';
import { RegExpSearchParams } from './dto/search-user.dto';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(params: SearchUserParams): Promise<User[]> {
    function filterMatchedParams(params: SearchUserParams) {
      const { email, name, contactPhone } = params;
      const matchParam: RegExpSearchParams = {};

      if (email) {
        matchParam.email = { $regex: new RegExp(email, 'gi') };
      }
      if (name) {
        matchParam.name = { $regex: new RegExp(name, 'gi') };
      }
      if (contactPhone) {
        matchParam.contactPhone = { $regex: new RegExp(contactPhone, 'gi') };
      }
      return matchParam;
    }

    try {
      const matchParam = filterMatchedParams(params);
      const { offset, limit } = params;
      return await this.userModel
        .find(matchParam)
        .skip(offset)
        .limit(limit)
        .exec();
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  async create(data: Partial<User>): Promise<User> {
    try {
      const createdUser = new this.userModel(data);
      if (createdUser) {
        return createdUser.save();
      }
    } catch (error: any) {
      throw new BadRequestException('Ошибка создания пользователя');
    }
  }

  async findById(id: ID): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (user) {
        return user;
      }
    } catch (error: any) {
      throw new HttpException('Пользователь не найден', 404);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel
        .findOne({ email: email })
        .select('-__v');
      if (user) {
        return user;
      }
    } catch (error: any) {
      throw new HttpException('Пользователь не найден', 404);
    }
  }
}
