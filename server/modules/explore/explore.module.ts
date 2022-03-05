import { Module } from '@nestjs/common';
import { ExploreController } from './explore.controller';
import { ExploreService } from './explore.service';
import { ExploreModelModule } from '@blog/server/models/explore.model';

@Module({
    imports: [ExploreModelModule],
    controllers: [ExploreController],
    providers: [ExploreService],
})
export class ExploreModule {}
