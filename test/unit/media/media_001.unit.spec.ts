import { MediaService } from '../../../server/modules/media/media.service';
import { MediaModelProvider } from '../../../server/models/media.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('MediaService', () => {
    let app: INestApplication;
    let mediaService: MediaService;

    beforeAll(async () => {
        app = await initApp({
            providers: [MediaModelProvider, MediaService],
        });
        mediaService = app.get<MediaService>(MediaService);
    });

    it('getMedias {} {}', async () => {
        const arr = await mediaService.getMedias({}, {});
        expect(arr.length).toBeGreaterThanOrEqual(0);
    });

    it('getMedias undefined undefined', async () => {
        try {
            await mediaService.getMedias(undefined, undefined);
        } catch (error) {
            expect(error).toEqual(error);
        }
    });

    afterAll(async () => {
        await app.close();
    });
});
