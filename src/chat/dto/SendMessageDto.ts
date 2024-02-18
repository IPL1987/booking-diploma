import { IsDefined, IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export type ID = string | ObjectId;

export class SendMessageDto {
  @IsMongoId()
  @IsDefined()
  author: ID;

  @IsMongoId()
  @IsDefined()
  supportRequest: ID;

  @IsString()
  @IsDefined()
  text: string;
}
