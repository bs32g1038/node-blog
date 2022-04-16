import mongoose from 'mongoose';
import { isEqual } from 'lodash';
import jwt from 'jsonwebtoken';
import { MONGODB, TOKEN_SECRET_KEY } from '../server/configs/index.config';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { DatabaseModule } from './database.module';
import { Test } from '@nestjs/testing';
import { AllExceptionsFilter } from '../server/filters/all-exceptions.filter';
import { INestApplication } from '@nestjs/common';
import { DynamicConfigModule } from '@blog/server/modules/dynamic-config/dynamic.config.module';
import { EmailModule } from '@blog/server/modules/email/email.module';
import { MongooseModule } from '@nestjs/mongoose';

export const getToken = () => {
    return jwt.sign({ account: 'test', roles: ['admin'] }, TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60,
    });
};

export const verifyToken = (str) => {
    return jwt.verify(str, TOKEN_SECRET_KEY);
};

export const initApp = async (metadata: ModuleMetadata) => {
    const module = await Test.createTestingModule({
        imports: [
            DatabaseModule,
            MongooseModule.forRoot(MONGODB.uri),
            DynamicConfigModule,
            EmailModule,
            ...(metadata.imports || []),
        ],
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

export const isExpectPass = (arr1: unknown[], arr2: unknown[], skipFields: string[] = []) => {
    for (let i = 0; i < arr1.length; i++) {
        const rs = arr2.some((item) => {
            return Object.keys(item).every((key) => {
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
