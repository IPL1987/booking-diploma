import { compareHash, passwordHash } from './password';
import { UserSchema } from 'src/users/schema/users.schema';

UserSchema.pre('save', async function (next) {
  try {
    this.passwordHash = await passwordHash(this.passwordHash);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods = {
  async validateHash(pass: string): Promise<boolean> {
    return await compareHash(pass, this.passwordHash);
  },
};
