import { SetMetadata } from '@nestjs/common';

export enum Role {
  MANAGER = 'manager',
  ADMIN = 'admin',
  CLIENT = 'client',
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
