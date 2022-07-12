import { Module } from '@nestjs/common';
import { HasNewCommentTasksService } from './has.new.comment.tasks.service';
import { CommentModelModule } from '@blog/server/models/comment.model';

@Module({
    imports: [CommentModelModule],
    providers: [HasNewCommentTasksService],
})
export class TasksModule {}
