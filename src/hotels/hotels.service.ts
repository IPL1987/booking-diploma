import { BadRequestException, Injectable } from '@nestjs/common';
import { Hotel, IHotel } from '../hotels/schema/hotel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHotelService } from './interface/hotel.interface';
import { ID } from './interface/room.interface';
import { SearchHotelParams } from './dto/search-hotel.dto';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name)
    private HotelModel: Model<IHotel>,
  ) {}

  public async create(data: Partial<Hotel>): Promise<IHotel> {
    const hotel = new this.HotelModel(data);
    try {
      return await hotel.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async findById(id: ID): Promise<IHotel> {
    return await this.HotelModel.findById(id).exec();
  }

  public async search(params: SearchHotelParams): Promise<IHotel[]> {
    const { limit, offset, title } = params;
    const query = {
      title: { $regex: new RegExp(title, 'i') },
    };
    return await this.HotelModel.find(query).skip(offset).limit(limit);
  }

  public async update(id: ID, data: Partial<Hotel>): Promise<IHotel> {
    return await this.HotelModel.findByIdAndUpdate(id, data);
  }
}
