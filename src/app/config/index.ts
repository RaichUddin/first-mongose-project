import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  databaseUrl: process.env.BASE_URL,
  defaultPassword: process.env.DEFAULT_PASS,
  bcrypt_salt: process.env.BCRYPT_SALT,
  jwt_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '365d',
  reset_password_link: process.env.RESET_PASSWORD_LINK,
  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_API_KEY_SECRET,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
