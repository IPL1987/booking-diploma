import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomDocument } from '../hotels/schema/room.schema';
import { Model, ObjectId } from 'mongoose';
import { HotelRoomService, ID } from '../hotels/interface/room.interface';
import { SearchRoomsParams } from '../hotels/dto/search-room.dto';

@Injectable()
export class IHotelRoomService implements HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly roomModel: Model<HotelRoomDocument>,
  ) {}

  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    return await this.roomModel.create(data);
  }

  async findById(id: ID, isEnabled?: true): Promise<HotelRoom> {
    const searchParams: { _id: ID; isEnabled?: true } = { _id: id };
    if ((isEnabled = true)) {
      searchParams.isEnabled = isEnabled;
    }
    return await this.roomModel.findById(searchParams);
  }

  async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const { limit, offset, ...filter } = params;
    return await this.roomModel
      .find(filter)
      .populate('Hotel')
      .limit(limit)
      .skip(offset);
  }

  async update(id: ObjectId, data: Partial<HotelRoom>): Promise<HotelRoom> {
    const hotelRoom = await this.roomModel.findByIdAndUpdate(id, data);
    return hotelRoom;
  }
}
