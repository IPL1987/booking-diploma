import { Injectable } from '@nestjs/common';
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

  public async create(data: any) {
    const hotel = new this.HotelModel(data);
    await hotel.save();
    return hotel;
  }

  public async findById(id: ID) {
    const hotel = await this.HotelModel.findById(id);
    return hotel;
  }

  public async search(params: SearchHotelParams) {
    const { limit, offset } = params;
    const hotels = await this.HotelModel.find().skip(offset).limit(limit);
    return hotels;
  }

  public async update(id: ID, data: Partial<Hotel>) {
    const hotel = this.HotelModel.findByIdAndUpdate(id, data);
    return hotel;
  }
}
