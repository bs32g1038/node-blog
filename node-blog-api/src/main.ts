import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { resolve } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule
    );
    const root: any = resolve(__dirname, '../static');
    app.useStaticAssets(root, {
        prefix: '/static/'
    });
    await app.listen(8080);
}
bootstrap();
