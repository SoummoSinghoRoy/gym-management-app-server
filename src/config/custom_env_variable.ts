import dotenv from 'dotenv';
dotenv.config();
import { EnvVariables } from '../Types/general.types';

const env_variables: EnvVariables = {
  db_uri: process.env.DB_URI || '',
  db_admin: process.env.DB_ADMIN || '',
  db_password: process.env.DB_PASSWORD || '',
  secret_key: process.env.SECRET_KEY || '' 
}

export default env_variables;