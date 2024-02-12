import { ObjectId } from 'mongoose';
import { Reservation } from '../schema/resevation.schema';
import { ReservationDto } from './reservation.dto';
import { ReservationSearchOptions } from './reservation-search.dto';

export type ID = string | ObjectId;

export interface IReservation {
  addReservation(data: ReservationDto): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
