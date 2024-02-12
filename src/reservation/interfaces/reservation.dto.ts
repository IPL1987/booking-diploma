import { IsDate, IsMongoId } from 'class-validator';
import { ID } from './reservation-search.dto';

export class ReservationDto {
  @IsMongoId()
  userId: ID;

  @IsMongoId()
  hotelId?: ID;

  @IsMongoId()
  roomId: ID;

  @IsDate()
  dateStart: Date;

  @IsDate()
  dateEnd: Date;
}
