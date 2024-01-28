import { ObjectId } from 'mongoose';
import { Hotel } from '../schema/hotel.schema';

export type ID = string | ObjectId;

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]>;
}
