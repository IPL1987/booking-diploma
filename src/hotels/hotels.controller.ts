import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Hotel } from '../hotels/schema/hotel.schema';
import { HotelService } from './hotels.service';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ID } from './interface/hotel.interface';
import { HttpValidationPipe } from 'src/validation/validation';
import { UpdateHotelParams } from './dto/hotel.dto';
import { SearchHotelParams } from './dto/search-hotel.dto';
import { Role, Roles } from 'src/auth/enums/enums';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api')
@Roles(Role.ADMIN)
export class HotelsController {
  constructor(private hotelService: HotelService) {}

  @Post('/admin/hotels/')
  async createHotel(@Body(new HttpValidationPipe()) data: Partial<Hotel>) {
    const hotel = await this.hotelService.create(data);
    return {
      id: hotel.id,
      title: hotel.title,
      description: hotel.description,
    };
  }

  @Get('/admin/hotels/')
  find(@Query() data: SearchHotelParams) {
    const { limit, offset, title } = data;
    return this.hotelService.search({
      limit: limit ? Number(limit) : 10,
      offset: offset ? Number(offset) : 0,
      title: title,
    });
  }

  @Put('/admin/hotels/:id')
  async updateHotel(
    @Param('id') id: ID,
    @Body(new HttpValidationPipe()) data: UpdateHotelParams,
  ): Promise<Hotel> {
    return await this.hotelService.update(id, data);
  }
}
