import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { AppModule } from './app.module';
import { resolve } from 'path';

export async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const root: any = resolve(__dirname, '../static');
    app.useStaticAssets(root, {
        prefix: '/static/',
    });
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.listen(8080);
    return app;
}

bootstrap();
