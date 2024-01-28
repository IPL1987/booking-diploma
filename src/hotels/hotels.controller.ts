import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Hotel } from '../hotels/schema/hotel.schema';
import { HotelService } from './hotels.service';
import { HotelRoom } from '../hotels/schema/room.schema';
import { IHotelRoomService } from './room.service';
import { SearchRoomsParams } from './dto/search-room.dto';

@Controller('/api')
export class HotelsController {
  constructor(
    private hotelRoomService: IHotelRoomService,
    private hotelService: HotelService,
  ) {}

  @Get('/common/hotel-rooms')
  async getHotelRooms(@Query() query: SearchRoomsParams) {
    const queryParams = { ...query };
    return await this.hotelRoomService.search(queryParams);
  }

  @Get('/common/hotel-rooms/:id')
  async getHotelRoom(@Param() params): Promise<HotelRoom> {
    const hotelRoom = await this.hotelRoomService.findById(params.id);
    return hotelRoom;
  }

  @Post('/admin/hotels/')
  async createHotel(@Body() body): Promise<Hotel> {
    const hotel = await this.hotelService.create(body);
    return hotel;
  }

  @Get('/admin/hotels/')
  async getHotels(@Param() params): Promise<Hotel[]> {
    const hotels = await this.hotelService.search(params);
    return hotels;
  }

  @Get('/admin/hotels/:id')
  async getHotel(@Param() params): Promise<Hotel> {
    const hotel = await this.hotelService.findById(params.id);
    return hotel;
  }

  @Put('/admin/hotels/:id')
  async updateHotel(@Param() params, @Body() body): Promise<Hotel> {
    const hotel = await this.hotelService.update(params.id, body);
    return hotel;
  }

  @Post('/admin/hotel-rooms/')
  async createHotelRoom(@Body() body): Promise<HotelRoom> {
    const hotelRoom = await this.hotelRoomService.create(body);
    return hotelRoom;
  }

  @Put('/admin/hotel-rooms/:id')
  async updateHotelRoom(@Param() params, @Body() body): Promise<HotelRoom> {
    const hotelRoom = await this.hotelRoomService.update(params.id, body);
    return hotelRoom;
  }
}
