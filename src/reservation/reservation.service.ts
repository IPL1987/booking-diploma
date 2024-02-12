import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from './interfaces/reservation-service.interface';
import { IReservation } from './interfaces/reservation-service.interface';
import { ReservationDto } from './interfaces/reservation.dto';
import { ReservationSearchOptions } from './interfaces/reservation-search.dto';
import { Reservation, ReservationDocument } from './schema/resevation.schema';

@Injectable()
export class ReservationService implements IReservation {
  constructor(
    @InjectModel(Reservation.name)
    private readonly ReservationModel: Model<ReservationDocument>,
  ) {}

  async getReservations(
    data: ReservationSearchOptions,
  ): Promise<Reservation[]> {
    const { userId, dateStart, dateEnd } = data;
    return await this.ReservationModel.find({
      userId,
      dateStart: {
        $gte: dateStart,
        $lte: dateEnd,
      },
      dateEnd: {
        $gte: dateStart,
        $lte: dateEnd,
      },
    }).exec();
  }

  async addReservation(data: ReservationDto): Promise<ReservationDocument> {
    const { userId, dateStart, dateEnd } = data;
    const reservations = await this.getReservations({
      userId,
      dateStart,
      dateEnd,
    });
    if (!reservations.length) {
      throw new BadRequestException();
    }
    const reservation = new this.ReservationModel(data);
    try {
      await reservation.save();
      return await this.ReservationModel.findById(reservation.roomId)
        .populate([
          'User',
          {
            path: 'HotelRoom',
            populate: { path: 'Hotel' },
          },
        ])
        .select('-__v')
        .exec();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async removeReservation(id: ID): Promise<void> {
    const item = this.ReservationModel.findById(id);
    if (!item) {
      throw new BadRequestException();
    }
    await this.ReservationModel.findByIdAndDelete(id).exec();
  }
}
