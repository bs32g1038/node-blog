import config from '../src/configs/index.config';
import jwt = require('jsonwebtoken');
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { DatabaseModule } from './database/database.module';
import { Test } from '@nestjs/testing';
import { AllExceptionsFilter } from '../src/filters/all-exceptions.filter';

export const getToken = () => {
    return jwt.sign({
        account: 'test',
        roles: ['admin']
    }, config.token_secret_key, {
            expiresIn: 60 * 60
        });
};

export const verifyToken = (str) => {
    return jwt.verify(str, config.token_secret_key);
};

export const initApp = async (metadata: ModuleMetadata) => {
    const module = await Test.createTestingModule({
        imports: [
            DatabaseModule,
            ...metadata.imports
        ],
        providers: metadata.providers
    }).compile();
    const app = module.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
    return app;
};
