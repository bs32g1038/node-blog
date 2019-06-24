import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as mongoose from 'mongoose';

describe('App Module', () => {
    let app: INestApplication;
    it('app init success!!!!', async () => {
        const module = await Test.createTestingModule({
            imports: [
                AppModule
            ]
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
        await mongoose.connection.close();
    });
});
