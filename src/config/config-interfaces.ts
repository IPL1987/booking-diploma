export interface DBConfig {
  user: string;
  host: string;
  port: number;
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
