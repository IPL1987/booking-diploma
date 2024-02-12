import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpValidationPipe } from 'src/validation/validation';
import { ReservationService } from './reservation.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { HotelService } from '../hotels/hotels.service';
import { ID } from 'src/hotels/interface/room.interface';
import { Role, Roles } from 'src/auth/enums/enums';
import { ReservationDto } from './interfaces/reservation.dto';
import { IHotelRoomService } from 'src/hotels/room.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api')
export class ReservationController {
  constructor(
    private reservationService: ReservationService,
    public hotelsService: HotelService,
    private hotelRoomsService: IHotelRoomService,
  ) {}

  @Roles(Role.CLIENT)
  @Post('/client/reservations')
  async addReservation(
    @Body(new HttpValidationPipe()) data: ReservationDto,
    @Req() req: any,
  ) {
    const room = this.hotelRoomsService.findById(data.roomId);
    if (!room || !(await room).isEnabled) {
      throw new BadRequestException();
    }
    return await this.reservationService.addReservation({
      userId: req.ID,
      hotelId: data.hotelId,
      roomId: data.roomId,
      dateStart: new Date(data.dateStart),
      dateEnd: new Date(data.dateEnd),
    });
  }

  @Roles(Role.MANAGER)
  @Get('/manager/reservations/:userId')
  async getManagerReservation(@Param('userId') userId: ID) {
    return await this.reservationService.getReservations({ userId });
  }
  @Roles(Role.CLIENT)
  @Get('/client/reservations')
  async getClientReservation(@Req() req: any) {
    return await this.reservationService.getReservations({
      userId: req.user._id,
    });
  }

  @Roles(Role.CLIENT)
  @Delete('/client/reservations/:id')
  async deleteReservationByClient(@Param('id') id: ID) {
    await this.reservationService.removeReservation(id);
    return;
  }

  @Roles(Role.MANAGER)
  @Delete('/manager/reservations/:id')
  async deleteManagerReservation(@Param('id') id: ID) {
    await this.reservationService.removeReservation(id);
    return;
  }
}
