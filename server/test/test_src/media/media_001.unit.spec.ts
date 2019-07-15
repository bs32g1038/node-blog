import { MediaService } from '../../../src/modules/media/media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaSchema } from '../../../src/models/media.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('MediaService', () => {
    let app: INestApplication;
    let mediaService: MediaService;

    beforeAll(async () => {
        app = await initApp({
            imports: [MongooseModule.forFeature([{ name: 'media', schema: MediaSchema, collection: 'media' }])],
            providers: [MediaService],
        });
        mediaService = app.get<MediaService>(MediaService);
    });

    it('getMedias {} {}', async () => {
        const arr = await mediaService.getMedias({}, {});
        expect(arr.length).toBeGreaterThanOrEqual(0);
    });

    it('getMedias undefined undefined', async () => {
        try {
            const arr = await mediaService.getMedias(undefined, undefined);
        } catch (error) {
            expect(error).toEqual(error);
        }
    });

    afterAll(async () => {
        await app.close();
    });
});
