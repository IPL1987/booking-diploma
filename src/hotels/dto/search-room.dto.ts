import { IsBoolean, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { ID } from '../interface/hotel.interface';

export class SearchRoomsParams {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsOptional()
  offset: number;

  @IsMongoId()
  @IsOptional()
  hotel: ID;

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}
