import Link from '../link';
import React from 'react';
import { parseTime } from '@blog/client/libs/time';
import Comment from './comment';
import { Breadcrumb } from 'antd';
import dynamic from 'next/dynamic';
const ArticleAddress = dynamic(() => import('./article-address'), { ssr: false });
import style from './article-item.style.module.scss';
const MarkdownBody = dynamic(() => import('../markdown-body'), { ssr: false });

interface Props {
    article: any;
    comments: any[];
}

export default function ArticleItem(props: Props) {
    const { article, comments } = props;
    return (
        <div className={style.article}>
            <Breadcrumb separator=">">
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href={'/blog/articles?cid=' + (article.category && article.category._id)} passHref={true}>
                        <a>{article.category && article.category.name}</a>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>{article.title}</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={style.articleMeta}>
                <Link href={`/blog/articles/${article._id}`} passHref={true}>
                    <a>
                        <h2 className={style.articleTitle}>{article.title}</h2>
                    </a>
                </Link>
                <div className={style.articleMetaInfo}>
                    <span>发表于{parseTime(article.createdAt)}</span>
                    <span>
                        分类于
                        <Link href={`/blog/articles?cid=${article.category && article.category._id}`} passHref={true}>
                            <a>{article.category && article.category.name}</a>
                        </Link>
                    </span>
                    <span>{article.commentCount}条评论</span>
                    <span>阅读次数{article.viewsCount}</span>
                </div>
            </div>
            <div className={style.articleContent}>
                <MarkdownBody content={article.content} />
            </div>
            <div className={style.statement}>
                <div>
                    <strong>本文链接：</strong>
                    <ArticleAddress articleId={article._id}></ArticleAddress>
                </div>
                <div>
                    <strong>版权声明：</strong>
                    <span>
                        自由转载-署名-非商业性使用
                        <i> | </i>
                        <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/cn/">CC BY-NC-SA 3.0 CN</a>
                        许可协议。
                    </span>
                </div>
            </div>
            <div className={style.footer}>
                {article.prev && (
                    <div>
                        <strong>上一篇：</strong>
                        <Link href={`/blog/articles/${article.prev._id}`} passHref={true}>
                            <a>{article.prev.title}</a>
                        </Link>
                    </div>
                )}
                {article.next && (
                    <div>
                        <strong>下一篇：</strong>
                        <Link href={`/blog/articles/${article.next._id}`} passHref={true}>
                            <a>{article.next.title}</a>
                        </Link>
                    </div>
                )}
            </div>
            <Comment article={article} comments={comments}></Comment>
        </div>
    );
}
