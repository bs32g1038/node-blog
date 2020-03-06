import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';

@Module({
    controllers: [AboutController],
    providers: [AboutService],
})
export class AboutModule {}
