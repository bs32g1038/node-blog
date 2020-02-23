import request from 'supertest';
import { initApp, generateUrl, formatJestItNameE2e } from './util';
import { INestApplication } from '@nestjs/common';

interface TestFnParams {
    url?: string;
    method?: string;
    query?: object;
    params?: object;
    body?: object;
    message: string;
    status: number;
    isLogin?: boolean;
    result?: (res: any) => void;
}

interface Options {
    testName: string;
    url: string;
    method: string;
    modules: any[];
    initData?: () => void;
}

export const e2eTest = (options: Options, fn: (test: (params: TestFnParams) => void) => void) => {
    const { testName, url, method, modules, initData } = options;

    describe(testName, () => {
        let app: INestApplication;

        beforeAll(async () => {
            app = await initApp({
                imports: [...modules],
            });
            if (initData) {
                await initData();
            }
        });

        const testFn = (testOptions: TestFnParams) => {
            const { message, query, params, status, body, isLogin = false, result = null } = testOptions;
            it(
                formatJestItNameE2e({
                    query,
                    params,
                    status,
                    url: testOptions.url || url,
                    message,
                    body,
                    method: testOptions.method || method,
                }),
                () => {
                    const httpRequest = request(app.getHttpServer());
                    let ajax: request.Test = httpRequest[testOptions.method || method](
                        generateUrl({ url: testOptions.url || url, query, params })
                    );
                    if (isLogin) {
                        ajax = ajax.set('authorization', __TOKEN__);
                    }
                    if (body) {
                        ajax = ajax.send(body);
                    }
                    return ajax.expect(status).then(res => {
                        if (result) {
                            result(res);
                        }
                    });
                }
            );
        };

        fn(testFn);

        afterAll(async () => {
            await app.close();
        });
    });
};
