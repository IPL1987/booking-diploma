import * as bcrypt from 'bcrypt';

const saltRounds = 8;

export const getHash: (pass: string) => Promise<string> = async (
  pass: string,
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
};

export const compareHash: (
  password: string,
  hashedPassword: string,
) => Promise<boolean> = async (password: string, hashedPassword: string) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
