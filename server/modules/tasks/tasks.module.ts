import { Module } from '@nestjs/common';
import { DeleteDraftTasksService } from './delete.drafts.tasks.service';
import { DraftModelModule } from '@blog/server/models/draft.model';

@Module({
    imports: [DraftModelModule],
    providers: [DeleteDraftTasksService],
})
export class TasksModule {}
