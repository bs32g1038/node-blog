import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class FileEncodePipe implements PipeTransform {
    transform(value: Express.Multer.File) {
        value.originalname = Buffer.from(value.originalname, 'latin1').toString('utf8');
        return value;
    }
}
