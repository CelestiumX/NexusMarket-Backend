### PublicarCopiarNexusMarket Backend

Backend para plataforma de marketplace basado en NestJS con integración de Stellar/Soroban para pagos y contratos inteligentes.


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).







### Configuración de la base de datos

# Asegúrate de tener PostgreSQL en ejecución
# Crea la base de datos 'nexusmarket' si aún no existe

# Inicializa Prisma (si no lo has hecho)
npx prisma init

# Genera los clientes de Prisma basados en tu esquema
npx prisma generate

# Crea la migración inicial
npx prisma migrate dev --name init

# Opcional: Ejecuta el seed para llenar la base de datos con datos iniciales
npx prisma db seed


### Project Structure

nexusmarket-backend/
├── .env                           # Variables de entorno
├── .gitignore                     # Archivos ignorados por git
├── package.json                   # Dependencias y scripts
├── tsconfig.json                  # Configuración TypeScript
├── Dockerfile                     # Configuración Docker
├── docker-compose.yml             # Orquestación de servicios
├── prisma/                        # Directorio de Prisma
│   ├── schema.prisma              # Esquema de Prisma con modelos de datos
│   ├── migrations/                # Migraciones generadas por Prisma
│   │   ├── 20250421000000_init/  
│   │   │   ├── migration.sql
│   │   └── migration_lock.toml
│   └── seed.ts                    # Script para poblar datos iniciales
├── src/
│   ├── main.ts                    # Punto de entrada de la aplicación NestJS
│   ├── app.module.ts              # Módulo principal de la aplicación
│   ├── config/                    # Configuraciones
│   │   ├── prisma.ts              # Cliente Prisma y configuración
│   │   ├── stellar.ts             # Config Stellar SDK
│   │   ├── soroban.ts             # Config Soroban
│   │   ├── env.ts                 # Validación de variables
│   │   └── swagger.ts             # Configuración Swagger UI
│   ├── routes/                    # Rutas organizadas por dominio
│   │   ├── api/
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── product.routes.ts
│   │   │   ├── seller.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   └── review.routes.ts
│   │   └── api.routes.ts          # Rutas principales consolidadas
│   ├── modules/                   # Módulos NestJS
│   │   ├── auth/
│   │   ├── user/
│   │   ├── product/
│   │   ├── order/
│   │   └── blockchain/
│   ├── services/                  # Lógica de negocio
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── product.service.ts
│   │   ├── seller.service.ts
│   │   ├── order.service.ts
│   │   ├── blockchain.service.ts  # Conexión con Stellar/Soroban
│   │   ├── payment.service.ts     # Procesamiento de pagos XLM/USDC
│   │   ├── reputation.service.ts  # Sistema de reputación
│   │   └── logistics.service.ts   # Smart contracts de logística
│   ├── controllers/               # Controladores MVC
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── product.controller.ts
│   │   ├── seller.controller.ts
│   │   ├── order.controller.ts
│   │   └── review.controller.ts
│   ├── dto/                       # Data Transfer Objects
│   │   ├── auth/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── user/
│   │   │   └── update-user.dto.ts
│   │   ├── product/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   └── order/
│   │       ├── create-order.dto.ts
│   │       └── update-order.dto.ts
│   ├── interfaces/                # Interfaces/Types
│   │   ├── user.interface.ts
│   │   ├── product.interface.ts
│   │   ├── stellar.interface.ts
│   │   └── order.interface.ts
│   ├── utils/
│   │   ├── helpers.ts             # Funciones utilitarias
│   │   ├── apiError.ts            # Clase de errores
│   │   ├── validation/            # Esquemas de validación
│   │   └── blockchain/            # Helpers específicos
│   │       ├── transactions.ts
│   │       ├── soroban.ts
│   │       └── smart-contracts.ts
│   └── middlewares/
│       ├── auth.middleware.ts
│       ├── error.middleware.ts
│       └── validation.middleware.ts
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   └── controllers/
│   └── integration/
│       ├── auth.test.ts
│       ├── products.test.ts
│       └── orders.test.ts
└── scripts/
    ├── deploy-smart-contracts.ts  # Helper para contratos
    └── db-tools.ts                # Scripts útiles para la base de datos
