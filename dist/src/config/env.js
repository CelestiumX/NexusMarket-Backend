"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
dotenv.config();
const logger = new common_1.Logger('Environment');
const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'NODE_ENV',
];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    logger.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}
exports.env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10),
    API_PREFIX: process.env.API_PREFIX || '/api',
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'sysnexusmarket',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    STELLAR_NETWORK: process.env.STELLAR_NETWORK || 'TESTNET',
    STELLAR_SECRET_KEY: process.env.STELLAR_SECRET_KEY,
    SOROBAN_RPC_URL: process.env.SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
logger.log(`Environment: ${exports.env.NODE_ENV}`);
logger.log(`API running on port ${exports.env.PORT} with prefix ${exports.env.API_PREFIX}`);
logger.log(`Stellar network: ${exports.env.STELLAR_NETWORK}`);
exports.default = exports.env;
//# sourceMappingURL=env.js.map