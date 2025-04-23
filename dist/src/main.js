"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const child_process_1 = require("child_process");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NexusMarket API')
        .setDescription('API para el marketplace NexusMarket')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    const url = `http://localhost:${port}/api`;
    console.log(`Application is running on: ${url}`);
    if (process.env.NODE_ENV !== 'production') {
        let command;
        switch (process.platform) {
            case 'darwin':
                command = `open ${url}`;
                break;
            case 'win32':
                command = `start ${url}`;
                break;
            default:
                command = `xdg-open ${url}`;
        }
        (0, child_process_1.exec)(command, (error) => {
            if (error) {
                console.error(`Error al abrir el navegador: ${error}`);
            }
        });
    }
}
bootstrap();
//# sourceMappingURL=main.js.map