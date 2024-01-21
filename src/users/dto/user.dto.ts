import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsString()
  @IsDefined()
  role: string;
}
