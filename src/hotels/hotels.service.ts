import { BadRequestException, Injectable } from '@nestjs/common';
import { Hotel, IHotel } from '../hotels/schema/hotel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHotelService } from './interface/hotel.interface';
import { ID } from './interface/room.interface';
import { SearchHotelParams } from './dto/search-hotel.dto';
import { UpdateHotelParams } from './dto/hotel.dto';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name)
    private HotelModel: Model<IHotel>,
  ) {}

  async create(data: Partial<Hotel>): Promise<IHotel> {
    const hotel = new this.HotelModel(data);
    try {
      return await hotel.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findById(id: ID): Promise<IHotel> {
    return await this.HotelModel.findById(id).exec();
  }

  async search(params: SearchHotelParams): Promise<IHotel[]> {
    const { limit, offset, title } = params;
    const query = {
      title: { $regex: new RegExp(title, 'ig') },
    };
    return await this.HotelModel.find(query).skip(offset).limit(limit);
  }

  async update(id: ID, data: UpdateHotelParams): Promise<IHotel> {
    return await this.HotelModel.findByIdAndUpdate(id, data, { new: true });
  }
}
