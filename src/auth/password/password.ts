import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const passwordHash: (password: string) => Promise<string> = async (
  password: string,
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const compareHash: (
  password: string,
  hash: string,
) => Promise<boolean> = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
