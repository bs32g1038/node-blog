import { Module } from '@nestjs/common';
import { AboutController } from './about/about.controller';
import { AboutService } from './about/about.service';

@Module({
    imports: [],
    controllers: [AboutController],
    providers: [AboutService]
})
export class AboutModule { }
