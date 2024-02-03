import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { RegistrationDto } from '../auth/dto/registration.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { LoginResponseDto } from '../auth/dto/login-response.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from './enums/enums';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const { passwordHash, ...result } = user;
      const isEquals = await compare(passwordHash, password);

      if (isEquals) return result;
    }
    return null;
  }

  async registration(data: RegistrationDto): Promise<any> {
    const { email, password } = data;
    const user = await this.validateUser(email, password);

    if (user) {
      throw new BadRequestException('Email уже занят');
    }

    await this.userService.create(data);
    return await this.login({ email, password });
  }

  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(email, password);
    const validPass = await user.validateHash(password);

    if (!validPass || !user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: Role.ADMIN || Role.CLIENT || Role.MANAGER,
    };

    return {
      user: {
        email: user.email,
        name: user.name,
        contactPhone: user.contactPhone,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
