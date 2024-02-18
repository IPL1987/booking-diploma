import { IsDefined, IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export type ID = string | ObjectId;

export class CreateSupportRequestDto {
  @IsMongoId()
  @IsDefined()
  user: ID;

  @IsString()
  @IsDefined()
  text: string;
}
