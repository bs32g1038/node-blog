import { Module } from '@nestjs/common';
import { AboutController } from './about/about.controller';
import { AboutService } from './about/about.service';

@Module({
    controllers: [AboutController],
    providers: [AboutService],
})
export class AboutModule {}
