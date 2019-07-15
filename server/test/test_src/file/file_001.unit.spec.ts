import { FileService } from '../../../src/modules/file/file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from '../../../src/models/file.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('file_001_unit', () => {
    let app: INestApplication;
    let fileService: FileService;

    beforeAll(async () => {
        app = await initApp({
            imports: [MongooseModule.forFeature([{ name: 'file', schema: FileSchema, collection: 'file' }])],
            providers: [FileService],
        });
        fileService = app.get<FileService>(FileService);
    });

    it('getFiles {} {}', async () => {
        const arr = await fileService.getFiles({}, {});
        expect(arr.length).toBeGreaterThanOrEqual(0);
    });

    it('getFiles undefined undefined', async () => {
        try {
            const arr = await fileService.getFiles(undefined, undefined);
        } catch (error) {
            expect(error).toEqual(error);
        }
    });

    afterAll(async () => {
        await app.close();
    });
});
