import { IsDate, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export type ID = string | ObjectId;

export class ReservationSearchOptions {
  @IsMongoId()
  userId?: ID;

  @IsDate()
  dateStart?: Date;

  @IsDate()
  dateEnd?: Date;
}
