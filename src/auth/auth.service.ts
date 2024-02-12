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
import { compareHash, getHash } from './password/password';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.passwordHash === password) {
      const { passwordHash, ...result } = user;
      const isEquals = await compareHash(passwordHash, password);

      if (isEquals) return result;
    }
    return null;
  }

  async registration(data: RegistrationDto): Promise<any> {
    const { password, email, ...rest } = data;
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const passwordHash = bcrypt.hashSync(password, 8).toString();
    const newUser = await this.userService.create({
      passwordHash,
      email,
      ...rest,
    });
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
  }

  async createToken(payload: any) {
    return await this.jwtService.signAsync(payload);
  }

  async login(data: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(data.email);
    const isValidPassword = compareHash(
      data.password,
      await getHash(data.password),
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const payload = {
      id: user.id,
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
