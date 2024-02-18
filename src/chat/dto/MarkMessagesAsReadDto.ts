import { IsDate, IsDefined, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export type ID = string | ObjectId;

export class MarkMessageAsReadDto {
  @IsMongoId()
  @IsDefined()
  user: ID;

  @IsMongoId()
  @IsDefined()
  supportRequest: ID;

  @IsDate()
  @IsDefined()
  createdBefore: Date;
}
