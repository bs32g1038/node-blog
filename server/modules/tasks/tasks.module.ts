import { Module } from '@nestjs/common';
import { HasNewCommentTasksService } from './has.new.comment.tasks.service';
import { WriteDayReadingTasksService } from './write.day.reading.tasks.service';
import { ArticleModelModule } from '@blog/server/models/article.model';
import { CommentModelModule } from '@blog/server/models/comment.model';

@Module({
    imports: [CommentModelModule, ArticleModelModule],
    providers: [HasNewCommentTasksService, WriteDayReadingTasksService],
})
export class TasksModule {}
