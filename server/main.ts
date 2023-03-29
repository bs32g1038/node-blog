import helmet from 'helmet';
import log4js from 'log4js';
import { json } from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { APP_SERVER } from './configs/index.config';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import logger, { requestInfoLogger } from './utils/logger.util';
import { staticAssetsPath, assetsPath } from './utils/path.util';

export async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(
        helmet({
            contentSecurityPolicy: false,
        })
    );
    app.use(json({ limit: '20mb' }));
    app.useStaticAssets(assetsPath, { prefix: '/static/' });
    app.useStaticAssets(staticAssetsPath, { prefix: '/static/' });
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
