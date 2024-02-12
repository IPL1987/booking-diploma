import { IsString, IsDefined } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegistrationDto extends LoginDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;

  @IsString()
  @IsDefined()
  name?: string;

  @IsString()
  @IsDefined()
  contactPhone?: string;
}
