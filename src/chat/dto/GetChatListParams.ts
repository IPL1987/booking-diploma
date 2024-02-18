import {
  IsBoolean,
  IsDefined,
  IsMongoId,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export type ID = string | ObjectId;

export class GetChatListParams {
  @IsMongoId()
  @IsOptional()
  user: ID | null;

  @IsBoolean()
  @IsDefined()
  isActive: boolean;

  @IsNumber()
  limit: number;

  @IsNumber()
  offset: number;
}
