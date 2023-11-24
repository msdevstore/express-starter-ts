import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_EXPIRATION_MINUTES: parseInt(process.env.JWT_ACCESS_EXPIRATION_MINUTES || '30'),
  JWT_REFRESH_EXPIRATION_DAYS: parseInt(process.env.JWT_REFRESH_EXPIRATION_DAYS || '10'),
};
