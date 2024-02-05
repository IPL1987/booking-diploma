export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
    dbName: process.env.MONGO_DB_NAME || '',
  },
  cookie: {
    expires: process.env.COOKIE_EXPIRATION || 1000 * 36000,
  },
  jwt: {
    secret: (process.env.JWT_SECRET = 'jwt'),
    expiresIn: process.env.JWT_EXPIRATION || '7d',
  },
});
