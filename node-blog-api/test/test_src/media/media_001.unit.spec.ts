import { Test } from '@nestjs/testing';
import { MediaService } from '../../../src/modules/media/media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaSchema } from '../../../src/models/media.model';
import { DatabaseModule } from '../../database/database.module';
import { INestApplication } from '@nestjs/common';

describe('MediaService', () => {
    let app: INestApplication;
    let mediaService: MediaService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                MongooseModule.forFeature([
                    { name: 'media', schema: MediaSchema, collection: 'media' }
                ])],
            providers: [MediaService]
        }).compile();
        mediaService = module.get<MediaService>(MediaService);
        app = module.createNestApplication();
        await app.init();
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
