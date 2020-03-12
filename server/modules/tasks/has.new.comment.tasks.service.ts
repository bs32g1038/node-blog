import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommentModel, ICommentModel } from '@blog/server/models/comment.model';
import { InjectModel } from '@blog/server/utils/model.util';
import { EmailService } from '@blog/server/modules/email/email.service';

@Injectable()
export class HasNewCommentTasksService {
    constructor(
        @InjectModel(CommentModel) private readonly commentModel: ICommentModel,
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
