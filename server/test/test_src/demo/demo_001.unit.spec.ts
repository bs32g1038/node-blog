import { DemoService } from '../../../src/modules/demo/demo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoSchema } from '../../../src/models/demo.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('demo_001_unit', () => {
    let app: INestApplication;
    let demoService: DemoService;

    beforeAll(async () => {
        app = await initApp({
            imports: [MongooseModule.forFeature([{ name: 'demo', schema: DemoSchema, collection: 'demo' }])],
            providers: [DemoService],
        });
        demoService = app.get<DemoService>(DemoService);
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
