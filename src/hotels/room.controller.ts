import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IHotelRoomService } from './room.service';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ID } from './interface/hotel.interface';
import { SearchRoomsParams } from './dto/search-room.dto';
import { Role, Roles } from 'src/auth/enums/enums';
import { HotelRoom } from './schema/room.schema';
import { HttpValidationPipe } from 'src/validation/validation';
import { MulterFilesInterceptor } from 'interceptor/images.interceptor';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api')
export class HotelsController {
  constructor(private hotelRoomService: IHotelRoomService) {}

  @Roles(Role.ADMIN, Role.MANAGER, Role.CLIENT)
  @Get('/common/hotel-rooms')
  async getHotelRooms(@Query() query: SearchRoomsParams) {
    const queryParams = { ...query };
    return await this.hotelRoomService.search(queryParams);
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CLIENT)
  @Get('/common/hotel-rooms/:id')
  async getHotelRoom(@Param('id') id: ID): Promise<HotelRoom> {
    return await this.hotelRoomService.findById(id);
  }

  @Roles(Role.ADMIN)
  @UseInterceptors(MulterFilesInterceptor())
  @Post('/admin/hotel-rooms/')
  async createHotelRoom(
    @Body(new HttpValidationPipe()) body: Partial<HotelRoom>,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<HotelRoom> {
    const hotelRoom = {
      ...body,
      images: images.map((image) => image.path),
    };
    try {
      if (images.length > 0)
        return await this.hotelRoomService.create(hotelRoom);
    } catch {
      throw new BadRequestException();
    }
  }

  @Roles(Role.ADMIN)
  @UseInterceptors(MulterFilesInterceptor())
  @Put('/admin/hotel-rooms/:id')
  async updateHotelRoom(
    @Param('id') id: ID,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body(new HttpValidationPipe()) body: Partial<HotelRoom>,
  ): Promise<HotelRoom> {
    const updateRoom = { ...body };
    updateRoom.images = Array.isArray(body.images)
      ? [...body.images, ...images.map((image) => image.path)]
      : [body.images, ...images.map((image) => image.path)];
    try {
      return this.hotelRoomService.update(id, updateRoom);
    } catch {
      throw new BadRequestException();
    }
  }
}
