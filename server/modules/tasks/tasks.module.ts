import { Module } from '@nestjs/common';
import { HasNewCommentTasksService } from './has.new.comment.tasks.service';
import { CommentModelModule } from '@blog/server/models/comment.model';
import { DeleteDraftTasksService } from './delete.drafts.tasks.service';
import { DraftModelModule } from '@blog/server/models/draft.model';

@Module({
    imports: [CommentModelModule, DraftModelModule],
    providers: [HasNewCommentTasksService, DeleteDraftTasksService],
})
export class TasksModule {}
