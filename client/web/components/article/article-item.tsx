import Link from '../link';
import React from 'react';
import { parseTime } from '@blog/client/libs/time';
import Comment from './comment';
import { Breadcrumb } from 'antd';
import dynamic from 'next/dynamic';
const ArticleAddress = dynamic(() => import('./article-address'), { ssr: false });
import style from './article-item.style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
import clsx from 'clsx';

interface Props {
    article: any;
    comments: any[];
}

export default function ArticleItem(props: Props) {
    const { article, comments } = props;
    const theme = useSelector((state: RootState) => state.app.theme);
    return (
        <div className={style.article}>
            <Breadcrumb
                separator=">"
                items={[
                    {
                        title: '首页',
                    },
                    {
                        title: (
                            <Link
                                href={'/blog/articles?cid=' + (article.category && article.category._id)}
                                passHref={true}
                            >
                                {article.category && article.category.name}
                            </Link>
                        ),
                    },
                    {
                        title: article.title,
                    },
                ]}
            ></Breadcrumb>
            <div className={style.articleMeta}>
                <Link href={`/blog/articles/${article._id}`} passHref={true}>
                    <h2 className={style.articleTitle}>{article.title}</h2>
                </Link>
                <div className={style.articleMetaInfo}>
                    <span>发表于{parseTime(article.createdAt)}</span>
                    <span>·</span>
                    <span>
                        分类于
                        <Link href={`/blog/articles?cid=${article.category && article.category._id}`} passHref={true}>
                            {article.category && article.category.name}
                        </Link>
                    </span>
                    <span>·</span>
                    <span>{article.commentCount}条评论</span>
                    <span>·</span>
                    <span>阅读次数{article.viewsCount}</span>
                </div>
            </div>
            <div
                className={clsx(
                    'rich-text',
                    {
                        dark: theme === 'dark',
                    },
                    style.editor
                )}
                dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>
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
                            {article.prev.title}
                        </Link>
                    </div>
                )}
                {article.next && (
                    <div>
                        <strong>下一篇：</strong>
                        <Link href={`/blog/articles/${article.next._id}`} passHref={true}>
                            {article.next.title}
                        </Link>
                    </div>
                )}
            </div>
            <Comment article={article} comments={comments}></Comment>
        </div>
    );
}
