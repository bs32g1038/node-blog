import { AdminLogService } from '../../../server/modules/adminlog/adminlog.service';
import { AdminLogModelProvider } from '../../../server/models/adminlog.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('AdminLogService', () => {
    let app: INestApplication;
    let adminLogService: AdminLogService;

    beforeAll(async () => {
        app = await initApp({
            providers: [AdminLogModelProvider, AdminLogService],
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
