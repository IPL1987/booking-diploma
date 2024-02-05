export interface NestConfig {
  port: number;
}

export interface DBConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
}

export interface ImgUploadConfig {
  destination: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string | number;
}

export interface CookiesConfig {
  expires: number;
}
