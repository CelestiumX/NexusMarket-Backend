"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_jsdoc_1 = require("swagger-jsdoc");
const swagger_ui_express_1 = require("swagger-ui-express");
const env_1 = require("./env");
function setupSwagger(app) {
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
                    url: `http://localhost:${env_1.default.PORT}${env_1.default.API_PREFIX}`,
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
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}
//# sourceMappingURL=swagger.js.map