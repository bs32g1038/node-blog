import { TOKEN_SECRET_KEY } from '../server/configs/index.config';
import jwt from 'jsonwebtoken';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { DatabaseModule } from '../server/database/database.module';
import { Test } from '@nestjs/testing';
import { AllExceptionsFilter } from '../server/filters/all-exceptions.filter';
import queryString from 'query-string';

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
        imports: [DatabaseModule, ...(metadata.imports || [])],
        providers: metadata.providers,
    }).compile();
    const app = module.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
    return app;
};

/**
 * 格式化jest测试中的it的name，如 it('Method: get, Url: /api/test, ...', fn)
 */
export const formatJestItNameE2e = ({ method = '', url = '', status = 200, message = '', body = {}, params = {} }) => {
    return `Method: ${method} Url: ${url} Status: ${status} params: ${JSON.stringify(
        params
    )} ${message} ${JSON.stringify(body)}`;
};

/**
 * 生成url
 * @param {string} url
 * @param {object} params 作用于路径
 * @param {string} query 作用域？后面的字符串
 */
export const generateUrl = ({ url = '', params = {}, query = {} }) => {
    Object.keys(params).map(key => {
        url = url.replace(`:${key}`, params[key]);
    });
    return url + '?' + queryString.stringify(query);
};

export const isExpectPass = (arr1: any[], arr2: any[], fields: string[]) => {
    for (let i = 0; i < arr1.length; i++) {
        const rs = arr2.some(item => {
            return fields.every(field => {
                return arr1[i][field] === item[field];
            });
        });
        if (rs) {
            return rs;
        }
    }
};
