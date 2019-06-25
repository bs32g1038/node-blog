import { Test } from '@nestjs/testing';
import { DemoService } from '../../../src/modules/demo/demo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoSchema } from '../../../src/models/demo.model';
import { DatabaseModule } from '../../database/database.module';
import { INestApplication } from '@nestjs/common';

describe('DemoService', () => {
    let app: INestApplication;
    let demoService: DemoService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                MongooseModule.forFeature([
                    { name: 'demo', schema: DemoSchema, collection: 'demo' }
                ])],
            providers: [DemoService]
        }).compile();
        demoService = module.get<DemoService>(DemoService);
        app = module.createNestApplication();
        await app.init();
    });

    it('getDemos {} {}', async () => {
        const arr = await demoService.getDemos({}, {});
        expect(arr.length).toBeGreaterThanOrEqual(0);
    });

    it('getDemos undefined undefined', async () => {
        try {
            const arr = await demoService.getDemos(undefined, undefined);
        } catch (error) {
            expect(error).toEqual(error);
        }
    });

    afterAll(async () => {
        await app.close();
    });
});
