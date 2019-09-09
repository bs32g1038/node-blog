import { Model } from 'mongoose';
import { Module } from '@nestjs/common';
import { InjectModel } from '../utils/model.util';
import { ArticleModelProvider, ArticleDocument, ArticleModel } from '../models/article.model';
import * as LRU from 'lru-cache';
const cache = new LRU();

/**
 * 把文章 每天浏览数 写入缓存
 * 当 文章dayReadings数组的长度 超过 14 时 不再写入缓存。
 * @param articleId 文章id
 * @param dayReadingsLen 文章dayReadings数组的长度
 */
export const incArticleDayReadingCount = (articleId: string, dayReadingsLen: number) => {
    if (dayReadingsLen >= 14) {
        return;
    }
    const curDayTime = new Date(new Date().toLocaleDateString()).getTime();
    const key = articleId + '#' + curDayTime;
    const count = cache.get(key) as number;
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
    isInserting = false;

    constructor(@InjectModel(ArticleModel) private readonly articleModel: Model<ArticleDocument>) {
        // 执行定时器
        this.timingWrite();
    }

    /**
     *  count <= 0 直接删除 key
     * @param key
     */
    async writeToDb(key: string) {
        const [articleId, timestamp] = key.split('#');

        const count = cache.get(key) as number;

        const res = await this.articleModel.update(
            { _id: articleId, 'dayReadings.timestamp': timestamp },
            { $inc: { 'dayReadings.$.count': count } }
        );

        if (res.n <= 0) {
            await this.articleModel.update({ _id: articleId }, { $addToSet: { dayReadings: { timestamp, count } } });
        }

        const result = (cache.get(key) as number) - count;
        if (result <= 0) {
            cache.del(key);
        } else {
            cache.set(key, result);
        }
    }

    /**
     * 定时写入，每5分钟执行一次检测
     * 加全局锁(isInserting)，防止数据超时，导致写入数据异常
     */
    timingWrite() {
        setInterval(() => {
            if (this.isInserting) {
                return;
            }
            this.isInserting = true;
            Promise.all(
                cache.keys().map(async (key: string) => {
                    return await this.writeToDb(key);
                })
            ).then(() => {
                this.isInserting = false;
            });
        }, 1000 * 60 * 5);
    }
}
