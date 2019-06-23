import * as request from 'supertest';
import { encrypt } from '../src/utils/crypto.util';

export const getToken = async (app) => {
    return await request(app.getHttpServer())
        .post('/api/login')
        .send({
            key: encrypt(JSON.stringify({
                account: 'test',
                password: 'test'
            }))
        })
        .then(res => {
            return res.body.token;
        });
};
