import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import env from './env';

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'NexusMarket API',
        version: '1.0.0',
        description: 'API para el marketplace descentralizado NexusMarket usando Stellar y Soroban',
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}${env.API_PREFIX}`,
          description: 'Servidor local de desarrollo',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./src/routes/**/*.ts', './src/dto/**/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  // Configurar ruta de la documentación Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Ruta para obtener el archivo JSON de la documentación
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}