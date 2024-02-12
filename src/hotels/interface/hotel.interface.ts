import { ObjectId } from 'mongoose';
import { Hotel } from '../schema/hotel.schema';
import { SearchHotelParams } from '../dto/search-hotel.dto';
import { UpdateHotelParams } from '../dto/hotel.dto';

export type ID = string | ObjectId;

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ID, data: UpdateHotelParams): Promise<Hotel>;
}
