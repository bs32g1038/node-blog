import { TOKEN_SECRET_KEY } from '../server/configs/index.config';
import jwt from 'jsonwebtoken';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { DatabaseModule } from '../server/database/database.module';
import { SiteConfigModule } from '../server/site-config/site.config.module';
import { Test } from '@nestjs/testing';
import { AllExceptionsFilter } from '../server/filters/all-exceptions.filter';
import { INestApplication } from '@nestjs/common';
import mongoose from 'mongoose';
import { isEqual } from 'lodash';

export const getToken = () => {
    return jwt.sign({ account: 'test', roles: ['admin'] }, TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60,
    });
};

export const verifyToken = str => {
    return jwt.verify(str, TOKEN_SECRET_KEY);
};

export const initApp = async (metadata: ModuleMetadata) => {
    const module = await Test.createTestingModule({
        imports: [DatabaseModule, SiteConfigModule, ...(metadata.imports || [])],
        providers: metadata.providers,
    }).compile();
    const app = module.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
    return app;
};

export const closeApp = async (app: INestApplication) => {
    await app.close();
    await mongoose.disconnect();
};

export const isExpectPass = (arr1: any[], arr2: any[], skipFields: string[] = []) => {
    for (let i = 0; i < arr1.length; i++) {
        const rs = arr2.some(item => {
            return Object.keys(item).every(key => {
                // 跳过字段检查
                if (skipFields.includes(key)) {
                    return true;
                }
                return isEqual(item[key], arr1[i][key]);
            });
        });
        if (rs) {
            return rs;
        }
    }
    return false;
};

export const generateDataList = (fn: () => void, len = 0) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(fn());
    }
    return arr;
};
