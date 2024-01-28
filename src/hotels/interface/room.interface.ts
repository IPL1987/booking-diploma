import { ObjectId } from 'mongoose';
import { HotelRoom } from '../schema/room.schema';
import { SearchRoomsParams } from '../dto/search-room.dto';

export type ID = string | ObjectId;

export interface HotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID, isEnabled?: true): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
