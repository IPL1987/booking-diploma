import { ObjectId } from 'mongoose';
import { User } from '../schema/users.schema';
import { SearchUserParams } from '../interface/search-users.interface';

export type ID = string | ObjectId;
export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}
