import helmet from 'helmet';
import log4js from 'log4js';
import { json } from 'body-parser';
import favicon from 'serve-favicon';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { APP_SERVER } from './configs/index.config';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import logger, { requestInfoLogger } from './utils/logger.util';
import { staticAssetsPath, assetsPath } from './utils/path.util';
import { AppConfigService } from './modules/app-config/app.config.service';

export async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(AppConfigService);
    app.use(helmet());
    app.use(json({ limit: '20mb' }));
    /**
     * 此处用于兼容 favicon 不存在配置
     * 简化 docker 配置，由于映射主机目录到 docker， favicon文件可不能不存在。
     */
    app.use((req, res, next) => {
        if (configService.isHasfavicon) {
            try {
                return favicon(staticAssetsPath + '/favicon.ico')(req, res, next);
            } catch (error) {
                configService.setIsHasfavicon(false);
            }
        }
        return next();
    });
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
