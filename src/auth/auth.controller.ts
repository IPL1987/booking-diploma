import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { ConfigService } from '@nestjs/config';
import { CookiesConfig } from 'src/config/config-interfaces';
import { HttpValidationPipe } from 'src/validation/validation';
import { JwtAuthGuard } from './guards/auth.guard';
import { Response } from 'express';
import { Role, Roles } from './enums/enums';

@Controller('api')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/auth/login')
  async login(
    @Body(new HttpValidationPipe()) data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookieConfig = this.configService.get<CookiesConfig>('cookie');
    const authUser = await this.authService.login(data);
    res.cookie('user_token', authUser.access_token, {
      expires: new Date(Date.now() + cookieConfig.expires),
    });

    return authUser.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/auth/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('user_token', '', { expires: new Date() });
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.CLIENT)
  @Post('/auth/client/register')
  async register(
    @Body() data: RegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    data['passwordHash'] = data.password;
    const authUser = await this.authService.registration(data);
    const cookiesConfig = this.configService.get<CookiesConfig>('cookies');
    res.cookie('token', authUser.accessToken, {
      expires: new Date(Date.now() + cookiesConfig.expires),
    });
    return authUser;
  }
}
