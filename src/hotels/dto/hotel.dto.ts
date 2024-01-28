import { IsDefined, IsString } from 'class-validator';

export class CreateHotelParams {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  description: string;
}

export class UpdateHotelParams {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  description: string;
}
