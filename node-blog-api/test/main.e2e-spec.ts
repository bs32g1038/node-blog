import { bootstrap } from '../src/main';
import * as mongoose from 'mongoose';
import { INestApplication } from '@nestjs/common';

describe('server bootstrap', () => {
    let app: INestApplication;
    it('server bootstrap 8080', async () => {
        app = await bootstrap();
    });
    afterAll(async () => {
        await mongoose.connection.close();
        app.close();
    });
});
