"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
class PrismaService {
    enableShutdownHooks(app) {
        throw new Error('Method not implemented.');
    }
    logger = new common_1.Logger(PrismaService.name);
    prismaClient;
    constructor() {
        this.prismaClient = exports.prisma;
        this.logger.log('PrismaService initialized');
    }
    get client() {
        return this.prismaClient;
    }
    async onModuleInit() {
        try {
            await this.prismaClient.$connect();
            this.logger.log('Connected to database successfully');
        }
        catch (error) {
            this.logger.error('Failed to connect to database', error);
            throw error;
        }
    }
    async onModuleDestroy() {
        await this.prismaClient.$disconnect();
        this.logger.log('Disconnected from database');
    }
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Database cleaning is not allowed in production.');
        }
        const models = [
            'blockchainTransactions',
            'smartContracts',
            'notifications',
            'trackingEvents',
            'shippingTracking',
            'orderItems',
            'orders',
            'reviews',
            'productImages',
            'products',
            'categories',
            'sellers',
            'users',
        ];
        return this.prismaClient.$transaction(models.map((modelName) => {
            return this.prismaClient[modelName].deleteMany();
        }));
    }
}
exports.PrismaService = PrismaService;
//# sourceMappingURL=prisma.js.map