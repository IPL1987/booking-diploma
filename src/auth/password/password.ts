import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const passwordHash: (password: string) => Promise<string> = async (
  password: string,
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const compareHash: (
  password: string,
  hash: string,
) => Promise<boolean> = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
