import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { exec } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('NexusMarket API')
    .setDescription('API para el marketplace NexusMarket')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  // Abrir el navegador automáticamente
  const url = `http://localhost:${port}/api`;
  console.log(`Application is running on: ${url}`);
  
  if (process.env.NODE_ENV !== 'production') {
    // Detectar sistema operativo y abrir navegador
    let command;
    switch (process.platform) {
      case 'darwin': // macOS
        command = `open ${url}`;
        break;
      case 'win32': // Windows
        command = `start ${url}`;
        break;
      default: // Linux y otros
        command = `xdg-open ${url}`;
    }
    
    exec(command, (error) => {
      if (error) {
        console.error(`Error al abrir el navegador: ${error}`);
      }
    });
  }
}
bootstrap();