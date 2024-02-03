import { IsDefined, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
