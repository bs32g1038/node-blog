import dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommentDocument, Comment } from '@blog/server/models/comment.model';
import { EmailService } from '@blog/server/modules/email/email.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HasNewCommentTasksService {
    constructor(
        @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
        private readonly emailService: EmailService
    ) {}

    /**
     * 定时检测是否有新的评论，如果有则发送邮件，通知博主
     * 每天下午 9 点进行通知
     */
    @Cron(CronExpression.EVERY_DAY_AT_9PM)
    async HasNewComment() {
        // 是否开启了邮箱通知服务
        if (this.emailService.isEnableSmtp) {
            const count = await this.commentModel.countDocuments({
                createdAt: { $gte: dayjs().format('YYYY-MM-DD') },
            });
            if (count < 1) {
                return;
            }
            this.emailService.sendMail({
                subject: `博客共有 ${count} 条新的评论`,
                text: '博客有新的评论要处理。',
            });
        }
    }
}
