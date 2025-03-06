import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  databaseUrl: process.env.BASE_URL,
  defaultPassword: process.env.DEFAULT_PASS,
  bcrypt_salt: process.env.BCRYPT_SALT,
};
