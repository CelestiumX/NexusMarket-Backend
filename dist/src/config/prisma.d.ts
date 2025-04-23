import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare class PrismaService {
    enableShutdownHooks(app: INestApplication<any>): void;
    private readonly logger;
    private prismaClient;
    constructor();
    get client(): PrismaClient;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    cleanDatabase(): Promise<any>;
}
