import { PrismaClient } from '@prisma/client';
import { INestApplication, Logger } from '@nestjs/common';

// Crear una instancia PrismaClient global para evitar múltiples conexiones
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export class PrismaService {
  enableShutdownHooks(app: INestApplication<any>) {
    throw new Error('Method not implemented.');
  }
  private readonly logger = new Logger(PrismaService.name);
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
    this.logger.log('PrismaService initialized');
  }

  get client(): PrismaClient {
    return this.prismaClient;
  }

  async onModuleInit() {
    try {
      await this.prismaClient.$connect();
      this.logger.log('Connected to database successfully');
    } catch (error) {
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
    
    // Lista las tablas en orden inverso de dependencia para limpiar
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
    
    // Crea una transacción para asegurar que todas las operaciones se completen o fallen juntas
    return this.prismaClient.$transaction(
      models.map((modelName) => {
        return this.prismaClient[modelName].deleteMany();
      })
    );
  }
}