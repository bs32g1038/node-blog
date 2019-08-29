import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { AppModule } from './app.module';
import { resolve } from 'path';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import logger, { requestInfoLogger } from './utils/logger.util';
import { APP_SERVER } from './configs/index.config';
import * as log4js from 'log4js';

export async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: false });
    app.use(helmet());
    app.use(json({ limit: '20mb' }));
    app.useStaticAssets(resolve(__dirname, '../static'), { prefix: '/static/' });
    app.use(log4js.connectLogger(requestInfoLogger, { level: 'info' }));
    app.useGlobalFilters(new AllExceptionsFilter());
    return await app.listen(APP_SERVER.port);
}

bootstrap().then(() => {
    logger.info(`
        Blog Runing！port at ${APP_SERVER.port}, env: ${APP_SERVER.environment}
        Local: http://${APP_SERVER.hostname}:${APP_SERVER.port}/
    `);
});
