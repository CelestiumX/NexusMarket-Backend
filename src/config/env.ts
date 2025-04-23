import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const logger = new Logger('Environment');

// Definir las variables de entorno requeridas
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'NODE_ENV',
];

// Verificar que todas las variables requeridas estén definidas
const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  logger.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Exportar variables de entorno con tipado
export const env: {
    NODE_ENV: string;
    PORT: number;
    API_PREFIX: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    STELLAR_NETWORK: string;
    STELLAR_SECRET_KEY?: string;
    SOROBAN_RPC_URL: string;
    CLOUDINARY_CLOUD_NAME?: string;
    CLOUDINARY_API_KEY?: string;
    CLOUDINARY_API_SECRET?: string;
  } = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10),
    API_PREFIX: process.env.API_PREFIX || '/api',
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET|| 'sysnexusmarket',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    STELLAR_NETWORK: process.env.STELLAR_NETWORK || 'TESTNET',
    STELLAR_SECRET_KEY: process.env.STELLAR_SECRET_KEY,
    SOROBAN_RPC_URL: process.env.SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  };
  


// Log de la configuración (sin mostrar claves sensibles)
logger.log(`Environment: ${env.NODE_ENV}`);
logger.log(`API running on port ${env.PORT} with prefix ${env.API_PREFIX}`);
logger.log(`Stellar network: ${env.STELLAR_NETWORK}`);

export default env;
