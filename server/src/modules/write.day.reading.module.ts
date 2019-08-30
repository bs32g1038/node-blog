import { Model } from 'mongoose';
import { Module } from '@nestjs/common';
import { InjectModel } from '../utils/model.util';
import { ArticleModelProvider, ArticleDocument, ArticleModel } from '../models/article.model';
import * as LRU from 'lru-cache';
const cache = new LRU();

export const incArticleDayReadingCount = (articleId: string) => {
    const curDayTime = new Date(new Date().toLocaleDateString()).getTime();
    const key = articleId + '#' + curDayTime;
    const count = <number>cache.get(key);
    if (count) {
        cache.set(key, count + 1);
    } else {
        cache.set(key, 1);
    }
};

/**
 * 控制并发写入，解决数据库压力 以及 数据重复问题
 * 每 5 分钟 执行一次 内存队列检测，如果 5 分钟内 停机可能丢失部分数据
 * 针对 文章日浏览量 的数据写入 数据重要程度（轻）
 * 博客访问量本身不大，5 分钟的数据 如果丢失可以接受
 */
@Module({
    providers: [ArticleModelProvider],
})
export class WriteDayReadingModule {
    constructor(@InjectModel(ArticleModel) private readonly articleModel: Model<ArticleDocument>) {
        // 执行定时器
        this.timingWrite();
    }

    async writeToDb(key: string) {
        const [articleId, timestamp] = key.split('#');

        const count = <number>cache.get(key);
        if (count <= 0) {
            return;
        }

        const res = await this.articleModel.update(
            { _id: articleId, 'dayReadings.timestamp': timestamp },
            { $inc: { 'dayReadings.$.count': count } }
        );

        if (res.n <= 0) {
            await this.articleModel.update({ _id: articleId }, { $addToSet: { dayReadings: { timestamp, count } } });
        }

        // 处理缓存中的数据
        const result = <number>cache.get(key) - count;
        if (result <= 0) {
            cache.del(key);
        } else {
            cache.set(key, result);
        }
    }

    // 定时写入
    timingWrite() {
        setInterval(() => {
            cache.keys().map((key: string) => {
                this.writeToDb(key);
            });
        }, 1000 * 60 * 5); // 每5分钟执行一次检测
    }
}
