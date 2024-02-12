import { compareHash, getHash } from './password';
import { UserSchema } from 'src/users/schema/users.schema';

UserSchema.pre('save', async function (next) {
  try {
    this.passwordHash = await getHash(this.passwordHash);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods = {
  async validateHash(password: string): Promise<boolean> {
    return await compareHash(password, this.passwordHash);
  },
};

export { UserSchema };
