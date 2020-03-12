import { Module } from '@nestjs/common';
import { HasNewCommentTasksService } from './has.new.comment.tasks.service';
import { WriteDayReadingTasksService } from './write.day.reading.tasks.service';
import { ArticleModelProvider } from '@blog/server/models/article.model';
import { CommentModelProvider } from '@blog/server/models/comment.model';

@Module({
    providers: [HasNewCommentTasksService, WriteDayReadingTasksService, ArticleModelProvider, CommentModelProvider],
})
export class TasksModule {}
