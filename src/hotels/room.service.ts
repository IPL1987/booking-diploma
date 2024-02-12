import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomDocument } from '../hotels/schema/room.schema';
import { Model } from 'mongoose';
import { HotelRoomService, ID } from '../hotels/interface/room.interface';
import { SearchRoomsParams } from '../hotels/dto/search-room.dto';

@Injectable()
export class IHotelRoomService implements HotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly roomModel: Model<HotelRoomDocument>,
  ) {}

  async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const room = new this.roomModel(data);
    try {
      return await room.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findById(id: ID, isEnabled?: true): Promise<HotelRoom> {
    const searchParams: { _id: ID; isEnabled?: true } = { _id: id };
    if ((isEnabled = true)) {
      searchParams.isEnabled = isEnabled;
    }
    return await this.roomModel
      .findById(searchParams)
      .populate('Hotel')
      .select('-__v')
      .exec();
  }

  async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const { limit, offset, ...rest } = params;
    return await this.roomModel
      .find(rest)
      .populate('Hotel', ['id', 'title', 'description'])
      .limit(limit)
      .skip(offset);
  }

  async update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    const hotelRoom = await this.roomModel.findByIdAndUpdate(
      { id },
      { $set: { ...data, updatedAt: Date.now() } },
      { new: true },
    );
    return hotelRoom;
  }
}
