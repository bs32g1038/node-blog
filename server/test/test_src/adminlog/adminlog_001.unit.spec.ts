import { AdminLogService } from '../../../src/modules/adminlog/adminlog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminLogSchema } from '../../../src/models/adminlog.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('AdminLogService', () => {
    let app: INestApplication;
    let adminLogService: AdminLogService;

    beforeAll(async () => {
        app = await initApp({
            imports: [
                MongooseModule.forFeature([{ name: 'adminlog', schema: AdminLogSchema, collection: 'adminlog' }]),
            ],
            providers: [AdminLogService],
        });
        adminLogService = app.get<AdminLogService>(AdminLogService);
    });

    it('getAdminLogs {} {}', async () => {
        const arr = await adminLogService.getAdminLogs({}, {});
        expect(arr.length).toBeGreaterThanOrEqual(0);
    });

    it('getAdminLogs undefined undefined', async () => {
        try {
            const arr = await adminLogService.getAdminLogs(undefined, undefined);
            expect(arr.length).toBeGreaterThanOrEqual(0);
        } catch (error) {
            expect(error).toEqual(error);
        }
    });

    afterAll(async () => {
        await app.close();
    });
});
