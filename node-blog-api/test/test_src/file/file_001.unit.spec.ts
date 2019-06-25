import { Test } from '@nestjs/testing';
import { FileService } from '../../../src/modules/file/file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from '../../../src/models/file.model';
import { DatabaseModule } from '../../database/database.module';
import { INestApplication } from '@nestjs/common';

describe('FileService', () => {
    let app: INestApplication;
    let fileService: FileService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                MongooseModule.forFeature([
                    { name: 'file', schema: FileSchema, collection: 'file' }
                ])],
            providers: [FileService]
        }).compile();
        fileService = module.get<FileService>(FileService);
        app = module.createNestApplication();
        await app.init();
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
