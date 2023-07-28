import { Module } from '@nestjs/common';
import { DraftController } from './draft.controller';
import { DraftService } from './draft.service';
import { DraftModelModule } from '../../models/draft.model';

@Module({
    imports: [DraftModelModule],
    controllers: [DraftController],
    providers: [DraftService],
})
export class DraftModule {}
