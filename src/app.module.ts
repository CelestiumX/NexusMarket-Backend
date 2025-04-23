// src/app.module.ts
import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { PrismaService } from './services/prisma.service';
@Module({
  imports: [],
  controllers: [HealthController],
  providers: [PrismaService], // <--- Asegúrate de incluir esto
})
export class AppModule {}
